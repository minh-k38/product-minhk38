
import SEVER_URL from "./coreAxios.js";

class AccountRequester {
     static endpoint = "/accounts";

     static CreatAccount = async function(payload) {
        return await axios({
            url : SEVER_URL + this.endpoint,
            method : "POST",
            data : payload,
        })
     }  
     
    //  lấy danh sách account để login
     static ListAccount = async function() {
        return axios({
            url : SEVER_URL + this.endpoint,
            method : "GET",
        })
     
        
     }
}

export default AccountRequester;