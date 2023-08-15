/** @format */

import { ReactNode } from "react"

interface CardProps {
	children?: ReactNode
	className?: string
	flex?: boolean
}

// convenience card
export default function RoundedCard(props: CardProps) {
	// internal functions
	let constructClassName = () => {
		let className = "rounded-md p-4 drop-shadow-md bg-white"
		if (props.className) className += " " + props.className
		if (props.flex) className += " flex flex-auto flex-col"
		return className
	}

	// * primary return
	return <div className={constructClassName()}>{props.children}</div>
}
