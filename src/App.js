import React, {Suspense, lazy} from "react";
import {BrowserRouter, Route, Switch, NavLink, useLocation} from "react-router-dom";
import './App.scss';

import ErrorBoundary from "./ErrorBoundary/Error-boundary.component";
import { AnimatePresence } from "framer-motion";

import Loader from 'react-loader-spinner'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {store} from './redux/store'
import axios from 'axios'
import {SET_AUTHENTICATED} from './redux/types';

import {logoutUser,getUserData} from "./redux/actions/userActions";
import AuthRoute from "./components/AuthRoute";
import AuthRouteUser from "./components/AuthRouteUser";
const Dashboard = lazy(() => import( "./pages/Dashboard/Dashboard"));
const Profile = lazy(() => import( "./pages/Profile/Profile"));
const Transactions = lazy(() => import("./pages/Transactions/Transactions"))
const SecurityCenter = lazy(() => import('./pages/Security/Security'))
const MySavings = lazy( () => import('./pages/Savings/Savings'))
const Wallets = lazy( () => import('./pages/Wallets/Wallets'))
const AuthPage = lazy(() => import('./pages/Auth/Auth'))
const Home = lazy(() => import('./pages/Home/Home'))
const Save = lazy(() => import('./pages/Save/Save'))
const BuySell = lazy(() => import('./pages/BuySell/BuySell'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound'))


axios.defaults.baseURL = "https://truzact.com/api/v0/php";


const token = localStorage.TRZACTIdToken;
if (token) {
 // const decodedToken = jwtDecode(token);
  //token expires in 1 month  + (30 * 86400 * 1000)

  //store.dispatch({type: SET_AUTHENTICATED});
  //axios.defaults.headers.common['Authorization'] = token;
 // store.dispatch(getUserData(token));
  //store.dispatch(logoutUser());
}else{
//  store.dispatch(logoutUser());
 //window.location.href = '/';
}

function App() {

  return (
      <div>

        <BrowserRouter>


          <ErrorBoundary>
            <AnimatePresence exitBeforeEnter>
            <Switch>
              <Suspense fallback={
                <div className='loader'>


                  <Loader
                      type="Puff"
                      color="#0A0777"
                      height={100}
                      width={100}
                      timeout={3000} //3 secs

                  />
                </div>}>
                {/*
                            mobile header
                            */}


                <div className='contentWrap'>

                  <Route path='/' exact component={Home}/>
                  <Route path='/home' exact component={Home}/>
                  <AuthRoute path="/auth" exact component={AuthPage}/>

                  <AuthRouteUser path="/dashboard" exact component={Dashboard}/>
                  <AuthRouteUser path="/setting" exact component={Profile}/>
                  <AuthRouteUser path="/transactions" exact component={Transactions}/>
                  <AuthRouteUser path="/security" exact component={SecurityCenter}/>
                  <AuthRouteUser path="/savings" exact component={MySavings}/>
                  <AuthRouteUser path="/save" component={Save}/>
                  <AuthRouteUser path="/wallets" exact component={Wallets}/>
                  <AuthRouteUser path="/buysell" exact component={BuySell}/>


                </div>


              {/*  <Route component={NotFound}/>*/}
              </Suspense>

            </Switch>
              </AnimatePresence>
          </ErrorBoundary>
        </BrowserRouter>


      </div>
  );
}
const mapStateToProps = (state) => ({
  user: state.user,

});
App.propTypes = {
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  getUserData: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  logoutUser,
  getUserData
}

export default connect(mapStateToProps, mapActionsToProps)(App);

