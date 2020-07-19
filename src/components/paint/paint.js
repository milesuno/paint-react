import React, { Component } from "react";
import "./paint.css";

class Paint extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isDrawing: false,
			lastX: 0,
			lastY: 0,
			hue: 0,
		};
	}

	componentDidMount() {
		let canvas = document.querySelector("#draw");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		canvas.addEventListener("mousemove", this.draw);
		canvas.addEventListener("mousedown", () =>
			this.setState({ isDrawing: true })
		);
		canvas.addEventListener("mouseup", () =>
			this.setState({ isDrawing: false })
		);
		canvas.addEventListener("mouseout", () =>
			this.setState({ isDrawing: false })
		);
	}

	draw = (event) => {
		if (!this.state.isDrawing) return;

		this.setState({
			lastX: event.offsetX,
			lastY: event.offsetY,
			hue: this.state.hue + 1,
		});

		let canvas = document.querySelector("#draw");
		let context = canvas.getContext("2d");

		context.lineJoin = "round";
		context.lineCap = "round";
		context.lineWidth = 50;
		context.strokeStyle = `hsl(${this.state.hue}, 60%, 60%)`;

		context.beginPath();
		context.moveTo(this.state.lastX, this.state.lastY);
		context.lineTo(event.offsetX, event.offsetY);
		context.stroke();
	};

	render() {
		return (
			<div>
				<canvas id="draw" width="800" height="800"></canvas>
				<script src="index.js"></script>
			</div>
		);
	}
}

export default Paint;
