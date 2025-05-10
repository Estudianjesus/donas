import React from "react";

// importa componentes
import DonutWelcomeHero from "../components/DonutWelcomeHero";
import ProductsSection from "../components/productos";
import PromotionsSection from "../components/promociones";

// importa estilos
import "../estilos/productos.css";
import "../estilos/promociones.css";


function Productos() {
    return (
        <div className="productos">
        <DonutWelcomeHero />
        <ProductsSection /> 
        <PromotionsSection />
        </div>
    );
}

export default Productos;