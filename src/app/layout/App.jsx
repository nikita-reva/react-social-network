import React, { Fragment, useState } from 'react'
import { Container } from 'semantic-ui-react'
import EventDashboard from '../../features/events/eventDashboard/EventDashboard'
import NavBar from '../../features/nav/NavBar'

export default function App() {
	/* Without JSX */
	// const title = React.createElement('h1', {}, 'REvents without JSX')
	// const div = React.createElement('div', { className: 'App' }, title)

	const [formOpen, setFormOpen] = useState(false)

	return (
		<Fragment>
			<NavBar setFormOpen={setFormOpen} />
			<Container className="main">
				<EventDashboard formOpen={formOpen} setFormOpen={setFormOpen} />
			</Container>
		</Fragment>
	)
}
