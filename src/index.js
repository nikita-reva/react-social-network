import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-calendar/dist/Calendar.css'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import './app/layout/styles.css'
import App from './app/layout/App'
import { configureStore } from './app/store/configureStore'
import ScrollToTop from './app/layout/ScrollToTop'
import { loadEvents } from './features/events/eventActions'

const store = configureStore()

store.dispatch(loadEvents())

const rootElement = document.getElementById('root')

function render() {
	ReactDOM.render(
		<Provider store={store}>
			<Router>
				<ScrollToTop />
				<App />
			</Router>
		</Provider>,
		rootElement
	)
}

if (module.hot) {
	module.hot.accept('./app/layout/App', function () {
		setTimeout(render)
	})
}

render()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
