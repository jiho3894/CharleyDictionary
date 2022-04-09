import React from "react";
import styled from "styled-components";

const ItemContainer = styled.div`
  width: 100%;
  height: 200px;
`;

const ItemBox = styled.div`
  width: 100%;
  height: 33%;
  margin-bottom: 1px;
`;

const Item = styled.div`
  span {
    font-size: 18px;
    font-weight: 600;
  }
`;

const ItemTitle = styled.p`
  font-size: 8px;
  text-decoration-line: underline;
  margin-bottom: 2px;
`;

const Items = ({ list }) => {
  return (
    <ItemContainer>
      <ItemBox>
        <Item>
          <ItemTitle>단어</ItemTitle>
          <span>{list.text}</span>
        </Item>
      </ItemBox>
      <ItemBox>
        <Item>
          <ItemTitle>설명</ItemTitle>
          <span>{list.explanation}</span>
        </Item>
      </ItemBox>
      <ItemBox>
        <Item>
          <ItemTitle>예시</ItemTitle>
          <span style={{ color: "blue" }}>{list.example}</span>
        </Item>
      </ItemBox>
    </ItemContainer>
  );
};

export default Items;
