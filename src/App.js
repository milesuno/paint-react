import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Paint from "./components/paint/paint";

//TODO:Add a page border and Header for app

//TODO: Add Controls component
//TODO: Add color picker button? - color selection sets hue/
//TODO: Add brush style/size picker

function App() {
	return (
		<div className="App">
			<div className="page-wrapper">
				<main>
					<h1>Paint App</h1>
					<Paint />
				</main>
			</div>
		</div>
	);
}

export default App;
