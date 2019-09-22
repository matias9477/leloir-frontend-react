// ./src/Types/index.js
import {number, shape, string} from 'prop-types';


export const determinacionType = shape({
    id: number.isRequired,
    nombre: string.isRequired,
    metodologia: string,
    descripcion: string,
    resultado: number,
    protocolo: number
});
