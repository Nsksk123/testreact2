import { Switch, Route } from "react-router-dom";

import Login from "../login";

import Dashboard from "../dashboard";

import PrivateRoute from "./PrivateRoute";
function Routes(){
    return(
        <Switch>
            <Route exact path={"/"}>
                <Login></Login>
            </Route>
            <PrivateRoute exact path="/dashboard">
                <Dashboard /> 
            </PrivateRoute>
        </Switch>
    )
}

export default Routes;