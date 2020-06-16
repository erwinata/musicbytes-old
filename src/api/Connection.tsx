import axios from "axios";
import { storeUpdateToken } from "helpers/localStorage";
import { defaults, get } from "lodash";
import { bindActionCreators } from "redux";
import {
  actionShowToast,
  actionUpdateToken,
  logoutUser,
} from "redux/actions/app";
import { store } from "redux/store/configureStore";

export const axiosIntercept = (options = {}) => {
  const state = store.getState();
  const dispatch = store.dispatch;

  const config = store.getState().app.user
    ? {
        headers: {
          Authorization: store.getState().app.user?.token.musicbytes,
        },
      }
    : {};
  const instance = axios.create(defaults(config, options));

  // instance.interceptors.request.use(
  //   function (config) {
  //     const randomTimeout = Math.floor(Math.random() * 30) * 5;
  //     console.log(randomTimeout);
  //     return new Promise((resolve) =>
  //       setTimeout(() => resolve(config), randomTimeout)
  //     );
  //   },
  //   function (error) {
  //     return Promise.reject(error);
  //   }
  // );

  instance.interceptors.response.use(
    function (response) {
      let newtoken = get(response, "headers.authorization");
      if (newtoken) {
        newtoken = { musicbytes: newtoken };
        storeUpdateToken(newtoken);
        dispatch(actionUpdateToken(newtoken));
        dispatch(actionShowToast("New JWT Token"));
      }
      return response;
    },
    function (error) {
      switch (error.response.status) {
        case 401:
          bindActionCreators(logoutUser, dispatch)();
          break;
        default:
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const axiosInterceptGoogle = (options = {}) => {
  // def.headers = { Authorization: store.getters.auth.getToken() };
  const config = {
    headers: {
      Authorization: store.getState().app.user?.token.google,
    },
  };
  const instance = axios.create(defaults(config, options));

  // instance.interceptors.request.use(
  //   function (config) {
  //     const randomTimeout = Math.floor(Math.random() * 30) * 5;
  //     console.log(randomTimeout);
  //     return new Promise((resolve) =>
  //       setTimeout(() => resolve(config), randomTimeout)
  //     );
  //   },
  //   function (error) {
  //     return Promise.reject(error);
  //   }
  // );

  instance.interceptors.response.use(
    function (response) {
      let newtoken = get(response, "headers.authorization");
      if (newtoken) {
        newtoken = { musicbytes: newtoken };
        storeUpdateToken(newtoken);
        store.dispatch(actionUpdateToken(newtoken));
      }
      return response;
    },
    function (error) {
      switch (error.response.status) {
        case 401:
          // store.dispatch("logoff");
          break;
        default:
      }
      return Promise.reject(error);
    }
  );

  return instance;
};
