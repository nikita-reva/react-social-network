import React, { Fragment, useState } from 'react'
import { Container } from 'semantic-ui-react'
import EventDashboard from '../../features/events/eventDashboard/EventDashboard'
import NavBar from '../../features/nav/NavBar'

export default function App() {
	/* Without JSX */
	// const title = React.createElement('h1', {}, 'REvents without JSX')
	// const div = React.createElement('div', { className: 'App' }, title)

	const [formOpen, setFormOpen] = useState(false)
	const [selectedEvent, setSelectedEvent] = useState(null)

	function handleSelectEvent(event) {
		setSelectedEvent(event)
		setFormOpen(true)
	}

	function handleCreateFormOpen() {
		setSelectedEvent(null)
		setFormOpen(true)
	}

	return (
		<Fragment>
			<NavBar setFormOpen={handleCreateFormOpen} />
			<Container className="main">
				<EventDashboard
					formOpen={formOpen}
					setFormOpen={setFormOpen}
					selectEvent={handleSelectEvent}
					selectedEvent={selectedEvent}
				/>
			</Container>
		</Fragment>
	)
}
