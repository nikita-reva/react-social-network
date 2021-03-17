import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { openModal } from '../../app/common/modals/modalReducer'
import TestMap from './TestMap'
import TestPlacesInput from './TestPlacesInput'
import { decrement, increment } from './testReducer'

export default function Sandbox() {
	const [target, setTarget] = useState(null)
	const data = useSelector((state) => state.test.data)
	const { loading } = useSelector((state) => state.async)
	const dispatch = useDispatch()

	const defaultLocation = {
		center: {
			lat: 47.68,
			lng: 9.17,
		},
		zoom: 11,
	}

	const [location, setLocation] = useState(defaultLocation)

	function handleSetLocation(latLng) {
		setLocation({
			...location,
			center: { lat: latLng.lat, lng: latLng.lng },
		})
	}

	return (
		<>
			<h1>Testing 123</h1>
			<h3>The data is: {data}</h3>
			<Button
				name="increment"
				loading={target === 'increment' && loading}
				onClick={(e) => {
					dispatch(increment(20))
					setTarget(e.target.name)
				}}
				content="Increment"
				color="green"
			/>
			<Button
				name="decrement"
				loading={target === 'decrement' && loading}
				onClick={(e) => {
					dispatch(decrement(10))
					setTarget(e.target.name)
				}}
				content="Decrement"
				color="red"
			/>
			<Button
				onClick={() =>
					dispatch(
						openModal({
							modalType: 'TestModal',
							modalProps: { data },
						})
					)
				}
				content="Open Modal"
				color="teal"
			/>
			<div style={{ marginTop: 15 }}>
				<TestPlacesInput setLocation={handleSetLocation} />
				<TestMap location={location} />
			</div>
		</>
	)
}
