import React from 'react'
import { Header, Segment, Button } from 'semantic-ui-react'
import cuid from 'cuid'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { updateEvent, createEvent } from '../eventActions'
import MyTextInput from '../../../app/common/form/MyTextInput'
import MyTextArea from '../../../app/common/form/MyTextArea'
import MySelectInput from '../../../app/common/form/MySelectInput'
import { categoryData } from '../../../app/api/categoryOption'
import MyDateInput from '../../../app/common/form/MyDateInput'

export default function EventForm({ match, history }) {
	const dispatch = useDispatch()

	const selectedEvent = useSelector((state) =>
		state.event.events.find((evt) => evt.id === match.params.id)
	)

	const initialValues = selectedEvent ?? {
		title: '',
		category: '',
		description: '',
		city: '',
		venue: '',
		date: '',
		attendees: [],
	}

	const validationSchema = Yup.object({
		title: Yup.string().required('You must provide a title.'),
		category: Yup.string().required('You must provide a catagory.'),
		description: Yup.string().required(),
		city: Yup.string().required(),
		venue: Yup.string().required(),
		date: Yup.string().required(),
	})

	return (
		<Segment clearing>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					selectedEvent
						? dispatch(updateEvent({ ...selectedEvent, ...values }))
						: dispatch(
								createEvent({
									...values,
									id: cuid(),
									hostedBy: 'Bob',
									attendees: [],
									hostPhotoURL: '/assets/user.png',
								})
						  )
					history.push('/events')
				}}
			>
				{({ isSubmitting, dirty, isValid }) => (
					<Form className="ui form">
						<Header sub color="teal" content="Event Details" />
						<MyTextInput placeholder="Event title" name="title" />
						<MySelectInput
							placeholder="Category"
							name="category"
							options={categoryData}
						/>
						<MyTextArea
							placeholder="Description"
							name="description"
							rows={3}
							style={{ resize: 'none' }}
						/>

						<Header sub color="teal" content="Event Location" />
						<MyTextInput placeholder="City" name="city" />
						<MyTextInput placeholder="Venue" name="venue" />
						<MyDateInput
							placeholderText="Date"
							name="date"
							timeFormat="HH:mm"
							showTimeSelect
							timeCaption="time"
							timeIntervals={15}
							dateFormat="dd.MM.yyyy, HH:mm"
						/>

						<Button
							loading={isSubmitting}
							disabled={!isValid || !dirty || isSubmitting}
							type="submit"
							floated="right"
							positive
							content="Submit"
						/>
						<Button
							disabled={isSubmitting}
							as={Link}
							to="events"
							type="submit"
							floated="right"
							content="Cancel"
						/>
					</Form>
				)}
			</Formik>
		</Segment>
	)
}
