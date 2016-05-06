import React, { Component, PropTypes } from 'react';
import update from 'react-addons-update';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// API Related imports
import { Idols } from '../api/idols.js';

// UI Related Imports
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import Idol from './Idol.jsx';
import IdolProfile from './IdolProfile.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MakeIdol from './MakeIdol.jsx';

// MaterialUI
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Drawer from 'material-ui/Drawer';

// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();


// App component - represents the whole app
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			idolDrawer: {
				idol: null,
				isOpen: false,
			},
		};
		// Manually bind handler methods to constructor
		this.toggleDrawer = this.toggleDrawer.bind(this);
		this.renderIdolDrawerContents = this.renderIdolDrawerContents.bind(this);
	}

	onIdolTouchTap(idol) {
		this.setState({
			idolDrawer: {
				idol,
				isOpen: true,
			},
		});
	}

	toggleDrawer(isOpen) {
		const newState = update(this.state, {
			idolDrawer: {
				isOpen: {$set: isOpen},
			},
		});
		this.setState(newState);
	}

	renderIdols() {
		return this.props.idols.map((idol) => (
			<Idol
				key={idol._id}
				idol={idol}
				onTouchTap={this.onIdolTouchTap.bind(this, idol)}
			/>
		));
	}

	renderIdolDrawerContents({idol}) {
		if (idol) {
			return (
				<IdolProfile
					key={idol._id}
					idol={idol}
				/>
			);
		}
		return (
			<div className="emptyDrawerMessage">
				No idol selected
			</div>
		);
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
					<List>
						<Subheader>Recently Created Idols</Subheader>
						{this.renderIdols()}
					</List>
					<Drawer
						docked={false}
						openSecondary
						open={this.state.idolDrawer.isOpen}
						onRequestChange={this.toggleDrawer}
					>
						{this.renderIdolDrawerContents(this.state.idolDrawer)}
					</Drawer>
				</div>
			</MuiThemeProvider>
		);
	}
}

App.propTypes = {
	idols: PropTypes.array.isRequired,
};

export default createContainer(() => {
	Meteor.subscribe('idols');

	return {
		idols: Idols.find({}, {sort: {createdAt: -1}}).fetch(),
		currentUser: Meteor.user(),
	};
}, App);
