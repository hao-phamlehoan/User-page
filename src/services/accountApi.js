class accountApi {
    login = (loginBody) => {
        const url = '/account/login';
        return axiosClient.post(url, { loginBody });
    };
    register = (registerBody) => {
        const url = '/account/register';
        return axiosClient.post(url, { registerBody });
    }
}
const accountApi = new accountApi();
export default accountApi;