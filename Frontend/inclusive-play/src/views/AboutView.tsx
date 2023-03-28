/** @format */

import RoundedCard from "@/components/RoundedCard"
import DropDownButton from "@/components/DropDownButton"
import BarChart from "@/components/BarChart"
import links from "@/links.json"
import { AiOutlineLink } from "react-icons/ai"

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

					<RoundedCard flex className="border">
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis sunt odio neque natus at numquam, 
							iusto quibusdam exercitationem ex enim asperiores nesciunt temporibus officiis sint magni minima cum amet. Quod.</p>
					</RoundedCard>

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
				<div className="w-96 flex flex-col">{renderRightColumn()}</div>
			</div>
			
		</>
	)
}
