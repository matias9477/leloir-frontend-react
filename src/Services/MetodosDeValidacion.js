export const emptyToNull = (v) => {
    if (v === '' || v === null){
      return v=null;
    } else if (isFinite(String(v))){
      return v;
    } else {
      return v.toLowerCase()
    }
}

export function hasNumbers(t){
    return /\d/.test(t);
}
  
export const validMail = /\S+@\S+\.\S+/;

export function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
  }