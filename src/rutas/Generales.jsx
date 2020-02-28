import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import apoyosContext from "./../context/apoyos/apoyosContext";
/* COMPONENTES PROPIOS */
import DatosGenerales from "../componentes/DatosGenerales";
import InfoPersonaFisica from "../componentes/InfoPersonaFisica";
import InfoPersonaMoral from "../componentes/InfoPersonaMoral";
import LineaDivision from '../componentes/LineaDivision';


const Generales = () => {
    const apoyoContext = useContext(apoyosContext)
    const { cerValido, rfc } = apoyoContext.checkCertState;

    const [infoGeneral, setInfoGeneral] = useState({
        tipoPersona: '0'
    })

    const showFormTipoPersona = (tipoPersona) => {
        switch (tipoPersona) {
            case 1:
                /* TODO: terminar persona fisica */
                return <InfoPersonaFisica />
            case 2:
                /* TODO: terminar persona moral */
                return <InfoPersonaMoral />
            default:
                return null
        }
    }

    // useEffect(() => {
    //     // showFormTipoPersona(infoGeneral.tipoPersona)
    // }, [infoGeneral])

    return (
        <section>
            {!rfc && <Redirect to='/' />}
            <h1>Datos génerales</h1>
            <LineaDivision />
            <DatosGenerales
                setInfoGeneral={setInfoGeneral}
            />
            {/* Formulario segun tipo de persona FISICA*/}
            {infoGeneral.tipoPersona === '1' && <InfoPersonaFisica />}
            {/* Formulario segun tipo de persona MORAL*/}
            {infoGeneral.tipoPersona === '2' && <InfoPersonaMoral />}


            {/* TODO: completar todos el HTML */}
        </section>
    );
}

export default Generales;