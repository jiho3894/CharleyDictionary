import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 80px;
  background-color: silver;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Header = () => {
  return (
    <React.Fragment>
      <Container>
        <Link to="/1week">Charley 사전</Link>
      </Container>
    </React.Fragment>
  );
};

export default Header;
