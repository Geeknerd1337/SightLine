/** @format */

import Head from "next/head"
import Image from "next/image"
import { useState } from "react"

import NavigationBar from "@/components/NavigationBar"

import HomeView from "@/views/HomeView"
import AboutView from "@/views/AboutView"

import { Inter } from "@next/font/google"
import styles from "@/styles/Home.module.css"

const inter = Inter({ subsets: ["latin"] })

// page metadata
const TAB_TITLE = "Sightline"
const META_DESC = "A video analyzing app to increase accessibility to visual sensitivities"

// page enum
const PAGES = {
	HOME: 0,
	ABOUT: 1, // unsure if used
}

// * primary app component
export default function App() {
	// * state
	const [pageIndex, setPageIndex] = useState(0)

	// * render functions
	// renders page on page index
	const renderPage = (index: Number) => {
		let pageToRender = <></>
		switch (index) {
			case 0:
				pageToRender = <HomeView />
				break
			case 1:
				pageToRender = <AboutView />
				break
			default:
				break
		}
		return pageToRender
	}

	// * primary render
	return (
		<>
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
			<div className="w-screen h-screen flex bg-gray-200 flex-col overflow-hidden">
				{/* style={{width:'100vw', height:'100vh', background-''}}> */}
				<NavigationBar setIndex={setPageIndex} />
				{renderPage(pageIndex)}
			</div>
		</>
	)
}
