import React, { useState, useContext } from 'react'
import FirmaDigitalForm from "../components/FirmaDigitalForm";
import apoyosContext from "../context/apoyos/apoyosContext";
import FormApoyos from '../components/FormApoyos';
import FormCargaArchivos from '../components/FormCargaArchivos';
import { Element } from 'react-scroll';
import TablaApoyosSeleccionados from '../components/TablaApoyosSeleccionados';

const Finalizar = () => {

    const apoyoContext = useContext(apoyosContext);
    const [showFormFirma, setShowFormFirma] = useState(true)
    const [showFiles2Upload, setShowFiles2Upload] = useState(true)

    /* Archivos que requieren carga */
    const [archivos, setArchivos] = useState([
        { name: 'solicitud_unica', cargado: false, necesario: true, tipoArchivo: 'pdf', titulo: 'Solicitud Única' },
        { name: 'anexos_tecnicos', cargado: false, necesario: true, tipoArchivo: 'pdf', titulo: 'Anexo(s) Técnico(s) del Apoyo solicitado' },
        { name: 'personalidad', cargado: false, necesario: true, tipoArchivo: 'pdf', titulo: 'Acreditación de la Personalidad' },
        { name: 'personalidad_representante', cargado: false, necesario: true, tipoArchivo: 'pdf', titulo: 'Acreditación de la Representación Legal' },
        { name: 'identificacion_representante', cargado: false, necesario: true, tipoArchivo: 'pdf', titulo: 'Identificación de la Representación Legal' },
        { name: 'acreditacion_predio', cargado: false, necesario: true, tipoArchivo: 'pdf', titulo: 'Acreditación del Predio' },
        { name: 'programas', cargado: false, necesario: false, tipoArchivo: 'pdf', titulo: 'Documentación propia del Programa' },
    ])
    const [apoyosSeleccionados, setApoyosSeleccionados] = useState([
       
    ])

    return (
        <React.Fragment>
            {/* FORM apoyos */}
            {/* TODO: modificar state para formulario de apoyos seleccionados */}
            <Element name='frm_apoyos' className='row'>
                <FormApoyos
                    state={apoyosSeleccionados}
                    setState={setApoyosSeleccionados}
                />
                <TablaApoyosSeleccionados
                    state={apoyosSeleccionados}
                    setState={setApoyosSeleccionados}
                />
            </Element>
            {/* FORM archivos */}
            <Element name='frm_archivos' className='row py25' >
                {
                    showFiles2Upload && <FormCargaArchivos
                        files={archivos}
                    />
                }
            </Element>
            {/* FORM FIRMA */}
            {
                showFormFirma && <Element>
                    <FirmaDigitalForm
                        textButton={'Firmar'}
                    />
                </Element>
            }
        </React.Fragment>
    );
}

export default Finalizar;