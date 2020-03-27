import React from 'react'
import EntidadSelects from './EntidadSelects';
import SelectTipoVialidades from '../singles/SelectTipoVialidades';
import SelectTipoAsentamiento from '../singles/SelectTipoAsentamiento';
import SelectTemGen from '../singles/SelectTemGen';


const DatosDomGeo = (props) => {

    const { state, setState, id_section, validacion } = props

    const setInfo = (input) => {
        setState({
            ...state,
            [input.target.name]: input.target.value
        })
    }

    return (
        <div id={id_section}>
            <div className="row top-buffer">
                <div className="col-md-12">
                    <h2>Domicilio geográfico de la o el beneficiario</h2>
                    <hr className="red" />
                </div>
            </div>
            <div className="row">
                <EntidadSelects
                    textoComplemetarioLabel='domicilio'
                    nameComplement='domicilio_geografico'
                    onBlur={setInfo}
                />
            </div>
            <div className="row">
                <div className="col-md-4 py5">
                    <div className="form-group">
                        <label className="control-label">Tipo de vialidad<span className="form-text">*</span>: <span className="glyphicon glyphicon-question -sign emergente" data-title="Ejemplo: Avenida, Boulevard, Calzada, Corredor, Eje vial, etc." /></label>
                        <SelectTipoVialidades
                            className='form-control'
                            name='tipo_vialidad_dom_geo'
                            onChange={setInfo}
                        />
                        <small htmlFor="tipo_vialidad_dom_geo" className="form-text form-text-error" style={{ display: 'none' }}>Dato necesario</small>
                    </div>
                </div>
                <div className="col-md-6 py5">
                    <div className="form-group">
                        <label className="control-label">Nombre de vialidad o calle:</label>
                        <input
                            onChange={setInfo}
                            name="nombre_vialidad_dom_geo"
                            className="form-control"
                            maxLength={30}
                            minLength={5}
                            placeholder="Ingresa nombre de vialidad o calle"
                        />
                        <small className="form-text form-text-error" style={{ display: 'none' }} />
                    </div>
                </div>
                <div className="col-md-2 py5">
                    <div className="form-group">
                        <label className="control-label">Código Postal:</label>
                        <input
                            onChange={setInfo}
                            name="cp_solicitante_dom_geo"
                            className="form-control"
                            type="number"
                            maxLength={5}
                            minLength={5}
                            placeholder="Ingresa tu código postal"
                        />
                        <small htmlFor="cp_solicitante_dom_geo" className="form-text form-text-error" style={{ display: 'none' }} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-2 py5">
                    <div className="form-group pt25">
                        <label className="control-label">Número exterior:</label>
                        <input
                            onChange={setInfo}
                            name="num_ext_solicitante_dom_geo"
                            className="form-control"
                            type="number"
                            maxLength={10}
                            placeholder='num. exterior'
                        />
                        <small htmlFor="num_ext_solicitante_dom_geo" className="form-text form-text-error" style={{ display: 'none' }} />
                    </div>
                </div>
                <div className="col-md-2 py5">
                    <div className="form-group">
                        <label className="control-label">Complemento núm. ext: <span className="glyphicon glyphicon-question-sign emergente" data-title="Complemento alfanumérico del número exterior" /></label>
                        <input
                            onChange={setInfo}
                            name="comp_num_ext_solicitante_dom_geo"
                            className="form-control"
                            type="text"
                            placeholder='num. ext.'
                        />
                    </div>
                </div>
                <div className="col-md-3 py5">
                    <div className="form-group pt25">
                        <label className="control-label">Número ext. anterior: <span className="glyphicon glyphicon-question-sign emergente" data-title="Numero exterior del domicilio anterior" /></label>
                        <input
                            onChange={setInfo}
                            name="num_ext_ant_dom_geo"
                            className="form-control"
                            placeholder='Numero exterior anterior'
                            type="text"
                        />
                    </div>
                </div>
                <div className="col-md-2 py5">
                    <div className="form-group pt25">
                        <label className="control-label">Núm. Interior: <span className="glyphicon glyphicon-question-sign emergente" data-title="Complemento alfanumérico" /></label>
                        <input
                            onChange={setInfo}
                            name="num_int_solicitante_dom_geo"
                            className="form-control"
                            placeholder='Núm. Interior'
                            type="text"
                            maxLength={5}
                        />
                    </div>
                </div>
                <div className="col-md-3 py5">
                    <div className="form-group">
                        <label className="control-label">Complemento núm. interior: <span className="glyphicon glyphicon-question-sign emergente" data-title="Complemento alfanumérico del número interior" /></label>
                        <input
                            onChange={setInfo}
                            name="com_num_int_solicitante_dom_geo"
                            className="form-control"
                            type="text"
                            placeholder='Complemento numero interior'
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 py5">
                    <label className="control-label" htmlFor="vialidades_dom_geo">Entre qué vialidades: <span className="glyphicon glyphicon-question-sign emergente" data-title="Describe brevemente la ubicación, máximo 250 caracteres" /></label>
                    <textarea
                        onChange={setInfo}
                        className="form-control"
                        name="vialidades_dom_geo"
                        maxLength={250}
                        placeholder="Ingresa la descripción"
                        cols={30}
                        rows={5}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 py5">
                    <div className="form-group">
                        <label className="control-label">Tipo de asentamiento humano<span className="form-text">*</span>:
                    <span className="glyphicon glyphicon-question-sign emergente" data-title="Ejemplo: Aeropuerto, Colonia, Fraccionamiento, Manzana, Puerto, Privada, etc." /></label>
                        <SelectTipoAsentamiento
                            onChange={setInfo}
                            className="form-control"
                            name="tipo_asentamiento_dom_geo"
                            id="tipo_asentamiento_dom_geo"
                        />
                        <small htmlFor="tipo_asentamiento" className="form-text form-text-error" style={{ display: 'none' }}>Dato
                        necesario
        </small>
                    </div>
                </div>
                <div className="col-md-6 py5">
                    <div className="form-group">
                        <label className="control-label">Nombre del asentamiento humano:</label>
                        <input
                            onChange={setInfo}
                            name="nombre_asentamiento_dom_geo"
                            className="form-control"
                            maxLength={50}
                            placeholder="Nombre del asentamiento"
                        />
                        <small htmlFor="nombre_asentamiento" className="form-text form-text-error" style={{ display: 'none' }}>Dato
                        Requerido
                        </small>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 py5">
                    <div className="form-group">
                        <label className="control-label">Tu domicilio se encuentra en:</label>
                        <SelectTemGen
                            key="dom_se_encuentra"
                            onChange={setInfo}
                            className="form-control"
                            name="dom_se_encuentra"
                        />
                    </div>
                </div>
                <div className="col-md-8 py5">
                    <div className="form-group">
                        <label className="control-label">Tu domicilio se encuentra (de sur a norte) en el margen:</label>
                        <select
                            onChange={setInfo}
                            name="transito"
                            className="form-control"
                        >
                            <option value>Selecciona</option>
                            <option value="cou">Derecho</option>
                            <option value="lib">Izquierdo</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 pt25">
                    <label className="control-label" htmlFor="tramo_dom_geo">Señala el tramo en el que se ubica tu domicilio : <span className="glyphicon glyphicon-question-sign emergente" data-title="Poblaciones origen-destino que limitan tu domicilio" /></label>
                    <input
                        onChange={setInfo}
                        className="form-control"
                        name="tramo_dom_geo"
                        maxLength={40}
                        placeholder="Ingresa el tramo de tu domicilio"
                    />
                </div>
                <div className="col-md-6 py5">
                    <label className="control-label" htmlFor="km_dom_geo">
                        Señala el kilómetro del camino  en la que se ubica tu domicilio :
                    </label>
                    <input
                        onChange={setInfo}
                        className="form-control"
                        name="km_dom_geo"
                        maxLength={40}
                        placeholder="Ingresa el km de tu domicilio"
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 py5">
                    <label className="control-label" htmlFor="descripcion_dom_geo">Describe la ubicación de tu domicilio :</label>
                    <textarea
                        onChange={setInfo}
                        className="form-control"
                        name="descripcion_dom_geo"
                        maxLength={250}
                        placeholder="Ingresa la descripción"
                        cols={30}
                        rows={5}
                    />
                </div>
            </div>
        </div>
    );
}

export default DatosDomGeo;