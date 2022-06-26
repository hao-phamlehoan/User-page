import axiosClient from "./axiosClient";

const callApi = {
    getUser: (id) => {
        const url = `/business/byId/${id}`;
        return axiosClient.get(url);
    },
    getBoothMap: (params) => {
        const url = '/booth/all';
        return axiosClient.get(url, {params});
    },
    putInformation: (params) => {
        const url = '/business/update/';
        axiosClient.put(url, params, {});
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
        const url = '';
        axiosClient.put(url, params, {});
    },
    putAvatar: (params) =>{
        const url = '';
        axiosClient.put(url, params, {})
    }
}
export default callApi;