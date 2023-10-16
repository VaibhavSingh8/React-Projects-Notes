/*
/*
/* USES OF PARCEL:
* HMR - Hot Module Replacement
* It means that parcel keeps the tracks of all the
* files which we are changinga and presents those
* changes live on the page.
*
* File Watcher Algorithm: Parcel uses this algorithm 
* written in c++, to live reload the changes.
*
* BUNDLING
*
* MINIFY
* 
* Cleaning our code (example: clearing console logs *only after configuring parcel to remove console logs)
* 
* Manages dev and prod builds
* 
* Super fast build algorithm
* 
* Does image optimization
* 
* Caching while development: Parcel maintains a
* parcel-cache
*   
* Compatible with older version of browsers.
* 
* Parcel Provides the ability to use HTTPS on dev
* Syntax: npx parcel index.html --https
* 
* Parcel manages port number for us.
* 
* Parcel uses Consistent Hashing Algorithm to cache things
* 
* We should put parcel.cache in gitignore because anything that can be generated on the server should not be pushed to the git.
* 
* Parcel is a Zero Configuration Bundler which means that we don't need to configure anything to use parcel.
* 
* Parcel has its own dependencies and leverages 
* different packages to make things happen. These are known as "Transitive dependencies".
* 
* 
* 
*/

import React from "react";
import ReactDOM from "react-dom/client";

// this newHeading is a react element
const newHeading = React.createElement(
  "h1",
  { id: "heading1", key: "heading1" },
  "Hello World 3 for parcel!"
);

const newHeading2 = React.createElement(
  "h2",
  { id: "heading2", key: "heading2" },
  "Heading 2!"
);

// React.createElement() => object => html element and puts it on DOM

// const container = React.createElement("div", { id: "container" }, [
//   newHeading,
//   newHeading2,
// ]);

//console.log(newHeading);
const newRoot = ReactDOM.createRoot(document.getElementById("root"));
// // passing a react element inside the root.
// newRoot.render(container);

//using parcel as bundler


// React Component:
// Function Component- new and Class Component -old

const heading = (
  <div>
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
  </div>
)

const HeadingFunctionTestComponent = () => {
  return (
    <div>
      <h1>Heading 1 from component render</h1>
      <h2>Heading 2 from component render</h2>
    </div>
  )
}

//Function Component: returns a react element

const HeaderComp = () => {
  return (
    <div>
      {HeadingFunctionTestComponent()}
      {heading}
      <h3>Header Component - Functional</h3>
      <h4>This is a h4 tag</h4>
    </div>

  );
};

newRoot.render(<HeaderComp />);
