import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Header, Icon } from 'semantic-ui-react'

export default function PhotoWidgetDropzone({ setFiles }) {
	const dropzoneStyles = {
		border: 'dashed 3px #eee',
		borderRadius: '5%',
		paddingTop: 30,
		textAlign: 'center',
		transition: 'border 150ms linear',
	}

	const dropzoneActive = {
		border: 'dashed 3px green',
	}

	const onDrop = useCallback(
		(acceptedFiles) => {
			// Do something with the files
			setFiles(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				)
			)
			console.log(acceptedFiles)
		},
		[setFiles]
	)
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	})

	return (
		<div
			style={
				isDragActive
					? { ...dropzoneStyles, ...dropzoneActive }
					: dropzoneStyles
			}
			{...getRootProps()}
		>
			<input {...getInputProps()} />
			<Icon name="upload" size="huge" />
			<Header content="Drop image here" />
		</div>
	)
}
