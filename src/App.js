import PropTypes from 'prop-types';
import React from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Routes, Route } from "react-router-dom";
import { layoutTypes } from "./constants/layout";
// Import Routes all
import { authProtectedRoutes, publicRoutes } from "./routes";

// Import all middleware
import Authmiddleware from "./routes/route";

// layouts Format
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";

// Import scss
import "./assets/scss/theme.scss";

// Import Firebase Configuration file
import { initFirebaseBackend } from "./helpers/firebase_helper";

import fakeBackend from "./helpers/AuthType/fakeBackend";

// Activating fake backend
fakeBackend();

const firebaseConfig = {
  apiKey: "AIzaSyCp0hAMewAYmHqJPj-XwVYgZxV0a1xLi-0",
  authDomain: "registerandlogin-374b5.firebaseapp.com",
  databaseURL: "https://registerandlogin-374b5.firebaseio.com",
  projectId: "registerandlogin-374b5",
  storageBucket: "registerandlogin-374b5.appspot.com",
  messagingSenderId: "289489818170",
  appId: "1:289489818170:web:a9c295c7531a4f9e311b03",
  measurementId: "G-1PEDJXNMZ7"
};

// init firebase backend
initFirebaseBackend(firebaseConfig);


const getLayout = (layoutType) => {
  let Layout = VerticalLayout;
  switch (layoutType) {
    case layoutTypes.VERTICAL:
      Layout = VerticalLayout;
      break;
    case layoutTypes.HORIZONTAL:
      Layout = HorizontalLayout;
      break;
    default:
      break;
  }
  return Layout;
};

const App = () => {


  const selectLayoutState = (state) => state.Layout;
  const LayoutProperties = createSelector(
    selectLayoutState,
      (layout) => ({
        layoutType: layout.layoutType,
      })
  );

    const {
      layoutType
  } = useSelector(LayoutProperties);

  const Layout = getLayout(layoutType);

  return (
    <React.Fragment>
      <Routes>
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <NonAuthLayout>
                {route.component}
              </NonAuthLayout>
            }
            key={idx}
            exact={true}
          />
        ))}

        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <Authmiddleware>
                <Layout>{route.component}</Layout>
              </Authmiddleware>}
            key={idx}
            exact={true}
          />
        ))}
      </Routes>
    </React.Fragment>
  );
};

App.propTypes = {
  layout: PropTypes.any
};

export default App;