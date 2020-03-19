import { AGREGAR_CATALOGOS } from "../../types";

export default (estado, accion) => {
    /* toma un state y decide que accion le corresponde */
    switch (accion.tipo) {
        case AGREGAR_CATALOGOS:
            return {
                ...estado,
                catalogos: accion.payload
            }
        default:
            return estado;
    }
}