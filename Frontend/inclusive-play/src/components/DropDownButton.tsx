import React from "react";
import { useState } from "react"
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai"
import list from "@/list.json"

export default function DropDownButton() {
    const [isOpen, setIsOpen] = useState(false)

    return <div className="relative flex flex-col items-center h-[300px] rounded-md">
        <button onClick={() => setIsOpen((prev) => !prev)} className="bg-purple-300 p-4 w-full flex items-center justify-between font-bold text-lg rounded-md">
            Submit File
            {!isOpen ? (
                <AiOutlineCaretDown className="h-8" />
            ): (
                <AiOutlineCaretUp className="h-8" />
            )}
        </button>

        {isOpen && (
            <div className="bg-white absolute top-16 mt-1 flex flex-col items-start rounded-md p-2 w-full drop-shadow-md transition-all">
                {list.map((item, i) => (
                    <div className="flex w-full justify-between hover:bg-purple-100 cursor-pointer rounded-r-md
                    border-l-transparent hover:border-l-purple-400 border-l-4 p-2 transition-all" key={i}>
                        <h3 className="font-semibold">
                            {item.title}
                        </h3>
                        <img src={item.icon} alt=""/>
                    </div>
                ))}
            </div>
        )}

    </div>

}