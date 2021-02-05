import React, { Component, lazy, Suspense } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.scss";

import ForgotPasswordPage from "./views/Pages/ForgotPassword";
import Login from "./views/Pages/Login/Login";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Containers
const DefaultLayout = lazy(() => import("./containers/DefaultLayout"));

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading()}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />

            <Route
              exact
              path="/forgot-password"
              name="¿Olvidaste tu contraseña?"
              render={(props) => <ForgotPasswordPage {...props} />}
            />

            <Route
              path="/"
              name="Home"
              render={(props) => <DefaultLayout {...props} />}
            />
          </Switch>
        </Suspense>
      </HashRouter>
    );
  }
}

export default App;
