import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const DeletionConfirmation = props => {
	const { store, actions } = useContext(Context);

	async function deleteContact() {
		const contactToDelete = store.idDelete;
		const result = await actions.deleteContact(contactToDelete);
		console.log(result);
		if (result.success) {
			actions.showAlert({
				text: "Contact deleted successfully",
				style: "success"
			})

		} else {
			actions.showAlert({
				text: "There was an error deleting the contact",
				style: "danger"
			})

		}

		actions.cleanIdDelete();
		actions.getData();

	}

	function cancelDeletion() {
		actions.cleanIdDelete();
	}


	return (
		<div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: store.idDelete !== "" ? "block" : "none" }}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Are you sure?</h5>
						{props.onClose ? (
							<button
								onClick={() => props.onClose()}
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						) : (
							""
						)}
					</div>
					<div className="modal-body">
						<p>Are you sure that you want to delete this contact?</p>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-secondary"
							onClick={() => {
								cancelDeletion()
							}}>
							Cancel
						</button>
						<button
							type="button"
							className="btn btn-danger"
							data-dismiss="modal"
							onClick={() => {
								deleteContact();
							}}>
							Accept
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
