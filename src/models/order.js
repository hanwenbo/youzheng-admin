import order from "@/services/order";

export default {
    namespace: "order",
    state: {
        list: {},
        info: {},
        setSend: {},
        setOrderExpires: {}
    },
    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(order.list, payload);
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(order.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        },

    },
    reducers: {
        _list(state, action) {
            return {
                ...state,
                list: action.payload
            };
        },
        _info(state, action) {
            return {
                ...state,
                info: action.payload
            };
        },

    }
};
