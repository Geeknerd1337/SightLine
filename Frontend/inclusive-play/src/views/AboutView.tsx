/** @format */

import RoundedCard from "@/components/RoundedCard"
import { BsPersonCircle } from "react-icons/bs"
import team from "@/team.json"

// * home page
export default function AboutView() {
	// * display

	// * data

	// * data functions

	// * render functions
	const renderSubHeader = () => {
		return <div className="flex-auto" />
	}

	const renderLeftColumn = () => {
		return (
			<div className=" flex-auto flex flex-col">
				
			</div>
		) 
	}
	const renderMiddleColumn = () => {
		return (
			<>
				<div className="absolute top-34 text-4.5xl font-bold">About</div>
				<RoundedCard flex>
					<div className="flex pb-4 font-semibold text-2xl justify-items-start flex-row">
						<RoundedCard className="bg-green-300 mr-3 p-2.5 md:filter-none"/>	
						The Project
					</div>

					<RoundedCard flex className="border">
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem temporibus distinctio, et perspiciatis accusamus voluptate libero officiis reiciendis commodi minus ullam, eos magni, ex vel quisquam ipsa beatae repellat accusantium.
						</p>
					</RoundedCard>

				</RoundedCard>
			</>
		) 
	}
	const renderRightColumn = () => {
		return (
			<>
				<RoundedCard flex>
					<div className="flex pb-4 font-semibold text-2xl justify-items-start flex-row">
						<RoundedCard className="bg-purple-200 mr-3 p-2.5 md:filter-none"/>	
						Team
					</div>

					<ul className="flex flex-col items-start">
						{team.map((person, i) => (
							<div className="flex flex-col items-start justify-between p-1" key={i}>
								<BsPersonCircle className="mr-1 text-4xl text-gray-400"/>
								<h3 className="p-2 text-xl font-bold">
									{person.title}
								</h3>
								<span>
									{person.email}
								</span>
							</div>
						))}
					</ul>

				</RoundedCard>
			</>
		) 
	}


	// * primary render
	return(
		<>
			<div className="h-20">{renderSubHeader()}</div>
			<div className="flex-1 flex m-8 gap-6 flex-row text-black">
				<div className="flex flex-col">{renderLeftColumn()}</div>
				<div className="flex-auto flex flex-col grow-2">{renderMiddleColumn()}</div>
				<div className="w-1/3 h-1/3 flex flex-col">{renderRightColumn()}</div>
			</div>
			
		</>
	)
}
