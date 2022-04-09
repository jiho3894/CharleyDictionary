import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Route, Routes } from "react-router-dom";
import Spinner from "../Components/Spinner";
import { addBucketFB, loadBucketFB } from "../redux/modules/bucket";
import styled from "styled-components";
import BucketList from "./BucketList";
import BuckListDetail from "./BuckListDetail";
import NotFound from "../Components/Error";

function Home() {
  const text = useRef(null);
  const dispatch = useDispatch();
  const is_loaded = useSelector((state) => state.bucket.is_loaded);
  console.log(is_loaded);
  const addBucketList = () => {
    dispatch(
      addBucketFB({
        text: text.current.value,
        completed: false,
        createAt: Date.now(),
      })
    );
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
  }, []);
  return (
    <React.Fragment>
      <Container>
        <Title>내 버킷리스트</Title>
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
      <Input>
        <input type="text" ref={text} />
        <button onClick={addBucketList}>추가하기</button>
      </Input>
    </React.Fragment>
  );
}

const Input = styled.div`
  max-width: 350px;
  min-height: 10vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
  display: flex;
  & > * {
    padding: 5px;
  }
  & input {
    border: 1px solid #888;
    width: 70%;
    margin-right: 10px;
  }

  & input:focus {
    outline: none;
    border: 1px solid #a673ff;
  }

  & button {
    width: 25%;
    color: #fff;
    border: #a673ff;
    background: #a673ff;
  }
`;

const Container = styled.div`
  max-width: 350px;
  min-height: 60vh;
  background-color: #fff;
  position: relative;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Title = styled.h1`
  color: slateblue;
  text-align: center;
`;

const Line = styled.hr`
  margin: 16px 0px;
  border: 1px dotted #ddd;
`;

export default Home;
