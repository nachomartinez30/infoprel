import React from 'react'
import EntidadSelects from './EntidadSelects'
import ErrorInputMsg from '../singles/ErrorInputMsg'

const DatosDomNotificacion = (props) => {

    const { state, setState, validacion } = props

    const setInfo = input => {
        setState({
            ...state,
            [input.target.name]: input.target.value
        })
    }

    return (
        <React.Fragment>
            <div className="row">
                <div className={(validacion.estado_id || validacion.municipio_id || validacion.localidad_id) ? 'has-error' : null}>
                    <EntidadSelects
                        textoComplemetarioLabel='predio'
                        onBlur={setInfo}
                    />
                    <div
                        className={(validacion.estado_id || validacion.municipio_id || validacion.localidad_id) ? 'has-error' : null}
                        style={{ textAlign: 'center' }}
                    >
                        {(validacion.estado_id || validacion.municipio_id || validacion.localidad_id) ? <ErrorInputMsg msg='Estos campos son necesarios' /> : null}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className={`col-md-8 ${(validacion.calle) ? 'has-error' : null}`}>
                    <label className="control-label">Domicilio<span>*</span>:</label>
                    <input
                        onChange={setInfo}
                        name="calle"
                        className="form-control"
                        type="text"
                        placeholder="Ingresa el domicilio completo"
                    />
                    {validacion.calle && <ErrorInputMsg />}
                </div>
                <div className="col-md-4">
                    <label className="control-label">Código Postal:</label>
                    <input
                        onChange={setInfo}
                        name="cp_dom_notif"
                        maxLength={5}
                        className="form-control"
                        type="number"
                        placeholder="Codigo postal"
                    />
                </div>
                <div className="col-md-6 py5">
                    <label className="control-label">Medio de comunicación: <span className="glyphicon glyphicon-question-sign emergente" data-title="Medio por el cual prefieres que se te notifique, recuerda anotar los datos correspondientes" /></label>
                    <select
                        onChange={setInfo}
                        name="medio_comunicacion_dom_notif"
                        className="form-control"
                    >
                        <option value={0}>Selecciona</option>
                        <option value={2}>CORREO ELECTRONICO</option>
                        <option value={1}>FAX</option>
                        <option value={3}>MENSAJERIA</option>                          </select>
                </div>
                <div className="col-md-6 py5">
                    <label htmlFor="telefono_dom_notif">Teléfono fijo:</label>
                    <input
                        onChange={setInfo}
                        name="telefono_dom_notif"
                        type="number"
                        maxLength={10}
                        className="form-control"
                        placeholder='Teléfono fijo.'
                    />
                </div>
                {/* nombre completo notificado */}
                <div className="col-md-6 py5">
                    <label className="control-label">Nombre completo del notificado<span className="form-text">*</span>:</label>
                    <input
                        onChange={setInfo}
                        name="nombre_notificacion"
                        className="form-control"
                        type="text"
                        placeholder="Ingresa el nombre"
                    />
                </div>
                {/* corre del notificado */}
                <div className={`col-md-6 py5 ${(validacion.email) ? 'has-error' : null}`}>
                    <label className="control-label">Correo electrónico*:</label>
                    <input
                        onChange={setInfo}
                        name="email"
                        className="form-control"
                        type="text"
                        placeholder="ejemplo@dominio.com"
                    />
                    {validacion.email && <ErrorInputMsg />}
                </div>
            </div>
        </React.Fragment>
    );
}

export default DatosDomNotificacion;