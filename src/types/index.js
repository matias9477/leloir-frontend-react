// ./src/Types/index.js
import {shape, number, string, oneOf as PropTypes} from 'prop-types';


export const determinacionType = shape({
    determinacionId: number.isRequired,
    nombre: string.isRequired,
    metodologia: string,
    descripcion: string,
    resultado: number,
    protocoloId: number
});

