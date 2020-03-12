import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import apoyosContext from "./../context/apoyos/apoyosContext";
/* COMPONENTES PROPIOS */
import DatosGenerales from "../components/DatosGenerales";
import InfoPersonaFisica from "../components/InfoPersonaFisica";
import InfoPersonaMoral from "../components/InfoPersonaMoral";
import LineaDivision from '../singles/LineaDivision';


const Generales = () => {
    const apoyoContext = useContext(apoyosContext)
    const { cerValido, rfc } = apoyoContext.checkCertState;

    /* 
     * Captura en las keys del JSON los nombres de los inputs, y sus respectivos valores
     * debe ser pasada como propiedad del componente
     * ================================= ver componente <DatosGenerales/> ===============
     */
    const [infoGeneral, setInfoGeneral] = useState({
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
    })

    return (
        <React.Fragment>
            {!rfc && <Redirect to='/' />}
            <h1>Datos génerales</h1>

            {/* =============================================================================== */}
            <LineaDivision />
            {/* =============================================================================== */}
            <DatosGenerales
                setInfoGeneral={setInfoGeneral}
                infoGeneral={infoGeneral}
            />
            {/* =============================================================================== */}
            {/* Formulario segun tipo de persona FISICA*/}

            <InfoPersonaFisica setInfoGeneral={setInfoGeneral} infoGeneral={infoGeneral} />
            {/* {infoGeneral.tipo_persona_id === '1' &&
                <InfoPersonaFisica setInfoGeneral={setInfoGeneral} infoGeneral={infoGeneral} />
            } */}
            {/* Formulario segun tipo de persona MORAL*/}
            {infoGeneral.tipo_persona_id === '2' &&
                <InfoPersonaMoral setInfoGeneral={setInfoGeneral} infoGeneral={infoGeneral} />
            }
            {/* =============================================================================== */}




            {/* TODO: completar todos el HTML */}
        </React.Fragment>
    );
}

export default Generales;