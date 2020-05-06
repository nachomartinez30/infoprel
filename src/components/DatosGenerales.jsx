import React from 'react'
import moment from "moment";

/* COMPONENTES PROPIOS */
import EntidadSelects from './EntidadSelects';
import SelectSiNo from '../singles/SelectSiNo';
import ErrorInputMsg from '../singles/ErrorInputMsg';
/* CONTEXT */


const DatosGenerales = ({ setState, state, validacion }) => {

    const AnioAnterior = moment().format('YYYY') - 1;
    const setInfo = (input) => {

        setState({
            ...state,
            [input.target.name]: input.target.value
        })
    }

    return (
        <React.Fragment>
            <div className='row'>
                <div className={(validacion.estado_id || validacion.municipio_id || validacion.localidad_id) ? 'has-error' : null}>
                    <EntidadSelects
                        validacion={() => validacion}
                        textoComplemetarioLabel='la Solicitud'
                        onBlur={setInfo}
                    />

                </div>
                <div className={(validacion.estado_id || validacion.municipio_id || validacion.localidad_id) ? 'has-error' : null} style={{ textAlign: 'center' }} >
                    {(validacion.estado_id || validacion.municipio_id || validacion.localidad_id) ? <ErrorInputMsg msg='Estos campos son necesarios' /> : null}
                </div>
                {/* TIPO DE PERSONA */}
                <div className={`col-md-6 py5 ${(validacion.tipo_persona_id) ? 'has-error' : null}`}>
                    <label className="control-label">Tipo de persona *:</label>
                    <select
                        className="form-control"
                        onChange={setInfo}
                        name="tipo_persona_id">
                        <option value={0}>--Seleccione--</option>
                        <option value={1}>Fisica</option>
                        <option value={2}>Moral</option>
                    </select>
                    {validacion.tipo_persona_id && <ErrorInputMsg />}
                </div>
                {/* TIPO DE PERSONA */}
                {/* TIPO DE SOLICITUD */}
                <div className={`col-md-6 py5 ${(validacion.tipo_solicitud_id) ? 'has-error' : null}`}>
                    <label className="control-label"> Tipo de Solicitud *:</label>
                    <select
                        className="form-control"
                        name="tipo_solicitud_id"
                        onChange={setInfo}
                    >
                        <option value="">--Seleccione--</option>
                        <option value="primera">Aplica por primera vez</option>
                        <option value="refrenda">Refrenda su solicitud</option>
                    </select>
                    {validacion.tipo_solicitud_id && <ErrorInputMsg />}
                </div>
                {/* TIPO DE SOLICITUD */}
                <div className={`col-md-6 py5 ${(validacion.beneficios_ejercicio_ano_anterior) ? 'has-error' : null}`}>
                    <SelectSiNo
                        onChange={setInfo}
                        textLabel={`Fuiste beneficiado(a) con algún apoyo en ejercicio ${AnioAnterior}*`}
                        name={'beneficios_ejercicio_ano_anterior'}
                    />
                    {validacion.beneficios_ejercicio_ano_anterior && <ErrorInputMsg />}
                </div>
                <div className={`col-md-6 py5 ${(validacion.apoyo_predio_ano_actual) ? 'has-error' : null}`}>
                    <SelectSiNo
                        onChange={setInfo}
                        textLabel={`Los apoyos que solicitas van destinados al mismo predio? *:`}
                        name={'apoyo_predio_ano_actual'}
                    />
                    {validacion.apoyo_predio_ano_actual && <ErrorInputMsg />}
                </div>
            </div>
            <hr />
        </React.Fragment>
    );
}

export default DatosGenerales;