import React, { Component } from "react";
import "./paint.css";
import Controls from "../controls/controls";
import hexToHsl from "../hex-to-hsl.js";

class Paint extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isDrawing: false,
			lastX: 0,
			lastY: 0,
			hue: 0,
			colourChange: false,
			lineCap: "round",
			lineWidth: 50,
		};
	}

	componentDidMount() {
		let canvas = document.querySelector("#draw");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		canvas.addEventListener("pointermove", this.draw);
		canvas.addEventListener("pointerdown", () =>
			this.setState({ isDrawing: true })
		);
		canvas.addEventListener("pointerup", () =>
			this.setState({ isDrawing: false })
		);
		canvas.addEventListener("pointerout", () =>
			this.setState({ isDrawing: false })
		);
	}

	draw = (event) => {
		if (!this.state.isDrawing) return;

		if (!this.colourChange) {
			this.setState({
				lastX: event.offsetX,
				lastY: event.offsetY,
				hue: this.state.hue + 1,
			});
		}

		let canvas = document.querySelector("#draw");
		let context = canvas.getContext("2d");

		context.lineJoin = "round";
		context.lineCap = this.state.lineCap;
		context.lineWidth = this.state.lineWidth;
		context.strokeStyle = `hsl(${this.state.hue}, 60%, 60%)`;

		context.beginPath();
		context.moveTo(this.state.lastX, this.state.lastY);
		context.lineTo(event.offsetX, event.offsetY);
		context.stroke();
	};
	setStrokeCap = (e) => {
		let lineCap = e.target.value;
		console.log(e.target.value);
		this.setState({ lineCap });
	};
	setStrokeSize = (e) => {
		let lineWidth = e.target.value;
		//line is number is px size
		console.log(e.target.value);
		this.setState({ lineWidth });
	};

	setColour = (e) => {
		let hue = hexToHsl(e.target.value);
		console.log(hexToHsl(e.target.value));
		// console.log(this.state.hue)
		this.setState({ hue, colourChange: true });
	};
	render() {
		return (
			<>
				<Controls
					setStrokeCap={this.setStrokeCap}
					setStrokeSize={this.setStrokeSize}
					setColour={this.setColour}
				/>
				<canvas id="draw" width="800" height="800"></canvas>
				<script src="index.js"></script>
			</>
		);
	}
}

export default Paint;
