import React, { useState, useEffect } from "react";

//include images into your bundle

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
	let [frases, setFrase] = useState([]);

	let [tarea, setTarea] = useState("");

	useEffect(() => {
		// Actualiza el título del documento usando la API del navegador
		getlist();
	}, []);

	const getlist = async () => {
		var fetchurl =
			"https://assets.breatheco.de/apis/fake/todos/user/smorales95";
		await fetch(fetchurl)
			.then(response => response.json())
			.then(result => {
				setFrase(
					result.map(items => {
						return { label: items.label, done: items.done };
					})
				);
			})
			.catch(error => console.log("error", error));
	};

	const updatedtoDo = frases.map((listItems, i) => {
		return (
			<li className="ul" key={i} onClick={() => deleteToDo(i)}>
				{listItems.label}
				<span className="izq fas fa-times"></span>
			</li>
		);
	});
	let lista = <ul className="list-group m-5">{updatedtoDo}</ul>;

	function handleChange(k) {
		if (k.keyCode === 13) {
			setFrase([...frases, { label: tarea, done: false }]);
			actualizar(frases);
			setTarea("");
		}
	}

	function insertarpost() {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify([frases]);

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/smorales95",
			requestOptions
		)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log("error", error));
	}

	function actualizar(frases) {
		if (frases.length > 0) {
			var myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");

			var raw = JSON.stringify(frases);

			var requestOptions = {
				method: "PUT",
				headers: myHeaders,
				body: raw,
				redirect: "follow"
			};

			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/smorales95",
				requestOptions
			)
				.then(response => response.json())
				.then(result => console.log(result))
				.catch(error => console.log("error", error));
		} else if (frases.length <= 0 && tarea != "") {
			insertarpost();
		}
	}
	function deleteToDo(i) {
		let borrar = frases.filter(item => item !== frases[i]);
		if (borrar.length == 0) {
			eliminaralltodo();
		} else {
			setFrase(borrar);
		}
	}

	function eliminaralltodo() {
		var requestOptions = {
			method: "DELETE",
			redirect: "follow"
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/smorales95",
			requestOptions
		)
			.then(response => response.json())
			.then(result => console.log(""))
			.catch(error => console.log("error", error));
		setFrase([]);
	}

	return (
		<div className="cuadro">
			<h1>Todos</h1>
			<div sytle="mt-2">
				<input
					className="entrada"
					type="text"
					onChange={e => setTarea(e.target.value)}
					onKeyUp={k => handleChange(k)}
					value={tarea}
					required
				/>
				<div className="listas">
					{lista}
					{actualizar(frases)}
				</div>
			</div>
			<div>
				<section>
					{" "}
					tienes {frases.length} tareas por completar{" "}
					<i className="fas fa-trash" onClick={eliminaralltodo}></i>
				</section>
			</div>
		</div>
	);
}
