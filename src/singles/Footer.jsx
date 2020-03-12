import React from 'react'

const Footer = () => {
    return (
        <div className="row top-buffer">
            <div className="alert alert-info text-justify" aria-live="polite" style={{ wordWrap: 'break-word' }}>
                <p><strong>Aviso de privacidad simplificado del Pre-registro de solicitud para apoyos CONAFOR</strong></p>
                <p>La recolección de datos personales que se lleva a cabo a través de <a href="https://apoyos.cnf.gob.mx/">apoyos.cnf.gob.mx</a>,
                    cuyo administrador y responsable del tramite es la Comisión Nacional Forestal. </p>
                <p>Los datos personales que se recaban serán utilizados con la finalidad de buscar, generar, validar y obtener
                    el registro de solicitud para apoyos CONAFOR.<br />Conoce nuestro
                    {/*<a onclick="ga('send', 'event', 'PDF', 'Descarga', 'AvisoPrivacidad', '1');" href="http://www.conafor.gob.mx/transparencia/docs/AVISO_DE_PRIVACIDAD_INTEGRAL.docx">aviso de privacidad.</a>*/}<a href="https://www.conafor.gob.mx/transparencia/avisoPrivacidad.html" target="_blank">aviso de
                    privacidad.</a>
                </p>
                {/*<p>Si deseas conocer nuestro aviso de privacidad integral, lo podrás consultar en el portal <a id="ember308" target="_blank" href="#" class="ember-view"></a>. </p>*/}
            </div>
        </div>
    );
}

export default Footer;