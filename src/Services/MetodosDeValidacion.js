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

export function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' ');
  }

export function nullTo(nro){
    if (nro != null){
        return nro
    }
    else {
        return '-'
    }
}

export function validateRequiredCombos(valor){
  if (valor === null || valor.length === 0 || valor === ''){
      return false
  }
  return true
}

export function validateNombre(nombre){
  if (nombre === '' ||  hasNumbers(nombre)){
    return false
  } else {
    return true
  }
}

export function validateRequiredStringNum(nombre){
  if (nombre === ''){
    return false
  } else if (hasNumbers(nombre) || (typeof(nombre) === 'string')){
    return true
  } else {
    return false
  }
}

export function validateOnlyNumbers(telefono){
  if (telefono === '' || telefono === null){
    return true
  } else if (isFinite(String(telefono))){
    return true
  } else {
    return false
  }
}

export function validateOnlyNumbersRequired(valor){
  if (valor === '' || valor === null){
    return false
  } else if (isFinite(String(valor))){
    return true
  } else {
    return false
  }
}

export function validateMail(mail){
  const validMail = /\S+@\S+\.\S+/;
  
  if (mail === '' || mail === null){
    return true
  } else if ( validMail.test(mail) ) {
    return true
  } else {
    return false
  } 
}

export function validateNroDocumento(nroDoc, tipoDoc){
  if (nroDoc === ''){
    return false
  } else if (tipoDoc === 'Documento Nacional de Identidad' && isFinite(String(nroDoc))){
    return true
  } else if (tipoDoc === 'Documento Nacional de Identidad' && !isFinite(String(nroDoc))){
    return false
  } else if (tipoDoc === 'Pasaporte' && hasNumbers(nroDoc)){
    return true
  }
}

export function validateFechaNacimiento(fechaNacimiento) {
  if (fechaNacimiento.length === 0 || fechaNacimiento === ''){
    return false
  } else{
    return true
  }
}

export function checkAtributo(atributo){
  if(atributo !== undefined){
      return atributo;
  } 
  else{
      return '';
  }
}
