import React, { Component, PropTypes } from 'react';

export default class IdolProfile extends Component {
	showNickname() {
		if (this.props.idol.nickName) {
			return (
				<span>({this.props.idol.nickName})</span>
			);
		}
		return '';
	}

	render() {
		return (
			<div className="idolProfile">
				<div className="profile-name">
					{this.props.idol.fullName} {this.showNickname()}
				</div>
			</div>
		);
	}
}

IdolProfile.propTypes = {
	// This component gets the task to display through a React prop.
	// We can use propTypes to indicate it is required
	idol: PropTypes.object.isRequired,
};
