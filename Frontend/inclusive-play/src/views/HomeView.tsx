import ExampleButton from "@/components/ExampleButton"

export default function HomeView(){
    return(
        <div className="flex m-4 gap-4 flex-col bg-white text-black justify-center items-center h-full w-full">
            <ExampleButton/>
            <ExampleButton/>
            <ExampleButton/>
            <ExampleButton/>
        </div>
    )
}