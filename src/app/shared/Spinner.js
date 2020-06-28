import React from "react";
import LoadingOverlay from "react-loading-overlay";



function Spinner(props) {
    return (
      <div className={props.loading ? "full-page-loader-wrapper" : ""}>
        <LoadingOverlay
          active={props.loading}
          spinner
          text={props.text || "Loading..."}
          >
          {props.children}
        </LoadingOverlay>
      </div>
    )
}

export default Spinner
