
    const urlDocs = "/tipos_documento/all";
    const urlObrasSoc = "/obras_sociales/all";
    const urlPaises = "/paises/all";
    const urlSexos = "/sexo/all";
    var documentos= [];
    var obrasSociales = [];
    var paises = [];
    var sexos = [];

    export const fetchDocumentos = () =>{
        fetch(urlDocs).then ( resolve => {
            if(resolve.ok) { 
                return resolve.json();
            } else {
                throw Error(resolve.statusText);
            }
        }).then(tipos => {
            documentos = tipos;
        })
        return documentos;
    }
    
    export const fetchObrasSociales = () =>{
        fetch(urlObrasSoc).then ( resolve => {
            if(resolve.ok) { 
                return resolve.json();
            } else {
                throw Error(resolve.statusText);
            }
        }).then(obrasSoc => {
            obrasSociales = obrasSoc;
        })
        return obrasSociales;
    }

    export const fetchPaises = () =>{
        fetch(urlPaises).then ( resolve => {
            if(resolve.ok) { 
                return resolve.json();
            } else {
                throw Error(resolve.statusText);
            }
        }).then(pais => {
            paises = pais;
        })
        return paises;
    }

    export const fetchSexos = () =>{
        fetch(urlSexos).then ( resolve => {
            if(resolve.ok) { 
                return resolve.json();
            } else {
                throw Error(resolve.statusText);
            }
        }).then(sexo => {
            sexos = sexo;
        })
        return sexos;
    }


  