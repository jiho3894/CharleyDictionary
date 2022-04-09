import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 60px;
    font-weight: 600;
    color: coral;
  }
`;

const Header = () => {
  return (
    <React.Fragment>
      <Container>
        <span>Charley 사전</span>
      </Container>
    </React.Fragment>
  );
};

export default Header;
