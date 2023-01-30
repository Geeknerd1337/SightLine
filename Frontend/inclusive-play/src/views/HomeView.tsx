import ExampleButton from "@/components/ExampleButton"
import RoundedCard from "@/components/RoundedCard"
import { useState, useEffect } from "react"

export default function HomeView(){
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log("Count changed to " + count);
    }
    , [count])

    
    return(
        <div className="flex m-4 gap-4 flex-col bg-white text-black justify-center items-center h-full w-full">
            <ExampleButton text={count.toString()} onClick={
                () => {
                    setCount(count + 1);
                }
            } />

            <RoundedCard text = 'Hello'/>
        </div>
    )

}