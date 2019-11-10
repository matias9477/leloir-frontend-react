import axios from "axios";

export function hasNumbers(t){
    return /\d/.test(t);
}

function getEmailAvailability(email){
    axios.get(`/user/checkEmailAvailability`, { params: {'email': email }}).then(resolve => {
        return resolve.data.available
      }, (error) => {
          console.log('Error validacion mail', error.message);
      })
};


export function validateRequiredMail(mail){
    const validMail = /\S+@\S+\.\S+/;
    
    if (mail === '' || mail === null){
      return false
    } else if ( validMail.test(mail) && getEmailAvailability(mail) ) {
      return true
    } else {
      return false
    } 
}

function getUserAvailability(user){
    var aux="";
    axios.get('/user/checkUsernameAvailability', { params: { username: user } }).then(resolve => {
        
        aux = resolve.data.available;
        return aux;

    }, (error) => {
        console.log('Error validacion user', error.message);
    })
};


export function validateRequiredUser(nombre){
    // var us = getUserAvailability(nombre);
    if (nombre === ''){
        return false
    } else if ((hasNumbers(nombre) || (typeof(nombre) === 'string') )){
        return true
    } else {
        return false
    }

}