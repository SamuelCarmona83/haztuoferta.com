import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { ItemCard } from "../component/ItemCard";
import { Carousel } from "../component/carousel.js";
import { Segmento } from "../component/Segmento";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import "../../styles/banner.css";


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<React.Fragment>
			<Carousel />
			<Segmento />
			<section className="banner">
				<div className="container d-flex flex-column mb-2">
					<header>
						<h1 className="display-4 text-bold text-center">Haz Tu Oferta</h1>
						<p className="text-center text-bold"> <i>Oferta, Intercambia o Subasta tus Productos. Que esperas para comprar a tu manera?</i></p>
					</header>
					<div className="call-to-action text-center">
						<button className="btn btn-outline-secondary">Compra Diferente, Regístrate Ya!</button>
					</div>
				</div>
			</section>
			<div className="container">
				<h2 className="text-left mt-5 mb-3 display-5"><strong>Los Mas Buscados</strong></h2>
				<div className="itemcard gap-4">
					{store.computadoras.map((computadoras, index) => {
						return <ItemCard computadoras={computadoras} key={index} />;
					})}
				</div>
			</div>
		</React.Fragment >
	);
};
