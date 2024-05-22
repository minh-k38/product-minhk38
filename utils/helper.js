
 class HelperMethod {
    static getEle = function(id) {
        return document.getElementById(id)
    }
// xử lý hình ảnh
    static convertImgToBase64 = (file) => {
        // tạo 1 new method promise = 1 biến result ( kết quả)
        return new Promise((resolve, reject) =>{
            // tạo đối tượng đọc file
            let reader = new FileReader();
            reader.readAsDataURL(file);
            // lấy kết quả sau khi đọc file
            reader.onload = () => {
                resolve(reader.result)
            }
            // nếu thất bại khi đọc
            reader.onerror = (err) => {
                reject(err)
            }
        })
    }
}

export default HelperMethod

