import { routerRedux } from "dva/router";
import { stringify } from "qs";
import { fakeAccountLogin } from "@/services/api";
import { setAuthority } from "@/utils/authority";
import { getPageQuery } from "@/utils/utils";
import { reloadAuthorized } from "@/utils/authorized";

export default {
    namespace: "login",

    state: {
        status: undefined
    },

    effects: {
        * login({ payload, callback }, { call, put }) {
            const response = yield call(fakeAccountLogin, payload);
            yield put({
                type: "changeLoginStatus",
                payload: response
            });
            // Login successfully
            if (response.status === "ok") {
                reloadAuthorized();
                const urlParams = new URL(window.location.href);
                const params = getPageQuery();
                let { redirect } = params;
                if (redirect) {
                    const redirectUrlParams = new URL(redirect);
                    if (redirectUrlParams.origin === urlParams.origin) {
                        redirect = redirect.substr(urlParams.origin.length);
                        if (redirect.match(/^\/.*#/)) {
                            redirect = redirect.substr(redirect.indexOf("#") + 1);
                        }
                    } else {
                        window.location.href = redirect;
                        return;
                    }
                }
                yield put(routerRedux.replace(redirect || "/"));
            }
        },

    },

    reducers: {
        changeLoginStatus(state, { payload, callback }) {
            setAuthority(payload.currentAuthority);
            return {
                ...state,
                status: payload.status,
                type: payload.type
            };
        }
    }
};
