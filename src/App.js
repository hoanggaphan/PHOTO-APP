import React, { Suspense } from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import NotFound from "./components/NotFound";
import Header from "./components/Header";
import { useEffect } from "react";
import productApi from "api/productApi";

// lazy load - code spliting
const Photo = React.lazy(() => import("./features/Photo/index"));

function App() {
  console.log(process.env.NODE_ENV)
  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const params = {
          _page: 1,
          _limit: 10,
        };
        const response = await productApi.getAll(params);
        const responseOneitem = await productApi.get(20289983);
        console.log(response);
        console.log(responseOneitem);

        // setProductList(response.data);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };

    fetchProductList();
  }, []);

  return (
    <div className="photo-app">
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Header />

          <Switch>
            <Redirect exact from="/" to="/photos" />

            <Route path="/photos" component={Photo} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
