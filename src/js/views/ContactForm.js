import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";


export const ContactForm = ({ newContact }) => {
	const { store, actions } = useContext(Context);
	let navigate = useNavigate();

	const params = useParams();
	const [contact, setContact] = useState({
		name: "",
		phone: "",
		email: "",
		address: "",
		id: ""
	});


	useEffect(() => {
		if (!newContact) {
			const contactId = params.contactId;
			const contact = store.contactList.find(contact => `${contact.id}` === `${contactId}`);

			if (!contact) {
				actions.showAlert({
					text: "Contact not found",
					style: "danger"
				});

				navigate("/contact-list");

			}
			setContact(contact);

		}
	}, []);


	const handleChange = event => {
		setContact({ ...contact, [event.target.name]: event.target.value });
	};

	const handleSubmit = async event => {
		event.preventDefault();
		let result;
		if (newContact) {
			// create contact
			result = await actions.createContact(contact);
		} else {

			// edit contact
			result = await actions.editContact(contact.id, contact);

		}




		if (result.success) {

			actions.showAlert({
				text: newContact ? "contact created successfully" : "contact edited succesfully",
				style: "success"
			});

			navigate("/contact-list");

		} else {
			actions.showAlert({
				text: newContact ? "There was an error creating the contact" : "There was an error editing the contact",
				style: "danger"
			});

		}

	};

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">{newContact ? "Create contact" : "Edit contact"}</h1>
				<form onChange={handleChange} onSubmit={handleSubmit}>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							className="form-control"
							placeholder="Full Name"
							name="name"
							defaultValue={contact.name}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							placeholder="Enter email"
							name="email"
							defaultValue={contact.email}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							className="form-control"
							placeholder="Enter phone"
							name="phone"
							defaultValue={contact.phone}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter address"
							name="address"
							defaultValue={contact.address}
						/>
					</div>
					<button type="submit" className={`btn btn-${newContact ? "success" : "primary"} form-control`}>
						save
					</button>
					<Link className="mt-3 w-100 text-center" to="/contact-list">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};