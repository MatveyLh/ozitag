import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

interface PrivateRouteProps extends RouteProps {
    component: any;
    rest?: any;
    path: any,
}

const PrivateRoute: React.SFC<PrivateRouteProps> = ({ component: Component, ...rest }: any) => (
    <Route
        {...rest}
        render={(props) =>
            localStorage.getItem('token') ?
                <Component {...props} />
                :
                <Redirect to='/login' />
        }
    />
);

export default PrivateRoute;