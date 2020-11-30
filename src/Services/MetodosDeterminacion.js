export function convertStyleString(palabra){
    const cuerpo = palabra.slice(1);
    return palabra.charAt(0).toUpperCase() + cuerpo.toLowerCase();
  }

export function fechaAltaDateStamp(alta){
    return alta + "T00:00:00";
}

export const getUnidadMedida = (unidad, unidadesMedida) => {
  for(let i=0; i < unidadesMedida.length; i++){
    if (unidad === unidadesMedida[i].unidad)
      return unidadesMedida[i];
  }
}