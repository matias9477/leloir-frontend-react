export function convertStyleString(palabra){
    const cuerpo = palabra.slice(1);
    return palabra.charAt(0).toUpperCase() + cuerpo.toLowerCase();
  }

  export function fechaAltaDateStamp(alta){
    return alta + "T00:00:00";
  }

  export function validateName(nom){
    if (nom.length === 0 || nom === ''){
      return false
    }
    return true
  }

  export function validateMetodologia(ap){
    if (ap.length === 0 || ap === ''){
      return false
    }
    return true
  }


  export function validateValor(ndoc){
    if (ndoc.length === 0 || ndoc === ''){
      return false
    }
    return true
  }

  export function validateProtocoloId(sex){
    if (sex.length === 0 || sex === ''){
      return false
    }
    return true
  }

  export function validateDescripcion(nac){
    if (nac.length === 0 || nac === ''){
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