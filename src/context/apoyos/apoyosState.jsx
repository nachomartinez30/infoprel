import React, { useReducer } from 'react'

// se importan los types
import {
    REVISAR_FIRMA_DIGITAL,
    AGREGAR_CERTIFICADO_KEY
} from '../../types'
/* se importan el context y se le pasa el reducer */
import apoyosContext from "./apoyosContext";
import apoyosReducer from './apoyosReducer'

const ApoyosState = (props) => {
    const stateInicial = {
        checkCertState: {
            certificado: '',
            llave: '',
            rfc: '',
            pass: '',
            cerValido: null
        }
    }

    // dipatch ejecuta las acciones
    const [state, dispatch] = useReducer(apoyosReducer, stateInicial)



    const agregarCertYKey = certificado => {
        dispatch({
            tipo: AGREGAR_CERTIFICADO_KEY,
            payload: certificado
        })
    }


    return (

        <apoyosContext.Provider
            value={{
                checkCertState: {
                    ...state.checkCertState,
                    agregarCertYKey
                },

            }}
        >
            {props.children}
        </apoyosContext.Provider>
    )
}

export default ApoyosState;