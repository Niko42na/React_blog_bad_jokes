"use strict";

import React             from 'react';
import Reflux            from 'reflux';
import { Link, History } from 'react-router';
import Actions           from 'appRoot/actions';
import SessionStore      from 'appRoot/stores/sessionContext';
 
export default React.createClass({
	mixins: [
		Reflux.connect(SessionStore, 'session'),
		History
	],
	logOut: function () {
		Actions.logOut();
		this.history.pushState('', '/');
	},
	search: function () {
		var searchVal = this.refs.search.value;
		Actions.search(searchVal);
	},
	render: function () {
		return (
			<header className="app-header">
				<Link to="/"><h1>B&#923;d Jokes</h1></Link>
				<section className="account-ctrl">
					<input 
						ref="search" 
						type="search" 
						placeholder="search" 
						defaultValue={this.state.initialQuery}
						onChange={this.search} />
						{
							this.state.session.loggedIn ? 
								(<Link to="/posts/create">
									Hi there, {this.state.session.username}. Tell us some joke!
								</Link>) : 
								<Link to="/users/create">Join to us</Link>
						}
						{
							this.state.session.loggedIn ? 
								<a onClick={this.logOut}>Log Out</a> :
								<Link to="/login">Log In</Link> 
						} 
				</section>
			</header> 
		);
	}
});

