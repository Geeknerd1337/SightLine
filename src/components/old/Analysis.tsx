// import LineChart from "./LineChart";
// import React from "react";
// import { ResponsiveLine } from "@nivo/line";
// import { ResponsiveBar } from "@nivo/bar";

// //Example button props
// interface AnalysisProps {
//   results: any;
// }

// interface FilteredResultsState {
//   luminosity: { id: string; data: any[] }[];
//   flashes: { id: string; data: any[] }[];
//   bluelight: { id: string; data: any[] }[];
// }

// interface RatingState {
//   luminosity: number;
//   flashes: number;
//   bluelight: number;
//   final: number;
// }

// export default function Analysis(props: AnalysisProps) {
//   let [rating, setRating] = React.useState<RatingState>({
//     luminosity: -1,
//     flashes: -1,
//     bluelight: -1,
//     final: -1,
//   });
//   let [filteredResults, setFilteredResults] =
//     React.useState<FilteredResultsState>({
//       luminosity: [{ id: "luminosity", data: [] }],
//       bluelight: [{ id: "bluelight", data: [] }],
//       flashes: [{ id: "flashes", data: [] }],
//     });

//   React.useEffect(() => {
//     console.log("results updated");
//     console.log(props.results);
//     setFilteredResults({
//       luminosity: [
//         {
//           id: "luminosity",
//           data: props.results?.luminanceArr?.map((e: any, i: any) => {
//             return { x: i, y: e };
//           }),
//         },
//       ],
//       bluelight: [
//         {
//           id: "bluelight",
//           data: props.results?.BLarr?.map((e: any, i: any) => {
//             console.log("Blue Light Amount:", e);
//             return { x: i, y: e };
//           }),
//         },
//       ],
//       flashes: [
//         {
//           id: "flashes",
//           data: props.results?.FlashArray?.map((e: any, i: any) => {
//             console.log("Flashes:", e);
//             return { x: i, y: e.flashes > 0 ? e.flashes - 1 : 0 };
//           }),
//         },
//       ],
//     });
//     // setFilteredResults(props.results);
//   }, [props.results]);

//   React.useEffect(() => {
//     analyzeResults();
//   }, [filteredResults]);

//   const analyzeResults = () => {
//     let lumianceTotal = 0;
//     for (let i = 0; i < props.results?.luminanceArr?.length; i++) {
//       lumianceTotal += props.results?.luminanceArr[i];
//     }
//     let lumianceAvg = lumianceTotal / props.results?.luminanceArr?.length;
//     let lumianceRating = lumianceAvg / 255;

//     let bluelightTotal = 0;
//     for (let i = 0; i < props.results?.BLarr?.length; i++) {
//       bluelightTotal += props.results?.BLarr[i];
//     }
//     let bluelightAvg = bluelightTotal / props.results?.BLarr?.length;
//     let bluelightRating = bluelightAvg / 255;

//     let flashRating = 0;
//     for (let i = 0; i < props?.results?.FlashArray?.length; i++) {
//       let flashes = props?.results?.FlashArray[i]?.flashes;
//       if (flashes > flashRating) flashRating = flashes;
//     }

//     let obj = {
//       luminosity: lumianceRating,
//       bluelight: bluelightRating,
//       flashes: flashRating,
//       final: (lumianceRating + bluelightRating + flashRating * 5) / 7,
//     };
//     setRating(obj);
//     console.log(obj);
//   };

 



//   const theme = {
//     axis: {
//       legend: {
//         text: {
//           fontSize: 20,
//           fontWeight: "bold",
//           fill: "#333",
//         },
//       },
//       ticks: {
//         line: {
//           stroke: "#555",
//         },
//         text: {
//           fill: "#333",
//           fontSize: 12,
//         },
//       },
//       domain: {
//         line: {
//           stroke: "#555",
//         },
//       },
//     },
//   };

 

//   const renderResults = () => {
//     let luminaceRating = () => {
//       if (rating?.luminosity < 0.3) {
//         return "Good, this footage is not bright enough to cause eye strain.";
//       } else if (rating?.luminosity < 0.6) {
//         return "Fair, this footage is bright enough to cause eye strain.";
//       } else {
//         return "Poor, this footage is bright and will cause eye strain.";
//       }
//     };

//     let blueLightRating = () => {
//       if (rating?.bluelight < 0.3) {
//         return "Good, this footage is not blue enough to cause eye strain.";
//       } else if (rating?.bluelight < 0.6) {
//         return "Fair, this footage is blue enough to cause eye strain.";
//       } else {
//         return "Poor, this footage is quite blue and will cause eye strain.";
//       }
//     };

//     let flashRating = () => {
//       if (rating?.flashes < 2) {
//         return "Good, this footage has no flashes and will not cause seizures.";
//       } else if (rating?.flashes < 4) {
//         return "Fair, this footage has a few flashes and may cause seizures.";
//       } else {
//         return "Poor, this footage has many flashes and will cause seizures.";
//       }
//     };

//     let finalRating = () => {
//       let returnString = "";
//       if (rating?.flashes < 2) {
//         returnString += "Good, this game would be safe to play.";
//         // if (rating?.bluelight > 0.3 || rating?.luminosity > 0.3) {
//         //   returnString += " However, it may cause eye strain.";
//         // }
//       } else if (rating?.flashes < 4) {
//         returnString += "Fair, this game may not be safe to play.";
//       } else {
//         returnString += "Poor, this game is not safe to play.";
//       }
//       return returnString;
//     };
//   };
// }
