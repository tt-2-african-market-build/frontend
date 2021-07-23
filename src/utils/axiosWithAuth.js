import axios from 'axios';

const axiosWithAuth = () => {
    //stores token to local storage on successful login
    const token = localStorage.getItem("token");
    return axios.create({
      baseURL: "https://team-amazing.herokuapp.com",
      headers: { Authorization: token },
    });
}

export default axiosWithAuth;