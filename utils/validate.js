
import HelperMethod from "./helper.js"
export default class ValidatorForm {
    static checkEmpty = (value, spanId, fieldName) => {
        if(value.length <= 0) {
            HelperMethod.getEle(spanId).innerHTML = `${fieldName} is required.`;
            return false;
        }
        HelperMethod.getEle(spanId).innerHTML = ``;
        return true;
    }

    static checkNumber = (value, spanId, name) => {
        if(typeof value !== number ) {
            HelperMethod.getEle(spanId).innerHTML = `${name} is not a number.`;
            return false;
        } else {
            if (value <=0) {
                HelperMethod.getEle(spanId).innerHTML = `${name} must be biger than 0 .`;
            }
            HelperMethod.getEle(spanId).innerHTML = ``;
            return true;
        }
    }
}