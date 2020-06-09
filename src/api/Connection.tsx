import { defaults, get } from "lodash";
import axios from "axios";
import { store } from "redux/store/configureStore";
import {
  actionUpdateToken,
  updateToken,
  actionShowToast,
} from "redux/actions/app";
import { storeUpdateToken } from "helpers/localStorage";

export const axiosIntercept = (options = {}) => {
  // def.headers = { Authorization: store.getters.auth.getToken() };
  const config = {
    headers: {
      Authorization: store.getState().app.user?.token.musicbytes,
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
        store.dispatch(actionShowToast("New JWT Token"));
      }
      console.log(response);
      return response;
    },
    function (error) {
      switch (error.response.status) {
        case 401:
          // store.dispatch("logoff");
          break;
        default:
          console.log(error.response);
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
        console.log("NEWWWWW TOKEN");
      }
      console.log(response);
      return response;
    },
    function (error) {
      switch (error.response.status) {
        case 401:
          // store.dispatch("logoff");
          break;
        default:
          console.log(error.response);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};
