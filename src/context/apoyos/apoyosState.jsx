import React, { useReducer } from 'react'
// se importan los types
import {
    AGREGAR_CERTIFICADO_KEY,
    AGREGAR_REGISTRO
} from '../../types'
/* se importan el context y se le pasa el reducer */
import apoyosContext from "./apoyosContext";
import apoyosReducer from './apoyosReducer'

const ApoyosState = (props) => {

    const stateInicial = {
        checkCertState: {
            certificado: '',
            llave: '',
            rfc: (process.env.REACT_APP_RFC) ? process.env.REACT_APP_RFC : '',
            pass: '',
            cerValido: null,
        },
        registro: {
            registro_id: null,
            persona_fisica: null,
            persona_moral: null,
            representante_legal: null,
            solicitante: null,
            comisariados: null,
            notificaciones: null,
            domicilio_geografico: null,
            predios: null,
            solicitud: null
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

    const agregarRegistro = registro => {
        dispatch({
            tipo: AGREGAR_REGISTRO,
            payload: registro
        })
    }


    return (
        <apoyosContext.Provider
            // dota al provider de el state y los metodos para agregar a este los campos necesarios
            value={{
                checkCertState: {
                    ...state.checkCertState,
                    agregarCertYKey
                },
                registros: {
                    ...state.registro
                }
            }}
        >
            {props.children}
        </apoyosContext.Provider>
    )
}

export default ApoyosState;