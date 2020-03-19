import React, { useState, useEffect, useContext } from 'react'
/* COMPONENTES PROPIOS */
import LineaDivision from '../singles/LineaDivision';
import InputRFC from '../singles/InputRFC';
import ToMayus from '../helpers/ToMayus';
import SelectTipoPersona from '../singles/SelectTipoPersona';
import SelectCatalogo from '../singles/SelectCatalogo';
/* HELPERS */
import selectAll from '../helpers/selectAll'
/* CONTEXT */
import catalogosContext from "./../context/catalogos/catalogosContext";
import SelectEstados from '../singles/SelectEstados';
import SelectEtnias from '../singles/SelectEtnias';

const InfoPersonaMoral = () => {

    const catsContext = useContext(catalogosContext)
    const {
        nacionalidades,
        tipos_etnias,
        estados_civiles,
        documentos_acreditacion,
        personalidades_juridicas_M,
        estados
    } = catsContext.catalogos


    const [infoP_MLocal, setInfoP_MLocal] = useState({
        inte_numero_hombres: 0,
        inte_numero_mujeres: 0,
        inte_total_integrantes: null,
        inte_hombres_indigenas: 0,
        inte_mujeres_indigenas: 0,
        inte_total_indigenas: null
    })


    const setInfo = (input) => {
        setInfoP_MLocal({
            ...infoP_MLocal,
            [input.target.name]: input.target.value
        })
    }


    const sumIntegrantes = () => {
        /* suma los integrantes y los asigna al total */
        const suma = parseInt(inte_numero_hombres) + parseInt(inte_numero_mujeres)
        setInfoP_MLocal({
            ...infoP_MLocal,
            inte_total_integrantes: suma
        })
    }

    const sumIntegrantesIndigenas = () => {
        /* suma los integrantes Indigenas y los asigna al total */
        const suma = parseInt(inte_hombres_indigenas) + parseInt(inte_mujeres_indigenas)
        setInfoP_MLocal({
            ...infoP_MLocal,
            inte_total_indigenas: suma
        })
    }


    const {
        rfc_moral,
        // nombre_fisica,
        // apellido_p_fisica,
        // apellido_m_fisica,
        // curp_fisica,
        // sexo_fisica,
        // rfc_fisica,
        // doc_acredita_fisica,
        // estado_nac_fis,
        // FnacimientoF,
        // edo_civil_fisica,
        // nacionalidad_fisica,
        // telefono_fisica,
        // movil_fisica,
        // tipo_persona,
        // etniaF,
        inte_hombres_indigenas,
        inte_mujeres_indigenas,
        inte_total_indigenas,
        inte_numero_hombres,
        inte_numero_mujeres,
        inte_total_integrantes
    } = infoP_MLocal


    useEffect(() => {
        console.log('Refres');

    }, [infoP_MLocal])

    return (
        <React.Fragment>
            <div className="row top-buffer">
                <div className="col-md-12">
                    <h2>Datos Persona Moral</h2>
                    <LineaDivision />
                </div>
            </div>

            <div className="row py5">
                <div className="col-md-4 py5">
                    <div className="form-group">
                        <label className="control-label" htmlFor="rfc_moral">Registro Federal de Contribuyentes (RFC)*: <span className="glyphicon glyphicon-question-sign emergente" data-title="No es obligatorio para ejidos y comunidades" /></label>
                        <InputRFC
                            name='rfc_moral'
                            className='form-control'
                            placeholder='RFC Persona moral'
                            rfc={rfc_moral}
                            onKeyPressCapture={ToMayus}
                            onChange={setInfo}
                        />
                        <small htmlFor="rfc_moral" className="form-text form-text-error" style={{ display: 'none' }}>Dato necesario</small>
                    </div>
                </div>
                <div className="col-md-4 py5">
                    <div className="form-group">
                        <label className="control-label">Como persona moral eres<span className="form-text">*</span>:</label>
                        <SelectTipoPersona
                            data={personalidades_juridicas_M}
                            name="tipo_persona"
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="col-md-4 py5">
                    <div className="form-group">
                        <label className="control-label">Documento de acreditación<span className="form-text">*</span>: <span className="glyphicon glyphicon-question-sign emergente" data-title="Documento con el que acreditas tu personalidad" /></label>
                        {/* cambiar selects por un Select catalogo */}
                        <SelectCatalogo
                            name="doc_acre_moral"
                            className="form-control"
                            data={documentos_acreditacion}
                        />
                        <small className="form-text form-text-error" style={{ display: 'none' }} />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4 py5">
                    <div className="form-group">
                        <label className="control-label">Denominación o razón social<span className="form-text">*</span>: <span className="glyphicon glyphicon-question-sign emergente" data-title="Evita cualquier tipo de abreviatura" /></label>
                        <input
                            name="razon_social_m"
                            className="form-control"
                            type="text"
                            placeholder="Ingresa la razón social"
                        />
                        <small className="form-text form-text-error" style={{ display: 'none' }} />
                    </div>
                </div>
                <div className="col-md-4 py5">
                    <div className="form-group">
                        <label className="control-label">Objeto social<span className="form-text">*</span>: <span className="glyphicon glyphicon-question-sign toll emergente" data-title="A qué se dedica tu empresa, grupo, institución, etc." /></label>
                        <input
                            name="objeto_social_m"
                            className="form-control"
                            type="text"
                            placeholder="Ingresa el objeto social"
                        />
                        <small className="form-text form-text-error" style={{ display: 'none' }} />
                    </div>
                </div>
                <div className="col-md-4 py5">
                    <label className="control-label">Estado<span className="form-text">*</span>:</label>
                    <SelectEstados
                        data={estados}
                        className="form-control"
                        name="estado_moral"
                    />
                    <small htmlFor="estado_moral" className="form-text form-text-error" style={{ display: 'none' }} />
                </div>
            </div>

            <div className="row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label htmlFor="mail">Descripción de actividad económica según inscripción en el RFC (SHCP):</label>
                        <input
                            name="SHCP_m"
                            className="form-control"
                            maxlenth={100}
                            placeholder="Ingresa la descripción de la actividad económica"
                        />
                    </div>
                </div>
                <div className="col-md-4 py5">
                    <div className="form-group">
                        <label className="control-label" htmlFor="etniaM">Etnia:</label>
                        <SelectEtnias
                            data={tipos_etnias}
                            className="form-control"
                            name="etniaM"
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4 py5">
                    <div className="form-group clearfix">
                        <div className="form-control-phone">
                            <label htmlFor="phone">Teléfono fijo:</label>
                            <input
                                name="telefono_moral"
                                type="number"
                                maxLength={10}
                                className="form-control"
                                placeholder="Teléfono fijo"
                            />
                            {/* solo numeros */}
                            <small className="form-text form-text-error" style={{ display: 'none' }} />
                        </div>
                    </div>
                </div>
                <div className="col-md-4 py5">
                    <div className="form-group ">
                        <div className="form-control-phone">
                            <label htmlFor="phone">Teléfono móvil:</label>
                            <input
                                name="movil_moral"
                                type="number"
                                maxLength={10}
                                minLength={10}
                                className="form-control"
                                placeholder="Teléfono móvil"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-4 py5">
                    <div className="form-group datepicker-group">
                        <label className="control-label" htmlFor="fecha_constitucion">Fecha de Constitucion<span className="form-text">*</span>:</label>
                        <input
                            name="fecha_constitucion"
                            className="ns form-control"
                            type="date"
                            placeholder="DD/MM/AAAA"
                        />
                        <span className="glyphicon glyphicon-calendar" aria-hidden />
                        <small htmlFor className="form-text form-text-error" style={{ display: 'none' }} />
                    </div>
                </div>
            </div>

            {/* INTEGRANTES DE PERSONA MORAL */}
            <div className="row">
                <div className="col-md-12 py5">
                    <h4>Intregrantes de personas morales o grupo de individuos</h4>
                </div>
                <div className="col-md-4 py5">
                    <div className="form-group">
                        <label className="control-label">Número de hombres: </label>
                        <input
                            onChange={setInfo}
                            name="inte_numero_hombres"
                            className="form-control integrantes"
                            type="number"
                            defaultValue={inte_numero_hombres}
                            onBlur={sumIntegrantes}
                            onFocus={selectAll}
                            placeholder="Ingresa el número"
                        />
                    </div>
                </div>
                <div className="col-md-4 py5">
                    <div className="form-group">
                        <label className="control-label">Número de mujeres: </label>
                        <input
                            onChange={setInfo}
                            name="inte_numero_mujeres"
                            className="form-control integrantes"
                            type="number"
                            defaultValue={inte_numero_mujeres}
                            onBlur={sumIntegrantes}
                            onFocus={selectAll}
                            placeholder="Ingresa el número"
                        />
                    </div>
                </div>
                <div className="col-md-4 py5">
                    <div className="form-group">
                        <label className="control-label">Total de integrantes: </label>
                        <input
                            readOnly
                            defaultValue={inte_total_integrantes}
                            name="inte_total_integrantes"
                            className="form-control"
                            type="text"
                        />
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="form-group">
                        <label className="control-label">Número de hombres indígenas: </label>
                        <input
                            defaultValue={inte_hombres_indigenas}
                            name="inte_hombres_indigenas"
                            className="form-control integrantes"
                            type="number"
                            onChange={setInfo}
                            onBlur={sumIntegrantesIndigenas}
                            onFocus={selectAll}
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label className="control-label">Número de mujeres indígenas: </label>
                        <input
                            name="inte_mujeres_indigenas"
                            className="form-control integrantes"
                            type="number"
                            defaultValue={inte_mujeres_indigenas}
                            onChange={setInfo}
                            onBlur={sumIntegrantesIndigenas}
                            onFocus={selectAll}
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label className="control-label">Total integrantes indígenas: </label>
                        <input
                            readOnly
                            name="inte_total_indigenas"
                            className="form-control"
                            type="text"
                            defaultValue={inte_total_indigenas}
                        /> {/* solo numeros */}
                    </div>
                </div>
            </div>
            {/* INTEGRANTES DE PERSONA MORAL */}

        </React.Fragment>
    );
}

export default InfoPersonaMoral;