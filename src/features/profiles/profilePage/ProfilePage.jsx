import React from 'react'
import { Grid } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'

import ProfileHeader from './ProfileHeader'
import ProfileContent from './ProfileContent'
import useFirestoreDocument from '../../../app/hooks/useFirestoreDocument'
import { getUserProfile } from '../../../app/firestore/firestoreService'
import { listenToSelectedUserProfile } from '../profileActions'
import LoadingComponent from '../../../app/layout/LoadingComponent'

export default function ProfilePage({ match }) {
	const dispatch = useDispatch()
	const { selectedUserProfile } = useSelector((state) => state.profile)
	const { currentUser } = useSelector((state) => state.auth)
	const { loading, error } = useSelector((state) => state.async)

	useFirestoreDocument({
		query: () => getUserProfile(match.params.id),
		data: (profile) => dispatch(listenToSelectedUserProfile(profile)),
		deps: [dispatch, match.params.id],
	})

	if ((loading && !selectedUserProfile) || (!error && !selectedUserProfile))
		return <LoadingComponent content="Loading profile..." />

	return (
		<Grid>
			<Grid.Column width={16}>
				<ProfileHeader
					profile={selectedUserProfile}
					isCurrentUser={currentUser.uid === selectedUserProfile.id}
				/>
				<ProfileContent
					profile={selectedUserProfile}
					isCurrentUser={currentUser.uid === selectedUserProfile.id}
				/>
			</Grid.Column>
		</Grid>
	)
}
