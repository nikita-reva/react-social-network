/* global google */
import React, { useEffect, useState } from 'react';
import { Header, Segment, Button, Confirm } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { clearSelectedEvent, listenToSelectedEvent } from '../eventActions';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryData } from '../../../app/api/categoryOption';
import MyDateInput from '../../../app/common/form/MyDateInput';
import MyPlaceInput from '../../../app/common/form/MyPlaceInput';
import useFirestoreDocument from '../../../app/hooks/useFirestoreDocument';
import {
  addEventToFirestore,
  cancelEventToggle,
  listenToEventFromFirestore,
  updateEventInFirestore,
} from '../../../app/firestore/firestoreService';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { CLEAR_EVENTS, DISCARD_STATE } from '../eventConstants';

export default function EventForm({ match, history, location }) {
  const dispatch = useDispatch();
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { selectedEvent } = useSelector((state) => state.event);
  const { loading, error } = useSelector((state) => state.async);

  useEffect(() => {
    if (location.pathname !== '/createEvent') return;
    dispatch(clearSelectedEvent());
  }, [dispatch, location.pathname]);

  const initialValues = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    city: {
      address: '',
      latLng: null,
    },
    venue: {
      address: '',
      latLng: null,
    },
    date: '',
    attendees: [],
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('You must provide a title.'),
    category: Yup.string().required('You must provide a catagory.'),
    description: Yup.string().required(),
    city: Yup.object().shape({
      address: Yup.string().required('City is required.'),
    }),
    venue: Yup.object().shape({
      address: Yup.string().required('Venue is required.'),
    }),
    date: Yup.string().required(),
  });

  async function handleCancelToggle(event) {
    setConfirmOpen(false);
    setLoadingCancel(true);
    try {
      await cancelEventToggle(event);
      dispatch({ type: DISCARD_STATE });
      dispatch({ type: CLEAR_EVENTS });
      setLoadingCancel(false);
    } catch (error) {
      setLoadingCancel(false);
      toast.error(error.message);
    }
  }

  useFirestoreDocument({
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToSelectedEvent(event)),
    deps: [match.params.id, dispatch],
    shouldExecute: location.pathname !== '/createEvent',
  });

  if (loading) return <LoadingComponent content="Loading event..." />;

  if (error) return <Redirect to="/error" />;

  return (
    <Segment clearing>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedEvent
              ? await updateEventInFirestore(values)
              : await addEventToFirestore(values);
            setSubmitting(false);
            history.push('/events');
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid, values, setFieldValue }) => (
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
            <MyPlaceInput placeholder="City" name="city" />
            <MyPlaceInput
              placeholder="Venue"
              name="venue"
              disabled={!values.city.latLng}
              options={{
                location: new google.maps.LatLng(values.city.latLng),
                radius: 1000,
                types: ['establishment'],
              }}
            />
            <MyDateInput
              placeholderText="Date"
              name="date"
              timeFormat="HH:mm"
              showTimeSelect
              timeCaption="time"
              timeIntervals={15}
              dateFormat="dd.MM.yyyy, HH:mm"
              autoComplete="off"
            />
            {selectedEvent && (
              <Button
                loading={loadingCancel}
                floated="left"
                type="button"
                color={selectedEvent?.isCancelled ? 'green' : 'red'}
                content={
                  selectedEvent?.isCancelled
                    ? 'Reactivate Event'
                    : 'Cancel Event'
                }
                onClick={() => {
                  setConfirmOpen(true);
                }}
              />
            )}
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
              to="/events"
              type="submit"
              floated="right"
              content="Cancel"
            />
            <Confirm
              content={`This will ${
                selectedEvent?.isCancelled ? 'reactivate' : 'cancel'
              } the event - are you sure?`}
              open={confirmOpen}
              onCancel={() => setConfirmOpen(false)}
              onConfirm={() => {
                handleCancelToggle(selectedEvent);
                setFieldValue('isCancelled', !values.isCancelled, true);
              }}
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
