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

    const { state, setState } = props

    useEffect(() => {
        // cuando el state cambia
    }, [state])


    const setInfo = (input) => {
        setState({
            ...state,
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
        FnacimientoF,
        nacionalidad_fisica
    } = state

    const fillDatosByCURP = () => {
        /* rellena los datos de genero y echa de nacimiento de persona fisica */
        if (typeof curp_fisica !== 'undefined') {
            if (curp_fisica.length >= 18) {
                /* EXCTRAE DEL HELPER LA INFORMACION PARA RELLENAR */
                const infoCurp = extractInfoCurp(curp_fisica)
                setState({
                    ...state,
                    FnacimientoF: moment(`${infoCurp.anio}-${infoCurp.mes}-${infoCurp.dia}`, "YY-MM-DD").format("YYYY-MM-DD"),
                    sexo_fisica: (infoCurp.sexo === 'H') ? 1 : 2,
                    nacionalidad_fisica: infoCurp.nacionalidad
                })
            }
        }
    }

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
                <div className="col-md-6 col-lg-6 py5"
                    onBlur={fillDatosByCURP}
                >
                    <label className="control-label" htmlFor="curp_fisica">Clave Única de Registro de Población (CURP) *:</label>
                    <InputCURP
                        name="curp_fisica"
                        id="curp_fisica"
                        className="form-control"
                        defaultValue={curp_fisica}
                        placeholder="Ingresa tu CURP"
                        onChange={setInfo}
                        curp={curp_fisica}
                        onKeyDownCapture={ToMayus}
                        onBlur={curpValida}
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
                        defaultValue={sexo_fisica}
                        name='sexo_fisica'
                        key='sexo_fisica'
                        onChange={setInfo}
                    />
                </div>
            </div>
            <div className="row py5">
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="control-label" htmlFor="rfc_fisica">Registro Federal de Contribuyentes (RFC) *:</label>
                        <InputRFC
                            className='form-control'
                            placeholder='RFC Persona física'
                            rfc={rfc_fisica}
                            onKeyPressCapture={ToMayus}
                            onChange={setInfo}
                            name='rfc_fisica'
                            key='rfc_fisica'
                        />

                        <small className="form-text form-text-error" htmlFor="rfc_fisica" style={{ display: 'none' }}>RFC necesario</small>
                    </div>
                </div>
                <div className="col-md-6">
                    <label className="control-label">Documento con el que te acreditas<span className="form-text">*</span>:</label>
                    <SelectDocAcreditacion
                        data={documentos_acreditacion}
                        className='form-control'
                        name='doc_acredita_fisica'
                        key='doc_acredita_fisica'
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
                        name="estado_nac_fis"
                        key='estado_nac_fis'
                        onChange={setInfo}
                    />

                    <small className="form-text form-text-error" style={{ display: 'none' }} />
                </div>
                <div className="col-md-4">
                    <label className="control-label" htmlFor="FnacimientoF">Fecha de nacimiento<span className="form-text">*</span>:</label>
                    <input
                        name="FnacimientoF"
                        className="form-control"
                        type="date"
                        placeholder="DD/MM/AAAA"
                        onChange={setInfo}
                        defaultValue={FnacimientoF}
                    />
                    <small htmlFor="FnacimientoF" className="form-text form-text-error" style={{ display: 'none' }}>Dato necesario</small>
                </div>
                <div className="col-md-4">
                    <label className="control-label">Estado Civil<span className="form-text">*</span>:</label>
                    <SelectEdoCivil
                        data={estados_civiles}
                        name="edo_civil_fisica"
                        key="edo_civil_fisica"
                        className="form-control"
                        onChange={setInfo}
                    />
                </div>
            </div>
            <div className="row py5">
                <div className="col-md-4">
                    <label className="control-label" htmlFor="nacionalidad_fisica">Nacionalidad
        <span className="form-text">*</span>:</label>
                    <SelectNacionalidad
                        defaultValue={nacionalidad_fisica}
                        data={nacionalidades}
                        onChange={setInfo}
                        className="form-control"
                        name="nacionalidad_fisica"
                        key="nacionalidad_fisica"
                    />
                    <small htmlFor="nacionalidad_fisica" className="form-text form-text-error" style={{ display: 'none' }} />
                </div>
                <div className="col-md-3">
                    <label htmlFor="phone">Teléfono fijo:</label>
                    <input
                        onChange={setInfo}
                        name="telefono_fisica"
                        type="text"
                        maxLength={10}
                        className="form-control"
                        placeholder="Teléfono fijo"
                    />
                    {/* solo numeros */}
                    <small className="form-text form-text-error" style={{ display: 'none' }} />
                </div>
                <div className="col-md-3">
                    <label htmlFor="phone">Teléfono móvil:</label>
                    <input
                        name="movil_fisica"
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
                <div className="col-md-6">
                    <label className="control-label">Como beneficiario eres<span className="form-text">*</span>:</label>
                    <SelectTipoPersona
                        data={personalidades_juridicas_F}
                        key='tipo_persona'
                        name="tipo_persona"
                        className="form-control"
                        onChange={setInfo}
                    />
                </div>
                <div className="col-md-6">
                    <label className="control-label" htmlFor="etniaF">Grupo indígena de pertenencia:</label>
                    <SelectEtnias
                        data={tipos_etnias}
                        className="form-control"
                        name="etniaF"
                        key="etniaF"
                        onChange={setInfo}
                    />
                </div>
            </div>
        </React.Fragment>
    );
}

export default InfoPersonaFisica;