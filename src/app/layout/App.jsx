import React, { Fragment } from 'react'
import { Container } from 'semantic-ui-react'
import EventDashboard from '../../features/events/eventDashboard/EventDashboard'
import NavBar from '../../features/nav/NavBar'

export default function App() {
	/* Without JSX */
	// const title = React.createElement('h1', {}, 'REvents without JSX')
	// const div = React.createElement('div', { className: 'App' }, title)

	return (
		<Fragment>
			<NavBar />
			<Container className="main">
				<EventDashboard />
			</Container>
		</Fragment>
	)
}
