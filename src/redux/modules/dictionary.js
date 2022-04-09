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
const CREATE = "dictionary/CREATE";
const UPDATE = "dictionary/UPDATE";
const DELETE = "dictionary/DELETE";
const LOAD = "dictionary/LOAD";
const LOADED = "dictionary/LOADED";

const initialState = {
  is_loaded: false,
  list: [],
};

// Action Creators
export const createDic = (dic) => ({ type: CREATE, dic });

export const updateDic = (dic_index) => ({ type: UPDATE, dic_index });

export const deleteDic = (dic_index) => ({ type: DELETE, dic_index });

export const loadDic = (dic_list) => ({ type: LOAD, dic_list });

export const isLoaded = (loaded) => ({ type: LOADED, loaded });

//middlewares
export const loadDicFB = () => {
  return async (dispatch) => {
    const dic_data = await getDocs(
      query(collection(db, "bucket"), orderBy("createAt"))
    );
    let dic_list = [];
    dic_data.forEach((doc) => {
      dic_list.push({ id: doc.id, ...doc.data() });
    });
    dispatch(loadDic(dic_list));
  };
};

export const addDicFB = (dic) => {
  return (dispatch) => {
    const docRef = addDoc(collection(db, "bucket"), dic);
    const dic_data = { ...dic, id: docRef.id };
    dispatch(createDic(dic_data));
  };
};

export const updateDicFB = (dic_id, text, explanation, example) => {
  return async (dispatch, getState) => {
    const docRef = doc(db, "bucket", dic_id);
    await updateDoc(docRef, { text, explanation, example });
    const dic_list = getState().bucket.list;
    const dic_index = dic_list.findIndex((b) => {
      return b.id === dic_id;
    });
    dispatch(updateDic(dic_index));
  };
};

export const deleteDicFB = (dic_id) => {
  return async (dispatch, getState) => {
    if (!dic_id) return;
    const docRef = doc(db, "bucket", dic_id);
    await deleteDoc(docRef);

    const _dic_list = getState().bucket.list;
    const dic_index = _dic_list.findIndex((b) => {
      return b.id === dic_id;
    });

    dispatch(deleteDic(dic_index));
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD: {
      const list = [...action.dic_list].reverse();
      return { list, is_loaded: true };
    }

    case CREATE: {
      const new_dic_list = [...state.list, action.dic];
      return { ...state, list: new_dic_list };
    }

    case UPDATE: {
      const new_dic_list = state.list.map((l, idx) => {
        if (parseInt(action.dic_index) === idx) {
          return { ...l };
        } else {
          return l;
        }
      });
      return { ...state, list: new_dic_list };
    }

    case DELETE: {
      const new_dic_list = state.list.filter((l, idx) => {
        return parseInt(action.dic_index) !== idx;
      });
      return { ...state, list: new_dic_list };
    }

    case LOADED: {
      return { ...state, isLoaded: action.loaded };
    }

    default:
      return state;
  }
}
