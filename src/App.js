import React from "react";

import { Toaster } from "react-hot-toast";

import Routes from "./route/route";
function App() {

  return(
    <React.Fragment>
      <Toaster></Toaster>
      <Routes></Routes>
    </React.Fragment>
  )

}

export default App;
