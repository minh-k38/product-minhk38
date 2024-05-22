
import HelperMethod from "../utils/helper.js"
import AccountModel from "../model/account.js";
import ValidatorForm from "../utils/validate.js";
import AccountRequester from "../axios/accountRequester.js";

// b1 : tạo một function sự kiện create
const handleRegister = async (event) => {
    event.preventDefault();
    // b3 : tạo những biến gán khi dom tới để dễ sử dụng ( ngắn gọn hơn)
    let name = HelperMethod.getEle("nameRs").value;
    let phone = HelperMethod.getEle("phoneRs").value;
    let email = HelperMethod.getEle("emailRs").value;
    let password = HelperMethod.getEle("passwordRs").value;
    let avatar = HelperMethod.getEle("avatar").files[0];

    // xử lý hình ảnh avatar 
    let avatarUrl = "";
    // dùng hàm if nếu có avatar mới chạy chương trình xử lý
    if(avatar){
        await HelperMethod.convertImgToBase64(avatar).then(data => {
            avatarUrl = data;
        }).catch (err => {
            console.log(err);
        })

    }
  

    // validate form
    let check = true;
    check &= ValidatorForm.checkEmpty(name,"errorNameRs", "Full Name" )
    & ValidatorForm.checkEmpty(phone, "errorphoneRs", "Phone Number")
    & ValidatorForm.checkEmpty(email, "errorEmailRs", "Email")
    & ValidatorForm.checkEmpty(password, "errorPasswordRs", "password")
    & ValidatorForm.checkEmpty(avatarUrl,"errorAvatarViewer", "Avatar")

    // check validate, if false break function ( ko can lam gi nua)
    if(!check) {
        return
    }

    // tạo đối tượng post về url mockapi
    const account = new AccountModel(name, phone, email, password, avatarUrl )
    
    // call API post tạo tài khoản
    try{
        const res = await AccountRequester.CreatAccount(account)

        // dùng sweetalert để thông báo
        if(res.status == 201) {
            Swal.fire({
                position: "top-mid",
                icon: "success",
                title: "Bạn đã đăng ký thành công",
                showConfirmButton: false,
                timer: 1500
              });
        //   reset form
        HelperMethod.getEle("formRs").reset();

        // và chuyển hướng về trang chủ :
        window.location.href = "/login";

        }  
    } catch (err) {
        Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Bạn đã đăng ký thất bại",
            showConfirmButton: false,
            timer: 1500
          });

        console.log(err);
    }
}
// b2 : để xài sự kiện b1, cần khởi tạo nó cho đối tượng window biết với cú pháp thêm obj cho biến
// VD : let a = {} ; a.newvalue = "phần tử được thêm" ==> window cũng vậy, thêm thì : window.<tên phần tử muốn thêm> = <phần tử muốn thêm>
window.dangKy = handleRegister  