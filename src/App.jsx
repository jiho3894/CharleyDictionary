import React from "react";
import Router from "./routers/Router";
import { GlobalStyle } from "./styles/GlobalStyle";

// 클래스형 컴포넌트는 이렇게 생겼습니다!
const App = () => {
  return (
    <React.Fragment>
      <Router />
      <GlobalStyle />
    </React.Fragment>
  );
};

export default App;
