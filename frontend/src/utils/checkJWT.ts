import jwtDecode from "jwt-decode";

export const checkJWT = (jwt: string) => {
  const decoded = jwtDecode(jwt) as { exp: number };

  if (decoded.exp < Date.now() / 1000) {
    return false;
  }
  return true;
};
