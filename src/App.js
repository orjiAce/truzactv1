import React, {Suspense, lazy} from "react";
import {BrowserRouter, Route, Switch, NavLink, useLocation} from "react-router-dom";
import './App.scss';

import ErrorBoundary from "./ErrorBoundary/Error-boundary.component";
import { AnimatePresence } from "framer-motion";

import Loader from 'react-loader-spinner'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'


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
const DepositPage = lazy(() => import('./pages/Deposit/Deposit'))
const AddBank = lazy(() => import('./pages/Add Bank/AddBank'))


axios.defaults.baseURL = "https://truzact.com/api/v0/php";






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
                      width={100}//3 secs

                  />
                </div>}>
                {/*
                            mobile header
                            */}


                <div className='contentWrap'>

                  <Route path='/' exact component={Home}/>
                  <Route path='/home' exact component={Home}/>
                  <Route path="/auth" exact component={AuthPage}/>

                  <AuthRouteUser path="/dashboard" exact component={Dashboard}/>
                  <AuthRouteUser path="/setting" exact component={Profile}/>
                  <AuthRouteUser path="/transactions" exact component={Transactions}/>
                  <AuthRouteUser path="/security" exact component={SecurityCenter}/>
                  <AuthRouteUser path="/savings" exact component={MySavings}/>
                  <AuthRouteUser path="/save" component={Save}/>
                  <AuthRouteUser path="/wallets" exact component={Wallets}/>
                  <AuthRouteUser path="/buysell" exact component={BuySell}/>
                  <AuthRouteUser path="/deposit" exact component={DepositPage}/>
                  <AuthRouteUser path="/addbank" exact component={AddBank}/>



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

