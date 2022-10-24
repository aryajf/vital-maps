// import React from 'react'
// import ReactDOM from 'react-dom'
// import App from "./App";

// ReactDOM.createRoot(document.getElementById('root')).render(
  //   <React.StrictMode>
  //     <Router>
  //       <App/>
  //     </Router>
  //   </React.StrictMode>
  // )
  
  import React from "react";
  import ReactDOM from "react-dom";
  import {
    BrowserRouter as Router
  } from "react-router-dom";
  
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  rootElement
);
