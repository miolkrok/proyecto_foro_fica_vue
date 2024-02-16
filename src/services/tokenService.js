import jwt_decode from "jwt-decode";

const tokenService = {
  getToken() {
    return localStorage.getItem("token"); 
  },
  isTokenValid() {
    const token = this.getToken();
    if (token) {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000; 
      return decodedToken.exp > currentTime;
    }
    return false;
  },
};

export default tokenService;
