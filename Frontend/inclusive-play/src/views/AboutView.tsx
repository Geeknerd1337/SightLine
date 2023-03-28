/** @format */

import RoundedCard from "@/components/RoundedCard"

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
			<div className="flex-auto flex flex-col">
				<div className="mx-3"></div>
			</div>
		) 
	}
	const renderMiddleColumn = () => {
		return (
			<>
				<RoundedCard flex>
					<div className="flex pb-4 font-semibold text-2xl justify-items-start flex-row">
						<RoundedCard className="bg-green-300 mr-3 p-2.5 md:filter-none"/>	
						About
					</div>

					<RoundedCard flex className="border">
						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate, sed! Dolorem, dolores aliquam molestias ratione voluptatum facilis ipsa officiis iure corporis itaque necessitatibus sit in, deserunt fuga adipisci eos saepe?
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
						<RoundedCard className="bg-sky-300 mr-3 p-2.5 md:filter-none"/>	
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
				<div className="w-96 flex flex-col">{renderLeftColumn()}</div>
				<div className="flex-auto flex flex-col grow-2">{renderMiddleColumn()}</div>
				<div className="w-96 flex flex-col">{renderRightColumn()}</div>
			</div>
			
		</>
	)
}
