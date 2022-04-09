import React from "react";
import Router from "./routers/Router";
import { GlobalStyle } from "./styles/GlobalStyle";

const App = () => {
  return (
    <React.Fragment>
      <Router />
      <GlobalStyle />
    </React.Fragment>
  );
};

export default App;
