import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./homepage/homepage";
import Application from "./application/application"
import Band from "./bands/bands";

const Controller = () => {
  const baseUrl = "/api/v1/";
  return (
    <Router>
      <div className="main-container">
        <Route
          exact
          path={["/dashboard", "/"]}
          render={(props) => <Home {...props} baseUrl={baseUrl} />}
        />

        <Route
          exact
          path={["/bands"]}
          render={(props) => <Band {...props} baseUrl={baseUrl} />}
        />   

         <Route
          exact
          path={["/applications"]}
          render={(props) => <Application {...props} baseUrl={baseUrl} />}
        />

      </div>
    </Router>
  );
};

export default Controller;
