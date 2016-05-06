import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

//API Related imports
import { Idols } from '../api/idols.js';

//UI Related Imports
import Idol from './Idol.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MakeIdol from './MakeIdol.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

//MaterialUI
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();


// App component - represents the whole app
class App extends Component {
	renderIdols() {
		return this.props.idols.map((idol) => (
			<Idol key={idol._id} idol={idol}/>
		));
	}

	handleIdolSelect(event){
		console.log(event);
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
					<List
						onTouchTap={this.handleIdolSelect}
					>
						<Subheader>Recently Created Idols</Subheader>
						{this.renderIdols()}
					</List>
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
