import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { scroller, Element } from 'react-scroll';
/* COMPONENTES PROPIOS */
import GotToSection from '../helpers/GotToSection'
import DatosGenerales from "../components/DatosGenerales";
import InfoPersonaFisica from "../components/InfoPersonaFisica";
import InfoPersonaMoral from "../components/InfoPersonaMoral";
import LineaDivision from '../singles/LineaDivision';
import DatosSolicitante from '../components/DatosSolicitante';
import SelectSiNo from '../singles/SelectSiNo';
import DatosDomGeo from '../components/DatosDomGeo'
import AlertCargando from '../singles/AlertCargando';
import AlertExito from '../singles/AlertExito';
import DatosIndividuo from '../components/DatosIndividuo';
import DatosDomNotificacion from '../components/DatosDomNotificacion';
import DatosPredio from '../components/DatosPredio';
import AlertError from '../singles/AlertError';
/* CONTEXT */
import apoyosContext from "./../context/apoyos/apoyosContext";
import catalogosContext from "./../context/catalogos/catalogosContext";



const Generales = () => {
    const API_REQUEST = process.env.REACT_APP_BACKEN_URL;
    const API_ACCESS = process.env.REACT_APP_BACKEN_URL_ACCESS;

    const [registroCompleto, setRegistroCompleto] = useState(false)
    /* settings para scroll de errores */
    const settingScroll = {
        duration: 500,
        delay: 50,
        smooth: true,
        offset: -30,
    }


    /* CONTEXT */
    const apoyoContext = useContext(apoyosContext);
    const catsContext = useContext(catalogosContext)

    const { agregarCatalogos } = catsContext.catalogos
    const { rfc } = apoyoContext.checkCertState;

    const { agregarRegistro } = apoyoContext.registros

    /* BOOLEANOS PARA MOSTRAR SECIONES*/
    const [tieneRepresentante, setTieneRepresentante] = useState(false)
    const [mismoDomicilio, setMismoDomicilio] = useState(false)
    const [tieneComisariado, setTieneComisariado] = useState(false)
    const [tienePredio, setTienePredio] = useState(false)



    const [personaFisica, setPersonaFisica] = useState({
        id: null,
        persona_id: null,
        persona_siiac_id: null,
        persona_fisica_siiac_id: null,
        rfc_generado: false,
    })
    const [personaMoral, setPersonaMoral] = useState({})
    const [representante, setRepresentante] = useState({
        id: null,
        persona_id: null,
        persona_fisica_id: null,
        representante_siiac_id: null,
        persona_siiac_id: null,
        persona_fisica_siiac_id: null,
        tipo_representante_id: 8,
        fecha_documento: null,
        observaciones: null,
    })
    const [presidente, setPresidente] = useState({
        comisariado_siiac_id: null,
        id: null,
        persona_id: null,
        persona_fisica_id: null,
        persona_siiac_id: null,
        persona_fisica_siiac_id: null,
        persona_fisica_rfc_generado: false,
        estatus_general_id: 7,
        tipo_comisariado_id: 1,
    })
    const [secretario, setSecretario] = useState({
        comisariado_siiac_id: null,
        id: null,
        persona_id: null,
        persona_fisica_id: null,
        persona_siiac_id: null,
        persona_fisica_siiac_id: null,
        persona_fisica_rfc_generado: false,
        estatus_general_id: 7,
        tipo_comisariado_id: 3,
    })
    const [tesorero, setTesorero] = useState({
        comisariado_siiac_id: null,
        id: null,
        persona_id: null,
        persona_fisica_id: null,
        persona_siiac_id: null,
        persona_fisica_siiac_id: null,
        persona_fisica_rfc_generado: false,
        estatus_general_id: 7,
        tipo_comisariado_id: 2,
    })
    const [datosGenerales, setDatosGenerales] = useState({})
    const [solicitante, setSolicitante] = useState({})
    const [domGeo, setDomGeo] = useState({})
    const [domNotif, setDomNotif] = useState({})
    const [datosPredio, setDatosPredio] = useState({})


    /* VALIDADORES */
    const minimosPersonasFisicas = {
        persona_fisica_fecha_nacimiento: false,
        persona_fisica_rfc: false,
        persona_fisica_nacionalidad_id: false,
        persona_fisica_estado_nacimiento_id: false,
        persona_fisica_nombre: false,
        persona_fisica_apellido_paterno: false,
        persona_fisica_sexo_id: false,
        persona_fisica_curp: false,
        persona_fisica_doc_acreditacion_id: false,
        persona_fisica_tipo_etnia_id: false,
    }

    /* DATOS GENERALES */
    const [validacionesDatosGenerales, setValidacionesDatosGenerales] = useState({
        estado_id: false,
        municipio_id: false,
        localidad_id: false,
        tipo_persona_id: false,
        tipo_solicitud_id: false,
        beneficios_ejercicio_ano_anterior: false,
        apoyo_predio_ano_actual: false
    })
    /* PERSONAS */
    const [validacionesPFisica, setValidacionesPFisica] = useState({
        nombre: false,
        apellido_paterno: false,
        apellido_materno: false,
        curp: false,
        fecha_nacimiento: false,
        sexo_id: false,
        nacionalidad_id: false,
        rfc: false,
        doc_acreditacion_id: false,
        estado_nacimiento_id: false,
        estado_civil_id: false,
        tipo_solicitante_id: false,
        tipo_etnia_id: false
    })
    const [validacionesPMoral, setValidacionesPMoral] = useState({
        // TODO agregar validaciones
    })
    /* SOLICITANTE */
    const [validacinesSolicitante, setValidacinesSolicitante] = useState({
        tipo_tenedor: false,
        tipo_poseedor: false,
        tipo_productor: false
    })
    /* COMISARIADOS */
    const [validacionesRepresentante, setValidacionesRepresentante] = useState(minimosPersonasFisicas)
    const [validacionesPresidente, setValidacionesPresidente] = useState(minimosPersonasFisicas)
    const [validacionesSecretario, setValidacionesSecretario] = useState(minimosPersonasFisicas)
    const [validacionesTesorero, setValidacionesTesorero] = useState(minimosPersonasFisicas)

    /* DOMICILIOS */
    const [validacionesDomGeo, setValidacionesDomGeo] = useState({
        estado_id: false,
        municipio_id: false,
        localidad_id: false,
        cve_tipo_vial: false,
        nom_vialidad: false,
        numero_exterior: false,
        cve_tipo_asen: false,
    })
    const [validacionesDomNotif, setValidacionesDomNotif] = useState({
        estado_id: false,
        municipio_id: false,
        localidad_id: false,
        calle: false,
        email: false
    })
    /* PREDIO */
    const [validacionesPredio, setvalidacionesPredio] = useState({
        estado_id: false,
        municipio_id: false,
        localidad_id: false,
        doc_acreditacion_predio_id: false,
        nombre: false,
        tipo_predio_id: false,
        regimen_propiedad_id: false,
        estatus_general_id: false,
        superficie_total: false,
        superficie_forestal: false,
        area_natural: false,
    })



    /* 
     * Captura en las keys del JSON los nombres de los inputs, y sus respectivos valores
     * debe ser pasada como propiedad del componente
     * ================================= ver componente <DatosGenerales/> ===============
     */

    useEffect(() => {

        /* CARGA DE CATALOGOS A CONTEXT GLOBAL */
        /* TODO:regresar para hacer pruebas de catalogos */
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

        const tipos_tenedores = fetch(`${API_REQUEST}catalogos/tipos_tenedores`)
            .then(response => response.json())
            .then(data => data)

        const tipos_productores = fetch(`${API_REQUEST}catalogos/tipos_productores`)
            .then(response => response.json())
            .then(data => data)

        const tipos_poseedores = fetch(`${API_REQUEST}catalogos/tipos_poseedores`)
            .then(response => response.json())
            .then(data => data)

        const tipos_representantes = fetch(`${API_REQUEST}catalogos/tipos_representantes`)
            .then(response => response.json())
            .then(data => data)

        const tipo_vialialidades = fetch(`${API_REQUEST}inegi/tipos-vialidades`)
            .then(response => response.json())
            .then(data => data)

        const tipos_asentamientos = fetch(`${API_REQUEST}inegi/tipos-asentamientos`)
            .then(response => response.json())
            .then(data => data)

        const terminos_genericos = fetch(`${API_REQUEST}inegi/terminos-genericos`)
            .then(response => response.json())
            .then(data => data)

        const tipos_predios = fetch(`${API_REQUEST}catalogos/tipos-predios`)
            .then(response => response.json())
            .then(data => data)

        /* TOKEN DE ACCESOS */

        const tokenHeaders = new Headers();
        tokenHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const tokenUrlencoded = new URLSearchParams();
        tokenUrlencoded.append("client_id", "2");
        tokenUrlencoded.append("client_secret", "dCx2BaYOXpts4Vogkx9nUpltU48dDoT5OZEQ1tip");
        tokenUrlencoded.append("grant_type", "password");
        tokenUrlencoded.append("username", "infoprel@conafor.gob.mx");
        tokenUrlencoded.append("password", "C0n4f0r2020");

        /* TOKEN DE ACCESO */
        const tokenRequestOptions = {
            method: 'POST',
            headers: tokenHeaders,
            body: tokenUrlencoded,
            redirect: 'follow'
        };

        const token = fetch(`${API_ACCESS}oauth/token`, tokenRequestOptions)
            .then(response => response.json())
            .then(token => {
                return token.access_token
            })
            .catch(error => {
                AlertError('ERROR Token', error)
                console.log('error', error)
            });


        /* REVISA QUE HAYAN SIDO TODOOS CARGADOS */
        /* ¡¡¡¡IMPORTANTE!!!!
            las variables deben ser cargadas cuidando las posiciones de los arrgelos
        */
        const fetchCatalogos = [
            nacionalidades,
            tipos_etnias,
            estados_civiles,
            documentos_acreditacion,
            personalidades_juridicas_F,
            personalidades_juridicas_M,
            estados,
            tipos_tenedores,
            tipos_productores,
            tipos_poseedores,
            tipos_representantes,
            tipo_vialialidades,
            tipos_asentamientos,
            terminos_genericos,
            tipos_predios,
            token
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
                    estados: respuestas[6],
                    tipos_tenedores: respuestas[7],
                    tipos_productores: respuestas[8],
                    tipos_poseedores: respuestas[9],
                    tipos_representantes: respuestas[10],
                    tipo_vialialidades: respuestas[11],
                    tipos_asentamientos: respuestas[12],
                    terminos_genericos: respuestas[13],
                    tipos_predios: respuestas[14]
                }
                AlertExito('Todos los catalogos se cargaron')
                agregarCatalogos(catalogos)
                agregarRegistro({
                    ...apoyoContext.registros,
                    token: respuestas[15]
                })
            })
            .catch(
                error => {
                    AlertError("Falla al cargar catálogos, Recargando página", error)
                    console.log(error)
                    setTimeout(() => {
                        window.location.reload();
                    }, 5000);
                }
            )

    }, [''])

    const setSameDomNotif = () => {
        setDomNotif({
            ...domNotif,
            estado_domicilio_notificacion: domGeo.estado_domicilio_geografico,
            municipio_domicilio_notificacion: domGeo.municipio_domicilio_geografico,
            localidad_domicilio_notificacion: domGeo.localidad_domicilio_geografico,
            domicilio_notificacion: domGeo.nombre_vialidad_dom_geo + " " + domGeo.num_ext_solicitante_dom_geo + " " + domGeo.comp_num_ext_solicitante_dom_geo,
            cp_dom_notif: domGeo.cp_solicitante_dom_geo
        })
        return (
            <DatosDomNotificacion
                key='domicilio_notificacion'
                setState={setDomNotif}
                state={domNotif}
            />
        )
    }

    const checkSeccionPersonaFisica = () => {
        const nombre = (personaFisica.nombre) ? false : true
        const apellido_paterno = (personaFisica.apellido_paterno) ? false : true
        const apellido_materno = (personaFisica.apellido_materno) ? false : true
        const curp = (personaFisica.curp) ? false : true
        const fecha_nacimiento = (personaFisica.fecha_nacimiento) ? false : true
        const sexo_id = (personaFisica.sexo_id) ? false : true
        const nacionalidad_id = (personaFisica.nacionalidad_id) ? false : true
        const rfc = (personaFisica.rfc) ? false : true
        const doc_acreditacion_id = (personaFisica.doc_acreditacion_id) ? false : true
        const estado_nacimiento_id = (personaFisica.estado_nacimiento_id) ? false : true
        const estado_civil_id = (personaFisica.estado_civil_id) ? false : true
        const tipo_etnia_id = (personaFisica.tipo_etnia_id) ? false : true

        setValidacionesPFisica({
            nombre,
            apellido_paterno,
            apellido_materno,
            curp,
            fecha_nacimiento,
            sexo_id,
            nacionalidad_id,
            rfc,
            doc_acreditacion_id,
            estado_nacimiento_id,
            estado_civil_id,
            tipo_etnia_id,
        })

        return (
            nombre ||
            apellido_paterno ||
            apellido_materno ||
            curp ||
            fecha_nacimiento ||
            sexo_id ||
            nacionalidad_id ||
            rfc ||
            doc_acreditacion_id ||
            estado_nacimiento_id ||
            estado_civil_id ||
            tipo_etnia_id
        ) ? true : false
    }

    const checkValidacionesSolicitante = () => {
        const tipo_tenedor = (solicitante.tipo_tenedor) ? false : true
        const tipo_poseedor = (solicitante.tipo_poseedor) ? false : true
        const tipo_productor = (solicitante.tipo_productor) ? false : true
        setValidacinesSolicitante({
            tipo_tenedor,
            tipo_poseedor,
            tipo_productor
        })
        return (
            tipo_tenedor ||
            tipo_poseedor ||
            tipo_productor
        ) ? true : false
    }

    const checkValidacionesStateFisicaGrls = (state, setStateValidation) => {
        const persona_fisica_fecha_nacimiento = (state.persona_fisica_fecha_nacimiento) ? false : true;
        const persona_fisica_rfc = (state.persona_fisica_rfc) ? false : true;
        const persona_fisica_nacionalidad_id = (state.persona_fisica_nacionalidad_id) ? false : true;
        const persona_fisica_estado_nacimiento_id = (state.persona_fisica_estado_nacimiento_id) ? false : true;
        const persona_fisica_nombre = (state.persona_fisica_nombre) ? false : true;
        const persona_fisica_apellido_paterno = (state.persona_fisica_apellido_paterno) ? false : true;
        const persona_fisica_sexo_id = (state.persona_fisica_sexo_id) ? false : true;
        const persona_fisica_curp = (state.persona_fisica_curp) ? false : true;
        const persona_fisica_doc_acreditacion_id = (state.persona_fisica_doc_acreditacion_id) ? false : true;
        const persona_fisica_tipo_etnia_id = (state.persona_fisica_tipo_etnia_id) ? false : true;

        setStateValidation({
            persona_fisica_fecha_nacimiento,
            persona_fisica_rfc,
            persona_fisica_nacionalidad_id,
            persona_fisica_estado_nacimiento_id,
            persona_fisica_nombre,
            persona_fisica_apellido_paterno,
            persona_fisica_sexo_id,
            persona_fisica_curp,
            persona_fisica_doc_acreditacion_id,
            persona_fisica_tipo_etnia_id
        })

        return (
            persona_fisica_fecha_nacimiento ||
            persona_fisica_rfc ||
            persona_fisica_nacionalidad_id ||
            persona_fisica_estado_nacimiento_id ||
            persona_fisica_nombre ||
            persona_fisica_apellido_paterno ||
            persona_fisica_sexo_id ||
            persona_fisica_curp ||
            persona_fisica_doc_acreditacion_id ||
            persona_fisica_tipo_etnia_id
        ) ? true : false
    }

    const checkValidacionesDatosGenerales = () => {
        const estado_id = (datosGenerales.estado_id) ? false : true;
        const municipio_id = (datosGenerales.municipio_id) ? false : true;
        const localidad_id = (datosGenerales.localidad_id) ? false : true;
        const tipo_persona_id = (datosGenerales.tipo_persona_id) ? false : true;
        const tipo_solicitud_id = (datosGenerales.tipo_solicitud_id) ? false : true;
        const beneficios_ejercicio_ano_anterior = (datosGenerales.beneficios_ejercicio_ano_anterior) ? false : true;
        const apoyo_predio_ano_actual = (datosGenerales.apoyo_predio_ano_actual) ? false : true;

        setValidacionesDatosGenerales({
            estado_id,
            municipio_id,
            localidad_id,
            tipo_persona_id,
            tipo_solicitud_id,
            beneficios_ejercicio_ano_anterior,
            apoyo_predio_ano_actual
        })

        return (
            estado_id ||
            municipio_id ||
            localidad_id ||
            tipo_persona_id ||
            tipo_solicitud_id ||
            beneficios_ejercicio_ano_anterior ||
            apoyo_predio_ano_actual
        ) ? true : false
    }

    const checkValidacionesDomGeografico = () => {
        const estado_id = (domGeo.estado_id) ? false : true;
        const municipio_id = (domGeo.municipio_id) ? false : true;
        const localidad_id = (domGeo.localidad_id) ? false : true;
        const cve_tipo_vial = (domGeo.cve_tipo_vial) ? false : true;
        const nom_vialidad = (domGeo.nom_vialidad) ? false : true;
        const numero_exterior = (domGeo.numero_exterior) ? false : true;
        const cve_tipo_asen = (domGeo.cve_tipo_asen) ? false : true;

        setValidacionesDomGeo({
            estado_id,
            municipio_id,
            localidad_id,
            cve_tipo_vial,
            nom_vialidad,
            numero_exterior,
            cve_tipo_asen
        })

        return (
            estado_id ||
            municipio_id ||
            localidad_id ||
            cve_tipo_vial ||
            nom_vialidad ||
            numero_exterior ||
            cve_tipo_asen
        ) ? true : false
    }

    const checkValidacionesDomNotificaciones = () => {
        const estado_id = (domNotif.estado_id) ? false : true;
        const municipio_id = (domNotif.municipio_id) ? false : true;
        const localidad_id = (domNotif.localidad_id) ? false : true;
        const calle = (domNotif.calle) ? false : true;
        const email = (domNotif.email) ? false : true;

        setValidacionesDomNotif({
            estado_id,
            municipio_id,
            localidad_id,
            calle,
            email
        })

        return (
            estado_id ||
            municipio_id ||
            localidad_id ||
            calle ||
            email
        ) ? true : false

    }


    const checkValidacionesDatosPredio = () => {

        const estado_id = (datosPredio.estado_id) ? false : true;
        const municipio_id = (datosPredio.municipio_id) ? false : true;
        const localidad_id = (datosPredio.localidad_id) ? false : true;
        const doc_acreditacion_predio_id = (datosPredio.doc_acreditacion_predio_id) ? false : true;
        const nombre = (datosPredio.nombre) ? false : true;
        const tipo_predio_id = (datosPredio.tipo_predio_id) ? false : true;
        const regimen_propiedad_id = (datosPredio.regimen_propiedad_id) ? false : true;
        const estatus_general_id = (datosPredio.estatus_general_id) ? false : true;
        const superficie_total = (datosPredio.superficie_total) ? false : true;
        const superficie_forestal = (datosPredio.superficie_forestal) ? false : true;
        const area_natural = (datosPredio.area_natural) ? false : true;

        setvalidacionesPredio({
            estado_id,
            municipio_id,
            localidad_id,
            doc_acreditacion_predio_id,
            nombre,
            tipo_predio_id,
            regimen_propiedad_id,
            estatus_general_id,
            superficie_total,
            superficie_forestal,
            area_natural
        })

        return (
            estado_id ||
            municipio_id ||
            localidad_id ||
            doc_acreditacion_predio_id ||
            nombre ||
            tipo_predio_id ||
            regimen_propiedad_id ||
            estatus_general_id ||
            superficie_total ||
            superficie_forestal ||
            area_natural
        ) ? true : false
    }

    const nextSection = () => {
        /* si todo esta bein, solicita token de acceso */

        const { token } = apoyoContext.registros
        /* get FOLIO INFOPREL */
        const registroHeaders = new Headers();
        registroHeaders.append("Authorization", `Bearer ${token}`);

        const folioRequestOptions = {
            method: 'GET',
            headers: registroHeaders,
            redirect: 'follow'
        };
        const folio_infoprel = fetch(`${API_REQUEST}infoprel_online/registros/get_folio_manual?id_estado=${datosGenerales.estado_id}&id_ciclo=${'111'}`, folioRequestOptions)
            .then(response => response.json())
            .then(result => {
                return result.folio_infoprel[0].folio_infoprel
            })
            .catch(error => {
                console.log('error', error)
            });

        const registroRequestOptions = {
            method: 'POST',
            headers: registroHeaders,
            redirect: 'follow'
        };

        const registro_id = fetch(`${API_REQUEST}infoprel_online/registros/guardar_registro`, registroRequestOptions)
            .then(response => response.json())
            .then(result => {

                return result.data.registro_id
            })
            .catch(error => console.log('error', error));

        const requests = [
            folio_infoprel,
            registro_id
        ];

        Promise.all(requests)
            .then(respuestas => {
                agregarRegistro({
                    ...apoyoContext.registros,
                    folio_infoprel: respuestas[0],
                    registro_id: respuestas[1],
                    comisariados: [presidente, secretario, tesorero],
                    domicilio_geografico: domGeo,
                    notificaciones: [domNotif],
                    persona_fisica: (datosGenerales.tipo_persona_id === '1') ? personaFisica : {},
                    persona_moral: (datosGenerales.tipo_persona_id === '2') ? personaMoral : {},
                    predios: [datosPredio],
                    representante_legal: (tieneRepresentante) ? representante : {},
                    solicitante: solicitante,
                })
                // AlertExito('Habemus', 'registo ID!')
                setRegistroCompleto(true)
            })
            .catch(
                error => {
                    AlertError("Falla al cargar", error)
                    console.log(error)
                }
            )
    }

    const checkFaltantes = () => {
        /* Revision datos solicitante */
        /* SECCION DATOS GENERALES */
        const seccionDatosGenerales = checkValidacionesDatosGenerales(datosGenerales, setValidacionesDatosGenerales)
        if (seccionDatosGenerales) {
            scroller.scrollTo('seccion_datos_generales', settingScroll);
            return
        }

        /* TIPO DE PERSONA */
        if (datosGenerales.tipo_persona_id === '1') {
            /* REVISION DATOS PERSONA FISICA */
            const seccionPersonasFisicas = checkSeccionPersonaFisica();
            if (seccionPersonasFisicas) {
                scroller.scrollTo('seccion_datos_persona_fisica', settingScroll);
                return
            }
        } else {
            /* REVISION DATOS PERSONA MORAL */
        }
        /* SECCION SOLICITANTE */
        const seccionSolicitante = checkValidacionesSolicitante();
        if (seccionSolicitante) {
            scroller.scrollTo('seccion_datos_solicitante', settingScroll);
            return
        }

        /* SECCION REPRESENTANTE LEGAL */
        if (tieneRepresentante) {
            const seccionRepresentante = checkValidacionesStateFisicaGrls(representante, setValidacionesRepresentante)
            if (seccionRepresentante) {
                scroller.scrollTo('seccion_datos_representante', settingScroll);
                return
            }
        }

        /* SECCION COMISARIADO */
        if (tieneComisariado) {
            const seccionPresidente = checkValidacionesStateFisicaGrls(presidente, setValidacionesPresidente)
            if (seccionPresidente) {
                scroller.scrollTo('seccion_datos_presidente', settingScroll);
                return
            }
            const seccionSecretario = checkValidacionesStateFisicaGrls(secretario, setValidacionesSecretario)
            if (seccionSecretario) {
                scroller.scrollTo('seccion_datos_secretario', settingScroll);
                return
            }
            const seccionTesorer = checkValidacionesStateFisicaGrls(tesorero, setValidacionesTesorero)
            if (seccionTesorer) {
                scroller.scrollTo('seccion_datos_tesorero', settingScroll);
                return
            }
        }

        /* SECCION GEOGRAFICO */
        const seccionDomiciliGeografico = checkValidacionesDomGeografico();
        if (seccionDomiciliGeografico) {
            scroller.scrollTo('seccion_datos_dom_geo', settingScroll);
            return
        }
        /* SECCION NOTIFICACION */
        const seccionDomNotif = checkValidacionesDomNotificaciones();
        if (seccionDomNotif) {
            scroller.scrollTo('seccion_datos_dom_notif', settingScroll);
            return
        }

        /* SECCION PREDIO */
        if (tienePredio) {
            const seccionDatosPredio = checkValidacionesDatosPredio();
            if (seccionDatosPredio) {
                scroller.scrollTo('seccion_datos_predio', settingScroll);
                return
            }
        }

        nextSection()
    }



    return (
        <div className='py25'>
            {!rfc && <Redirect to='/' />}
            <h1>Datos génerales</h1>
            <LineaDivision />
            <Element name='seccion_datos_generales'>
                <DatosGenerales
                    validacion={validacionesDatosGenerales}
                    setState={setDatosGenerales}
                    state={datosGenerales}
                />
            </Element>
            {/* Formulario segun tipo de persona FISICA*/}
            {datosGenerales.tipo_persona_id === '1' &&
                <Element name='seccion_datos_persona_fisica'>
                    <InfoPersonaFisica
                        setState={setPersonaFisica}
                        state={personaFisica}
                        validacion={validacionesPFisica}
                    />
                </Element>
            }
            {/* Formulario segun tipo de persona MORAL*/}
            {/* TODO: validaciones persona Moral */}
            {
                datosGenerales.tipo_persona_id === '2' &&
                <Element name='seccion_datos_persona_moral'>
                    <InfoPersonaMoral
                        id_section='seccion_datos_persona_moral'
                        setState={setPersonaMoral}
                        state={personaMoral}
                    />
                </Element>
            }
            <Element name='seccion_datos_solicitante'>
                <DatosSolicitante
                    state={solicitante}
                    setState={setSolicitante}
                    validacion={validacinesSolicitante}
                />
            </Element>
            <h3>Datos de el/la representante legal</h3>
            <LineaDivision />
            <label>¿Tiene Representante Legal?</label>
            <SelectSiNo
                defaultValue={tieneRepresentante}
                onChange={() => setTieneRepresentante(!tieneRepresentante)}
                className='form-control'
                name='tiene_comisariado'
            />
            {
                tieneRepresentante &&
                <Element name='seccion_datos_representante'>
                    <DatosIndividuo
                        key='representante'
                        state={representante}
                        setState={setRepresentante}
                        validacion={validacionesRepresentante}
                    />
                </Element>
            }
            {/* SECCION DATOS DEL COMISARIADO */}
            <br />
            <h3>Datos del Comisariado</h3>
            <LineaDivision />
            <label>¿El solicitante cuenta con comisariado?</label>
            <SelectSiNo
                defaultValue={tieneComisariado}
                onChange={() => setTieneComisariado(!tieneComisariado)}
                className='form-control'
                name='tiene_comisariado'
            />
            {
                tieneComisariado &&
                <Element name='seccion_datos_presidente'>
                    <h3>Datos de Presidente</h3>
                    <DatosIndividuo
                        key='presidente'
                        state={presidente}
                        setState={setPresidente}
                        validacion={validacionesPresidente
                        }
                    />
                    <br />
                </Element>
            }
            {
                tieneComisariado &&
                <Element name='seccion_datos_secretario'>
                    <h3>Datos de Secretario</h3>
                    <DatosIndividuo
                        key='secretario'
                        state={secretario}
                        setState={setSecretario}
                        validacion={validacionesSecretario}
                    />
                    <br />
                </Element>
            }
            {
                tieneComisariado &&
                <Element name='seccion_datos_tesorero'>
                    <h3>Datos de Tesorero</h3>
                    <DatosIndividuo
                        key='tesorero'
                        state={tesorero}
                        setState={setTesorero}
                        validacion={validacionesTesorero}
                    />
                    <br />
                </Element>
            }
            {/* SECCION DOMICILIO GEOGRAFICO */}
            <Element name='seccion_datos_dom_geo'>
                <DatosDomGeo
                    validacion={validacionesDomGeo}
                    key='domicilio_gegrafico'
                    state={domGeo}
                    setState={setDomGeo}
                />
            </Element>
            {/* SECCION DOMICILIO NOTIFICACION */}
            <div className="row top-buffer">
                <div className="col-md-12">
                    <h2>Domicilio de notificación</h2>
                    <LineaDivision />
                    <label>¿El domicilio geográfico es el mismo al de notificación?</label>
                </div>
                <div className="col-md-4 pb25">
                    <SelectSiNo
                        defaultValue={mismoDomicilio}
                        onChange={() => setMismoDomicilio(!mismoDomicilio)}
                        className='form-control'
                    />
                    <br />
                </div>
            </div>
            {/* TODO: mejorar, si tiene mismo domicilio, se le asigna el state capturado */}
            <Element name='seccion_datos_dom_notif'>
                <DatosDomNotificacion
                    validacion={validacionesDomNotif}
                    key='domicilio_notificacion'
                    setState={setDomNotif}
                    state={domNotif}
                />
            </Element>
            {/* SECCION DATOS DEL PREDIO */}
            <div className="row top-buffer">
                <div className="col-md-12">
                    <h2>Datos generales de la propiedad</h2>
                    <LineaDivision />
                    <label>¿El solicitante cuenta con predio?</label>
                </div>
                <div className="col-md-4 pb25">
                    <SelectSiNo
                        defaultValue={tienePredio}
                        onChange={() => setTienePredio(!tienePredio)}
                        className='form-control'
                    />
                    <br />
                </div>
            </div>
            {
                tienePredio &&
                <Element name='seccion_datos_predio'>
                    <DatosPredio
                        validacion={validacionesPredio}
                        key='datos_predio'
                        setState={setDatosPredio}
                        state={datosPredio}
                    />
                </Element>
            }
            <div className="pull-right py25">
                <button
                    id="btn_siguiente"
                    type="button"
                    class="btn btn-primary py16"
                    // onClick={checkFaltantes}
                    onClick={() => setRegistroCompleto(true)}
                >
                    Siguiente
                </button>
            </div>
            <div>
                <br />
                <br />
            </div>
            {registroCompleto && <Redirect to='/finalizar' />}
        </div>
    );
}

export default Generales;