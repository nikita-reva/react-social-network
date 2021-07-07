import React, { Fragment } from 'react'
import { Route, useLocation } from 'react-router'
import { Container } from 'semantic-ui-react'
import { ToastContainer } from 'react-toastify'

import EventDashboard from '../../features/events/eventDashboard/EventDashboard'
import NavBar from '../../features/nav/NavBar'
import HomePage from '../../features/home/HomePage'
import EventForm from '../../features/events/eventForm/EventForm'
import EventDetailedPage from '../../features/events/eventDetails/EventDetailedPage'
import Sandbox from '../../features/sandbox/Sandbox'
import ModalManager from '../common/modals/ModalManager'
import ErrorComponent from '../common/errors/ErrorComponent'
import AccountPage from '../../features/auth/AccountPage'
import { useSelector } from 'react-redux'
import LoadingComponent from './LoadingComponent'

export default function App() {
	/* Without JSX */
	// const title = React.createElement('h1', {}, 'REvents without JSX')
	// const div = React.createElement('div', { className: 'App' }, title)

	const { key } = useLocation()
	const { initialized } = useSelector((state) => state.async)

	if (!initialized) return <LoadingComponent content="Loading App..." />

	return (
		<Fragment>
			<Route exact path="/" component={HomePage} />
			<Route
				path={'/(.+)'}
				render={() => (
					<>
						<ModalManager />
						<ToastContainer
							position="bottom-right"
							hideProgressBar
						/>
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
							<Route path="/account" component={AccountPage} />
							<Route path="/error" component={ErrorComponent} />
						</Container>
					</>
				)}
			/>
		</Fragment>
	)
}
