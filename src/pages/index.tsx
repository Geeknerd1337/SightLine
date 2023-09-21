/** @format */

import Metadata from "@/components/Metadata";
import NavigationBar from "@/components/NavigationBar";
import HomeView from "@/views/HomeView";

// * Home page, wraps "Home View"
export default function App() {
  return (
    <Metadata>
      <HomeView />
    </Metadata>
  );
}

// each entry in the "pages" folder ends up as a page with a url of "/{filename}"
// Link component must be used to switch between pages

// Metadata now sets up the screen width, HTML header information, tab info, and background color
// NavigationBar uses link components to switch between pages

// Pages are currently just wrappers for the View, adding metadata and navigationbar
// they currently exist just to add the filename to the route
