import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const Alert = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className={`position-sticky z-4 fixed-top alert alert-${store.alert.style} alert-dismissible fade ${store.alert.visible ? "show" : ""}`} role="alert">
			{store.alert.text}
		</div>
	);
};
