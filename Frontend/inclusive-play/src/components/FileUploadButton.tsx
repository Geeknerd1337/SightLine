/** @format */
import React, { ReactNode } from "react"

//Example button props
interface FileUploadButtonProps {
	endpoint: string
	onClick?: () => void
	children?: ReactNode
}

export default function FileUploadButton(props: FileUploadButtonProps) {
	const [file, setFile] = React.useState("")

	// load into client
	const uploadClient = (event : any) => {
		if (event?.target?.files && event?.target?.files[0]) {
			const i = event?.target?.files[0]
			setFile(i)
			if (props.onClick) props.onClick( )
		}
	}

	// upload to server
	const uploadServer = async (event : any) => {
		const body = new FormData()
		body.append("file", file)
		const response = await fetch(props.endpoint, {
			method: "PUT",
			body,
		})
		console.log(response);
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
