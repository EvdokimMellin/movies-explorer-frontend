import React, { useEffect } from 'react';
import { Route, Redirect} from "react-router-dom";

function ProtectedRoute ({component: Component, ...props}) {
    return(
        <Route>
            {() => props.loginState ? <Component {...props} /> : <Redirect to = "/signin" />}
        </Route>
    )
}

export default ProtectedRoute;
