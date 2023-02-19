/** @format */

import { ReactNode } from "react"

interface CardProps {
  children?: ReactNode
  className?: string
}

export default function RoundedCard(props: CardProps) {
  return (
    <div className={`${props.className || ''} rounded-md p-4 drop-shadow-md bg-white`}>
    {props.children}
    </div>
  )
}
