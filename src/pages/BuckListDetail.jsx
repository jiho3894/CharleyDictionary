import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBucketFB, updateBucketFB } from "../redux/modules/bucket";
import Button from "@mui/material/Button";

const BuckListDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const redux_lists = useSelector((state) => state.bucket.list);
  const onDelete = () => {
    navigate(-1);
    dispatch(deleteBucketFB(redux_lists[params.index].id));
  };
  const onUpdate = () => {
    navigate(-1);
    dispatch(updateBucketFB(redux_lists[params.index].id));
  };
  return (
    <React.Fragment>
      <h1>{redux_lists[params.index] ? redux_lists[params.index].text : ""}</h1>
      <Button variant="outlined" color="primary" onClick={onDelete}>
        삭제하기
      </Button>
      <Button variant="outlined" color="secondary" onClick={onUpdate}>
        완료하기
      </Button>
    </React.Fragment>
  );
};

export default BuckListDetail;
