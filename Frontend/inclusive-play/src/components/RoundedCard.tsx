interface CardProps {
    text: string
}

export default function RoundedCard(props: CardProps){
    return (
      <div className="relative bg-green-400 rounded-md p-4">
        {props.text}
      </div>
    )
}
  