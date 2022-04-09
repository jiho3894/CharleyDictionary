/* import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore"; */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import Spinner from "../Components/Spinner";
import { loadBucketFB } from "../redux/modules/bucket";
import styled from "styled-components";
import BucketList from "./BucketList";
import BuckListDetail from "./BuckListDetail";
import NotFound from "../Components/Error";
import { Button } from "@mui/material";

function Home() {
  const dispatch = useDispatch();
  const is_loaded = useSelector((state) => state.bucket.is_loaded);
  const onClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    (async () => {
      /* 
      --- data 가져오기 ---
      const query = await getDocs(collection(db, "bucket"));
      console.log(query);
      query.forEach((doc) => {
        console.log(doc.data());
      }); */
      /* 
      --- data 새로 만들기 ---
      await addDoc(collection(db, "bucket"), {
        text: "new",
        completed: false,
      }); */
      /* 
      --- data 수정하기 ---
      const docRef = await doc(db, "bucket", "99o41d7EcqmVai6Pu8Pc");
      updateDoc(docRef, { text: "안녕", completed: true }); */
      /* 
      --- data 삭제하기 ---
      const docRef = doc(db, "bucket", "99o41d7EcqmVai6Pu8Pc");
      await deleteDoc(docRef); */
      dispatch(loadBucketFB());
    })();
  }, [dispatch]);
  return (
    <React.Fragment>
      <Container>
        <Title>MY DICTIONARY</Title>
        {/* <Progress /> */}
        <Line />
        {!is_loaded ? (
          <Spinner />
        ) : (
          <Routes>
            <Route path="/" element={<BucketList />} />
            <Route path="/detail/:index" element={<BuckListDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </Container>
      <Top onClick={onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 11l7-7 7 7M5 19l7-7 7 7"
          />
        </svg>
      </Top>
      <AddBucket>
        <Link to="/inputBucket">
          <Button variant="contained">ADD DICTIONARY</Button>
        </Link>
      </AddBucket>
    </React.Fragment>
  );
}

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

const Top = styled.div`
  position: fixed;
  right: 30px;
  bottom: 30px;
  width: 45px;
  height: 45px;
  border-radius: 100%;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #9c88ff;
  cursor: pointer;
  @media screen and (max-width: 769px) {
    width: 20px;
    height: 20px;
    font-size: 12px;
  }
  &:hover {
    svg {
      transform: translateY(-5px);
      transition: all 0.1s;
    }
  }
`;

const AddBucket = styled.div`
  position: fixed;
  right: 80px;
  bottom: 30px;
`;

export default Home;
