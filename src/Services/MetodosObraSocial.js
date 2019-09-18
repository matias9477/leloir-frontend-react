export function titleCase(str) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  return splitStr.join(' '); 
}

export function hasNumbers(t){
  return /\d/.test(t);
}

export const validMail = /\S+@\S+\.\S+/;

export function validateRazonSocial(nom){
    if (nom.length === 0 || nom === ''){
      return false
    }
    return true
  }

  export function validateCuit(nom){
    if (nom.length === 0 || nom === ''){
      return false
    }
    return true
  }

  export const emptyToNull = (v) => {
    if (v === ''){
      return v=null;
    } else {
      return v;
    }
  }