import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import InputBucket from "../pages/InputBucket";
import Header from "./Header";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/inputBucket" element={<InputBucket />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
