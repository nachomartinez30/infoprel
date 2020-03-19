import React, { useContext } from 'react'
import moment from "moment";
/* import del context para status general */
import apoyosContext from '../context/apoyos/apoyosContext'
/* COMPONENTES PROPIOS */
import EntidadSelects from './EntidadSelects';
import SelectSINo from '../singles/SelectSI_No';
/* CONTEXT */
import catalogosContext from "./../context/catalogos/catalogosContext";

const DatosGenerales = ({ setInfoGeneral, infoGeneral }) => {
    /* Context catalogos */
    const catsContext = useContext(catalogosContext)
    const { estados } = catsContext.catalogos
    // const apoyoContext = useContext(apoyosContext);

    const AnioAnterior = moment().format('YYYY') - 1;

    const setInfo = (input) => {
        // console.log(infoGeneral);
        setInfoGeneral({
            ...infoGeneral,
            [input.target.name]: input.target.value
        })
    }

    return (
        <React.Fragment>
            <div className='row'>
                <EntidadSelects
                    estados={estados}
                    textoComplemetarioLabel={'la Solicitud'}
                    nameComplement={'solicitud'}
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
                    <SelectSINo
                        onChange={setInfo}
                        textLabel={`Fuiste beneficiado(a) con algún apoyo en ejercicio ${AnioAnterior}*`}
                        name={'beneficios_ejercicio_ano_anterior'}
                    />
                </div>
                <div className='col-md-6 py5'>
                    <SelectSINo
                        onChange={setInfo}
                        textLabel={`Los apoyos que solicitas van destinados al mismo predio? *:`}
                        name={'apoyo_predio_ano_actual'}
                    />
                </div>
            </div>
            <hr />
        </React.Fragment>
    );
}

export default DatosGenerales;