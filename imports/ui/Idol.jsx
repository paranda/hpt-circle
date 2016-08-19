import React, { Component, PropTypes } from 'react';
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';

export default class Idol extends Component {
	getDisplayName() {
		return this.props.idol.nickName ?
			this.props.idol.nickName : this.props.idol.fullName;
	}

	render() {
		return (
			<ListItem
				primaryText={this.getDisplayName()}
				onTouchTap={this.props.onTouchTap}
				leftAvatar={
					<Avatar
						icon={<FontIcon className="material-icons">face</FontIcon>}
					/>
				}
			/>
		);
	}
}

Idol.propTypes = {
	// This component gets the task to display through a React prop.
	// We can use propTypes to indicate it is required
	idol: PropTypes.object.isRequired,
	onTouchTap: PropTypes.func,
};
