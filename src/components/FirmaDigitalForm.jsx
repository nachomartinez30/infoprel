import React, { useState, useContext, useEffect } from 'react'
import { Redirect } from "react-router-dom";

import InputRFC from '../singles/InputRFC'
import AlertCargando from '../singles/AlertCargando'
import AlertError from '../singles/AlertError'
import AlertAdvertencia from '../singles/AlertAdvertencia'
import AlertExito from '../singles/AlertExito';
/* CONTEXT */
import apoyosContext from "./../context/apoyos/apoyosContext";
/* Helpers */
import ToMayus from '../helpers/ToMayus'

const FormaDigitalForm = (props) => {


    const apoyoContext = useContext(apoyosContext);
    const { pass, agregarCertYKey } = apoyoContext.checkCertState;


    /* state principal para envio de datos a State global */
    const [valores, setValores] = useState({
        certificado: '',
        llave: '',
        rfc: '',
        pass: '',
        cerValido: null
    })

    const [rfcToCheck, setRfcToCheck] = useState({})

    useEffect(() => {
        agregarCertYKey(valores);
    }, [valores.cerValido, rfcToCheck])

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

    const checkCERTKey = () => {


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
            let API_REST = process.env.REACT_APP_BACKEN_URL;


            fetch(`${API_REST}firma_digital/check_sign`, requestOptions)
                .then(response => response.json())
                .then(result => {

                    if (result.valid) {
                        AlertExito('Firma valida!');
                        setValores({
                            ...valores,
                            cerValido: result.valid
                        })
                        /* regarga de componente */
                    } else {
                        AlertError('La firma no es valida');
                    }
                })
                .catch(error => {
                    AlertError('Error al validar firma', error)
                    console.error('error', error)
                });
        } else {
            AlertAdvertencia('Faltan datos')
        }
    }


    /* metodos para la validacion de RFC y mayus */
    const { rfc } = valores


    return (
        <section>
            <div>
                <div className="row">
                    <div className="col-md-6 col-md-offset-3 ">
                        <label><b>RFC del beneficiario:</b></label>
                        <InputRFC
                            className='form-control'
                            defaultValue={rfc}
                            name='rfc'
                            rfc={rfc}
                            onChange={getDatos}
                            onKeyPressCapture={ToMayus}
                            placeholder='Ingrese RFC de beneficiario'
                        />
                    </div>
                    <div className="col-md-6 col-md-offset-3 py5">
                        <label><b>Certificado (.cer):</b></label>
                        <input
                            onBlur={getDatos}
                            id="certificado"
                            type="file"
                            name="certificado"
                            className="form-control"
                            accept=".cer"
                        />
                    </div>
                    <div className="col-md-6 col-md-offset-3 py5">
                        <label><b>Clave privada (.key):</b></label>
                        <input
                            accept=".key"
                            onBlur={getDatos}
                            id="llave"
                            type="file"
                            name="llave"
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-6 col-md-offset-3 py5">
                        <label ><b>Contraseña de clave privada:</b></label>
                        <input
                            onBlur={getDatos}
                            defaultValue={pass}
                            id="pass"
                            type="password"
                            name="pass"
                            className="form-control"
                            placeholder="Contraseña"
                        />
                        <div className="col-md-4 col-md-offset-4 pull-right">
                            <br />
                            <button
                                onClick={checkCERTKey}
                                id="btn_iniciar"
                                type="button"
                                className="btn btn-success">
                                {props.textButton}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* si el certificado  */}
            {valores.cerValido && <Redirect to='/generales' />}
        </section>
    );
}

export default FormaDigitalForm;