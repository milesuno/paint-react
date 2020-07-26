import React, { Component } from "react";

class Controls extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className="controls">
				<label>
					Stroke Style
					<select onChange={this.props.setStrokeCap}>
						<option value="round">Round</option>
						<option value="square">Square</option>
					</select>
				</label>
				<label>
					Stroke Size
					<input
						className="stroke-size-input"
						type="range"
						min="1"
						max="250"
						step="1"
						onChange={this.props.setStrokeSize}
					></input>
				</label>
				<label>
					Colour Picker
					<input type="color" onChange={this.props.setColour}></input>
				</label>
			</div>
		);
	}
}

export default Controls;
