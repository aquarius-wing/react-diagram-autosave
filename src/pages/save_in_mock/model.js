import { fetchMapDetail, saveMapDetail } from './service';

export default {
  namespace: 'map',

  state: {
    detail: null
  },
  effects: {
    *fetchMap({ payload, callback }, { call, put }) {
      console.debug("fetchMap");
      const response = yield call(fetchMapDetail, payload);
      yield put({
        type: 'save',
        payload: {detail: response.result},
      });
      if (callback) callback(response);
    },
    *saveMap({ payload, callback }, { call, put }) {
      const response = yield call(saveMapDetail, payload);
      yield put({
        type: 'save',
        payload: {detail: payload.detail},
      });
      if (callback) callback(response);
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
}
