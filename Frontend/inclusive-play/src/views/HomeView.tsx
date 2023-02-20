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
					className="mx-4 mb-3 py-2 drop-shadow-md rounded-md bg-purple-300 font-bold
				text-gray-600"
				>
					Select File
				</button>

				<RoundedCard />
				<RoundedCard />
			</div>
		)
	}
	const renderMiddleColumn = () => {
		return (
			<>
				<div className="absolute top-34 text-4.5xl font-bold">Dashboard</div>
				<RoundedCard className="flex flex-auto flex-col">
					<div className="flex p-4 font-semibold text-3xl justify-items-start flex-row">Analysis</div>
					<RoundedCard className="flex flex-auto bg-orange-300 pr-4"/>
					<RoundedCard className="flex flex-auto drop-shadow-mg h-1/2 p-4 p-top" />
				</RoundedCard>
			</>
		)
	}
	const renderRightColumn = () => {
		return <RoundedCard flex />
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
