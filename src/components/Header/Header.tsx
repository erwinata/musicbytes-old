import React from "react";
import "./Header.scss";
import { res_logo } from "res";
import { AppState, store } from "redux/store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AllActions } from "redux/types/app";
import { connect } from "react-redux";
import { logoutUser, showToast } from "redux/actions/app";
import { bindActionCreators } from "redux";
import { UserData } from "types/UserData";
import Cookies from "js-cookie";
import axios from "axios";
import { ToastType } from "types/ToastType";

type Props = StateProps & DispatchProps;

interface StateProps {
  user?: UserData;
}
interface DispatchProps {
  logoutUser: () => any;
  showToast: (text: string, toastType: ToastType) => any;
}

const Header: React.FC<Props> = ({ user, logoutUser }) => {
  const clickLogout = () => {
    axios
      .post(`${store.getState().app.apiBaseURL}v1/logout`, {
        idtoken: user?.token.musicbytes,
      })
      .then(
        (response: any) => {
          showToast("Logout successful");

          Cookies.remove("name");
          Cookies.remove("email");
          Cookies.remove("token_google");
          Cookies.remove("token_musicbytes");
          logoutUser();
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
        <div className="btnLogout" onClick={clickLogout}>
          Logout
        </div>
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
  logoutUser: bindActionCreators(logoutUser, dispatch),
  showToast: bindActionCreators(showToast, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
