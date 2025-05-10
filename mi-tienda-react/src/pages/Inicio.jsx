import React, { useEffect } from "react";


// Importa componentes
import PromotionsSection from '../components/promociones';
import ProductsSection from '../components/productos';
import Contacto from '../components/contacto';
import Footer from '../components/footer';


// Importa estilos
import "../estilos/productos.css"
import "../estilos/promociones.css";
import "../estilos/contacto.css";


function Inicio() {

    useEffect(() => {
        addFloatingElements();

        fetch('http://127.0.0.1:5000/')
            .then(response => response.json()) 
            .then(data => {
                console.log('Respuesta desde Flask:', data); 
            })
            .catch(error => {
                console.error('Error fetching data:', error);  
            });
    }, []);

    function addFloatingElements() {
        const floatingContainer = document.getElementById('floatingElements');
        const elements = ['🍩', '🍦', '🧁', '🍪', '🍨'];

        for (let i = 0; i < 10; i++) {
            const element = document.createElement('div');
            element.className = 'floating';
            element.textContent = elements[Math.floor(Math.random() * elements.length)];
            const sizes = [20, 30, 40, 60, 80];
            element.style.fontSize = `${sizes[Math.floor(Math.random() * sizes.length)]}px`;
            element.style.left = `${Math.random() * 100}%`;
            element.style.top = `${Math.random() * 100}%`;
            element.style.animationDelay = `${Math.random() * 5}s`;
            floatingContainer.appendChild(element);
        }
    }



    return (
        <main>
            <section className="hero" id="home">
                <div id="floatingElements"></div>
                <div className="hero-content">
                    <h1>Donas & Helados <span>Artesanales</span></h1>
                    <p>Descubre el sabor de lo auténtico. Donas frescas y helados cremosos hechos con ingredientes de calidad para momentos dulces inolvidables.</p>
                    <a href="#products" className="btn pulse">Ver Productos</a>
                </div>
            </section>
            <PromotionsSection />
            <ProductsSection />
            <Contacto />
            <Footer />
        </main>
    );
}

export default Inicio;