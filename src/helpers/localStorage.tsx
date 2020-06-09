import { UserData } from "types/UserData";

export const storeUser = (user: UserData) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUser = () => {
  localStorage.removeItem("user");
};

export const storeUpdateToken = (token: {
  google?: string;
  musicbytes?: string;
}) => {
  let user: UserData;

  if (localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user")!);
    user = {
      ...user,
      token: {
        google: token.google ? token.google : user.token.google,
        musicbytes: token.musicbytes ? token.musicbytes : user.token.musicbytes,
      },
    };

    console.log("STORE UP " + token.google);

    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const loadUser = () => {
  if (localStorage.getItem("user")) {
    let user = JSON.parse(localStorage.getItem("user")!);
    return user;
  }
  return undefined;
};
