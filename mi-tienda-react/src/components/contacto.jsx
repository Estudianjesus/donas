import React, { useEffect, useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../estilos/contacto.css';




function Contacto() {


    return (
        <div className="container py-5 mb-5">
            <div className="row">
                {/* Columna para la imagen - visible solo en pantallas medianas y grandes */}
                <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center">
                    <img src="/img/donaoso.jpg" alt="Imagen de donas" className="img-fluid rounded-circle shadow-lg" style={{ maxHeight: "450px" }} />
                </div>

                {/* Columna para el formulario - ocupa todo el ancho en móvil */}
                <div className="col-12 col-md-6">
                    <div className="card shadow-lg border-0 rounded-4" style={{ background: "linear-gradient(to bottom right, #fff8f8, #ffedf7)" }}>
                        <div className="card-body p-4 p-md-5">
                            <div className="text-center mb-4">
                                <h2 className="card-title fw-bold" style={{ color: "#e83e8c" }}>¡Contáctanos!</h2>
                                <p className="text-muted">Estamos ansiosos por atenderte</p>
                            </div>

                            <form onSubmit={(e) => { e.preventDefault(); alert('¡Mensaje enviado correctamente!'); }} className="contact-form" id="contact-form">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label fw-semibold" style={{ color: "#d6336c" }}>Nombre:</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0" style={{ color: "#e83e8c" }}>
                                            <i className="bi bi-person-fill"></i>
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control border-start-0"
                                            id="name"
                                            name="name"
                                            placeholder="Tu nombre"
                                            style={{ borderColor: "#ffb6c1", borderWidth: "2px" }}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label fw-semibold" style={{ color: "#d6336c" }}>Email:</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0" style={{ color: "#e83e8c" }}>
                                            <i className="bi bi-envelope-fill"></i>
                                        </span>
                                        <input
                                            type="email"
                                            className="form-control border-start-0"
                                            id="email"
                                            name="email"
                                            placeholder="tucorreo@ejemplo.com"
                                            style={{ borderColor: "#ffb6c1", borderWidth: "2px" }}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="message" className="form-label fw-semibold" style={{ color: "#d6336c" }}>Mensaje:</label>
                                    <textarea
                                        className="form-control"
                                        id="message"
                                        name="message"
                                        rows="4"
                                        placeholder="¿Qué te gustaría decirnos?"
                                        style={{ borderColor: "#ffb6c1", borderWidth: "2px", borderRadius: "15px" }}
                                        required
                                    ></textarea>
                                </div>

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-lg rounded-pill py-3"
                                        style={{
                                            background: "linear-gradient(to right, #e83e8c, #fd7e14)",
                                            color: "white",
                                            border: "none",
                                            boxShadow: "0 4px 15px rgba(232, 62, 140, 0.5)"
                                        }}>
                                        <i className="bi bi-send-fill me-2"></i>
                                        Enviar mensaje
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Decoración de donuts */}
                        <div className="position-absolute" style={{ top: "-15px", right: "-15px" }}>
                            <div className="rounded-circle" style={{ backgroundColor: "#e83e8c", width: "30px", height: "30px", boxShadow: "0 0 10px rgba(0,0,0,0.2)" }}></div>
                        </div>
                        <div className="position-absolute" style={{ bottom: "-10px", left: "-10px" }}>
                            <div className="rounded-circle" style={{ backgroundColor: "#fd7e14", width: "20px", height: "20px", boxShadow: "0 0 10px rgba(0,0,0,0.2)" }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );




}


export default Contacto;