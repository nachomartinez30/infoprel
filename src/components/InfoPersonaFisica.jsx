import React, { useState, useEffect } from 'react'
import InputRFC from '../singles/InputRFC'
import LineaDivision from "../singles/LineaDivision";

/* Helpers */
import ToMayus from '../helpers/ToMayus'
import SelectSexo from '../singles/SelectSexo';
import SelectDocAcreditacion from '../singles/SelectDocAcreditacion';
import SelectEstados from '../singles/SelectEstados';


const InfoPersonaFisica = () => {

    const [infoP_FLocal, setInfoP_FLocal] = useState({})

    useEffect(() => {
        // cuando el state cambia
    }, [infoP_FLocal])

    const redirectToCURP = () => {
        window.open('https://consultas.curp.gob.mx/CurpSP/gobmx/inicio.jsp', '_blank')
    }

    // const validarLetrasyNumeros = e => {
    //     // e.preventDefault();
    //     const value = e.target.value.toUpperCase()
    //     const upperValue = value.toUpperCase()
    //     setInfoP_FLocal({
    //         ...infoP_FLocal,
    //         curp_fisica: upperValue
    //     })
    //     console.log(infoP_FLocal);

    // }




    const setInfo = (input) => {
        setInfoP_FLocal({
            ...infoP_FLocal,
            [input.target.name]: input.target.value
        })
    }

    const {
        nombre_fisica,
        apellido_p_fisica,
        apellido_m_fisica,
        curp_fisica,
        sexo_fisica,
        rfc_fisica,
        doc_acredita_fisica,
        estado_nac_fis,
        FnacimientoF,
        edo_civil_fisica,
        nacionalidad_fisica,
        telefono_fisica,
        movil_fisica,
        tipo_persona,
        etniaF,
    } = infoP_FLocal

    return (
        <React.Fragment>
            <div className="row top-buffer">
                <div className="col-md-12">
                    <h2>Datos Persona Física</h2>
                    <LineaDivision />
                </div>
            </div>
            <div className="row py5">
                <div className="col-md-4">
                    <label className="control-label" htmlFor="nombre">Nombre(s) *:</label>
                    <input
                        defaultValue={nombre_fisica}
                        className="form-control"
                        maxLength={45}
                        minLength={5}
                        type="text"
                        name="nombre_fisica"
                        onKeyPress={setInfo}
                        placeholder="Ingresa tu Nombre"
                    />
                    {/* max 13 min 13 */}
                    <small className="form-text form-text-error" htmlFor="nombre_fisica" style={{ display: 'none' }}>Nombre necesario</small>
                </div>
                <div className="col-md-4">
                    <label className="control-label" htmlFor="apellido_p_fisica">Apellido Paterno *:</label>
                    <input
                        defaultValue={apellido_p_fisica}
                        className="form-control"
                        type="text"
                        name="apellido_p_fisica"
                        maxLength={45}
                        minLength={5}
                        placeholder="Ingresa tu Apellido Paterno"
                        onChange={setInfo}
                    />
                    {/* max 13 min 13 */}
                    <small className="form-text form-text-error" htmlFor="apellido_p_fisica" style={{ display: 'none' }}>Apellido necesario</small>
                </div>
                <div className="col-md-4">
                    <label className="control-label" htmlFor="apellido_m_fisica">Apellido Materno :</label>
                    <input
                        defaultValue={apellido_m_fisica}
                        className="form-control"
                        type="text"
                        name="apellido_m_fisica"
                        maxLength={45}
                        minLength={5}
                        placeholder="Ingresa tu Apellido Materno"
                        onChange={setInfo}
                    />
                    {/* max 13 min 13 */}
                    <small className="form-text form-text-error" htmlFor="apellido_m_fisica" style={{ display: 'none' }}>Apellido necesario</small>
                </div>
            </div>
            <div className="row py5">
                <div className="col-md-6 col-lg-6 py5">
                    <label className="control-label" htmlFor="curp_fisica">Clave Única de Registro de Población (CURP) *:</label>
                    <input
                        name="curp_fisica"
                        id="curp_fisica"
                        className="form-control"
                        type="text"
                        maxLength={18}
                        minLength={18}
                        defaultValue={curp_fisica}
                        placeholder="Ingresa tu CURP"
                        onChange={setInfo}
                        onKeyDownCapture={ToMayus}
                    // onBlur="validacionCURP(this.value,this.name)"
                    />
                    <small className="form-text form-text-error" id="msg_error_curp" htmlFor="curp_fisica" style={{ display: 'none' }}>CURP necesaria</small>
                </div>
                <div className="col-md-3 pt25">
                    <input
                        type="button"
                        className="btn btn-primary"
                        defaultValue="Generar o consultar"
                        onClick={() => redirectToCURP()} />
                </div>
                <div className="col-md-3 m-t-10">
                    <label className="control-label" htmlFor="sexo_fisica">Sexo <span className="form-text">*</span>:</label>
                    <SelectSexo
                        className='form-control'
                        name='sexo_fisica'
                        key='sexo_fisica'
                    />
                </div>
            </div>
            <div className="row py5">
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="control-label" htmlFor="rfc_fisica">Registro Federal de Contribuyentes (RFC) *:</label>
                        <InputRFC
                            className='form-control'
                            labelText='Registro Federal de Contribuyentes (RFC) *:'
                            placeholder='RFC Persona física'
                            rfc={rfc_fisica}
                            onKeyPressCapture={ToMayus}
                            onChange={setInfo}
                            onBlur
                            name='rfc_fisica'
                            key='rfc_fisica'
                        />

                        <small className="form-text form-text-error" htmlFor="rfc_fisica" style={{ display: 'none' }}>RFC necesario</small>
                    </div>
                </div>
                <div className="col-md-6">
                    <label className="control-label">Documento con el que te acreditas<span className="form-text">*</span>:</label>
                    <SelectDocAcreditacion
                        className='form-control'
                        name='doc_acredita_fisica'
                        key='doc_acredita_fisica'
                    />
                </div>
            </div>
            <div className="row py5">
                <div className="col-md-4">
                    <label className="control-label">Estado de Nacimiento<span className="form-text">*</span>:</label>
                    <SelectEstados
                        className="form-control"
                        name="estado_nac_fis"
                        key='estado_nac_fis'
                    />
                    {/* <select className="form-control" name="estado_nac_fis">
                    </select> */}
                    <small htmlFor className="form-text form-text-error" style={{ display: 'none' }} />
                </div>
                <div className="col-md-4">
                    <label className="control-label" htmlFor="FnacimientoF">Fecha de nacimiento<span className="form-text">*</span>:</label>
                    <input name="FnacimientoF" className="form-control" type="date" placeholder="DD/MM/AAAA" defaultValue />
                    <small htmlFor="FnacimientoF" className="form-text form-text-error" style={{ display: 'none' }}>Dato necesario</small>
                </div>
                <div className="col-md-4">
                    <label className="control-label">Estado Civil<span className="form-text">*</span>:</label>
                    <select name="edo_civil_fisica" className="form-control">

                    </select>
                </div>
            </div>
            <div className="row py5">
                <div className="col-md-4">
                    <label className="control-label" htmlFor="nacionalidad_fisica">Nacionalidad
        <span className="form-text">*</span>:</label>
                    <select className="form-control" name="nacionalidad_fisica">
                        {/*?=$tipo_nacionalidad;?*/}
                    </select>
                    <small htmlFor="nacionalidad_fisica" className="form-text form-text-error" style={{ display: 'none' }} />
                </div>
                <div className="col-md-3">
                    <label htmlFor="phone">Teléfono fijo:</label>
                    <input name="telefono_fisica" type="text" maxLength={10} className="form-control" placeholder="Teléfono fijo"
                        onKeyPress="return ValidarNumeros(event)" defaultValue />
                    {/* solo numeros */}
                    <small className="form-text form-text-error" style={{ display: 'none' }} />
                </div>
                <div className="col-md-3">
                    <label htmlFor="phone">Teléfono móvil:</label>
                    <input name="movil_fisica" type="text" maxLength={10} minLength={10} className="form-control" placeholder="Teléfono móvil"
                        onKeyPress="return ValidarNumeros(event)" defaultValue />
                </div>
            </div>
            <div className="row py5">
                <div className="col-md-6">
                    <label className="control-label">Como persona física eres<span className="form-text">*</span>:</label>
                    <select name="tipo_persona" className="form-control">
                        {/*?=$tipo_solicitante_f;?*/}
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="control-label" htmlFor="etniaF">Grupo indígena de pertenencia:</label>
                    <select className="form-control" name="etniaF">
                        {/*?=$tipo_etnias;?*/}
                    </select>
                </div>
            </div>
        </React.Fragment >
    );
}

export default InfoPersonaFisica;