export const getCurrentDate = () =>{
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    if (month < 10) {
        month = "0" + month;
    }
    if (date < 10){
        date = "0" + date;
    }
    return year + '-' + month + '-' + date + "T00:00:00";
}

export function validateDescrip(nom){
    if (nom.length === 0 || nom === ''){
        return false
    }
    return true
}

export function validateFecha(fnac){
    if (fnac === null || fnac.length === 0 || fnac === ''){
        return false
    }
    return true
}