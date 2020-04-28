import React from "react";
import ReactDOM from "react-dom";
import "./assets/index.scss";
import App from "./app";
import * as serviceWorker from "./serviceWorker";
import { StoreProvider } from "react-context-global-store";
import store from "./context/store-base";

ReactDOM.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

if (module.hot) {
  module.hot.accept();
}
