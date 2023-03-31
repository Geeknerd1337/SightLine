/** @format */
import React, { ReactNode } from "react"

// import streamSaver from "streamsaver"
// const uInt8 = new TextEncoder().encode('StreamSaver is awesome')

// import { saveAs } from "file-saver"

// import { consumers } from "stream"
// import { blob } from "stream-consumers"
// import consumers from "stream/consumers"

// import createRequire from "create-require"
// import * as fs from "fs"
// import { default as streamToBlob } from "stream-to-blob"
// import "blob-stream"
// import BlobStream from "blob-stream"

// import { createRequire } from "module"
// const require = createRequire(import.meta.url)

// const streamToBlob = require("stream-to-blob")
// const FileSaver = require("file-saver")

//Example button props
interface FileUploadButtonProps {
	endpoint: string
	onClick?: () => void
	children?: ReactNode
}

export default function FileUploadButton(props: FileUploadButtonProps) {
	const [file, setFile] = React.useState("")

	// load into client
	const uploadClient = (event) => {
		if (event?.target?.files && event?.target?.files[0]) {
			const i = event?.target?.files[0]
			setFile(i)
			if (props.onClick) props.onClick(event)
		}
	}

	// upload to server
	const uploadServer = async (event) => {
		const body = new FormData()
		body.append("file", file)
		const response = await fetch(props.endpoint, {
			method: "PUT",
			body,
		})
		console.log(response)
		// if (response.statusText == "Conflict") {
		// 	// let blobby = await consumers.blob(response.body)
		// 	// saveAs(blobby, "file")
		// 	// let writeStream = streamSaver.createWriteStream('file', {
		// 	// size: uInt8.byteLength, // (optional filesize) Will show progress
		// 	// writableStrategy: undefined, // (optional)
		// 	// readableStrategy: undefined  // (optional))
		// 	// })
		// 	// const writer = writeStream.getWriter()
		// 	// writer.write(uInt8)
		// 	// writer.close()
		// }
	}

	return (
		<div>
			<input
				type="file"
				name="upload"
				onChange={uploadClient}
			/>
			<button
				type="submit"
				onClick={uploadServer}
			>
				Upload
			</button>
		</div>
	)
}
