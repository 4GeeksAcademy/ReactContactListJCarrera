import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => (
	<div className="text-center mt-5">
		<h1>Bienvenido!</h1>
		<Link to="/contact-list">
			<button className="btn-success">Ir a la lista de contactos</button>
		</Link>
	</div>
);



