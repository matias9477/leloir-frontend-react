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