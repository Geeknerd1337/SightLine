/** @format */
import React from "react";
import Head from "next/head";
import { ReactNode } from "react";

// page metadata
const TAB_TITLE = "Sightline";
const META_DESC =
  "A video analyzing app to increase accessibility to visual sensitivities";

// props
interface MetadataProps {
  children?: ReactNode;
}

//className={`flex w-screen h-screen`}

// * wrap page in important metadata
export default function Metadata(props: MetadataProps) {
  return (
    <div>
      <Head>
        <title>{TAB_TITLE}</title>
        <meta name="description" content={META_DESC} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {props.children}
    </div>
  );
}
