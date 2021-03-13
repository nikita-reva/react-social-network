import React, { Fragment } from 'react'
import { Route, useLocation } from 'react-router'
import { Container } from 'semantic-ui-react'
import EventDashboard from '../../features/events/eventDashboard/EventDashboard'
import NavBar from '../../features/nav/NavBar'
import HomePage from '../../features/home/HomePage'
import EventForm from '../../features/events/eventForm/EventForm'
import EventDetailedPage from '../../features/events/eventDetails/EventDetailedPage'
import Sandbox from '../../features/sandbox/Sandbox'
import ModalManager from '../common/modals/ModalManager'

export default function App() {
	/* Without JSX */
	// const title = React.createElement('h1', {}, 'REvents without JSX')
	// const div = React.createElement('div', { className: 'App' }, title)

	const { key } = useLocation()

	return (
		<Fragment>
			<Route exact path="/" component={HomePage} />
			<Route
				path={'/(.+)'}
				render={() => (
					<>
						<ModalManager />
						<NavBar />
						<Container className="main">
							<Route
								exact
								path="/events"
								component={EventDashboard}
							/>
							<Route
								path="/events/:id"
								component={EventDetailedPage}
							/>
							<Route path="/sandbox" component={Sandbox} />
							<Route
								path={['/createEvent', '/manage/:id']}
								component={EventForm}
								key={key}
							/>
						</Container>
					</>
				)}
			/>
		</Fragment>
	)
}
