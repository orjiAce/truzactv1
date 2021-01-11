import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {store, persistor} from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

// 1. import `ChakraProvider` component
import { ChakraProvider,extendTheme  } from "@chakra-ui/react"


// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
    colors: {
        brand: {
            100: "#00068A",
            500: "#0A0777",
            // ...
            900: "#090909",
        },
    },
})

ReactDOM.render(
  <React.StrictMode>

          <PersistGate loading={null} persistor={persistor}>
              <Provider store={store}>
              <ChakraProvider theme={theme}>
          <App />
              </ChakraProvider>
              </Provider>
          </PersistGate>


  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
