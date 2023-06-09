import React from "react";
import "./LoadingIndicator.css";
import {usePromiseTracker} from "react-promise-tracker";

const LoadingIndicator = () => {
  const {promiseInProgress} = usePromiseTracker();

  return promiseInProgress && <h1 className="center loading">Loading...</h1>;
};

export default LoadingIndicator;
