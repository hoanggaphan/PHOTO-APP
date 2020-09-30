import firebase from "firebase";

const userApi = {
  getMe() {
    // Call api get current user
    return new Promise((resolve, reject) => {
      // return reject(new Error("Custom error"));

      setTimeout(() => {
        const currentUser = firebase.auth().currentUser;

        resolve({
          id: currentUser.uid,
          name: currentUser.displayName,
          email: currentUser.email,
          photoUrl: currentUser.photoURL,
        });
      }, 500);
    });
  },
};

export default userApi;
