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
import ErrorInputMsg from '../singles/ErrorInputMsg';

const DatosIndividuo = (props) => {
    const { state, setState, validacion} = props

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



    const fillInfoCurp = () => {
        /* Extrae la informacion de la CURP y autocompleta fechga de nacimiento y sexo  */

        const dataExtracted = (typeof state.persona_fisica_curp != 'undefined') ? extractInfoCurp(state.persona_fisica_curp) : ''
        setState({
            ...state,
            persona_fisica_fecha_nacimiento: moment(`${dataExtracted.anio}-${dataExtracted.mes}-${dataExtracted.dia}`, "YY-MM-DD").format("YYYY-MM-DD"),
            persona_fisica_sexo_id: (dataExtracted.sexo === 'H') ? 1 : 2,
            persona_fisica_nacionalidad_id: dataExtracted.nacionalidad
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
                {/* nombre */}
                <div className={`col-md-4 py5 ${(validacion.persona_fisica_nombre) ? 'has-error' : null}`}>
                    <label className="control-label" htmlFor="persona_fisica_nombre">Nombre(s) *:</label>
                    <input
                        defaultValue={state.persona_fisica_nombre}
                        name="persona_fisica_nombre"
                        className="form-control"
                        maxLength={45}
                        minLength={5}
                        type="text"
                        onChange={setInfo}
                        placeholder="Ingresa Nombre"
                    />
                    {validacion.persona_fisica_nombre && <ErrorInputMsg />}
                </div>
                {/* apellido paterno */}
                <div className={`col-md-4 py5 ${(validacion.persona_fisica_apellido_paterno) ? 'has-error' : null}`}>
                    <label className="control-label" htmlFor="persona_fisica_apellido_paterno">Apellido Paterno *:</label>
                    <input
                        defaultValue={state.persona_fisica_apellido_paterno}
                        className="form-control"
                        type="text"
                        name="persona_fisica_apellido_paterno"
                        maxLength={45}
                        minLength={5}
                        placeholder="Ingresa Apellido Paterno"
                        onChange={setInfo}
                    />
                    {/* max 13 min 13 */}
                    {validacion.persona_fisica_apellido_paterno && <ErrorInputMsg />}
                </div>
                {/* apellido  materno */}
                <div className={`col-md-4 py5 ${(validacion.persona_fisica_apellido_materno) ? 'has-error' : null}`}>
                    <label className="control-label" htmlFor="apellido_m">Apellido Materno :</label>
                    <input
                        defaultValue={state.persona_fisica_apellido_materno}
                        className="form-control"
                        type="text"
                        name="persona_fisica_apellido_materno"
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
                {/* curp */}
                <div className={`col-md-6 col-lg-6 py5 ${(validacion.persona_fisica_curp) ? 'has-error' : null}`}
                    onBlur={fillInfoCurp}
                >
                    <label className="control-label" htmlFor="persona_fisica_curp">Clave Única de Registro de Población (CURP) *:</label>
                    <InputCURP
                        name="persona_fisica_curp"
                        className="form-control"
                        defaultValue={state.persona_fisica_curp}
                        placeholder="Ingresa CURP"
                        onChange={setInfo}
                        curp={state.persona_fisica_curp}
                        onKeyDownCapture={ToMayus}
                        onBlur={curpValida}
                    />
                    {validacion.persona_fisica_curp && <ErrorInputMsg />}
                </div>
                <div className="col-md-3 pt25">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => redirectToCURP()} >
                        Generar o consultar
                    </button>
                </div>
                {/* sexo_id */}
                <div className={`col-md-3 ${(validacion.persona_fisica_sexo_id) ? 'has-error' : null}`}>
                    <label className="control-label" htmlFor="persona_fisica_sexo_id">Sexo <span className="form-text">*</span>:</label>
                    <SelectSexo
                        className='form-control'
                        defaultValue={state.persona_fisica_sexo_id}
                        name='persona_fisica_sexo_id'
                        onChange={setInfo}
                    />
                    {validacion.persona_fisica_sexo_id && <ErrorInputMsg />}
                </div>
            </div>
            <div className="row py5">
                {/* rfc */}
                <div className={`col-md-6 ${(validacion.persona_fisica_rfc) ? 'has-error' : null}`}>
                    <label className="control-label" htmlFor="persona_fisica_rfc">Registro Federal de Contribuyentes (RFC) *:</label>
                    <InputRFC
                        className='form-control'
                        placeholder='RFC Persona física'
                        defaultValue={state.persona_fisica_rfc}
                        rfc={state.persona_fisica_rfc}
                        onKeyPressCapture={ToMayus}
                        onChange={setInfo}
                        name='persona_fisica_rfc'
                    />
                    {validacion.persona_fisica_rfc && <ErrorInputMsg />}
                </div>
                {/* documento acreditacion */}
                <div className={`col-md-6 ${(validacion.persona_fisica_doc_acreditacion_id) ? 'has-error' : null}`}>
                    <label className="control-label">Documento con el que te acreditas<span className="form-text">*</span>:</label>
                    <SelectDocAcreditacion
                        data={documentos_acreditacion}
                        className='form-control'
                        name='persona_fisica_doc_acreditacion_id'
                        key='persona_fisica_doc_acreditacion_id'
                        onChange={setInfo}
                    />
                    {validacion.persona_fisica_doc_acreditacion_id && <ErrorInputMsg />}
                </div>
            </div>
            <div className="row py5">
                {/* edo nacimiento */}
                <div className={`col-md-4 ${(validacion.persona_fisica_estado_nacimiento_id) ? 'has-error' : null}`}>
                    <label className="control-label">Estado de Nacimiento<span className="form-text">*</span>:</label>
                    <SelectEstados
                        data={estados}
                        className="form-control"
                        name='persona_fisica_estado_nacimiento_id'
                        key='persona_fisica_estado_nacimiento_id'
                        onChange={setInfo}
                    />
                    {validacion.persona_fisica_estado_nacimiento_id && <ErrorInputMsg />}
                </div>
                {/* fecha nacimiento */}
                <div className={`col-md-4 ${(validacion.persona_fisica_fecha_nacimiento) ? 'has-error' : null}`}>
                    <label className="control-label" htmlFor="persona_fisica_fecha_nacimiento">Fecha de nacimiento<span className="form-text">*</span>:</label>
                    <input
                        name="persona_fisica_fecha_nacimiento"
                        className="form-control"
                        type="date"
                        placeholder="DD/MM/AAAA"
                        onChange={setInfo}
                        defaultValue={state.persona_fisica_fecha_nacimiento}
                    />
                    {validacion.persona_fisica_fecha_nacimiento && <ErrorInputMsg />}
                </div>
                {/* estado  civil */}
                <div className={`col-md-4`}>
                    <label className="control-label">Estado Civíl:</label>
                    <SelectEdoCivil
                        data={estados_civiles}
                        name="persona_fisica_estado_civil_id"
                        key="persona_fisica_estado_civil_id"
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
                        name="persona_fisica_telefono"
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
                        name="persona_fisica_celular"
                        type="text"
                        maxLength={10}
                        minLength={10}
                        className="form-control"
                        placeholder="Teléfono móvil"
                        onChange={setInfo}
                    />
                </div>
                {/* nacionalidad_id */}
                <div className={`col-md-6 py5 ${(validacion.persona_fisica_nacionalidad_id) ? 'has-error' : null}`}>
                    <label className="control-label" htmlFor="nacionalidad">
                        Nacionalidad
                        <span className="form-text">*</span>:
                    </label>
                    <SelectNacionalidad
                        defaultValue={state.persona_fisica_nacionalidad_id}
                        data={nacionalidades}
                        onChange={setInfo}
                        className="form-control"
                        name="persona_fisica_nacionalidad_id"
                        key="persona_fisica_nacionalidad_id"
                    />
                    {validacion.persona_fisica_nacionalidad_id && <ErrorInputMsg />}
                </div>
                {/* etnia_id */}
                <div className={`col-md-6 py5 ${(validacion.persona_fisica_tipo_etnia_id) ? 'has-error' : null}`}>
                    <label className="control-label" htmlFor="persona_fisica_tipo_etnia_id">Grupo indígena de pertenencia <span className="form-text">*</span>:</label>
                    <SelectEtnias
                        data={tipos_etnias}
                        className="form-control"
                        name="persona_fisica_tipo_etnia_id"
                        onChange={setInfo}
                    />
                    {validacion.persona_fisica_tipo_etnia_id && <ErrorInputMsg />}
                </div>
            </div>
        </React.Fragment>
    );
}

export default DatosIndividuo;