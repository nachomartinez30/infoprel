import React, { useState, useContext } from 'react'
import moment from "moment";
/* HELPERS */
import ToMayus from '../helpers/ToMayus'
import curpValida from '../helpers/curpValida'
import redirectToCURP from '../helpers/redirectToCURP'
import extractInfoCurp from '../helpers/extractInfoCurp'
/* COMPONENTES PROPIOS */
import InputCURP from '../singles/InputCURP'
import InputRFC from '../singles/InputRFC'
import SelectNacionalidad from '../singles/SelectNacionalidad'
import SelectEtnias from '../singles/SelectEtnias'
import SelectSexo from '../singles/SelectSexo'
import SelectDocAcreditacion from '../singles/SelectDocAcreditacion'
import SelectEstados from '../singles/SelectEstados'
import SelectEdoCivil from '../singles/SelectEdoCivil'
/* CONTEXT */
import catalogosContext from "./../context/catalogos/catalogosContext";

const DatosIndividuo = (props) => {

    /* *******************************************************************
     * componente que permite registrar en un STATE que se pase por PROPS
     * los datos basicos de una persona fisica
     * requiere pasar state y metodo para setear sus valores
     * *******************************************************************/

    const catsContext = useContext(catalogosContext)
    const {
        nacionalidades,
        tipos_etnias,
        estados_civiles,
        documentos_acreditacion,
        personalidades_juridicas_F,
        estados
    } = catsContext.catalogos


    const { state, setState } = props

    const fillInfoCurp = () => {

        /* Extrae la informacion de la CURP y autocompleta fechga de nacimiento y sexo  */

        const dataExtracted = extractInfoCurp(state.curp)
        setState({
            ...state,
            fecha_nacimiento: moment(`${dataExtracted.anio}-${dataExtracted.mes}-${dataExtracted.dia}`, "YY-MM-DD").format("YYYY-MM-DD"),
            sexo: (dataExtracted.sexo === 'H') ? 1 : 2,
            nacionalidad: dataExtracted.nacionalidad
        })
    }

    const setInfo = (input) => {
        /* setea al state las variables */
        setState({
            ...state,
            [input.target.name]: input.target.value
        })
    }


    return (
        <React.Fragment>
            <div className="row py5">
                <div className="col-md-4 py5">
                    <label className="control-label" htmlFor="nombre">Nombre(s) *:</label>
                    <input
                        defaultValue={state.nombre}
                        name="nombre"
                        className="form-control"
                        maxLength={45}
                        minLength={5}
                        type="text"
                        onChange={setInfo}
                        placeholder="Ingresa Nombre"
                    />
                    {/* max 13 min 13 */}
                    <small className="form-text form-text-error" htmlFor="nombre" style={{ display: 'none' }}>Nombre necesario</small>
                </div>
                <div className="col-md-4 py5">
                    <label className="control-label" htmlFor="apellido_p">Apellido Paterno *:</label>
                    <input
                        defaultValue={state.apellido_paterno}
                        className="form-control"
                        type="text"
                        name="apellido_paterno"
                        maxLength={45}
                        minLength={5}
                        placeholder="Ingresa Apellido Paterno"
                        onChange={setInfo}
                    />
                    {/* max 13 min 13 */}
                    <small className="form-text form-text-error" htmlFor="apellido_p" style={{ display: 'none' }}>Apellido necesario</small>
                </div>
                <div className="col-md-4 py5">
                    <label className="control-label" htmlFor="apellido_m">Apellido Materno :</label>
                    <input
                        defaultValue={state.apellido_materno}
                        className="form-control"
                        type="text"
                        name="apellido_materno"
                        maxLength={45}
                        minLength={5}
                        placeholder="Ingresa Apellido Materno"
                        onChange={setInfo}
                    />
                    {/* max 13 min 13 */}
                    <small className="form-text form-text-error" htmlFor="apellido_m" style={{ display: 'none' }}>Apellido necesario</small>
                </div>
            </div>
            <div className="row py5">
                <div className="col-md-6 col-lg-6 py5"
                    onBlur={fillInfoCurp}
                >
                    <label className="control-label" htmlFor="curp">Clave Única de Registro de Población (CURP) *:</label>
                    <InputCURP
                        name="curp"
                        className="form-control"
                        defaultValue={state.curp}
                        placeholder="Ingresa CURP"
                        onChange={setInfo}
                        curp={state.curp}
                        onKeyDownCapture={ToMayus}
                        onBlur={curpValida}
                    />
                    <small className="form-text form-text-error" id="msg_error_curp" htmlFor="curp" style={{ display: 'none' }}>CURP necesaria</small>
                </div>
                <div className="col-md-3 pt25">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => redirectToCURP()} >
                        Generar o consultar
                    </button>
                </div>
                <div className="col-md-3 m-t-10">
                    <label className="control-label" htmlFor="sexo">Sexo <span className="form-text">*</span>:</label>
                    <SelectSexo
                        className='form-control'
                        defaultValue={state.sexo}
                        name='sexo'
                        onChange={setInfo}
                    />
                </div>
            </div>
            <div className="row py5">
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="control-label" htmlFor="rfc">Registro Federal de Contribuyentes (RFC) *:</label>
                        <InputRFC
                            className='form-control'
                            placeholder='RFC Persona física'
                            defaultValue={state.rfc}
                            rfc={state.rfc}
                            onKeyPressCapture={ToMayus}
                            onChange={setInfo}
                            name='rfc'
                        />
                        <small className="form-text form-text-error" htmlFor="rfc" style={{ display: 'none' }}>RFC necesario</small>
                    </div>
                </div>
                <div className="col-md-6">
                    <label className="control-label">Documento con el que te acreditas<span className="form-text">*</span>:</label>
                    <SelectDocAcreditacion
                        data={documentos_acreditacion}
                        className='form-control'
                        name='doc_acredita'
                        key='doc_acredita'
                        onChange={setInfo}
                    />
                </div>
            </div>
            <div className="row py5">
                <div className="col-md-4">
                    <label className="control-label">Estado de Nacimiento<span className="form-text">*</span>:</label>
                    <SelectEstados
                        data={estados}
                        className="form-control"
                        name={"estado_nac_fis"}
                        key='estado_nac_fis'
                        onChange={setInfo}
                    />

                    <small className="form-text form-text-error" style={{ display: 'none' }} />
                </div>
                <div className="col-md-4">
                    <label className="control-label" htmlFor="FnacimientoF">Fecha de nacimiento<span className="form-text">*</span>:</label>
                    <input
                        name="fecha_nacimiento"
                        className="form-control"
                        type="date"
                        placeholder="DD/MM/AAAA"
                        onChange={setInfo}
                        defaultValue={state.fecha_nacimiento}
                    />
                    <small htmlFor="FnacimientoF" className="form-text form-text-error" style={{ display: 'none' }}>Dato necesario</small>
                </div>
                <div className="col-md-4">
                    <label className="control-label">Estado Civil<span className="form-text">*</span>:</label>
                    <SelectEdoCivil
                        data={estados_civiles}
                        name={"edo_civil"}
                        key="edo_civil"
                        className="form-control"
                        onChange={setInfo}
                    />
                </div>
            </div>
            <div className="row py5">

                <div className="col-md-6 py5">
                    <label htmlFor="phone">Teléfono fijo:</label>
                    <input
                        onChange={setInfo}
                        name="telefono"
                        type="text"
                        maxLength={10}
                        className="form-control"
                        placeholder="Teléfono fijo"
                    />
                    {/* solo numeros */}
                    <small className="form-text form-text-error" style={{ display: 'none' }} />
                </div>
                <div className="col-md-6 py5">
                    <label htmlFor="phone">Teléfono móvil:</label>
                    <input
                        name="movil"
                        type="text"
                        maxLength={10}
                        minLength={10}
                        className="form-control"
                        placeholder="Teléfono móvil"
                        onChange={setInfo}
                    />
                </div>
                <div className="col-md-6 py5">
                    <label className="control-label" htmlFor="nacionalidad">
                        Nacionalidad
                        <span className="form-text">*</span>:
                    </label>
                    <SelectNacionalidad
                        defaultValue={state.nacionalidad}
                        data={nacionalidades}
                        onChange={setInfo}
                        className="form-control"
                        name="nacionalidad"
                        key="nacionalidad"
                    />
                    <small htmlFor="nacionalidad" className="form-text form-text-error" style={{ display: 'none' }} />
                </div>
                <div className="col-md-6 py5">
                    <label className="control-label" htmlFor="etniaF">Grupo indígena de pertenencia:</label>
                    <SelectEtnias
                        data={tipos_etnias}
                        className="form-control"
                        name="etnia"
                        onChange={setInfo}
                    />
                </div>
            </div>
        </React.Fragment>
    );
}

export default DatosIndividuo;