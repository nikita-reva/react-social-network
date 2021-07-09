import React, { useRef } from 'react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

export default function PhotoWidgetCropper({ setImage, imagePreview }) {
	const cropperRef = useRef(null)
	const onCrop = () => {
		const imageElement = cropperRef?.current
		const cropper = imageElement?.cropper

		if (typeof cropper.getCroppedCanvas() === 'undefined') {
			return
		}

		cropper.getCroppedCanvas().toBlob((blob) => {
			setImage(blob)
		}, 'image.jpeg')
	}

	return (
		<Cropper
			src={imagePreview}
			style={{ height: 200, width: '100%' }}
			// Cropper.js options
			initialAspectRatio={1}
			preview=".img-preview"
			guides={false}
			viewMode={1}
			crop={onCrop}
			dragMode="move"
			scalable={true}
			cropBoxMovable={true}
			cropBoxResizable={true}
			ref={cropperRef}
		/>
	)
}
