
import Authentication from "./utils/auth.js";
import HelperMethod from "./utils/helper.js";

// tạo logo icon khi người dùng đăng nhập thành công trên menu
const renderProfileMenu = function() {
    let profile = JSON.parse(localStorage.getItem("profile"))
    console.log(profile);

    if(!profile) return

    HelperMethod.getEle("profile").innerHTML = `<img style="border-radius: 50%;" width="40px" height="40px" src="${profile.avatar}" alt="...">
    <b style="color: white; text-transform: capitalize;">${profile.full_name}</b>`
}

// vùng logout (region logout) - hoạt động khi người dùng nhấn vào nút logout
let handleLogout = function() {
    localStorage.removeItem("profile");
    Swal.fire({
        position: "top-mid",
        icon: "success",
        title: "Logout successfully",
        showConfirmButton: false,
        timer: 1500
      });
    location.href = "/login"  
};
// vì nó hoạt động khi người dùng ấn nút nên mình cần nối nó với thuộc tính nút button bên html
window.Logout = handleLogout;

//#region ONLOAD : khi bạn chuyển tới trang chủ sẽ phải đăng nhập trước, function dưới đây sẽ chuyển hướng bạn về login nếu chưa đăng nhập từ trước
window.onload = function () {
    let checkLogin = Authentication.checkLogin();

        if(!checkLogin) {
            Swal.fire({
                position: "top-mid",
                icon: "error",
                title: "Bạn không được cho phép (Permission denied)",
                showConfirmButton: false,
                timer: 1500
              });
            window.location.href = "/login"  
        }  else {
            renderProfileMenu()
        }
}

