import React, { useReducer } from 'react'

import apoyosContext from "./apoyosContext";
import apoyosReducer from './apoyosReducer'

const ApoyosState = (props) => {
    const stateInicial = {
        datosDeInicio: {
            certificado: '',
            llave: '',
            rfc: '',
            pass: '',
            cerValido: null
        }
    }

    // dipatch ejecuta las acciones
    const [state, dispatch] = useReducer(apoyosReducer, stateInicial)

    /* funciones para captura de datos y apoyos */

    return (

        <apoyosContext.Provider
            value={{
                cerValido: state.cerValido
            }}
        >
            {props.children}
        </apoyosContext.Provider>
    )
}

export default ApoyosState;