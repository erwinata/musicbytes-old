import React, { useState, useEffect } from "react";
import "./Login.scss";
import GoogleLogin from "react-google-login";
import axios from "axios";
import LoginButton from "components/LoginButton/LoginButton";
import ScaleLoader from "react-spinners/ScaleLoader";
import { bindActionCreators } from "redux";
import { loginUser } from "redux/actions/app";
import { ThunkDispatch } from "redux-thunk";
import { AllActions } from "redux/types/app";
import { AppState, store } from "redux/store/configureStore";
import { connect } from "react-redux";
import { UserData } from "types/UserData";

type Props = StateProps & DispatchProps;

interface StateProps {}
interface DispatchProps {
  loginUser: (userData: UserData) => any;
}

const Login: React.FC<Props> = ({ loginUser }) => {
  const [loginState, setLoginState] = useState<{
    logInAction: any;
    loading: boolean;
  }>({
    logInAction: undefined,
    loading: false,
  });

  const clickLoginButton = () => {
    setLoginState({ logInAction: undefined, loading: true });
  };

  const responseFailed = (response: any) => {
    setLoginState({ logInAction: undefined, loading: false });
  };

  const responseSuccess = (response: any) => {
    // if (loginState.loading) {
    setLoginState({ ...loginState, logInAction: response });
    // }
  };

  useEffect(() => {
    if (loginState.logInAction) {
      const response = loginState.logInAction;

      console.log(response);

      const code = response.code;
      const id_token = response.tokenId;

      axios
        .post(`${store.getState().app.apiBaseURL}v1/login`, {
          // code: code,
          id_token: id_token,
        })
        .then(
          (response: any) => {
            console.log(response);
            const musicbytesKey = response.data.token;
            const email = response.data.user.email;
            const name = response.data.user.name;

            const token = {
              google: undefined!,
              musicbytes: "Bearer " + musicbytesKey,
            };

            loginUser({
              name: name,
              email: email,
              token: token,
            });
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }, [loginState.logInAction]);

  return (
    <div className="Login">
      <div className="content">
        <h1>Want to access these features?</h1>
        <h2>Please login using your Google account</h2>

        {loginState.loading ? (
          <ScaleLoader color={"rgb(58, 89, 140)"} />
        ) : (
          <LoginButton
            isSignedIn={loginState.loading}
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

export default connect(null, mapDispatchToProps)(Login);
