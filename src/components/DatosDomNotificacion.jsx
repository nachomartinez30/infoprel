import React from 'react'
import EntidadSelects from './EntidadSelects'

const DatosDomNotificacion = (props) => {

    const { state, setState, id_section, validacion } = props

    const setInfo = input => {
        setState({
            ...state,
            [input.target.name]: input.target.value
        })
    }

    return (
        <div id={id_section}>
            <div className="row">
                <EntidadSelects
                    textoComplemetarioLabel='predio'
                    nameComplement='domicilio_notificacion'
                    onBlur={setInfo}
                />
            </div>
            <div className="row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label className="control-label">Domicilio:</label>
                        <input
                            onChange={setInfo}
                            name="domicilio_notificacion"
                            className="form-control"
                            type="text"
                            placeholder="Ingresa el domicilio completo"
                        />

                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label className="control-label">Código Postal:</label>
                        <input
                            onChange={setInfo}
                            name="cp_dom_notif"
                            maxLength={5}
                            className="form-control"
                            type="number"
                            placeholder="Codigo postal"
                        />
                        <small htmlFor="cp_dom_notif" className="form-text form-text-error" style={{ display: 'none' }} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
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
                        <small htmlFor="medio_comunicacion_dom_notif" className="form-text form-text-error" style={{ display: 'none' }} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="form-control-phone">
                            <label htmlFor="telefono_dom_notif">Teléfono fijo:</label>
                            <input
                                onChange={setInfo}
                                name="telefono_dom_notif"
                                type="number"
                                maxLength={10}
                                className="form-control"
                                placeholder='Teléfono fijo.'
                            />
                            <small htmlFor="telefono_dom_notif" className="form-text form-text-error" style={{ display: 'none' }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="control-label">Nombre completo del notificado<span className="form-text">*</span>:</label>
                        <input
                            onChange={setInfo}
                            name="nombre_notificacion"
                            className="form-control"
                            type="text"
                            placeholder="Ingresa el nombre"
                        />
                        <small htmlFor="nombre_notificacion" className="form-text form-text-error" style={{ display: 'none' }} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="control-label">Correo electrónico: </label>
                        <input
                            onChange={setInfo}
                            name="correo_dom_notif"
                            className="form-control"
                            type="text"
                            placeholder="ejemplo@dominio.com"
                        />
                        <small className="form-text form-text-error" style={{ display: 'none' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DatosDomNotificacion;