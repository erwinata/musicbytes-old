import React from "react";
import "./Header.scss";
import { res_logo } from "res";
import { AppState, store } from "redux/store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AllActions } from "redux/types/app";
import { connect } from "react-redux";
import {
  logoutUser,
  showToast,
  actionUpdateToken,
  actionShowToast,
} from "redux/actions/app";
import { bindActionCreators } from "redux";
import { UserData } from "types/UserData";
import Cookies from "js-cookie";
import axios from "axios";
import { ToastType } from "types/ToastType";
import { removeUser, storeUpdateToken } from "helpers/localStorage";
import { clearAllLibrary } from "redux/actions/library";
import { GoogleLogout } from "react-google-login";
import { axiosIntercept } from "api/Connection";

type Props = StateProps & DispatchProps;

interface StateProps {
  user?: UserData;
}
interface DispatchProps {
  clearAllLibrary: () => any;
  logoutUser: () => any;
  showToast: (text: string, toastType: ToastType) => any;
}

const Header: React.FC<Props> = ({
  user,
  clearAllLibrary,
  logoutUser,
  showToast,
}) => {
  const clickLogout = () => {
    axios.post(`${store.getState().app.apiBaseURL}v1/logout`).then(
      (response: any) => {
        showToast("Logout successful", ToastType.NORMAL);
        clearAllLibrary();
        removeUser();
        logoutUser();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const clickRefresh = () => {
    axiosIntercept()
      .post(`${store.getState().app.apiBaseURL}v1/refreshgoogletoken`)
      .then(
        (response: any) => {
          const token = { google: response.data.access_token };
          storeUpdateToken(token);
          store.dispatch(actionUpdateToken(token));
          store.dispatch(actionShowToast("Token Refreshed"));
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <div className="Header">
      <img src={res_logo} alt="Logo" />

      {user ? (
        // <GoogleLogout
        //   clientId="218080435229-otcherss9skhea1fk6uhe5salahc2t73.apps.googleusercontent.com"
        //   buttonText="Logout"
        //   onLogoutSuccess={clickLogout}
        //   render={(renderProps) => (
        //     <button
        //       onClick={renderProps.onClick}
        //       disabled={renderProps.disabled}
        //     >
        //       Logout
        //     </button>
        //   )}
        // ></GoogleLogout>

        <button onClick={clickLogout}>Logout</button>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    user: state.app.user,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AllActions>) => ({
  clearAllLibrary: bindActionCreators(clearAllLibrary, dispatch),
  logoutUser: bindActionCreators(logoutUser, dispatch),
  showToast: bindActionCreators(showToast, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
