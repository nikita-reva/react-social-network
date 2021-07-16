import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import { listenToEventFromFirestore } from '../../../app/firestore/firestoreService';
import useFirestoreDocument from '../../../app/hooks/useFirestoreDocument';
import { listenToSelectedEvent } from '../eventActions';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidebar from './EventDetailedSidebar';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Redirect } from 'react-router';

export default function EventDetailedPage({ match }) {
  const { selectedEvent } = useSelector((state) => state.event);
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.async);
  const isHost = selectedEvent?.hostUid === currentUser?.uid;
  const isGoing = selectedEvent?.attendees?.some(
    (a) => a.id === currentUser?.uid
  );

  useFirestoreDocument({
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToSelectedEvent(event)),
    deps: [match.params.id, dispatch],
  });

  if (loading || (!selectedEvent && !error))
    return <LoadingComponent content="Loading event..." />;

  if (error) return <Redirect to="/error" />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader
          event={selectedEvent}
          isHost={isHost}
          isGoing={isGoing}
        />
        <EventDetailedInfo event={selectedEvent} />
        <EventDetailedChat eventId={selectedEvent.id} />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar
          attendees={selectedEvent?.attendees}
          hostUid={selectedEvent.hostUid}
        />
      </Grid.Column>
    </Grid>
  );
}
