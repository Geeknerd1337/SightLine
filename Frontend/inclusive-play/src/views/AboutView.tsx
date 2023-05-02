/** @format */

import RoundedCard from "@/components/RoundedCard";
import { BsPersonCircle } from "react-icons/bs";
import team from "@/team.json";

// * home page
export default function AboutView() {
  // * display

  // * data

  // * data functions

  // * render functions
  const renderSubHeader = () => {
    return <div className="flex-auto" />;
  };

  const renderLeftColumn = () => {
    return <div className=" flex-auto flex flex-col"></div>;
  };
  const renderMiddleColumn = () => {
    return (
      <>
        <div className="absolute top-34 text-4.5xl font-bold">About</div>
        <RoundedCard flex>
          <div className="flex pb-4 font-semibold text-2xl justify-items-start flex-row">
            <RoundedCard className="bg-green-300 mr-3 p-2.5 md:filter-none" />
            The Project
          </div>

          <RoundedCard flex className="border">
            <p>
              Video games often have a flashing lights warning put on as a
              precaution, regardless of whether or not they need it. This both
              discourages photosensitive people from playing games and reduces
              the potential market for game developers to reach. This tool aims
              to help mitigate this problem.
              <br /> <br />
              Through frame-by-frame analysis of color, luminosity, and
              contrast, Sightline indicates hazardous sections of video game
              footage in an attempt to direct game developers to areas of
              concern. If no hazardous areas are found, Sightline provides game
              developers the courage to post their hazard-free games with no
              labels or warnings, increasing both their playerbase and the
              market available to the photosensitive.
              <br /> <br />
              Three major sections are used to determine if a section of a video
              game is non-hazardous - luminosity, flashing, and blue light.
              <br /> <br />
              We hope that this tool will allow game developers to reach a wider
              audience, and allow more people to enjoy video games.
              <br /> <br />
              Algorithm details: <br /> Sightline averages the luminosity of every frame,
              then uses the average luminosities to figure out if the video
              flashes six times or more in second. If it does, that could cause
              a seizure. It also sums the number of pixels that are in the hue
              range of damaging blue light in every frame by checking whether
              each pixel in a frame has a hue between 200 and 211.
            </p>
          </RoundedCard>
        </RoundedCard>
      </>
    );
  };
  const renderRightColumn = () => {
    return (
      <>
        <RoundedCard flex>
          <div className="flex pb-4 font-semibold text-2xl justify-items-start flex-row">
            <RoundedCard className="bg-purple-200 mr-3 p-2.5 md:filter-none" />
            Team
          </div>

          <ul className="flex flex-col items-start">
            {team.map((person, i) => (
              <div className="flex items-center pb-4" key={i}>
                <BsPersonCircle className="mr-4 text-5xl text-gray-400" />

                <div className="flex flex-col">
                  <h3 className="text-xl font-bold">{person.title}</h3>
                  <span>{person.email}</span>
                </div>
              </div>
            ))}
          </ul>
        </RoundedCard>
      </>
    );
  };

  // * primary render
  return (
    <>
      <div className="h-20">{renderSubHeader()}</div>
      <div className="flex-1 flex m-8 gap-6 flex-row text-black">
        <div className="flex flex-col">{renderLeftColumn()}</div>
        <div className="w-2/3 h-1/2 flex flex-col">{renderMiddleColumn()}</div>
        <div className="w-1/4 h-1/3 flex flex-col">{renderRightColumn()}</div>
      </div>
    </>
  );
}
