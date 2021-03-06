  

  export function fechaAltaDateStamp(alta){
    return alta + "T00:00:00";
  }

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

  export const getFechaNacimiento = (fechaNacimiento) => {
    var año = fechaNacimiento.getFullYear();
    var mes = (fechaNacimiento.getMonth()+1);
    var dia = fechaNacimiento.getDate();
    if (mes < 10){
      mes = "0" + mes;
    } 
    if (dia < 10){
      dia = "0" + dia;
    } 
    return año + "-" + mes + "-" + dia +
    "T00:00:00";
  }

  export const getFechaDomicilio = (fecha) => {
    if (typeof fecha === 'string'){
      return fecha
    }
    var año = fecha.getFullYear();
    var mes = (fecha.getMonth()+1);
    var dia = fecha.getDate();

    var hora = fecha.getHours();
    var min = fecha.getMinutes();

    if (mes < 10){
      mes = "0" + mes;
    } 
    if (dia < 10){
      dia = "0" + dia;
    } 
    if (hora < 10){
      hora = "0" + hora;
    } 
    if (min < 10){
      min = "0" + min;
    } 

    return año + "-" + mes + "-" + dia + "T" + hora + ":" + min + ":00";
  }

  export const getFechaNacimientoConsulta = (date) => {
    date = new Date(date);
    var d = (date.getDate()+1).toString();
    var dd = (d.length === 2) ? d : "0"+d;
    var m = (date.getMonth()+1).toString();
    var mm = (m.length === 2) ? m : "0"+m;     
    return((date.getFullYear()) + '-' + mm + '-' + dd.toString());
  }

  export const getHumanDate = (date) => {
    if (date===undefined){
      return ''
    } else {
      return date.slice(0, 10)
    }
  }

  export const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}

