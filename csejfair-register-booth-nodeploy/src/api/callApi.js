import axiosClient from "./axiosClient";

const callApi = {
    getUser: (id) => {
        const url = `/business/byId/${id}`;
        return axiosClient.get(url);
    },
    getBooth: (id) => {
        const url = `/register/byIdbusiness/${id}`;
        return axiosClient.get(url);
    },
    getBoothMap: (params) => {
        const url = '/booth/all';
        return axiosClient.get(url, {params});
    },
    putInformation: (params) => {
        const url = '/business/update/';
        const res = axiosClient.put(url, params, {});
        console.log(res)
    },
    getID: () => {
        const url = '/register/maxid';
        return axiosClient.get(url);
    },
    putRegister: (params) => {
        const url = '/register/add';
        axiosClient.post(url, params, {});
    },
    putPassword: (params) => {
        const url = '/business/changepass/';
        axiosClient.put(url, params, {});
    },
    putAvatar: (params) =>{
        const url = '';
        axiosClient.put(url, params, {})
    }
}
export default callApi;