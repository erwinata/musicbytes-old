import React from "react";
// import "./LoginButton.scss";
import GoogleLogin from "react-google-login";
import axios from "axios";
import Cookies from "js-cookie";
import { AppState } from "redux/store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AllActions } from "redux/types/app";
import { bindActionCreators } from "redux";
import { loginUser } from "redux/actions/app";
import { connect } from "react-redux";

type Props = PassingProps;

interface PassingProps {
  isSignedIn: boolean;
  onClick: () => any;
  responseSuccess: (response: any) => any;
  responseFailed: (response: any) => any;
}

const LoginButton: React.FC<Props> = ({
  isSignedIn,
  onClick,
  responseSuccess,
  responseFailed,
}) => {
  return (
    <div className="LoginButton" onClick={onClick}>
      <GoogleLogin
        clientId="218080435229-otcherss9skhea1fk6uhe5salahc2t73.apps.googleusercontent.com"
        onSuccess={responseSuccess}
        onFailure={responseFailed}
        cookiePolicy={"single_host_origin"}
        // responseType="code"
        render={(renderProps) => (
          <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
            Login with Google
          </button>
        )}
      />
    </div>
  );
};

export default LoginButton;
