// ./src/Types/index.js
import {arrayOf, bool, number, oneOfType, string, shape} from 'prop-types';
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
    id: number.isRequired,
    nombre: string.isRequired,
    metodologia: string,
    descripcion: string,
    resultado: number,
    protocolo: number
});

