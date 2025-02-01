import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./views/home";
import injectContext from "./store/appContext";
import { ContactList } from "./views/ContactList"
import { ContactForm } from "./views/ContactForm";
import { Alert } from "./component/Alert";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<Alert />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/contact-list" element={<ContactList />} />
					<Route path="/new-contact" element={<ContactForm newUser={true} />} />
					<Route path="/edit-contact/:contactId" element={<ContactForm newUser={false} />} />

					<Route path="*" element={<h1>Not found!</h1>} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
