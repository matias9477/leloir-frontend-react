export function convertStyleString(palabra){
    const cuerpo = palabra.slice(1);
    return palabra.charAt(0).toUpperCase() + cuerpo.toLowerCase();
  }

export function fechaAltaDateStamp(alta){
    return alta + "T00:00:00";
}

