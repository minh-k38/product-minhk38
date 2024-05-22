
// b4 : tạo OPP :
export default class AccountModel {
    // có thể bỏ qua bước định nghĩa do ES6 có thể tự hiểu
    constructor(name, phone, email, password, avatar) {
        this.full_name = name;
        this.phone_number = phone;
        this.email = email;
        this.password = password;
        this.avatar - avatar;
    }
}