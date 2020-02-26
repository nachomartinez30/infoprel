import { REVISAR_FIRMA_DIGITAL, AGREGAR_CERTIFICADO_KEY } from '../../types'


export default (estado, accion) => {
    /* toma un state y decide que accion le corresponde */
    switch (accion.tipo) {
        case AGREGAR_CERTIFICADO_KEY:
            return {
                ...estado,
                checkCertState: accion.payload
            }
        default:
            return estado;
    }
}