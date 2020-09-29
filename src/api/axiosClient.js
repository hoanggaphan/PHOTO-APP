import axios from "axios";
import firebase from "firebase";
import queryString from "query-string";

const getFirebaseToken = async () => {
  // if logged in
  const currentUser = firebase.auth().currentUser;
  if (currentUser) return currentUser.getIdToken();
  
  // if not logged in
  const hasRememberedAccount = localStorage.getItem(
    "firebaseui::rememberedAccounts"
  );
  if (!hasRememberedAccount) return null;

  // Logged in but currentUser is not fetched --> wait (10s)
  return new Promise((resolve, reject) => {
    let unregisterAuthObserver;

    const waitTimer = setTimeout(() => {
      reject(null);
      unregisterAuthObserver();
      console.log('Reject timeout');
    }, 10000);

    unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          reject(null);
        }

        const token = await user.getIdToken();
        console.log("[AXIOS] Logged in user token: ", token);
        resolve(token);

        unregisterAuthObserver();
        clearTimeout(waitTimer);
      });
  });
};

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#requestconfig` for the full list of configs
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const token = await getFirebaseToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;
