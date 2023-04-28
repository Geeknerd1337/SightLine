/** @format */

import RoundedCard from "@/components/RoundedCard"
import DropDownButton from "@/components/DropDownButton"
import BarChart from "@/components/BarChart"
import links from "@/links.json"
import { AiOutlineLink } from "react-icons/ai"
import FileUploadButton from "@/components/FileUploadButton"
import LineChart from "@/components/LineChart"

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

				<RoundedCard className="m-3">
					<FileUploadButton endpoint="/api/upload" />
				</RoundedCard>
				<RoundedCard className="m-3">
					<div className="flex pb-4 font-semibold text-2xl justify-items-start flex-row">
						<RoundedCard className="bg-red-300 mr-3 p-2.5 md:filter-none" />
						Links
					</div>

					<ul className="flex flex-col items-start">
						{links.map((link, i) => (
							<div
								className="flex items-center justify-between p-1"
								key={i}
							>
								<AiOutlineLink className="mr-1" />
								<li className="font-semibold text-lg hover:text-purple-400">
									<a href={link.URL}>{link.title}</a>
								</li>
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
						<RoundedCard className="bg-orange-300 mr-3 p-2.5 md:filter-none" />
						Analysis
					</div>

					<RoundedCard flex className="border items-end">
						<div style={{width: "99%", height: "99%"}}>
							{/* <BarChart></BarChart> */}
							<LineChart></LineChart>
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
						<RoundedCard className="bg-sky-300 mr-3 p-2.5 md:filter-none" />
						Grade Breakdown
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
	return (
		<>
			<div className="h-20">{renderSubHeader()}</div>
			<div className="flex-1 flex m-8 gap-6 flex-row text-black">
				<div className="hidden lg:flex flex-col">{renderLeftColumn()}</div>
				<div className="flex-auto flex flex-col grow-2">{renderMiddleColumn()}</div>
				<div className="w-96 flex flex-col">{renderRightColumn()}</div>
			</div>
		</>
	)
}
