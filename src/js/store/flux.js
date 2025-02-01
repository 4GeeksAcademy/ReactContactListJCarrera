const getState = ({ getStore, setStore, getActions }) => {

	const agenda = process.env.AGENDA || "";


	return {
		store: {
			contactList: [],
			idDelete: "",
			contactToEdit: {},
			alert: { visible: false, text: "test", style: "success" }
		},
		actions: {
			getData: str => {
				fetch(`https://playground.4geeks.com/contact/agendas/${agenda}/contacts`)
					.then(res => res.json())
					.then(data => setStore({ contactList: data.contacts }))
					.catch(error => console.log(error));
			},
			createContact: async user => {
				const result = await fetch(`https://playground.4geeks.com/contact/agendas/${agenda}/contacts`, {
					method: "POST",
					body: JSON.stringify(user),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(res => res.json())
					.then(response => true)
					.catch(error => false);

				console.log({ result });
				return { success: true };
			},
			addIdDelete: id => {
				console.log(id)
				setStore({ idDelete: id });
			},
			cleanIdDelete: () => {
				setStore({ idDelete: "" });
			},
			deleteContact: async (idDelete) => {
				const result = await fetch(`https://playground.4geeks.com/contact/agendas/${agenda}/contacts/${idDelete}`, {
					method: "DELETE"
				})
					.then(() => true)
					.catch(() => false);

				return { success: result };
			},
			editContact: async (id, contact) => {
				const result = await fetch(`https://playground.4geeks.com/contact/agendas/${agenda}/contacts/${id}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(contact)
				})
					.then(res => res.json())
					.then(results => true)
					.catch(error => false);

				return { success: result };
			},
			showAlert: (alert) => {
				setStore({
					alert: {
						visible: true,
						text: alert.text,
						style: alert.style
					}
				});

				setTimeout(() => {
					setStore({
						alert: {
							visible: false
						}
					});
				}, 3000);
			}
		}
	};
};

export default getState;