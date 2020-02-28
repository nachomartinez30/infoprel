import React, { useContext } from 'react'
/* import del context para status general */
import apoyosContext from '../context/apoyos/apoyosContext'
import EntidadSelects from './EntidadSelects';

const DatosGenerales = ({ setInfoGeneral }) => {
    const apoyoContext = useContext(apoyosContext);

    const setTipoPersona = (input) => {
        const tipoPersona = input.target.value
        setInfoGeneral({
            ...setInfoGeneral,
            tipoPersona
        })
    }

    return (
        <React.Fragment>
            <div className='row'>
                <EntidadSelects
                    textoComplemetarioLabel={'la Solicitud'}
                    nameComplement={'solicitud'}
                />
                {/* TIPO DE PERSONA */}
                <div className="col-md-6">
                    <label className="control-label">Tipo de persona *:</label>
                    <select
                        className="form-control"
                        onChange={setTipoPersona}
                        name="seleccion_persona">
                        <option value={0}>Selecciona</option>
                        <option value={1}>Fisica</option>
                        <option value={2}>Moral</option>
                    </select>
                    <small className="form-text form-text-error" htmlFor="seleccion_persona" style={{ display: 'none' }}>Dato necesario</small>
                </div>
                {/* TIPO DE PERSONA */}

                {/* TIPO DE SOLICITUD */}
                <div className="col-md-6">
                    <label className="control-label"> Tipo de Solicitud *:</label>
                    <select className="form-control ns" name="solicita">
                        <option value="">Selecciona</option>
                        <option value="primera">Aplica por primera vez</option>
                        <option value="refrenda">Refrenda su solicitud</option>
                    </select>
                    {/* <small className="form-text form-text-error" htmlFor="tipo-sol" style={{ display: 'none' }}>Dato necesario</small> */}
                </div>
                {/* TIPO DE SOLICITUD */}
            </div>
            <hr />
        </React.Fragment>
    );
}

export default DatosGenerales;