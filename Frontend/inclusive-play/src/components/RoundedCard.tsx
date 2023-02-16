/** @format */

import { ReactNode } from "react"

interface CardProps {
	children?: ReactNode
	className?: string
}

export default function RoundedCard(props: CardProps) {
	const renderInternal = () => {
		return <div className="drop-shadow-md flex-auto bg-white rounded-md p-4">{props.children}</div>
	}

	return <>{props.className ? <div className={props.className}>{renderInternal()}</div> : renderInternal()}</>
}
