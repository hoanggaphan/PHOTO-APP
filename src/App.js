import { unwrapResult } from "@reduxjs/toolkit";
import productApi from "api/productApi";
import { getMe } from "app/userSlice";
import SignIn from "features/Auth/pages/SignIn";
import firebase from "firebase";
import "firebase/auth";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Button } from "reactstrap";
import "./App.scss";
import Header from "./components/Header";
import NotFound from "./components/NotFound";

// lazy load - code spliting
const Photo = React.lazy(() => import("./features/Photo/index"));

// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // ...
};
firebase.initializeApp(config);

function App() {
  // eslint-disable-next-line
  const [productList, setProductList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const params = {
          _page: 1,
          _limit: 10,
        };
        const response = await productApi.getAll(params);
        console.log(response);
        setProductList(response.data);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };

    fetchProductList();
  }, []);

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          // user logs out, handle something here
          console.log("User is not logged in");
          return;
        }

        // Get me when sign in
        try {
          const actionResult = await dispatch(getMe());
          const currentUser = unwrapResult(actionResult);
          console.log('Logged in user: ', currentUser);
        } catch (error) {
          console.log('Failed to login', error);
        }

        // console.log("Logged in user: ", user.displayName);

        // const token = await user.getIdToken();
        // console.log("Logged in user token: ", token);
      });

    return () => unregisterAuthObserver();
    // eslint-disable-next-line
  }, []);

  const handleButtonClick = async () => {
    try {
      const params = {
        _page: 1,
        _limit: 10,
      };
      const response = await productApi.getAll(params);
      console.log(response);
    } catch (error) {
      console.log("Failed to fetch product list: ", error);
    }
  };

  return (
    <div className="photo-app">
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Header />

          <Button onClick={handleButtonClick}>Fetch Product List</Button>

          <Switch>
            <Redirect exact from="/" to="/photos" />

            <Route path="/photos" component={Photo} />
            <Route path="/sign-in" component={SignIn} />

            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
