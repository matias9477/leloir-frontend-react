// ./src/Types/index.js
import {number, shape, string,bool} from 'prop-types';


export const determinacionType = shape({
    codigoPráctica: number.isRequired,
    descripcionPractica: string.isRequired,
    unidadBioquimica: number,
    unidadMedida: string,
    bitAlta: bool
});
