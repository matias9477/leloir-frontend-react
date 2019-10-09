// ./src/Types/index.js
import {arrayOf, bool, number, oneOfType, string, shape, oneOf} from 'prop-types';
import {any} from "expect";


export const personaType = {
    id: number,
    nombre: string,
    apellido: string,
    tipoDocumento: string,
    nroDocumento: string,
    fechaNacimiento: string,
    fechaAlta: string,
    sexo: string,
    nacionalidad: string,
    obraSocial: string,
    telefono: any,
    mail: any,
    historial: any,
    bitAlta: bool
};

export const institucionType = {
    id: number,
    fechaAlta: string,
    nombre: string,
    direccion: any,
    telefono: number,
    mail: any,
    historial: any,
    fax: any,
    bitAlta: bool
};

export const animalType = {
    id: number,
    fechaAlta: string,
    nombre: string,
    tipoAnimal: string,
    propietario: string,
    telefono: number,
    mail: any,
    historial: any,
    bitAlta: bool
};

export const pacientesArrayType = {
    pacientes: arrayOf(oneOfType([
        personaType,
        animalType,
        institucionType
    ]))
};

export const determinacionType = shape({
    codigoPractica: number.isRequired,
    descripcionPractica: string.isRequired,
    unidadBioquimica: number,
    unidadMedida: string,
    bitAlta: bool
});

export const empleadoTypes = {
    apellido: string,
    bitAlta: bool,
    fechaAlta: string,
    fechaNacimiento: string,
    mail: string,
    nacionalidad: shape({
        codigoTelefono: number,
        idPais: number,
        iso: string,
        iso3: string,
        nombre: string,
        nombreBonito: string
    }),
    nombre: string,
    nroDocumento: string,
    rolId: number,
    sexo: shape({
        nombre: string,
        sexoId: number
    }),
    telefono: number,
    tipoDocumento: shape({
        idTipoDocumento: number,
        nombre: string
    }),
    usuarioId: number
};


export const signUpRequestType = {
    username: string.isRequired,
    email: string.isRequired,
    password: string.isRequired,
    nombreRol: oneOf(['SECRETARIA','TECNICO_LABORATORIO','BIOQUIMICO','ADMIN']),
    empleado: empleadoTypes
};

