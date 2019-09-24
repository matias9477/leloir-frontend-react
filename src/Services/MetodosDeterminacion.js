export function convertStyleString(palabra){
    const cuerpo = palabra.slice(1);
    return palabra.charAt(0).toUpperCase() + cuerpo.toLowerCase();
  }

  export function fechaAltaDateStamp(alta){
    return alta + "T00:00:00";
  }

  export function validateDescripcionPractica(des){
    if (des.length === 0 || des === ''){
      return false
    }
    return true
  }

  export function validateUnidadBioquimica(uniB){
    if (uniB.length === 0 || uniB=== ''){
      return false
    }
    return true
  }


  export function validateUnidadMedida(uniM){
    if (uniM.length === 0 || uniM === ''){
      return false
    }
    return true
  }

  export function validateCodigoPractica(cod){
    if (cod.length === 0 || cod === ''){
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