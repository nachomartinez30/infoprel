import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
/* COMPONENTES PROPIOS */
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
    /* CONTEXT */
    const apoyoContext = useContext(apoyosContext);
    const catsContext = useContext(catalogosContext)

    const { agregarCatalogos } = catsContext.catalogos
    const { rfc } = apoyoContext.checkCertState;

    const { agregarRegistro } = apoyoContext.registros

    /* BOOLEANOS PARA MOSTRAR SECIONES*/
    const [tiene_representante, setTiene_representante] = useState(false)
    const [mismoDomicilio, setMismoDomicilio] = useState(false)
    const [cuentaConPredio, setCuentaConPredio] = useState(false)
    const [tieneComisariado, setTieneComisariado] = useState(false)



    const [personaFisica, setPersonaFisica] = useState({
        id: null,
        persona_id: null,
        persona_siiac_id: null,
        persona_fisica_siiac_id: null,
        "rfc_generado": false,
    })
    const [personaMoral, setPersonaMoral] = useState({})
    const [representante, setRepresentante] = useState({})
    const [presidente, setPresidente] = useState({})
    const [secretario, setSecretario] = useState({})
    const [tesorero, setTesorero] = useState({})
    const [datosGenerales, setDatosGenerales] = useState({})
    const [solicitante, setSolicitante] = useState({})
    const [domGeo, setDomGeo] = useState({})
    const [domNotif, setDomNotif] = useState({})
    const [datosPredio, setDatosPredio] = useState({})

    const [folioInforpel, setStateFolioInforpel] = useState('')
    const [token, setToken] = useState('')

    const [credentials, setCredentials] = useState({
        client_id: 2,
        client_secret: 'dCx2BaYOXpts4Vogkx9nUpltU48dDoT5OZEQ1tip',
        grant_type: 'password',
        username: 'infoprel@conafor.gob.mx',
        password: 'C0n4f0r2020'
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

    // const setSameDomNotif = () => {
    //     setDomNotif({
    //         ...domNotif,
    //         estado_domicilio_notificacion: domGeo.estado_domicilio_geografico,
    //         municipio_domicilio_notificacion: domGeo.municipio_domicilio_geografico,
    //         localidad_domicilio_notificacion: domGeo.localidad_domicilio_geografico,
    //         domicilio_notificacion: domGeo.nombre_vialidad_dom_geo + " " + domGeo.num_ext_solicitante_dom_geo + " " + domGeo.comp_num_ext_solicitante_dom_geo,
    //         cp_dom_notif: domGeo.cp_solicitante_dom_geo
    //     })
    //     return (
    //         <DatosDomNotificacion
    //             key='domicilio_notificacion'
    //             setState={setDomNotif}
    //             state={domNotif}
    //         />
    //     )

    // }


    const checkFaltantes = () => {
        AlertExito('checando', 'faltantes')

        const { token } = apoyoContext.registros

        /* get FOLIO INFOPREL */
        const registroHeaders = new Headers();
        registroHeaders.append("Authorization", `Bearer ${token}`);


        const folioRequestOptions = {
            method: 'GET',
            headers: registroHeaders,
            redirect: 'follow'
        };
        const folio_infoprel = fetch(`${API_REQUEST}infoprel_online/registros/get_folio_manual?id_estado=${datosGenerales.estado_solicitud}&id_ciclo=${'111'}`, folioRequestOptions)
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
                    persona_fisica: personaFisica,
                    persona_moral: personaMoral,
                    predios: [datosPredio],
                    representante_legal: representante,
                    solicitante: solicitante,
                })
            })
            .catch(
                error => {
                    AlertError("Falla al cargar", error)
                    console.log(error)
                }
            )
    }



    return (
        <div className='py25'>
            {!rfc && <Redirect to='/' />}
            <h1>Datos génerales</h1>
            {/* =============================================================================== */}
            <LineaDivision />
            {/* =============================================================================== */}
            <DatosGenerales
                setState={setDatosGenerales}
                state={datosGenerales}
            />
            {/* =============================================================================== */}
            {/* Formulario segun tipo de persona FISICA*/}

            {datosGenerales.tipo_persona_id === '1' &&
                <InfoPersonaFisica setState={setPersonaFisica} state={personaFisica} />
            }
            {/* Formulario segun tipo de persona MORAL*/}
            {datosGenerales.tipo_persona_id === '2' &&
                <InfoPersonaMoral setState={setPersonaMoral} state={personaMoral} />
            }
            {/* =============================================================================== */}
            <DatosSolicitante
                state={solicitante}
                setState={setSolicitante}
            />
            {/* =============================================================================== */}


            {/* =============================================================================== */}
            <h3>Datos de el/la representante legal</h3>
            <LineaDivision />
            <label>¿Tiene Representante Legal?</label>
            <SelectSiNo
                defaultValue={tiene_representante}
                onChange={() => setTiene_representante(!tiene_representante)}
                className='form-control'
                name='tiene_comisariado'
            />
            {/* =============================================================================== */}
            {tiene_representante &&
                <DatosIndividuo
                    key='representante'
                    state={representante}
                    setState={setRepresentante}
                />
            }
            {/* =============================================================================== */}

            {/* SECCION DATOS DEL COMISARIADO */}
            {/* =============================================================================== */}
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

            {tieneComisariado &&
                <div>
                    <h3>Datos de Presidente</h3>
                    <DatosIndividuo
                        key='presidente'
                        state={presidente}
                        setState={setPresidente}
                    />
                    <br />
                </div>
            }
            {tieneComisariado &&
                <div>
                    <h3>Datos de Secretario</h3>
                    <DatosIndividuo
                        key='secretario'
                        state={secretario}
                        setState={setSecretario}
                    />
                    <br />
                </div>
            }
            {tieneComisariado &&
                <div>
                    <h3>Datos de Tesorero</h3>
                    <DatosIndividuo
                        key='tesorero'
                        state={tesorero}
                        setState={setTesorero}
                    />
                    <br />
                </div>
            }
            {/* =============================================================================== */}
            {/* SECCION DOMICILIO GEOGRAFICO */}
            <DatosDomGeo
                key='domicilio_gegrafico'
                state={domGeo}
                setState={setDomGeo}
            />
            {/* =============================================================================== */}

            {/* =============================================================================== */}

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
            <DatosDomNotificacion
                key='domicilio_notificacion'
                setState={setDomNotif}
                state={domNotif}
            />
            {/* =============================================================================== */}
            {/* =============================================================================== */}
            {/* SECCION DATOS DEL PREDIO */}
            <div className="row top-buffer">
                <div className="col-md-12">
                    <h2>Datos generales de la propiedad</h2>
                    <LineaDivision />
                    <label>¿El solicitante cuenta con predio?</label>
                </div>
                <div className="col-md-4 pb25">
                    <SelectSiNo
                        defaultValue={cuentaConPredio}
                        onChange={() => setCuentaConPredio(!cuentaConPredio)}
                        className='form-control'
                    />
                    <br />
                </div>
            </div>
            {cuentaConPredio &&
                <DatosPredio
                    key='datos_predio'
                    setState={setDatosPredio}
                    state={datosPredio}
                />
            }
            {/* =============================================================================== */}

            <div className="pull-right py25">
                <button
                    id="btn_siguiente"
                    type="button"
                    class="btn btn-primary py16"
                    onClick={checkFaltantes}
                >
                    Siguiente
                </button>
            </div>
            <div>
                <br />
                <br />
            </div>

        </div>
    );
}

export default Generales;