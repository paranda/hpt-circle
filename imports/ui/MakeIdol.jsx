import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import {createIdol} from '../api/idols.js';

const userSuppliedFields = [
	{name: 'surName', label: 'Last Name', value: '', required: false},
	{name: 'givenName', label: 'First Name', value: '', required: true},
	{name: 'nickName', label: 'Nick Name', value: '', required: false},
];

// Form for creating idols
export default class MakeIdol extends Component {

	constructor(props) {
		super(props);
		const defaultState = {};
		// Populate initial fields from the supplied idol object
		userSuppliedFields.forEach((field) => {
			if (props.idol.hasOwnProperty(field.name)) {
				defaultState[field.name] = props.idol[field.name];
			} else {
				defaultState[field.name] = field.value;
			}
		}, this);
		this.defaultState = defaultState;
		this.state = defaultState;
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();

		const idolEntity = {};
		userSuppliedFields.forEach((field) => {
			if (this.state[field.name] !== undefined) {
				idolEntity[field.name] = this.state[field.name].trim();
			}
		}, this);

		// Insert the idol to database
		createIdol.call(idolEntity, (err, res) => {
			if (err) {
				alert(err);
			} else {
				// success!
			}
		});
		// Reset form from beginning
		this.setState(this.defaultState);
	}

	renderTextInput(field, label) {
		return (
			<TextField
				name={field}
				value={this.state[field]}
				floatingLabelText={label}
				onChange={this.handleChange.bind(this)}
			/>
		);
	}

	render() {
		return (
			<form
				autoComplete="off"
				name="make-idol-search"
				className="make-idol"
				onSubmit={this.handleSubmit.bind(this)}
			>
				{this.renderTextInput('surName', 'Last Name')}
				{this.renderTextInput('givenName', 'First Name')}
				{this.renderTextInput('nickName', 'Nickname')}
				<button>Submit</button>
			</form>
		);
	}
}

MakeIdol.propTypes = {
	// This component gets the task to display through a React prop.
	// We can use propTypes to indicate it is required
	idol: PropTypes.object,
};

MakeIdol.defaultProps = {
	idol: {},
};
