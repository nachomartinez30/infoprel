import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
/* COMPONENTES PROPIOS */
import DatosGenerales from "../components/DatosGenerales";
import InfoPersonaFisica from "../components/InfoPersonaFisica";
import InfoPersonaMoral from "../components/InfoPersonaMoral";
import LineaDivision from '../singles/LineaDivision';
import AlertCargando from '../singles/AlertCargando';
import AlertExito from '../singles/AlertExito';
import AlertError from '../singles/AlertError';
/* CONTEXT */
import apoyosContext from "./../context/apoyos/apoyosContext";
import catalogosContext from "./../context/catalogos/catalogosContext";



const Generales = () => {

    const API_REQUEST = process.env.REACT_APP_BACKEN_URL;



    const apoyoContext = useContext(apoyosContext);

    const catsContext = useContext(catalogosContext)
    const {
        agregarCatalogos,
        nacionalidades,
        tipos_etnias,
        estados_civiles,
        documentos_acreditacion,
        personalidades_juridicas_F,
        personalidades_juridicas_M,
        estados
    } = catsContext.catalogos

    const { pass, agregarCertYKey, cerValido, rfc } = apoyoContext.checkCertState;

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

    useEffect(() => {

        /* CARGA DE CATALOGOS A CONTEXT GLOBAL */
        AlertCargando('Cargando catálogos, espere por favor');
        const nacionalidades = fetch(`${API_REQUEST}catalogos/nacionalidades`)
            .then(response => response.json())
            .then(data => data)

        const tipos_etnias = fetch(`${API_REQUEST}catalogos/tipos_etnias`)
            .then(response => response.json())
            .then(data => data)

        const estados_civiles = fetch(`${API_REQUEST}catalogos/estados_civiles`)
            .then(response => response.json())
            .then(data => data)

        const documentos_acreditacion = fetch(`${API_REQUEST}catalogos/documentos_acreditacion`)
            .then(response => response.json())
            .then(data => data)

        const personalidades_juridicas_F = fetch(`${API_REQUEST}catalogos/tipos_solicitantes/personalidades_juridicas/1`)
            .then(response => response.json())
            .then(data => data)

        const personalidades_juridicas_M = fetch(`${API_REQUEST}catalogos/tipos_solicitantes/personalidades_juridicas/2`)
            .then(response => response.json())
            .then(data => data)

        const estados = fetch(`${API_REQUEST}inegi/estados`)
            .then(response => response.json())
            .then(data => data)


        /* REVISA QUE HAYAN SIDO TODOOS CARGADOS */
        const fetchCatalogos = [
            nacionalidades,
            tipos_etnias,
            estados_civiles,
            documentos_acreditacion,
            personalidades_juridicas_F,
            personalidades_juridicas_M,
            estados
        ]

        Promise.all(fetchCatalogos)
            .then(respuestas => {
                const catalogos = {
                    nacionalidades: respuestas[0].nacionalidades,
                    tipos_etnias: respuestas[1].data,
                    estados_civiles: respuestas[2].estados_civiles,
                    documentos_acreditacion: respuestas[3].data,
                    personalidades_juridicas_F: respuestas[4],
                    personalidades_juridicas_M: respuestas[5],
                    estados: respuestas[6]
                }
                AlertExito('Todos los catalogos se cargaron')
                agregarCatalogos(catalogos)
            })
            .catch(
                error => {
                    AlertError("Falla al cargar catálogos", error)
                    console.log(error)
                }
            )
    }, [''])


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

            {infoGeneral.tipo_persona_id === '1' &&
                <InfoPersonaFisica setInfoGeneral={setInfoGeneral} infoGeneral={infoGeneral} />
            }
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