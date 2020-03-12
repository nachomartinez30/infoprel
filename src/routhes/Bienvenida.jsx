import React from 'react'
import FormaDigitalForm from '../components/FirmaDigitalForm';

const Bienvenida = () => {
    return (
        <div className='top-buffer mt-n1'>
            <div>
                <div className="col-md-12">
                    <h1>Bienvenido al Sistema de Información Preliminar</h1>
                </div>
                <div className="col-md-12" style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                    <p>
                        Este sistema permite la recepción de solicitudes para el <b>Programa de Apoyos
                        para el Desarrollo Forestal Sustentable</b> operado por la CONAFOR, esta herramienta
                        agiliza y transparenta el proceso de gestión de apoyos, asimismo es la llave oficial
                        de entrada al Sistema Integral de Información de los Apoyos de la CONAFOR (SIIAC).
                        En ella se captura la información de la solicitud y sus anexos, emitiendo un comprobante
                        oficial de la recepción del apoyo.
                    </p>
                    <br />
                    Para poder capturar la solicitud preliminar de apoyos,<b> es necesario contar con la FIEL expedida por el Servicio de Administración Tributaria (SAT) y sus credenciales correspondientes</b>.
                    <br />
                    <br />
                    Si al registrar su solicitud tiene alguna duda, puede comunicarse con directamente a la Mesa de Ayuda marcando al teléfono (33)3777-7000 extensión 4505.
                </div>
                <div className="col-md-12">
                    <hr className="red" />
                </div>
            </div>
            {/* FIRMA DIGITAL */}
            <FormaDigitalForm
                textButton={'Validar'}
            />
        </div>
    )
}

export default Bienvenida;