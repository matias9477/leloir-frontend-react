  
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

  export const getFechaNacimientoConsulta = (date) => {
    date = new Date(date);
    var d = (date.getDate()+1).toString();
    var dd = (d.length === 2) ? d : "0"+d;
    var m = (date.getMonth()+1).toString();
    var mm = (m.length === 2) ? m : "0"+m;     
    return((date.getFullYear()) + '-' + mm + '-' + dd.toString());
  }

  export const verificarExistenciaObraSocial = (os) => {
    if (os === null){
      return null;
    } else{
      return os.razonSocial;
    }
  }

  export const getHumanDate = (date) => {
    date = new Date(date);
    var d = date.getDate().toString();
    var dd = (d.length === 2) ? d : "0"+d;
    var m = (date.getMonth()+1).toString();
    var mm = (m.length === 2) ? m : "0"+m;     
    return((date.getFullYear()) + '-' + mm + '-' + dd.toString());
  }

  export const getIdTipoAnimal = (tipoAnimal, tipos) => {
    for(let i=0; i < tipos.length; i++){
      if (tipoAnimal === tipos[i].nombre)
        return tipos[i].tipoAnimalId;
    }
  }

  export const getIdTipoDoc = (tipoDoc, documentos) => {
    for(let i=0; i < documentos.length; i++){
      if (tipoDoc === documentos[i].nombre)
        return documentos[i].idTipoDocumento;
    }
  }

  export const getIdPais = (nacionalidad, paises) => {
    for(let i=0; i < paises.length; i++){
      if (nacionalidad === paises[i].nombreBonito)
        return paises[i].idPais;
    }
  }

  export const getIso = (nacionalidad, paises) => {
    for(let i=0; i < paises.length; i++){
      if (nacionalidad === paises[i].nombreBonito)
        return paises[i].iso;
    }
  }

  export const getIso3 = (nacionalidad, paises) => {
    for(let i=0; i < paises.length; i++){
      if (nacionalidad === paises[i].nombreBonito)
        return paises[i].iso3;
    }
  }

  export const getNombrePais = (nacionalidad, paises) => {
    for(let i=0; i < paises.length; i++){
      if (nacionalidad === paises[i].nombreBonito)
        return paises[i].nombre;
    }
  }

  export const getCodigoTelefono = (nacionalidad, paises) => {
    for(let i=0; i < paises.length; i++){
      if (nacionalidad === paises[i].nombreBonito)
        return paises[i].codigoTelefono;
    }
  }

  export const getIdObraSocial = (obraSocial, obrasSociales) => {
    for(let i=0; i < obrasSociales.length; i++){
      if (obraSocial === obrasSociales[i].razonSocial)
        return obrasSociales[i].idObraSocial;
    }
  }

  export const getCuitObraSocial = (obraSocial, obrasSociales) => {
    for(let i=0; i < obrasSociales.length; i++){
      if (obraSocial === obrasSociales[i].razonSocial)
        return obrasSociales[i].cuit;
    }
  }

  export const getDomicilioObraSocial = (obraSocial, obrasSociales) => {
    for(let i=0; i < obrasSociales.length; i++){
      if (obraSocial === obrasSociales[i].razonSocial)
        return obrasSociales[i].domicilio;
    }
  }

  export const getTelefonoObraSocial = (obraSocial, obrasSociales) => {
    for(let i=0; i < obrasSociales.length; i++){
      if (obraSocial === obrasSociales[i].razonSocial)
        return obrasSociales[i].telefono;
    }
  }

  export const getEmailObraSocial = (obraSocial, obrasSociales) => {
    for(let i=0; i < obrasSociales.length; i++){
      if (obraSocial === obrasSociales[i].razonSocial)
        return obrasSociales[i].email;
    }
  }

  export const getSexoId = (sexo, sexos) => {
    for(let i=0; i < sexos.length; i++){
      if (sexo === sexos[i].nombre)
        return sexos[i].sexoId;
    }
  }

