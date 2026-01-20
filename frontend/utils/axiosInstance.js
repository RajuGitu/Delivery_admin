
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
});



// import axios from "axios";

// const instance = axios.create({
//   baseURL: "http://localhost:5001/api",
// });

// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token"); // or adminToken
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default instance;


// import axios from "axios";

// const instance = axios.create({
//   baseURL: "http://localhost:5001/api",
// });

// // ✅ ALWAYS attach token
// instance.interceptors.request.use(
//   (config) => {
//     const token =
//       localStorage.getItem("token") ||
//       localStorage.getItem("adminToken");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default instance;
