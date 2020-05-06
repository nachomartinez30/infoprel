import React, { useReducer } from 'react'
// se importan los types
import { AGREGAR_CERTIFICADO_KEY, AGREGAR_REGISTRO } from '../../types'
/* se importan el context y se le pasa el reducer */
import apoyosContext from "./apoyosContext";
import apoyosReducer from './apoyosReducer'

const ApoyosState = (props) => {

    // TODO: borrar variable rfc
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
            solicitud: null,
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjdmODIyNmRjOTRiNzY3MzVjNTU0ZjkwMzcwY2MxOGQwODUyNTRhMTg0NmQxMWY4YmI5YjQxNmVhMTg0ZTMwMmM3MzcyZmQxYjA4MWE1Nzg2In0.eyJhdWQiOiIyIiwianRpIjoiN2Y4MjI2ZGM5NGI3NjczNWM1NTRmOTAzNzBjYzE4ZDA4NTI1NGExODQ2ZDExZjhiYjliNDE2ZWExODRlMzAyYzczNzJmZDFiMDgxYTU3ODYiLCJpYXQiOjE1ODc1NzE5ODEsIm5iZiI6MTU4NzU3MTk4MSwiZXhwIjoxNTg3NjA3OTgxLCJzdWIiOiI1NyIsInNjb3BlcyI6W119.eRSEhuL5oFrY6LuJcnK2KoFAP_p69lCfYQST7ct-fqmFLwzw_KXhIzhW6YSOUvwydv9eWNLXvwl9vCVGOZYCsk4eYYz0wRgzDSwdLVi34baPJI4CB6nUUQRLEVeEvhrTCyP3iLAcJkBf8FhzV1OdH2egjbeyEENiHkCI3uGe_mPC4vUkqXnVOfGFlZakOCBxSD4sVoCjuzFyiY6rGh91GgWbwGQdO6gr7OMU7BKQ8Je-nUaesVGvyB93mkDxVpaDcgdartuSZmu0excTGzIwwxQZOYHlU366geDaTU2SkDMrt1c2H8weT-c96n3oqxj0OGBjnYRvV_qDh9ZfuD4d9NN3qsXG7op5Bnkck_pBTzELT8ieAEcK0uDm_6WlxyrytMJQVGPYBwjEjdwLdPxoTWTIymy3qWxDAhtH111CCidVM3wIL6gr5_3MYecqRLC-nh2ib0JAZmavzsr2zPg_N6gqGBx3jSKI7aKYAg3XUqsqIxegB-_nC1VwsfOfKqwm6ebq5NqP9xSL-3t-ZVM7_ve87t1jmSLjmFplB4YfKABcAaUYeMxb6UPkc1miq4Isj-aT6tC1xAEN2pwyHgyOKn70wGHx228DoLzBUeeQKNbZLUOmFD2Lp9zzBnzuHOjxJ_gz9e5BUZnm39_S0amLt_AuShkHPX8xVmYudNxDabk'
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
            value={
                {
                    checkCertState: {
                        ...state.checkCertState,
                        agregarCertYKey
                    },
                    registros: {
                        ...state.registro,
                        agregarRegistro
                    }
                }
            }
        >
            {props.children}
        </apoyosContext.Provider>
    )
}

export default ApoyosState;