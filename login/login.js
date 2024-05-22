import AccountRequester from "../axios/accountRequester.js";
import HelperMethod from "../utils/helper.js"
import ValidatorForm from "../utils/validate.js";

const handleLogin = async (event) => {
    event.preventDefault();
    let email = HelperMethod.getEle("email").value;
    let password = HelperMethod.getEle("password").value;

    let check = true;
    check &= ValidatorForm.checkEmpty(email,"errorEmail", "Email")
    & ValidatorForm.checkEmpty(password,"errorPassword", "Password")

    if(!check) return;

    try{

        let listAccount = [];

        const res = await AccountRequester.ListAccount() 
        // so sánh email đăng nhập với email đã lưu 
        if(res.status === 200) {
            listAccount = res.data;
            let findUser = listAccount.find(ele => ele.email === email)
            if(!findUser) {
                Swal.fire({
                    position: "top-center",
                    icon: "error",
                    title: "Email của bạn không đúng (Email incorrect)",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  return;
            }
               // kiểm tra password
            if (findUser.password !== password) {
                Swal.fire({
                position: "top-center",
                icon: "error",
                title: "Password của bạn không đúng(password incorrect)",
                showConfirmButton: false,
                timer: 1500
                });
                return;   
            }

            // kiểm tra xem người dùng có check không, nếu có lưu tài khoản lại
            let saveAccount = HelperMethod.getEle("saveAccount").checked;
            if(saveAccount) {
                let accountToSave = {
                    email,
                    password
                }
                localStorage.setItem("account", JSON.stringify(accountToSave))
            }

            // resetform
            HelperMethod.getEle("loginForm").reset();


            // nếu đúng hết lưu xuống localstorage
            localStorage.setItem("profile", JSON.stringify(findUser));
            // thông báo thành công
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Bạn đã đăng nhập thành công (login successfully)",
                showConfirmButton: false,
                timer: 1500
                });
            // chuyển hướng người dùng về lại chủ (khi chuyển hướng thì không cần thông báo thành công)
            location.href = "/" 

        }
     
        

    }catch (err) {
        Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Bạn đã đăng nhập thất bại",
            showConfirmButton: false,
            timer: 1500
          });
    }
};
 window.login = handleLogin;

// khi vào lại trang login lần thứ 2 trở đi sẽ hiện sẵn lại email và pass đã lưu ( lưu lại lần gần nhất)
window.onload = function() {
    let accountLocal = JSON.parse(localStorage.getItem("account"))

    if(accountLocal) {
        HelperMethod.getEle("email").value = accountLocal.email
        HelperMethod.getEle("password").value = accountLocal.password
    }
}