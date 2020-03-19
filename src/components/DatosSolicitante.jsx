import React, { useContext, useState } from 'react'
/* HELPERS */

/* COMPONENTES PROPIOS */

/* CONTEXT */
import catalogosContext from "./../context/catalogos/catalogosContext";

const DatosSolicitante = () => {

    const catsContext = useContext(catalogosContext)
    const { estados } = catsContext.catalogos

    return (
        <React.Fragment>
            <div className="row top-buffer">
                <div className="col-md-12">
                    <h2>Datos de Solicitante</h2><hr className="red" />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <label className="control-label">La persona solicitante es*:</label>
                        <select className="form-control ns" name="tipo_tenedor">
                            <option value={0}>Selecciona</option><option value={3}>NO APLICA</option><option value={1}>POSEEDOR</option><option value={2}>PROPIETARIO</option>                              </select>
                        <small className="form-text form-text-error" htmlFor style={{ display: 'none' }}>Dato necesario</small>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6" id="tipo_poseedor">
                    <label className="control-label"> Tipo de Poseedor*:</label>
                    <select className="form-control ns" name="tipo_poseedor">
                        <option value={0}>Selecciona</option><option value={3}>ARRENDATARIO</option><option value={2}>COMODATARIO</option><option value={4}>NO APLICA</option><option value={5}>OTRO</option><option value={1}>USUFRUCTUARIO</option>                          </select>
                    <small className="form-text form-text-error" style={{ display: 'none' }}>Dato necesario</small>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6" id="tipo_poseedor">
                    <label className="control-label"> Tipo de Productor*:</label>
                    <select className="form-control ns" name="tipo_productor">
                        <option value={0}>Selecciona</option><option value={1}>I. PRODUCTORES POTENCIALES</option><option value={2}>II. PRODUCTORES QUE VENDEN EN PIE</option><option value={3}>III. PRODUCTORES DE MATERIA PRIMA FORESTALES</option><option value={4}>IV. PRODUCTORES CON CAPACIDAD DE TRANSPORTACION Y COMERCIALIZACION</option><option value={9}>MFCCV.1 PROYECTOS PARA EL DESARROLLO DE PRODUCTORES POTENCIALES</option><option value={10}>MFCCV.2 PROYECTOS PARA EL DESARROLLO DE PRODUCTORES DEDICADOS A LA VENTA DE MADERA EN PIE</option><option value={11}>MFCCV.3 PROYECTOS PARA EL DESARROLLO DE PRODUCTORES DE MATERIAS PRIMAS FORESTALES</option><option value={12}>MFCCV.4 PROYECTOS PARA EL DESARROLLO DE PRODUCTORES CON CAPACIDAD DE TRANSFORMACIÓN PRIMARIA</option><option value={13}>MFCCV.5 PROYECTOS PARA EL DESARROLLO DE PRODUCTORES CON CAPACIDAD DE APROVECHAMIENTO Y TRANSFORMACIÓN INTEGRAL DE MATERIAS PRIMAS FORESTALES</option><option value={14}>MFCCV.6.PROYECTOS ESTRATÉGICOS FORESTALES</option><option value={15}>MFCCV.7 PROYECTOS PARA PLANTADORES INICIALES O EN DESARROLLO</option><option value={16}>MFCCV.8 PROYECTOS PARA PLANTADORES PERMANENTES</option><option value={5}>NO APLICA</option><option value={8}>V. CON CAPACIDAD DE APROVECHAMIENTO Y TRANSFORMACION INTEGRAL DE MATERIAS PRIMAS FORESTALES</option>                      </select>
                    <small className="form-text form-text-error" style={{ display: 'none' }}>Dato necesario</small>
                </div>
                <div className="col-md-6">
                    <label htmlFor>Email Solicitante:</label>
                    <input type="text" className="form-control" placeholder="Email Solicitante" name="email_solicitante" />
                </div>
            </div>
        </React.Fragment>
    );
}

export default DatosSolicitante;