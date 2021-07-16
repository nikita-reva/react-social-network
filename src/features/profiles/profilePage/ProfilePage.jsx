import React from 'react';
import { Grid } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import useFirestoreDocument from '../../../app/hooks/useFirestoreDocument';
import { getUserProfile } from '../../../app/firestore/firestoreService';
import { listenToSelectedUserProfile } from '../profileActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
let profile;

export default function ProfilePage({ match }) {
  const dispatch = useDispatch();
  const { selectedUserProfile, currentUserProfile } = useSelector(
    (state) => state.profile
  );
  const { currentUser } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.async);

  useFirestoreDocument({
    query: () => getUserProfile(match.params.id),
    data: (profile) => dispatch(listenToSelectedUserProfile(profile)),
    deps: [dispatch, match.params.id],
    shouldExecute: match.params.id !== currentUser.uid,
  });

  if (match.params.id === currentUser.uid) {
    profile = currentUserProfile;
  } else {
    profile = selectedUserProfile;
  }

  if ((loading && !profile) || (!error && !profile))
    return <LoadingComponent content="Loading profile..." />;

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader
          profile={profile}
          isCurrentUser={currentUser.uid === profile.id}
        />
        <ProfileContent
          profile={profile}
          isCurrentUser={currentUser.uid === profile.id}
        />
      </Grid.Column>
    </Grid>
  );
}
