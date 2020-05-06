import React from 'react'
import EntidadSelects from './EntidadSelects';
import SelectTipoVialidades from '../singles/SelectTipoVialidades';
import SelectTipoAsentamiento from '../singles/SelectTipoAsentamiento';
import SelectTemGen from '../singles/SelectTemGen';
import ErrorInputMsg from '../singles/ErrorInputMsg';


const DatosDomGeo = (props) => {

    const { state, setState, validacion } = props

    const setInfo = (input) => {
        setState({
            ...state,
            [input.target.name]: input.target.value
        })
    }

    return (
        <React.Fragment>
            <div className="row top-buffer">
                <div className="col-md-12">
                    <h2>Domicilio geográfico de la o el beneficiario</h2>
                    <hr className="red" />
                </div>
            </div>
            <div className="row">
                <div className={(validacion.estado_id || validacion.municipio_id || validacion.localidad_id) ? 'has-error' : null}>
                    <EntidadSelects
                        textoComplemetarioLabel='domicilio'
                        onBlur={setInfo}
                    />
                    <div 
                    className={(validacion.estado_id || validacion.municipio_id || validacion.localidad_id) ? 'has-error' : null} 
                    style={{ textAlign: 'center' }} >
                        {(validacion.estado_id || validacion.municipio_id || validacion.localidad_id) ? <ErrorInputMsg msg='Estos campos son necesarios' /> : null}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className={`col-md-3 py5 ${(validacion.cve_tipo_vial) ? 'has-error' : null}`}>
                    <div className="form-group">
                        <label className="control-label">Tipo de vialidad<span className="form-text">*</span>: <span className="glyphicon glyphicon-question -sign emergente" data-title="Ejemplo: Avenida, Boulevard, Calzada, Corredor, Eje vial, etc." /></label>
                        <SelectTipoVialidades
                            className='form-control'
                            name='cve_tipo_vial'
                            onChange={setInfo}
                        />
                        {validacion.cve_tipo_vial && <ErrorInputMsg />}
                    </div>
                </div>
                <div className={`col-md-6 py5 ${(validacion.nom_vialidad) ? 'has-error' : null}`}>
                    <div className="form-group">
                        <label className="control-label">Nombre de vialidad o calle<span className="form-text">*</span>:</label>
                        <input
                            onChange={setInfo}
                            name="nom_vialidad"
                            className="form-control"
                            maxLength={30}
                            minLength={5}
                            placeholder="Ingresa nombre de vialidad o calle"
                        />
                        {validacion.nom_vialidad && <ErrorInputMsg />}
                    </div>
                </div>
                <div className={`col-md-3 py5 ${(validacion.numero_exterior) ? 'has-error' : null}`}>
                    <label className="control-label">Número exterior<span>*</span>:</label>
                    <input
                        onChange={setInfo}
                        name="numero_exterior"
                        className="form-control"
                        type="number"
                        maxLength={10}
                        placeholder='num. exterior'
                    />
                    {validacion.numero_exterior && <ErrorInputMsg />}
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 py5">
                    <label className="control-label">Complemento núm. ext: <span className="glyphicon glyphicon-question-sign emergente" data-title="Complemento alfanumérico del número exterior" /></label>
                    <input
                        onChange={setInfo}
                        name="numero_exterior_alf"
                        className="form-control"
                        type="text"
                        placeholder='num. ext.'
                    />
                </div>
                {/* NUMERO INTERIOR */}
                <div className="col-md-4 py5">
                    <label className="control-label">Núm. Interior: <span className="glyphicon glyphicon-question-sign emergente" data-title="Complemento alfanumérico" /></label>
                    <input
                        onChange={setInfo}
                        name="numero_interior"
                        className="form-control"
                        placeholder='Núm. Interior'
                        type="text"
                        maxLength={5}
                    />
                </div>
                {/* CDIG POSTAL */}
                <div className="col-md-4 py8">
                    <label className="control-label">Código Postal:</label>
                    <input
                        onChange={setInfo}
                        name="codigo_postal"
                        className="form-control"
                        type="number"
                        maxLength={5}
                        minLength={5}
                        placeholder="Ingresa tu código postal"
                    />
                </div>
                {/* Num EXTERIOR ANTERIOR */}
                <div className="col-md-6 py5">
                    <label className="control-label">Número ext. anterior: <span className="glyphicon glyphicon-question-sign emergente" data-title="Numero exterior del domicilio anterior" /></label>
                    <input
                        onChange={setInfo}
                        name="numero_exterior_anterior"
                        className="form-control"
                        placeholder='Numero exterior anterior'
                        type="text"
                    />
                </div>
                {/* COMPLEMENTO NUM I*/}
                <div className="col-md-6 py5">
                    <label className="control-label">Complemento núm. ext. anterior: <span className="glyphicon glyphicon-question-sign emergente" data-title="Complemento alfanumérico del número interior" /></label>
                    <input
                        onChange={setInfo}
                        name="com_num_int_solicitante_dom_geo"
                        className="form-control"
                        type="text"
                        placeholder='Complemento numero interior'
                    />
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
                <div className={`col-md-6 py5 ${(validacion.cve_tipo_asen) ? 'has-error' : null}`}>
                    <label className="control-label">Tipo de asentamiento humano<span className="form-text">*</span>:
                    <span className="glyphicon glyphicon-question-sign emergente" data-title="Ejemplo: Aeropuerto, Colonia, Fraccionamiento, Manzana, Puerto, Privada, etc." /></label>
                    <SelectTipoAsentamiento
                        onChange={setInfo}
                        className="form-control"
                        name="cve_tipo_asen"
                    />
                    {validacion.cve_tipo_asen && <ErrorInputMsg />}
                </div>
                <div className="col-md-6 py5">
                    <label className="control-label">Nombre del asentamiento humano:</label>
                    <input
                        onChange={setInfo}
                        name="nom_asentamiento"
                        className="form-control"
                        maxLength={50}
                        placeholder="Nombre del asentamiento"
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 py5">
                    <label className="control-label">Tu domicilio se encuentra en:</label>
                    <SelectTemGen
                        key="cve_ter"
                        onChange={setInfo}
                        className="form-control"
                        name="cve_ter"
                    />
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
                    <label className="control-label" htmlFor="tramo_destino">
                        Señala el kilómetro del camino  en la que se ubica tu domicilio :
                    </label>
                    <input
                        onChange={setInfo}
                        className="form-control"
                        name="tramo_destino"
                        maxLength={40}
                        placeholder="Ingresa el km de tu domicilio"
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 py5">
                    <label className="control-label" htmlFor="descripcion">Describe la ubicación de tu domicilio :</label>
                    <textarea
                        onChange={setInfo}
                        className="form-control"
                        name="descripcion"
                        maxLength={250}
                        placeholder="Ingresa la descripción"
                        cols={30}
                        rows={5}
                    />
                </div>
            </div>
        </React.Fragment>
    );
}

export default DatosDomGeo;