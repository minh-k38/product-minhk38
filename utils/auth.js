
// auth là viết tắt của Authentication ( là quá trình xác nhận thông tin đăng nhập)
// cũng có một định nghĩa tương tự, đó là Authorization

class Authentication {
    static checkLogin() {
        let data =  localStorage.getItem("profile")
        if(!data) {
            return false;
        } else {
            return true;
        }
    }
}

export default Authentication;
