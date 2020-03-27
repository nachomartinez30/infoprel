import React, { useEffect, useContext } from 'react'
import moment from 'moment'
/* HELPERS */
import ToMayus from '../helpers/ToMayus'
import curpValida from '../helpers/curpValida'
import extractInfoCurp from '../helpers/extractInfoCurp';
/* componentes propios */
import LineaDivision from "../singles/LineaDivision";
import InputRFC from '../singles/InputRFC'
import SelectSexo from '../singles/SelectSexo';
import SelectDocAcreditacion from '../singles/SelectDocAcreditacion';
import SelectEstados from '../singles/SelectEstados';
import SelectEdoCivil from '../singles/SelectEdoCivil';
import SelectNacionalidad from '../singles/SelectNacionalidad';
import SelectTipoPersona from '../singles/SelectTipoPersona';
import SelectEtnias from '../singles/SelectEtnias';
import redirectToCURP from '../helpers/redirectToCURP';
import InputCURP from '../singles/InputCURP';
import ErrorInputMsg from '../singles/ErrorInputMsg';
/* CONTEXT */
import catalogosContext from "./../context/catalogos/catalogosContext";


const InfoPersonaFisica = (props) => {

    const catsContext = useContext(catalogosContext)
    const {
        nacionalidades,
        tipos_etnias,
        estados_civiles,
        documentos_acreditacion,
        personalidades_juridicas_F,
        estados
    } = catsContext.catalogos

    const { state, setState, validacion, id_section } = props

    useEffect(() => {
        // cuando el state cambia
    }, [state])


    const setInfo = (input) => {
        setState({
            ...state,
            [input.target.name]: input.target.value
        })
    }

    /* VALORES SDEL STATE */
    const {
        nombre,
        apellido_paterno,
        apellido_materno,
        curp,
        sexo_id,
        rfc,
        fecha_nacimiento,
        nacionalidad_id,
    } = state

    const fillDatosByCURP = () => {
        /* rellena los datos de genero y echa de nacimiento de persona fisica */
        if (typeof curp !== 'undefined') {
            if (curp.length >= 18) {
                /* EXCTRAE DEL HELPER LA INFORMACION PARA RELLENAR */
                const infoCurp = extractInfoCurp(curp)
                setState({
                    ...state,
                    fecha_nacimiento: moment(`${infoCurp.anio}-${infoCurp.mes}-${infoCurp.dia}`, "YY-MM-DD").format("YYYY-MM-DD"),
                    sexo_id: (infoCurp.sexo === 'H') ? 1 : 2,
                    nacionalidad_id: infoCurp.nacionalidad
                })
            }
        }
    }

    return (
        <div id={id_section}>
            <div className="row top-buffer">
                <div className="col-md-12">
                    <h2>Datos Persona Física</h2>
                    <LineaDivision />
                </div>
            </div>
            <div className="row py5">
                <div className={`col-md-4 ${(validacion.nombre) ? 'has-error' : null}`}>
                    <label className="control-label" htmlFor="nombre">Nombre(s) *:</label>
                    <input
                        defaultValue={nombre}
                        className="form-control"
                        maxLength={45}
                        minLength={5}
                        type="text"
                        name="nombre"
                        onChange={setInfo}
                        placeholder="Ingresa tu Nombre"
                    />
                    {/* max 13 min 13 */}
                    {validacion.nombre && <ErrorInputMsg />}
                </div>
                <div className={`col-md-4 ${(validacion.apellido_paterno) ? 'has-error' : null}`}>
                    <label className="control-label" htmlFor="apellido_paterno">Apellido Paterno *:</label>
                    <input
                        defaultValue={apellido_paterno}
                        className="form-control"
                        type="text"
                        name="apellido_paterno"
                        maxLength={45}
                        minLength={5}
                        placeholder="Ingresa tu Apellido Paterno"
                        onChange={setInfo}
                    />
                    {/* max 13 min 13 */}
                    {validacion.apellido_paterno && <ErrorInputMsg />}
                </div>
                <div className={`col-md-4 ${(validacion.apellido_materno) ? 'has-error' : null}`}>
                    <label className="control-label" htmlFor="apellido_materno">Apellido Materno :</label>
                    <input
                        defaultValue={apellido_materno}
                        className="form-control"
                        type="text"
                        name="apellido_materno"
                        maxLength={45}
                        minLength={5}
                        placeholder="Ingresa tu Apellido Materno"
                        onChange={setInfo}
                    />
                    {/* max 13 min 13 */}
                    {validacion.apellido_materno && <ErrorInputMsg />}
                </div>
            </div>
            <div className="row py5">
                <div className={`col-md-6 col-lg-6 py5  ${(validacion.curp) ? 'has-error' : null}`}
                    onBlur={fillDatosByCURP}
                >
                    <label className="control-label" htmlFor="curp">Clave Única de Registro de Población (CURP) *:</label>
                    <InputCURP
                        name="curp"
                        className="form-control"
                        defaultValue={curp}
                        placeholder="Ingresa tu CURP"
                        onChange={setInfo}
                        curp={curp}
                        onKeyDownCapture={ToMayus}
                        onBlur={curpValida}
                    />
                    {validacion.curp && <ErrorInputMsg />}
                </div>
                <div className={`col-md-3 pt25`}>
                    <input
                        type="button"
                        className="btn btn-primary"
                        defaultValue="Generar o consultar"
                        onClick={() => redirectToCURP()} />
                </div>
                <div className={`col-md-3 m-t-10 ${(validacion.sexo_id) ? 'has-error' : null}`}>
                    <label className="control-label" htmlFor="sexo_id">Sexo <span className="form-text">*</span>:</label>
                    <SelectSexo
                        className='form-control'
                        defaultValue={sexo_id}
                        name='sexo_id'
                        key='sexo_id'
                        onChange={setInfo}
                    />
                    {validacion.sexo_id && <ErrorInputMsg />}
                </div>
            </div>
            <div className="row py5">
                <div className={`col-md-6 ${(validacion.rfc) ? 'has-error' : null}`}>
                    <label className="control-label" htmlFor="rfc">Registro Federal de Contribuyentes (RFC) *:</label>
                    <InputRFC
                        className='form-control'
                        placeholder='RFC Persona física'
                        rfc={rfc}
                        onKeyPressCapture={ToMayus}
                        onChange={setInfo}
                        name='rfc'
                        key='rfc'
                    />
                    {validacion.rfc && <ErrorInputMsg />}
                </div>
                <div className={`col-md-6 ${(validacion.doc_acreditacion_id) ? 'has-error' : null}`}>
                    <label className="control-label">Documento con el que te acreditas<span className="form-text">*</span>:</label>
                    <SelectDocAcreditacion
                        data={documentos_acreditacion}
                        className='form-control'
                        name='doc_acreditacion_id'
                        key='doc_acreditacion_id'
                        onChange={setInfo}
                    />
                    {validacion.doc_acreditacion_id && <ErrorInputMsg />}
                </div>
            </div>
            <div className="row py5">
                <div className={`col-md-4 ${(validacion.estado_nacimiento_id) ? 'has-error' : null}`}>
                    <label className="control-label">Estado de Nacimiento<span className="form-text">*</span>:</label>
                    <SelectEstados
                        data={estados}
                        className="form-control"
                        name="estado_nacimiento_id"
                        key='estado_nacimiento_id'
                        onChange={setInfo}
                    />

                    {validacion.estado_nacimiento_id && <ErrorInputMsg />}
                </div>
                <div className={`col-md-4 ${(validacion.fecha_nacimiento) ? 'has-error' : null}`}>
                    <label className="control-label" htmlFor="fecha_nacimiento">Fecha de nacimiento<span className="form-text">*</span>:</label>
                    <input
                        name="fecha_nacimiento"
                        className="form-control"
                        type="date"
                        placeholder="DD/MM/AAAA"
                        onChange={setInfo}
                        defaultValue={fecha_nacimiento}
                    />
                    {validacion.fecha_nacimiento && <ErrorInputMsg />}
                </div>
                <div className={`col-md-4 ${(validacion.estado_civil_id) ? 'has-error' : null}`}>
                    <label className="control-label">Estado Civil<span className="form-text">*</span>:</label>
                    <SelectEdoCivil
                        data={estados_civiles}
                        name="estado_civil_id"
                        key="estado_civil_id"
                        className="form-control"
                        onChange={setInfo}
                    />
                    {validacion.estado_civil_id && <ErrorInputMsg />}
                </div>
            </div>
            <div className="row py5">
                <div className={`col-md-4 ${(validacion.nacionalidad_id) ? 'has-error' : null}`}>
                    <label className="control-label" htmlFor="nacionalidad_fisica">Nacionalidad
        <span className="form-text">*</span>:</label>
                    <SelectNacionalidad
                        defaultValue={nacionalidad_id}
                        data={nacionalidades}
                        onChange={setInfo}
                        className="form-control"
                        name="nacionalidad_id"
                        key="nacionalidad_id"
                    />
                    {validacion.nacionalidad_id && <ErrorInputMsg />}
                </div>
                <div className={`col-md-3`}>
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
                    {validacion.nacionalidad_id && <ErrorInputMsg />}
                </div>
                <div className={`col-md-3`}>
                    <label htmlFor="phone">Teléfono móvil:</label>
                    <input
                        name="celular"
                        type="text"
                        maxLength={10}
                        minLength={10}
                        className="form-control"
                        placeholder="Teléfono móvil"
                        onChange={setInfo}
                    />
                </div>
            </div>
            <div className="row py5">
                <div className={`col-md-6 ${(validacion.tipo_persona) ? 'has-error' : null}`}>
                    <label className="control-label">Como beneficiario eres<span className="form-text">*</span>:</label>
                    <SelectTipoPersona
                        data={personalidades_juridicas_F}
                        key='tipo_persona'
                        name="tipo_persona"
                        className="form-control"
                        onChange={setInfo}
                    />
                </div>
                <div className={`col-md-6 ${(validacion.tipos_etnias) ? 'has-error' : null}`}>
                    <label className="control-label" htmlFor="tipo_etnia_id">Grupo indígena de pertenencia<span>*</span>:</label>
                    <SelectEtnias
                        data={tipos_etnias}
                        className="form-control"
                        name="tipo_etnia_id"
                        key="tipo_etnia_id"
                        onChange={setInfo}
                    />
                    {validacion.tipos_etnias && <ErrorInputMsg />}
                </div>
            </div>
        </div>
    );
}

export default InfoPersonaFisica;