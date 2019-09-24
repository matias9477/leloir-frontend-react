// ./src/Types/index.js
import {number, shape, string} from 'prop-types';


export const determinacionType = shape({
    codigoPractica: number.isRequired,
    descripcionPractica: string.isRequired,
    unidadBioquimica: number,
    unidadMedida: string,
});
