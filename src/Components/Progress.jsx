import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const ProgressBar = styled.div`
  background: #eee;
  width: 100%;
  height: 15px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
`;

const HighLight = styled.div`
  background: #673ab7;
  transition: 1s;
  width: ${(props) => props.width};
  height: 20px;
  border-radius: 10px;
`;

const Dot = styled.div`
  width: 40px;
  height: 40px;
  background: #fff;
  border: 5px solid #673ab7;
  border-radius: 40px;
  margin: 0px 0px 0px -20px;
`;

const Progress = () => {
  const bucket_list = useSelector((state) => state.bucket.list);

  let count = 0;
  bucket_list.map((b) => (b.completed ? count++ : null));

  return (
    <ProgressBar>
      <HighLight width={(count / bucket_list.length) * 100 + "%"} />
      <Dot />
    </ProgressBar>
  );
};

export default Progress;
