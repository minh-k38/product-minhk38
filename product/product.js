import Authentication from "../utils/auth.js"
import HelperMethod from "../utils/helper.js";
import ValidatorForm from "../utils/validate.js";

// project
window.onload = function(){
    let checkLogin = Authentication.checkLogin();

    if(!checkLogin) {
        Swal.fire({
            position: "top-mid",
            icon: "error",
            title: "Bạn không được cho phép (Permission denied)",
            showConfirmButton: false,
            timer: 1500
          });
        location.href = "/login" 
    }

}

// #region create product 

const handleCreateProduct = async (event) => {
    event.preventDefault();
    // b1 dom tới sản phẩm
    let prodName = HelperMethod.getEle("prodName").value;
    let prodDescription = HelperMethod.getEle("prodDescription").value;
    let prodOriginalPrice = HelperMethod.getEle("originalPrice").value * 1;
    let prodReducePrice = HelperMethod.getEle("reducePrice").value * 1;
    let prodQuantity = HelperMethod.getEle("quantity").value * 1;
    let prodImg = HelperMethod.getEle("image").files[0];

    let prodImgUrl = "";

    if(prodImg ){
        await HelperMethod.convertImgToBase64(prodImg).then(Response => {
            prodImgUrl = Response;
        }).catch(err =>{
            console.log(err);
        })
    }
    // #region validate 
    check = true;
    check &= ValidatorForm.checkEmpty(prodName,"errorName","product Name")
    & ValidatorForm.checkEmpty(prodDescription,"errorDescription" , "product Description")
    & ValidatorForm.checkEmpty(prodImgUrl,"errorImage", "Image")
    & ValidatorForm.checkNumber(prodOriginalPrice,"errorOriginalPrice", "product Original Price")
    & ValidatorForm.checkNumber(prodReducePrice,"errorReducePrice" , "product Reduce Price")
    & ValidatorForm.checkNumber(prodQuantity, "errorQuantity", "Quantity")

    if (!check) return;

}
   
window.handleCreateProduct = handleCreateProduct;
