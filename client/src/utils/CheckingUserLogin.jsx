import Cookies from "js-cookie"

export const checkingUserLogin = () => {
  const isUserLogIn = Cookies.get("jwt_token")
  if (isUserLogIn) {
    return true
  } else {
    return false
  }
}