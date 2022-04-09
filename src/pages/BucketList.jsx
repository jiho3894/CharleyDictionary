import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Items from "../Components/Items";
import { clearBucketFB } from "../redux/modules/bucket";
import { Button } from "@mui/material";

const BucketList = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(7);
  const my_lists = useSelector((state) => state.bucket.list);
  const dispatch = useDispatch();
  const handleScroll = useCallback(() => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;
    if (Math.round(scrollTop + innerHeight) >= scrollHeight) {
      setCounter(counter + 100);
    }
  }, [counter]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [handleScroll]);
  return (
    <ListStyle>
      {my_lists.slice(0, counter).map((list, index) => {
        return (
          <React.Fragment key={index}>
            <ItemStyle completed={list.completed} className="list_item">
              <Items list={list} />
              <Button
                style={{ position: "absolute", top: 0, right: 0 }}
                onClick={() => dispatch(clearBucketFB(my_lists[index].id))}
                variant="contained"
              >
                이해완료
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  navigate(`/detail/${index}`);
                }}
              >
                수정하기
              </Button>
            </ItemStyle>
          </React.Fragment>
        );
      })}
    </ListStyle>
  );
};

const ListStyle = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ItemStyle = styled.div`
  position: relative;
  cursor: pointer;
  padding: 16px;
  margin-bottom: 10px;
  color: ${(props) => (props.completed ? "#fff" : "#333")};
  background-color: ${(props) => (props.completed ? "#01cb1c" : "aliceblue")};
  &:hover {
    background-color: ${(props) => (props.completed ? "#60e349" : "#dddddd")};
  }
`;

export default BucketList;
