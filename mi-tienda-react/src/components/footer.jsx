import React from "react";


function Footer() {
    return (
        <footer className="footer py-5" style={{
            background: "linear-gradient(135deg, #fff8f8, #ffedf7)",
            marginTop: "60px"
        }}>
            <div className="container">
                {/* Logo y título principal */}
                <div className="row justify-content-center mb-5">
                    <div className="col-md-8 text-center">
                        <h2 className="display-5 fw-bold mb-3" style={{ color: "#e83e8c" }}>Sweet Delights</h2>
                        <p className="lead mb-0" style={{ color: "#777" }}>
                            Donde cada bocado es un momento de felicidad
                        </p>
                    </div>
                </div>

                {/* Separador espaciado */}
                <div className="row mb-5">
                    <div className="col-12">
                        <hr style={{ borderColor: "#ffb6c1", opacity: 0.5, margin: "0 auto", width: "80%" }} />
                    </div>
                </div>

                {/* Contenido principal con espaciado */}
                <div className="row g-5">
                    {/* Columna de información */}
                    <div className="col-lg-4">
                        <h4 className="mb-4" style={{ color: "#d6336c" }}>Sobre nosotros</h4>
                        <p className="mb-4" style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "#666" }}>
                            Desde 2010 elaboramos las donas y helados más deliciosos de la ciudad.
                            Nuestros productos son elaborados artesanalmente cada día con ingredientes
                            frescos y naturales.
                        </p>

                        <h5 className="mb-3" style={{ color: "#e83e8c" }}>Síguenos</h5>
                        <div className="d-flex gap-3 mb-4">
                            <a href="#" className="social-link" style={{
                                color: "white",
                                backgroundColor: "#e83e8c",
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1.2rem"
                            }}>
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="#" className="social-link" style={{
                                color: "white",
                                backgroundColor: "#e83e8c",
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1.2rem"
                            }}>
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a href="#" className="social-link" style={{
                                color: "white",
                                backgroundColor: "#e83e8c",
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1.2rem"
                            }}>
                                <i className="bi bi-twitter-x"></i>
                            </a>
                        </div>
                    </div>

                    {/* Columna de enlaces - con espaciado */}
                    <div className="col-lg-3 col-md-6">
                        <h4 className="mb-4" style={{ color: "#d6336c" }}>Enlaces</h4>
                        <ul className="list-unstyled" style={{ fontSize: "1.1rem" }}>
                            <li className="mb-3">
                                <a href="#" className="text-decoration-none" style={{ color: "#fd7e14" }}>Inicio</a>
                            </li>
                            <li className="mb-3">
                                <a href="#" className="text-decoration-none" style={{ color: "#fd7e14" }}>Nuestras Donas</a>
                            </li>
                            <li className="mb-3">
                                <a href="#" className="text-decoration-none" style={{ color: "#fd7e14" }}>Helados</a>
                            </li>
                            <li className="mb-3">
                                <a href="#" className="text-decoration-none" style={{ color: "#fd7e14" }}>Sobre Nosotros</a>
                            </li>
                            <li className="mb-3">
                                <a href="#" className="text-decoration-none" style={{ color: "#fd7e14" }}>Contacto</a>
                            </li>
                        </ul>
                    </div>

                    {/* Columna de horarios - con espaciado */}
                    <div className="col-lg-2 col-md-6">
                        <h4 className="mb-4" style={{ color: "#d6336c" }}>Horarios</h4>
                        <ul className="list-unstyled" style={{ fontSize: "1.1rem", color: "#666" }}>
                            <li className="mb-3">
                                <div>Lunes - Viernes:</div>
                                <div className="fw-bold">8:00 - 20:00</div>
                            </li>
                            <li className="mb-3">
                                <div>Sábado:</div>
                                <div className="fw-bold">9:00 - 21:00</div>
                            </li>
                            <li className="mb-3">
                                <div>Domingo:</div>
                                <div className="fw-bold">10:00 - 19:00</div>
                            </li>
                        </ul>
                    </div>

                    {/* Columna de contacto - con espaciado */}
                    <div className="col-lg-3 col-md-6">
                        <h4 className="mb-4" style={{ color: "#d6336c" }}>Contacto</h4>
                        <ul className="list-unstyled" style={{ fontSize: "1.1rem", color: "#666" }}>
                            <li className="mb-3">
                                <i className="bi bi-geo-alt me-2" style={{ color: "#e83e8c" }}></i>
                                Av. Dulzura 123, Ciudad
                            </li>
                            <li className="mb-3">
                                <i className="bi bi-telephone me-2" style={{ color: "#e83e8c" }}></i>
                                (123) 456-7890
                            </li>
                            <li className="mb-3">
                                <i className="bi bi-envelope me-2" style={{ color: "#e83e8c" }}></i>
                                info@sweetdelights.com
                            </li>
                        </ul>
                        <div className="mt-4">
                            <a href="#" className="btn rounded-pill px-4 py-2" style={{
                                backgroundColor: "#e83e8c",
                                color: "white",
                                fontSize: "1.1rem"
                            }}>
                                <i className="bi bi-chat-dots-fill me-2"></i>Chatear
                            </a>
                        </div>
                    </div>
                </div>


                <div className="position-relative mt-5 pt-4">
                    <div style={{
                        height: "3px",
                        background: "linear-gradient(to right, transparent, #ffb6c1, transparent)",
                        width: "100%",
                        position: "relative"
                    }}>
                        <div style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            backgroundColor: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.5rem",
                            color: "#e83e8c",
                            boxShadow: "0 0 15px rgba(232, 62, 140, 0.3)"
                        }}>
                            🍩
                        </div>
                    </div>
                </div>


                {/* Copyright - con espaciado */}
                <div className="row pt-2">
                    <div className="col-md-6 mb-4 mb-md-0">
                        <p className="mb-0" style={{ fontSize: "1rem", color: "#777" }}>© 2025 Sweet Delights. Todos los derechos reservados.</p>
                    </div>
                    <div className="col-md-6 text-md-end">
                        <a href="#" className="text-decoration-none me-4" style={{ color: "#e83e8c" }}>Política de Privacidad</a>
                        <a href="#" className="text-decoration-none" style={{ color: "#e83e8c" }}>Términos y Condiciones</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}


export default Footer;