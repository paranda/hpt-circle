import React, { Component, PropTypes } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

import { Idols } from '../api/idols.js';
import Idol from './Idol.jsx';
import MakeIdol from './MakeIdol.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
class App extends Component {
	renderIdols() {
		return this.props.idols.map((idol) => (
			<Idol key={idol._id} idol={idol}/>
		));
	}

	render() {
		return (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div className="container">
					<header>
						<h1>Idol List</h1>
						<AccountsUIWrapper />
						<MakeIdol />
					</header>
					<ul>
						{this.renderIdols()}
					</ul>
				</div>
			</MuiThemeProvider>
		);
	}
}

App.propTypes = {
	idols: PropTypes.array.isRequired,
};

export default createContainer(() => {
	return {
		idols: Idols.find({}, {sort: {createdAt: -1}}).fetch(),
		currentUser: Meteor.user(),
	};
}, App);
