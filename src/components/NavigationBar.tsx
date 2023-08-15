/** @format */
import React from "react";
import Link from "next/link";
// import logo from "./logo.png";

import { useRouter } from "next/router";
import Image from "next/image";

interface NavigationBarProps {}

// * allows navigation between primary pages
export default function NavigationBar(props: NavigationBarProps) {
  // * router
  const router = useRouter();

  // * render functions
  const renderButton = (name: string, url: string, isHome: boolean) => {
    let css =
      router.asPath == url ? "flex-1 bg-fuchsia-100 align-middle" : "flex-1";

    return (
      <Link className={"flex flex-1"} href={url}>
        <button className={css}>{name}</button>
      </Link>
    );
  };

  // * primary render
  return (
    <div className="w-full bg-white flex flex-row h-24 justify-between">
      <div className="flex-0 text-4.5xl font-bold flex items-center pl-6 italic">
        <Image src={require("./logo.png")} alt=" " width={80} height={80} />
        {/* <img src={""} alt={" "} className="w-16 h-16 pr-2" /> */}
        SightLine
      </div>
      <div className="flex w-56 text-2xl font-semibold flex-row">
        {renderButton("Home", "/", true)}
        {renderButton("About", "/about", false)}
      </div>
    </div>
  );
}
