
export function hasNumbers(t){
    return /\d/.test(t);
}

export function validateRequiredMail(mail){
    const validMail = /\S+@\S+\.\S+/;
    
    if (mail === '' || mail === null){
      return false
    } else if ( validMail.test(mail)) {
      return true
    } else {
      return false
    } 
}

export function validateRequiredUser(nombre){
    if (nombre === ''){
        return false
    } else if ((hasNumbers(nombre) || (typeof(nombre) === 'string') )){
        return true
    } else {
        return false
    }

}