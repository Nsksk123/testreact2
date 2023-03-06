import Cookies from "js-cookie";

import { Route, Redirect } from "react-router-dom";

function PrivateRoute({children, ...rest}){

const token = Cookies.get('token');

return(
    <Route {...rest}>
        {token ? children : <Redirect to={"/"}></Redirect>}
    </Route>
)

}

export default PrivateRoute;