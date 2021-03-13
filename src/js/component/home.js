import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
	let [toDo, setToDo] = useState([
		"Wash the dishes",
		"Clean my room",
		"Cook"
	]);
	let [tarea, setTarea] = useState([""]);

	const updatedtoDo = toDo.map(listItems => {
		return (
			<ul>
				<li
					id={listItems}
					value={listItems}
					className="li"
					key={listItems.toString()}>
					<span>
						<i class="fa fa-trash"></i>
					</span>{" "}
					{listItems}
				</li>
			</ul>
		);
	});

	function add(e) {
		if (e.keyCode === 13) {
			setToDo([...toDo, e.target.value]);
			e.target.placeholder = "Do enter";
			console.log({ toDo });
		}
	}

	function eliminar(e) {}

	/*	return (
		<div>
			<h1>Todos</h1>
			<div className="cuadro">
				<input
					type="text"
					placeholder="enter do"
					onInput={e => add(e)}
				/>
				<ul>{updatedtoDo};</ul>
			</div>
		</div>
    );*/

	return (
		<div>
			<h1>Todos</h1>
			<div className="cuadro">
				<input
					type="text"
					placeholder="Enter Do"
					onKeyUp={e => add(e)}
					onChange={k => setTarea(k.target.value)}
					value={tarea}
				/>
				<div onMouseOver={e => eliminar(e)}>{updatedtoDo}</div>
			</div>
		</div>
	);
}
