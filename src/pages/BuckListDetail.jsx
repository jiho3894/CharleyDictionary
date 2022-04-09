import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Items from "../Components/Items";
import styled from "styled-components";
import { deleteDicFB, updateDicFB } from "../redux/modules/dictionary";

const Back = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 20px;
  stroke-width: 2px;
  stroke-linecap: round;
  position: absolute;
  right: 0;
  &:hover {
    color: red;
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

const BuckListDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const text = useRef(null);
  const explanation = useRef(null);
  const example = useRef(null);
  const redux_lists = useSelector((state) => state.bucket.list);
  const lists = redux_lists[params.index];
  const [click, setClick] = useState(false);
  const onDelete = () => {
    dispatch(deleteDicFB(lists.id));
    navigate(-1);
  };
  const onUpdate = () => {
    dispatch(
      updateDicFB(
        lists.id,
        text.current.value,
        explanation.current.value,
        example.current.value
      )
    );
    window.location.reload();
  };
  const onClick = () => {
    setClick((prev) => !prev);
  };
  return (
    <React.Fragment>
      <Link to="/">
        <Back>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Back>
      </Link>
      <Items list={lists ? lists : ""} />
      <Button
        style={{ backgroundColor: "red" }}
        variant="contained"
        color="primary"
        onClick={onDelete}
      >
        삭제하기
      </Button>
      {!click && (
        <Button variant="contained" color="secondary" onClick={onClick}>
          수정하기
        </Button>
      )}
      {click ? (
        <React.Fragment>
          <InputBox>
            <InputTitle>단어</InputTitle>
            <Input type="text" defaultValue={lists.text} ref={text} autoFocus />
          </InputBox>
          <InputBox>
            <InputTitle>설명</InputTitle>
            <Input
              type="text"
              defaultValue={lists.explanation}
              ref={explanation}
            />
          </InputBox>
          <InputBox>
            <InputTitle>예시</InputTitle>
            <Input type="text" defaultValue={lists.example} ref={example} />
          </InputBox>
          <Button
            style={{ backgroundColor: "blue" }}
            variant="contained"
            color="secondary"
            onClick={onUpdate}
          >
            수정 완료
          </Button>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

export default BuckListDetail;
