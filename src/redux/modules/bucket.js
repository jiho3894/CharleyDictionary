// widgets.js
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
// Actions
const CREATE = "bucket/CREATE";
const UPDATE = "bucket/UPDATE";
const DELETE = "bucket/DELETE";
const LOAD = "bucket/LOAD";
const LOADED = "bucket/LOADED";

const initialState = {
  is_loaded: false,
  list: [],
};

// Action Creators
export function createBucket(bucket) {
  return { type: CREATE, bucket: bucket };
}

export function updateBucket(bucket_index) {
  return { type: UPDATE, bucket_index };
}

export function deleteBucket(bucket_index) {
  return { type: DELETE, bucket_index };
}

export function loadBucket(bucket_list) {
  return { type: LOAD, bucket_list };
}

export function isLoaded(loaded) {
  return { type: LOADED, loaded };
}

//middlewares
export const loadBucketFB = () => {
  return async (dispatch) => {
    const bucket_data = await getDocs(
      query(collection(db, "bucket"), orderBy("createAt"))
    );
    let bucket_list = [];
    bucket_data.forEach((doc) => {
      bucket_list.push({ id: doc.id, ...doc.data() });
    });
    dispatch(loadBucket(bucket_list));
  };
};

export const addBucketFB = (bucket) => {
  return async (dispatch) => {
    dispatch(isLoaded(false));
    const docRef = await addDoc(collection(db, "bucket"), bucket);
    const bucket_data = { id: docRef.id, ...bucket };
    dispatch(createBucket(bucket_data));
  };
};

export const updateBucketFB = (bucket_id) => {
  return async (dispatch, getState) => {
    const docRef = doc(db, "bucket", bucket_id);
    await updateDoc(docRef, { completed: true });
    const bucket_list = getState().bucket.list;
    const bucket_index = bucket_list.findIndex((b) => {
      return b.id === bucket_id;
    });
    dispatch(updateBucket(bucket_index));
  };
};

export const deleteBucketFB = (bucket_id) => {
  return async function (dispatch, getState) {
    if (!bucket_id) {
      return;
    }
    const docRef = doc(db, "bucket", bucket_id);
    await deleteDoc(docRef);

    const _bucket_list = getState().bucket.list;
    const bucket_index = _bucket_list.findIndex((b) => {
      return b.id === bucket_id;
    });

    dispatch(deleteBucket(bucket_index));
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD: {
      return { list: action.bucket_list, is_loaded: true };
    }
    case CREATE: {
      const new_bucket_list = [...state.list, action.bucket];
      return { ...state, list: new_bucket_list };
    }

    case UPDATE: {
      const new_bucket_list = state.list.map((l, idx) => {
        if (parseInt(action.bucket_index) === idx) {
          return { ...l, completed: true };
        } else {
          return l;
        }
      });
      console.log({ list: new_bucket_list });
      return { ...state, list: new_bucket_list };
    }

    case DELETE: {
      const new_bucket_list = state.list.filter((l, idx) => {
        return parseInt(action.bucket_index) !== idx;
      });

      return { ...state, list: new_bucket_list };
    }

    case LOADED: {
      console.log(action.loaded);
      return { ...state, isLoaded: action.loaded };
    }
    default:
      return state;
  }
}
