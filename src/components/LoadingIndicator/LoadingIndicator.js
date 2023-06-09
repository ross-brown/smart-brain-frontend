import React from "react";
import "./LoadingIndicator.css";
import {usePromiseTracker} from "react-promise-tracker";
import {RotatingLines} from "react-loader-spinner";

const LoadingIndicator = () => {
  const {promiseInProgress} = usePromiseTracker();

  return (
    promiseInProgress && (
      <div className="loading">
        <RotatingLines strokeColor="black" width="80" />
      </div>
    )
  );
};

export default LoadingIndicator;
