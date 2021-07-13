import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const AuthRoute = ({ component: Component, path: path, authenticated, ...rest }) => (
    <Route {...rest}
        render={(props) =>
            authenticated === true && path === '/auth' ?
                <Redirect to="/dashboard" />

                : <Component {...props} />
        }
    />
);



const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
});



export default connect(mapStateToProps)(AuthRoute);
