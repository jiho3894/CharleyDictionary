import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { addDicFB } from "../redux/modules/dictionary";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  max-width: 350px;
  background-color: #81ecec;
  position: relative;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Title = styled.h1`
  color: black;
`;

const Line = styled.hr`
  margin: 8px 0px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 350px;
  height: 260px;
  display: flex;
  & > * {
    padding: 5px;
  }
  & input {
    border: 1px solid #888;
    width: 100%;
    margin-right: 10px;
  }

  & input {
    outline: none;
    border: 1px solid #a673ff;
    border-radius: 5px;
  }
`;

const InputBox = styled.div`
  width: 100%;
  height: 70px;
  background-color: white;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const InputTitle = styled.p`
  font-size: 8px;
  text-decoration-line: underline;
  margin-bottom: 6px;
`;

const Input = styled.input`
  height: 30px;
`;

const AddBtn = styled.button`
  width: 100%;
  background-color: #a673ff;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #9155f9;
  }
`;

const InputBucket = () => {
  const text = useRef(null);
  const explanation = useRef(null);
  const example = useRef(null);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const addBucketList = () => {
    dispatch(
      addDicFB({
        text: text.current.value,
        explanation: explanation.current.value,
        example: example.current.value,
        completed: false,
        createAt: Date.now(),
      })
    );
    navigation(-1);
  };
  return (
    <React.Fragment>
      <Container>
        <Title>ADD DICTIONARY</Title>
        <Line />
        <InputContainer>
          <InputBox>
            <InputTitle>단어</InputTitle>
            <Input type="text" ref={text} />
          </InputBox>
          <InputBox>
            <InputTitle>설명</InputTitle>
            <Input type="text" ref={explanation} />
          </InputBox>
          <InputBox>
            <InputTitle>예시</InputTitle>
            <Input type="text" ref={example} />
          </InputBox>
          <AddBtn onClick={addBucketList}>추가하기</AddBtn>
        </InputContainer>
      </Container>
    </React.Fragment>
  );
};

export default InputBucket;
