import fa from "@/utils/fa";
export default {

    async token(data = {}) {
        return fa.request({
            url: `/admin/member/token`,
            method: "POST",
            data
        });
    },
    async self(data = {}) {
        return fa.request({
            url: `/admin/member/self`,
            method: "GET",
            data
        });
    },
    async login(data = {}) {

        return fa.request({
            url: `/admin/member/login`,
            method: "POST",
            data
        });
    }
};
