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
			hsl: "",
			colourChange: false,
			lineCap: "round",
			lineWidth: 50,
		};
	}

	componentDidMount() {
		let canvas = document.querySelector("#draw");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		canvas.addEventListener("touchmove", this.eventTypeRouter);
		canvas.addEventListener("mousemove", this.eventTypeRouter);

		canvas.addEventListener("touchstart", () =>
			this.setState({ isDrawing: true })
		);
		canvas.addEventListener("mousedown", () =>
			this.setState({ isDrawing: true })
		);
		canvas.addEventListener("touchend", () =>
			this.setState({ isDrawing: false })
		);
		canvas.addEventListener("mouseup", () =>
			this.setState({ isDrawing: false })
		);

		canvas.addEventListener("touchcancel", () =>
			this.setState({ isDrawing: false })
		);
		canvas.addEventListener("mouselout", () =>
			this.setState({ isDrawing: false })
		);
	}

	eventTypeRouter = (event) => {
		if (!this.state.isDrawing) return;
		if (event.type === "touchmove") {
			let touches = [...event.changedTouches];
			let offsetY = 100;
			//TODO: Create lastX/Y state depending on the number of touch input
			//TODO: remove extra coords once touch inputs reduce
			console.log({ touches });
			if (touches.length === 1) {
				let coordsX = touches[0].clientX;
				let coordsY = touches[0].clientY - offsetY;

				this.setState({
					lastX: coordsX,
					lastY: coordsY,
					hue: this.state.hue + 1,
				});
				this.draw(coordsX, coordsY);
			}

			if (touches.length > 1) {
				for (let i = 2; i <= touches.length; i++) {
					touches.forEach((touch) => {
						let coordsX = touch.clientX;
						let coordsY = touch.clientY - offsetY;
						console.log({ touch, i });
						this.createMultipleTouchCoords(touch, i);
						// this.draw(coordsX, coordsY);
					});
				}
			}
		}

		if (event.type === "mousemove") {
			let coordsX = event.offsetX;
			let coordsY = event.offsetY;
			console.dir(event);

			this.setState({
				lastX: coordsX,
				lastY: coordsY,
			});

			if (!this.state.colourChange)
				this.setState({
					lastX: coordsX,
					lastY: coordsY,
					hue: this.state.hue + 1,
				});
			this.draw(coordsX, coordsY);
		}
	};

	draw = (coordsX, coordsY) => {
		let canvas = document.querySelector("#draw");
		let context = canvas.getContext("2d");

		context.lineJoin = "round";
		context.lineCap = this.state.lineCap;
		context.lineWidth = this.state.lineWidth;
		context.strokeStyle =
			this.state.hsl || `hsl(${this.state.hue}, 60%, 60%)`;

		context.beginPath();
		context.moveTo(this.state.lastX, this.state.lastY);
		context.lineTo(coordsX, coordsY);
		context.stroke();
	};

	createMultipleTouchCoords = (touch, i) => {
		let touchX = `lastX${i}`;
		let touchY = `lastY${i}`;
		this.setState({
			[touchX]: touch.clientX,
			[touchY]: touch.clientY,
		});
		console.log(this.state);
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
		let hsl = hexToHsl(e.target.value);
		console.log(hexToHsl(e.target.value));
		console.log({ hsl });
		this.setState({ hsl, colourChange: true });
	};

	clearCanvas = () => {
		let canvas = document.querySelector("#draw");
		console.dir(canvas);
		let context = canvas.getContext("2d");
		context.clearRect(0, 0, canvas.width, canvas.height);
	};
	
	render() {
		return (
			<>
				<Controls
					setStrokeCap={this.setStrokeCap}
					setStrokeSize={this.setStrokeSize}
					setColour={this.setColour}
					clearCanvas={this.clearCanvas}
				/>
				<canvas id="draw" width="800" height="800"></canvas>
				<script src="index.js"></script>
			</>
		);
	}
}

export default Paint;
