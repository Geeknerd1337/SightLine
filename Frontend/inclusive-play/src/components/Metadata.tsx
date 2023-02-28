/** @format */
import React from "react"
import Head from "next/head"
import { ReactNode } from "react"

// font
import { Inter } from "@next/font/google"
const inter = Inter({ subsets: ["latin"] })

// page metadata
const TAB_TITLE = "Sightline"
const META_DESC = "A video analyzing app to increase accessibility to visual sensitivities"
const BACKGROUND = "bg-gray-200"

// props
interface MetadataProps {
	children?: ReactNode
}

// * wrap page in important metadata
export default function Metadata(props: MetadataProps) {
	return (
		<div className={`flex flex-1 w-screen h-screen flex-col ${BACKGROUND}`}>
			<Head>
				<title>{TAB_TITLE}</title>
				<meta
					name="description"
					content={META_DESC}
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>
			{props.children}
		</div>
	)
}
