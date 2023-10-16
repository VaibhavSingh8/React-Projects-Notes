<h1>Day 2</h1>

<h2>Important points about package-lock.json</h2>

1. You never have to put this file in ".gitignore".

2. Maintains the exact version of the package. It also maintains a 'hash' of the package as well. This hash ensures if the same version of the package is running on the production. It maintains the integrity.

3. Never modify the package-lock.json file.

<h1>Day 3</h1>

<h2>USES OF PARCEL:</h2>
<ul>
  <li>
  
  <h3>HMR - Hot Module Replacement</h3>

  <p>It means that parcel keeps the tracks of all the files which we are changing and presents those changes live on the page.</p>

  <h3>How does it do that?</h3>
  File Watcher Algorithm: Parcel uses this algorithm 
  written in c++, to live reload the changes.
  
  </li>

  <li>BUNDLING</li>
  <li>MINIFICATION</li>
  <li>Cleaning our code (example: clearing console logs *only after configuring parcel to remove console logs)</li>
  <li>Tree Shaking - Removing unwanted code</li>
</ul>

<!-- For creating development build -->

npx parcel startPointFileName: npx parcel index.html

<!-- For production build -->

npx parcel build startPoint : npx parcel build index.html

This will throw error if there is a value as "main":"some file name" other than the start point in the package.json file as this refers to the entry point for the app. For convenience, remove this parameter from "package.json" as you arer already providing the parameter in the command.

<h2>What is dist folder?</h2>
<p> dist folder keeps the files minified for us. We can see the minified code in the dist folder.</p>

<h2>What is '.parcel-cache' folder?</h2>

<h1>Day 4</h1>

<h2>Transitive Dependencies</h2>
Parcel has its own dependencies and leverages 
different packages to make things happen. This is known as "Transitive dependencies".

There is a dependency tree which is created by parcel. This tree is created by the dependencies of the dependencies. This is known as "Transitive dependencies".

<h2>browserslist package</h2>
Makes our compatible with different browsers.
This package is used to tell the browser which version of the browser we are using. This is used by parcel to know which version of the browser we are using.

Edit in in package.json file.
Example 1: "browserslist": [
"last 1 chrome version"
] // This will make our app compatible with the last 1 version of chrome.

Also, this does not mean that our app will not work on other browsers. It will work on other browsers as well. It just means that we are not testing our app on other browsers.

It means, it will definitely work on the last 1 version of chrome and it might work on other browsers as well.

Example 1: "browserslist": [
"last 2 versions"
] // This will make our app compatible with the last 2 versions of all the browsers.

More on: https://github.com/browserslist/browserslist

<h1>Day 5 and 6</h1>

Revision: npm init -> ceates package.json ->

Polyfill(Important): Older browsers might not support all the functionality of our code as they might not have been upgraded to support the latest features For eg: The browser might not know what is ES6 or prommises etc. So, we need to covert our code to make it run on those older browsers. Polyfill is the replacement code for our code to work smoothly on older browsers.

This code makes sure that your website still works properly and looks good even in those older web browsers that don't have the new features. It's like giving those older browsers a little extra boost so they can understand and use the new stuff.

In short, Polyfill is used to make our code compatible with older browsers.

<h2>Who coverts our code to different code for older browsers?</h2>

-> Babel is the tool which converts our code to different code for older browsers.

<h2>What is Tree Shaking?</h2>
-> Tree shaking is the process of removing the unused or unwanted code from our code. This is done by parcel automatically.

Example: If we are using a package which has 10 functions and we are using only 2 functions out of those 10 functions, then parcel will remove the remaining 8 functions from our code. This is known as tree shaking.

<h3>npm run start</h3> and <h3>npm run build</h3>

In package.json, we can configure our owns scripts for easily running the command like "npx parcel index.html" to "npm run start" like this:

```
"scripts": {
    "start": "parcel index.html",
  }

```

We can also configure our own scripts for running the build(for prod):

```
"scripts": {
    "start": "parcel index.html",
    "build": "parcel build index.html",
  }

```

npx vs npm:
npx is used when we want to use a package without installing it. It directly executes the package.

npm is used when we want to use a package after installing it.

<h3>How to remove console.log automataically?</h3>

We have to install and configure babel package to remove console.log automatically.
-> babel-plugin-transform-remove-console

Link to the page:https://babeljs.io/docs/babel-plugin-transform-remove-console#usage

Installation(for dev dependency): npm install babel-plugin-transform-remove-console --save-dev

Steps to configure:
-> With a configuration file (Recommended)

1. Create a config file for babel: .babelrc
2. Add the following code in the file:

// with options

```
{
  "plugins": [["transform-remove-console", { "exclude": ["error", "warn"] }]]
}
```

// without options

```{
  "plugins": ["transform-remove-console"]
}
```

<h3>React Key ReConciliation</h3>
<!-- When we are using map function to render the list of items, we should provide a key to each item. This is because, if we do not provide a key, then react will not be able to identify which item has changed and which item has not changed. So, it will re-render the entire list. This will cause performance issues.-->

link: https://legacy.reactjs.org/docs/reconciliation.html

-> We use keys in case of multiple items. We do not use keys in case of single items.

-> Keys should be unique.

```
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

const container = React.createElement("div", { id: "container" }, [
  newHeading,
  newHeading2,
]);

```

Example of using keys in case of multiple items in a list:
when adding an element at the end of the children, converting between these two trees works well:

```

<ul>
  <li>first</li>
  <li>second</li>
</ul>

<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>

```

React will match the two <li>first</li> trees, match the two <li>second</li> trees, and then insert the <li>third</li> tree.

If you implement it naively, inserting an element at the beginning has worse performance. For example, converting between these two trees works poorly:

```

<ul>
  <li>Duke</li>
  <li>Villanova</li>
</ul>

<ul>
  <li>Connecticut</li>
  <li>Duke</li>
  <li>Villanova</li>
</ul>

```

React will mutate every child instead of realizing it can keep the <li>Duke</li> and <li>Villanova</li> subtrees intact. This inefficiency can be a problem.

In order to solve this issue, React supports a key attribute. When children have keys, React uses the key to match children in the original tree with children in the subsequent tree. For example, adding a key to our inefficient example above can make the tree conversion efficient:

```
<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

```

Now React knows that the element with key '2014' is the new one, and the elements with the keys '2015' and '2016' have just moved.

<h2>How does createElement work?</h2>
-> <p>
React.createElemet() creates objects which are known as virtual DOM. These virtual DOMs are then converted to real DOMs by react.
</p>

<h1>Day 7</h1>

<h2>Introduction to JSX:</h2>

-> JSX is a syntax extension to JavaScript. It is similar to a template language, but it has full power of JavaScript.

Syntax: const element = <h1>Hello, world!</h1>;

//This funny tag syntax is neither a string nor HTML. Also, it is a react element.

JSX uses camelCase naming convention instead of HTML attribute names.

Browser does not understand JSX. So, we need to convert JSX to JS. This is done by Babel.

//Babel working: JSX => React.createElement() => object => rendered as HTML in the DOM

<h2>React Components:</h2>
1. Functional Components - NEW
2. Class Components - OLD

=> Functional components are the new way of creating components in react. These are also known as "Stateless components" or "Dumb components".

Functional Component is a normal function that returns a react element

Naming convention: PascalCase. Eg: HeaderComp, i.e., first letter of each word should be capital.

```
const HeaderComp = () => {
return <h1>Header Component - Functional</h1>;
};
```

For bigger components, we can use parenthesis instead of curly braces.

```
const HeaderComp = () => (
  <div>
    <h1>Header Component - Functional</h1>
    <h2>Sub Heading</h2>
  </div>
);
```

OR

```
const HeaderComp = () => {
return (
  <div>
    <h1>Header Component - Functional</h1>
    <h2>Sub Heading</h2>
  </div>
)};
```

OR

```
const HeaderComp = function () {
return (
  <div>
    <h1>Header Component - Functional</h1>
    <h2>Sub Heading</h2>
  </div>
)};
```

To render the component, we need to use the component name as a tag.

```
ReactDOM.render(<HeaderComp />, document.getElementById("root"));
```

Different methods to render the components and elements:

-> Nesting components inside components is also known as "Composition" or "Component Composition".

```
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

const HeaderComp = () => {
  return (
    <div>

      {HeadingFunctionTestComponent()} // renders the functional component by calling it because a functional component is also a function.

      <HeadingFunctionTestComponent />// 2nd way of rendering the functional component by using it as a tag.

      {heading} // renders the element.

      <h3>Header Component - Functional</h3> // 2nd way of rendering the element.
    </div>

  );
};

const newRoot = ReactDOM.createRoot(document.getElementById("root"));

newRoot.render(<HeaderComp />);
```

We can also write any js code inside the curly braces.

```
const name = "Rahul";
const HeaderComp = () => {
  return (
    <div>
      <h1>Header Component - Functional</h1>
      <h2>Sub Heading</h2>
      <h3>{name}</h3>
    </div>
  );
};
```

-> JSX is very secure. It makes sure to keep the code secure from XSS attacks.

Let's suppose, we have an api call stored in a variable, and someone tries to inject a script tag in the variable. Then, JSX will not allow this to happen. It will convert the script tag to a string.

<h1>Day 8</h1>

Started building a react app. Food order app.

I will make another repo for this app. Link is <a href = "https://github.com/VaibhavSinghDev/TastyOrders">here</a>.

<h2>What is React.Fragment ?</h2>

React.Fragment is a component which does not render anything. It is used to wrap multiple elements. It is exported by React.

React.Fragment is used to wrap multiple elements. It is used to avoid using a div tag to wrap multiple elements.

It is like an empty tag.

Syntax:

```
const jsx = (
  <React.Fragment>
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
  </React.Fragment>
);
```

OR

```
const jsx = (
  <>
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
  < />
);
```

For passing inline CSS, we need to pass the CSS as an object. JSX object is js which needs to be wrapped in curly braces.

And, We need to use camelCase for the CSS properties.

Syntax: Inline styling in React

```
const jsx = (
  <div style={{ backgroundColor: "red", color: "white" }}>
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
  </div>
);
```

OR

```
const styleObj = {
  backgroundColor: "red",
  color: "white",
};

const jsx = (
  <div style={styleObj}>
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
  </div>
);
```
