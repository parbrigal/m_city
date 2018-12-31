import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoutes = ({ user, component: Comp, ...remain }) => {
  return (
    <Route
      {...remain}
      component={props =>
        remain.restricted ? (
          user ? (
            <Redirect to="/dashboard" />
          ) : (
            <Comp {...props} user={user} />
          )
        ) : (
          <Comp {...props} user={user} />
        )
      }
    />
  );
};

export default PublicRoutes;
