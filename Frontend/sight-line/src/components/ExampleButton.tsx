

//Example button props
interface ExampleButtonProps {
    text: string;
    onClick?: () => void;
}

export default function ExampleButton(props: ExampleButtonProps){
    return(
        <button onClick={props.onClick} className="bg-gray-400">
            {props.text}
        </button>
    )
}