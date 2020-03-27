import React from 'react'
import moment from "moment";

/* COMPONENTES PROPIOS */
import EntidadSelects from './EntidadSelects';
import SelectSiNo from '../singles/SelectSiNo';
/* CONTEXT */


const DatosGenerales = ({ setState, state }) => {

    const AnioAnterior = moment().format('YYYY') - 1;
    const setInfo = (input) => {

        setState({
            ...state,
            [input.target.name]: input.target.value
        })
    }

    return (
        <div id='seccion_datos_generales'>
            <div className='row'>
                <EntidadSelects
                    textoComplemetarioLabel='la Solicitud'
                    nameComplement='solicitud'
                    onBlur={setInfo}
                />
                {/* TIPO DE PERSONA */}
                <div className="col-md-6 py5">
                    <label className="control-label">Tipo de persona *:</label>
                    <select
                        className="form-control"
                        onChange={setInfo}
                        name="tipo_persona_id">
                        <option value={0}>--Seleccione--</option>
                        <option value={1}>Fisica</option>
                        <option value={2}>Moral</option>
                    </select>
                    {/* <small className="form-text form-text-error" htmlFor="seleccion_persona" style={{ display: 'none' }}>Dato necesario</small> */}
                </div>
                {/* TIPO DE PERSONA */}
                {/* TIPO DE SOLICITUD */}
                <div className="col-md-6 py5">
                    <label className="control-label"> Tipo de Solicitud *:</label>
                    <select
                        className="form-control"
                        name="solicita"
                        onChange={setInfo}
                    >
                        <option value="">--Seleccione--</option>
                        <option value="primera">Aplica por primera vez</option>
                        <option value="refrenda">Refrenda su solicitud</option>
                    </select>
                    {/* <small className="form-text form-text-error" htmlFor="tipo-sol" style={{ display: 'none' }}>Dato necesario</small> */}
                </div>
                {/* TIPO DE SOLICITUD */}
                <div className='col-md-6 py5'>
                    <SelectSiNo
                        onChange={setInfo}
                        textLabel={`Fuiste beneficiado(a) con algún apoyo en ejercicio ${AnioAnterior}*`}
                        name={'beneficios_ejercicio_ano_anterior'}
                    />
                </div>
                <div className='col-md-6 py5'>
                    <SelectSiNo
                        onChange={setInfo}
                        textLabel={`Los apoyos que solicitas van destinados al mismo predio? *:`}
                        name={'apoyo_predio_ano_actual'}
                    />
                </div>
            </div>
            <hr />
        </div>
    );
}

export default DatosGenerales;