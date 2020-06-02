import React, { useState } from "react";
import "./Login.scss";
import GoogleLogin from "react-google-login";
import axios from "axios";
import Cookies from "js-cookie";
import LoginButton from "components/LoginButton/LoginButton";
import ScaleLoader from "react-spinners/ScaleLoader";
import { bindActionCreators } from "redux";
import { loginUser } from "redux/actions/app";
import { ThunkDispatch } from "redux-thunk";
import { AllActions } from "redux/types/app";
import { AppState, store } from "redux/store/configureStore";
import { connect } from "react-redux";

type Props = StateProps & DispatchProps;

interface StateProps {}
interface DispatchProps {
  loginUser: (
    name: string,
    email: string,
    token: { google: string; musicbytes: string }
  ) => any;
}

const Login: React.FC<Props> = ({ loginUser }) => {
  const [loginState, setLoginState] = useState({
    loading: false,
  });

  const clickLoginButton = () => {
    setLoginState({ loading: true });
  };

  const responseFailed = (response: any) => {
    setLoginState({ loading: false });
  };

  const responseSuccess = (response: any) => {
    console.log(response);

    const name = response.profileObj.name;
    const email = response.profileObj.email;
    const googleKey = response.accessToken;

    axios
      .post(`${store.getState().app.apiBaseURL}api/v1/login`, {
        idtoken: response.tokenId,
        email: email,
        name: name,
      })
      .then(
        (response: any) => {
          const musicbytesKey = response.data.token;
          const token = {
            google: googleKey,
            musicbytes: musicbytesKey,
          };

          loginUser(name, email, token);

          Cookies.set("name", name, { expires: 7 });
          Cookies.set("email", email, { expires: 7 });
          Cookies.set("token_google", token.google, { expires: 7 });
          Cookies.set("token_musicbytes", token.musicbytes, { expires: 7 });
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <div className="Login">
      <div className="content">
        <h1>Want to access these features?</h1>
        <h2>Please login using your Google account</h2>

        {loginState.loading ? (
          <ScaleLoader color={"rgb(58, 89, 140)"} />
        ) : (
          <LoginButton
            onClick={clickLoginButton}
            responseSuccess={responseSuccess}
            responseFailed={responseFailed}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AllActions>) => ({
  loginUser: bindActionCreators(loginUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
