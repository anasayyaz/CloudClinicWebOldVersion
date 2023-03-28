import "react-app-polyfill/ie11"; // For IE 11 support
import "react-app-polyfill/stable";
import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { ClearBrowserCacheBoundary } from 'react-clear-browser-cache';
import * as serviceWorker from "./serviceWorker";
import { icons } from "./assets/icons";
import { Provider } from "react-redux";
import { store } from "./store/index.js";
import TranslationContext from "./context/translation";
import { useTranslation } from "./hooks/useTranslation";
// require("jquery");
React.icons = icons;

const Index = () => {
  const translation = useTranslation();

  return (
    <Provider store={store}>
      <TranslationContext.Provider value={translation}>
        <App />
      </TranslationContext.Provider>
    </Provider>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
