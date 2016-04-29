import React, { Component, PropTypes } from 'react';

export default class Idol extends Component {
	render() {
		return (
			<li>{this.props.idol.nickName}</li>
		);
	}
}

Idol.propTypes = {
	// This component gets the task to display through a React prop.
	// We can use propTypes to indicate it is required
	idol: PropTypes.object.isRequired,
};
