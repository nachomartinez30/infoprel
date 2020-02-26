import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'

import InputRFC from './InputRFC'
import AlertCargando from './AlertCargando'
import AlertError from './AlertError'
import AlertAdvertencia from './AlertAdvertencia'
import apoyosContext from "./../context/apoyos/apoyosContext";
import AlertExito from './AlertExito';

const FormaDigitalForm = () => {


    const apoyoContext = useContext(apoyosContext);
    const { certificado, llave, pass, cerValido, rfc, agregarCertYKey } = apoyoContext.checkCertState;


    /* state principal para envio de datos a State global */
    const [valores, setValores] = useState({
        certificado: '',
        llave: '',
        rfc: '',
        pass: '',
        cerValido: null
    })

    const [rfcToCheck, setRfcToCheck] = useState('')


    const getDatos = e => {
        e.preventDefault();
        
        if (e.target.name === 'llave' || e.target.name === 'certificado') {
            setValores({
                ...valores,
                [e.target.name]: e.target,
            })
        } else {
            setValores({
                ...valores,
                [e.target.name]: e.target.value
            })
        }
    }

    const checkCERTKey = (e) => {


        // return <Redirect push to='/target' />

        /* ENVÍO DE API para varlidar certificado llave y password */
        const { certificado, llave, pass, rfc } = valores;

        /* Revisa que todos los campos no sean vacios */
        if (certificado.value !== '' && llave.value !== '' && pass !== '' && rfc !== '') {
            let myHeaders = new Headers();
            // myHeaders.append("Content-Type", "multipart/form-data; boundary=--------------------------563939394468331456539373");

            const formdata = new FormData();

            formdata.append("cert", certificado.files[0], certificado.value);
            formdata.append("key", llave.files[0], llave.value);
            // formdata.append("rfc", rfc);
            formdata.append("pass", pass);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            AlertCargando('Validando credenciales...');

            fetch("http://localhost/siiac_ws_app/public/api/firma_digital/check_sign", requestOptions)
                .then(response => response.json())
                .then(result => {

                    agregarCertYKey(valores)


                    if (result.valid) {
                        AlertExito('Firma valida!');
                        // TODO: si todo es correcto, redireccionar a /generales si es valido
                        /* Redireccion a llenado de datos */

                        // return <Redirect to='/login' />
                    } else {
                        AlertError('La ffirma no es valida');
                    }
                })
                .catch(error => {
                    AlertError('Error al validar firma', error)
                    console.log('error', error)
                });
        } else {
            AlertAdvertencia('Faltan datos')
        }
    }


    /* metodos para la validacion de RFC y mayus */

    const rfcToMayus = (value) => {
        const rfc_lower = value.target.value;
        const rfcUpper = rfc_lower.toUpperCase()
        setValores({
            ...valores,
            rfc: rfcUpper
        })
        setRfcToCheck(rfcUpper);
    }


    return (
        <section>
            <div>
                <div className="row">
                    <InputRFC
                        defaultValue={rfcToCheck}
                        name={'rfc'}
                        rfc={rfcToCheck}
                        onTyping={rfcToMayus}
                    />
                </div>
                <div className="row">
                    <div className="col-md-6 col-md-offset-3 ">
                        <label><b>Certificado (.cer):</b></label>
                        <input
                            onBlur={getDatos}
                            id="certificado"
                            type="file"
                            name="certificado"
                            className="form-control"
                            accept="cer/cer"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <label><b>Clave privada (.key):</b></label>
                        <input
                            onBlur={getDatos}
                            id="llave"
                            type="file"
                            name="llave"
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <label><b>Contraseña de clave privada:</b></label>
                        <input
                            onBlur={getDatos}
                            defaultValue={pass}
                            id="pass"
                            type="password"
                            name="pass"
                            className="form-control"
                            placeholder="Contraseña" />
                    </div>
                    <div className="col-md-4 col-md-offset-4 pull-right">
                        <br />
                        <button
                            onClick={checkCERTKey}
                            id="btn_iniciar"
                            type="button"
                            className="btn btn-success">
                            Validar
                            </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FormaDigitalForm;