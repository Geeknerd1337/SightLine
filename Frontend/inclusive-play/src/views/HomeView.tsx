/** @format */

import RoundedCard from "@/components/RoundedCard"
import DropDownButton from "@/components/DropDownButton"
import BarChart from "@/components/BarChart"
import links from "@/links.json"
import { AiOutlineLink } from "react-icons/ai"

// * home page
export default function HomeView() {
	// * display

	// * data

	// * data functions

	// * render functions
	const renderSubHeader = () => {
		return <div className="flex-auto" />
	}

	const renderLeftColumn = () => {
		return (
			<div className="flex-auto flex flex-col">

				<DropDownButton></DropDownButton>
				
				<RoundedCard className="m-3" />
				<RoundedCard className="m-3">
					<div className="flex pb-4 font-semibold text-2xl justify-items-start flex-row">
						<RoundedCard className="bg-red-300 mr-3 p-2.5 md:filter-none"/>	
						Links
					</div>

					<ul className="flex flex-col items-start">
						{links.map((link, i) => (
							<div className="flex items-center justify-between p-1" key={i}>
								<AiOutlineLink className="mr-1"/>
								<li className="font-semibold text-lg hover:text-purple-400"><a href={link.URL}>{link.title}</a></li>	
							</div>
						))}
					</ul>
				</RoundedCard>
			</div>
		)
	}
	const renderMiddleColumn = () => {
		return (
			<>
				<div className="absolute top-34 text-4.5xl font-bold">Dashboard</div>
				
				<RoundedCard flex>
					<div className="flex pb-4 font-semibold text-2xl justify-items-start flex-row">
						<RoundedCard className="bg-orange-300 mr-3 p-2.5 md:filter-none"/>	
						Analysis
					</div>

					<RoundedCard flex className="border">
						<div style={{width: "99%", height: "99%"}}>
							<BarChart></BarChart>
						</div>
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
						<RoundedCard className="bg-sky-300 mr-3 p-2.5 md:filter-none"/>	
						Grade Breakdown
					</div>

					<RoundedCard flex className="border">
						<p></p>
					</RoundedCard>

				</RoundedCard>
			</>
		)
	}

	// * primary render
	return (
		<>
			<div className="h-20">{renderSubHeader()}</div>
			<div className="flex-1 flex m-8 gap-6 flex-row text-black">
				<div className="w-74 flex flex-col">{renderLeftColumn()}</div>
				<div className="flex-auto flex flex-col grow-2">{renderMiddleColumn()}</div>
				<div className="flex-auto flex flex-col">{renderRightColumn()}</div>
			</div>
		</>
	)
}
