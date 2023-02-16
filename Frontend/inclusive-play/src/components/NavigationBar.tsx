/** @format */
import React from "react"

interface NavigationBarProps {
	setIndex: Function // parent pageIndex
}

export default function NavigationBar(props: NavigationBarProps) {
	const [pageIndex, setPageIndex] = React.useState(0)

	React.useEffect(() => {
    props.setIndex(pageIndex)
  }, [pageIndex])

	// * render functions
	const renderButton = (index: number, name: string) => {
		let css = pageIndex == index ? "flex-auto bg-fuchsia-100" : "flex-auto"

		return (
			<button
				onClick={(e) => {
					setPageIndex(index)
				}}
				className={css}
			>
				{name}
			</button>
		)
	}

	// * primary render
	return (
		<div className="w-full bg-white flex flex-row h-24 justify-between">
			<div className="flex-0 text-4.5xl font-bold flex items-center pl-6 italic">SightLine</div>
			<div className="flex w-56 text-2xl font-semibold flex-row">
				{renderButton(0, "Home")}
				{renderButton(1, "About")}
			</div>
		</div>
	)
}

{
	/* <label class="switch">
  <input type="checkbox">
  <span class="slider round"></span>
</label> */
}
