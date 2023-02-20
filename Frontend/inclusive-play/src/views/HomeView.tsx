/** @format */

import RoundedCard from "@/components/RoundedCard"

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
				<button
					className="mx-3 mb-3 py-2 text-xl drop-shadow-md rounded-md bg-purple-300 font-bold
					text-gray-600"
				>
					Select File
				</button>

				<RoundedCard className="m-3" />
				<RoundedCard className="m-3" >
					<div className="flex pb-4 font-semibold text-2xl justify-items-start flex-row">
						<RoundedCard className="bg-purple-300 mr-3 p-2.5 md:filter-none"/>	
						Links
					</div>
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
					
					<RoundedCard className="border flex flex-auto drop-shadow-mg h-1/2 p-4 p-top" />
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
				</RoundedCard>
			</>
		)
	}

	// * primary render
	return (
		<>
			<div className="h-20">{renderSubHeader()}</div>
			<div className="flex-1 flex m-8 gap-8 flex-row text-black">
				<div className="w-72 flex flex-col">{renderLeftColumn()}</div>
				<div className="flex-auto flex flex-col grow-2">{renderMiddleColumn()}</div>
				<div className="flex-auto flex flex-col">{renderRightColumn()}</div>
			</div>
		</>
	)
}
