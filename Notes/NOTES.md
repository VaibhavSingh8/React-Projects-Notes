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

```js
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

```html
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

```html
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

```html
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

```jsx
const HeaderComp = () => {
  return <h1>Header Component - Functional</h1>;
};
```

For bigger components, we can use parenthesis instead of curly braces.

```jsx
const HeaderComp = () => (
  <div>
    <h1>Header Component - Functional</h1>
    <h2>Sub Heading</h2>
  </div>
);
```

OR

```jsx
const HeaderComp = () => {
  return (
    <div>
      <h1>Header Component - Functional</h1>
      <h2>Sub Heading</h2>
    </div>
  );
};
```

OR

```jsx
const HeaderComp = function () {
  return (
    <div>
      <h1>Header Component - Functional</h1>
      <h2>Sub Heading</h2>
    </div>
  );
};
```

To render the component, we need to use the component name as a tag.

```jsx
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

```jsx
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

I will make another repo for this app. Link is here:

<h2>What is React.Fragment ?</h2>

React.Fragment is a component which does not render anything. It is used to wrap multiple elements. It is exported by React.

React.Fragment is used to wrap multiple elements. It is used to avoid using a div tag to wrap multiple elements.

It is like an empty tag.

Syntax:

```jsx
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

For passing inline css, we need to pass the css as an object. And, jsx object is js which needs to be wrapped in curly braces.

And, we need to use camelCase for the css properties.

Syntax: INline styling in React

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

<h1>Day 9, 10</h1>

Let's uppose we are creating a food application. We have a list of food items. We want to render the list different restaurants and we put multiple restaurant cards in a restaurant container.

Now, we want t display different restaurant cards in the restaurant container. We can do this by creating a restaurant card component and then rendering it in the restaurant container.

What about the data? We can pass the data as props to the restaurant card component.

<h2>PROPS in React</h2>
-> Like a functional component is a normsl js function st basic level.

Similarly, Props are arguments to the function.

-> <b>Passing a prop to a component is just like passing an argument to a function.</b>

-> <b> Props are objects</b>

Example of passing a prop to a component:

```jsx
const RestaurantCardComponent = (props) => {
  return (
    <div className="restaurant-card">
      <div className="restaurant-image">
        <img
          src="https://www.shutterstock.com/shutterstock/photos/2269871217/display_1500/stock-vector-kfc-logo-icon-art-design-vector-isolated-head-face-people-person-illustration-american-store-bernie-2269871217.jpg"
          alt="restaurant"
        />
      </div>
      <div className="restaurant-details">
        <div className="restaurant-name">{props.resName}</div>
        <div className="restaurant-rating">Rating - 5</div>
        <div className="restaurant-cuisine">{props.cuisine}</div>
        <div className="restaurant-location">Location - INDIA</div>
      </div>
    </div>
  );
};

const BodyComponent = () => {
  return (
    <div className="body">
      <div className="restaurant-container">
        <RestaurantCardComponent resName="KFC" cuisine="Burger, Fast Food" />

        <RestaurantCardComponent resName="Dominos" cuisine="Pizzas" />
      </div>
    </div>
  );
};
```

<h1>Day 11, 12</h1>

<h2>What is config driven UI? Can be asked in frontend system design interview</h2>
-> In today's time, we have a lot of data. We need to display this data in the UI. We can do this by creating a component for each data. But, this is not a good approach. This is because, if we have 1000 data, then we need to create 1000 components. This is not a good approach.

-> So, we make our UI once and update it based on the data coming from the backend. This is known as config driven UI.

<h2>Optinal Chaining</h2>
-> Optional chaining is a new feature in JS. It is used to check if a property exists in an object or not. If it exists, then it will return the value of the property. If it does not exist, then it will return undefined.

<h2>Destructuring</h2>
-> Destructuring is a new feature in JS. It is used to extract the properties of an object and store them in a variable.

<h2>Passing keys in React component for optimization</h2>
<h2>Not using keys(not acceptable) <<< index as key <<<< inique id(best practice)</h2>

-> We need to pass keys in react components for optimization. This is because, if we do not pass keys, then react will not be able to identify which component has changed and which component has not changed. So, it will re-render the entire list. This will cause performance issues.

-> We can pass index as a key. Like this:

```jsx
<div className="restaurant-container">
  {resObjArray.map((resObj, index) => (
    <RestaurantCardComponent key={index} resData={resObj} />
  ))}
</div>
```

-> But, React itself says this is not a good approach. This is because, if we add a new item in the list, then the index of all the items will change. So, react will re-render the entire list. This will cause performance issues.

<h1>Day 13, 14</h1>

<h2>Import and export</h2>

There are two types of exports:

1. Default export:
   -> export default ComponentName
   -> import ComponentName from "path"

2. Named export:
   -> export const ComponentName = () => {}

   -> import { ComponentName } from "path"

<h2>React Hooks</h2>

-> Normal JS utility functions which are used to add functionality to the functional components.

-> Stateful logic in functional components.

Two most important Hooks:

<h2> useState() </h2>
-> Used to create super powerful state variable to add state in functional components. Import like a named import. import { useState } from "react";

Usage:

```jsx
const [resObjArray, setResObjArray] = useState([]); // useState() returns an array with 2 elements. 1st element is the state variable and 2nd element is the function to update the state variable.

//Also, the value inside the useState() is the initial or default value of the state variable.

// resObjArray is the state variable and setResObjArray is the function to update the state variable.
```

-> Whenever, a state variable is updated, React re-renders the component.

-> Also, every time the component is re-rendered, the entire function is executed again and the state variable is an update variable which is different from the previous and hence, this the answer for "How a const variable can be updated?"

<h2> Reconciliation(React Fibre) </h2>

-> React keeps a track of all the components which are rendered on the screen. It keeps a track of the components which are added, removed or updated.

-> React keeps a track of the components using a tree data structure. This tree data structure is known as "Fibre". This tree data structure is also known as "Virtual DOM".

-> Virtual DOM is a tree data structure.

<h2> Diff's Algorithm</h2>

-> React uses this algorithm to keep a track of the components which are added, removed or updated. It finds the difference between the previous tree and the current tree i.e., the previous state(old virtual DOM) and the current state(new Virtual DOM) and then updates the real DOM.

-> Virtual DOM is in form of an object. It is a JavaScript object representation of the Actual DOM.

<h1>Day 15</h1>

<h2> useEffect() </h2>
-> Used to add side effects in functional components.

-> Side effects are the effects which are not related to the UI. For eg: API calls, timers, event listeners etc.

Syntax:

```jsx
useEffect(() => {}, []);
```

Example:

```jsx
useEffect(() => {
  fetchData();
}, []);

const fetchData = async () => {
  const response = await fetch(
    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6613353&lng=77.22749449999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
  );
  const jsonData = await response.json();

  console.log(jsonData);
  setResObjArray(
    jsonData.data.cards[2].card.card.gridElements.infoWithStyle.restaurants
  );
};
```

<h2>CORS policy</h2>
-> CORS stands for Cross Origin Resource Sharing.
-> CORS policy is a security feature in browsers. It does not allow us to make API calls from one domain to another domain. For eg: If we are making an API call from localhost:3000 to localhost:5000, then it will not allow us to make the API call. This is because, both the domains are different.

<h4> How to by pass this?</h4>
-> Chrome Extension: Allow CORS: Access-Control-Allow-Origin

<h1>Day 16, 17, 18</h1>

<h2>React Router</h2>

To create a single page application, we need to create routes.

Now, what is a single page application?

-> Normally, when we navigate from one page to another page, the entire page is refreshed. This is not the case in single page application.

-> Single page application is an application which does not refresh the page when we navigate from one page to another page.

-> To create routes, we need to use react router.

-> 'react-router-dom' is the package which we need to install to create routes.

Installation:

```bash
npm i react-router-dom
```

Steps to create routes:

1. Import createBrowserRouter from 'react-router-dom':

```jsx
import { createBrowserRouter } from "react-router-dom";
```

2. create a route variable which will contain all the routes:

```jsx
const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
  },
  {
    path: "/about",
    element: <AboutComponent />,
  },
]);
```

3. Pass this route variable to be rendered in the ReactDOM.render() method:

```jsx
import { RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRoute} />);
```

Earlier, we rendered our app like this:

```jsx
root.render(<AppLayout />);
```

4. Handle and show errors through an own ErrorComponent:

# rendering the error page

```jsx
const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorComponent />,
  },
  {
    path: "/about",
    element: <AboutComponent />,
  },
]);
```

<h3>useRouteError() Hook</h3>

-> This hook is used to handle the errors in the routes.

Syntax: (Using the Error Component)

```jsx
import { useRouteError } from "react-router-dom";

const ErrorComponent = () => {
  const err = useRouteError();

  return (
    <div>
      <h1>Ooops!</h1>
      <h2>Something went wrong.</h2>
      <h3>
        {err.status} : {err.statusText}
      </h3>
    </div>
  );
};
```

<h3>Creating Children Routes:</h3>

What are Children routes?

-> Children routes are the routes which are nested inside a parent route.

Why do we need children routes?

-> Let's suppose, we have a structure of a page containing Navbar, Body and Footer.
Now, we have different routes on the navbar. When we go to a link, our header and footer should remain the same. Only the body portion should change.

So, how do we achieve that? Because, normally the whole page will be changed along with header and footer.

Let's see how we can achieve this using children routes.

```jsx
const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomeComponent />,
      },
      {
        path: "/about",
        element: <AboutComponent />,
      },
    ],
  },
]);
```

-> Here, we see that we have created a children array inside the parent route. This children array contains all the children routes.

-> Now, we need to render the children routes in the parent route. We can do this by using the <Outlet /> component.

-> <Outlet /> component is used to render the children routes in the parent route.

Suppose, we have a main component like this:

```jsx
const AppLayout = () => {
  return (
    <div className="app">
      <HeaderComponent />
      <Body />
      <FooterComponent />
    </div>
  );
};
```

And, we want to keep our header and footer same for all the routes. Only the body portion should change.

So, to achieve this via <Outlet />, replace the <Body /> component with <Outlet /> component.

```jsx
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="app">
      <HeaderComponent />
      <Outlet />
      <FooterComponent />
    </div>
  );
};
```

Now, the <Outlet /> component will render the children routes in the parent route. This, won't show up in console. This is because, the <Outlet /> component is not a real component. It is a virtual component. It is used to render the children routes in the parent route.

The HTML structure will appear normal in the DOM in the console.

<h3>Linking the routes to the Navbar links using <Link> instead of <a> anchor tags </a>. </h3>

<h1>Day 19, 20</h1>

<h3>Dynamic Routing</h3>

<h1>Day 21, 22</h1>

<h2>Class Based Components</h2>

-> Class based components are the old way of creating components in react.

Difference between the Class based components and Functional components:

1. Class based components are created using class keyword. Functional components are created using function keyword.

2. Class based components have a render() method. Functional components do not have a render() method.

3. Syntax:

-> <h4>Functional Components:</h4>

```jsx
const User = () => {
  return (
    <div>
      <h2>Name</h2>
      <h3>Address</h3>
      <h4>Contact</h4>
    </div>
  );
};

export default User;
```

-> <h4>Class Based Components:</h4>

```jsx
import React from "react";

class User extends React.Component {
  render() {
    return (
      <div>
        <h2>Name</h2>
        <h3>Address</h3>
        <h4>Contact</h4>
      </div>
    );
  }
}

export default User;
```

4. Receiving props in class based components and functional components:

-> <h4>Functional Components:</h4>

```jsx
/** About Page component */

const AboutPage = (props) => {
  return (
    <div>
      <h1>About Page</h1>
      <User name={"XYZ"} />
    </div>
  );
};

/** User component */
const User = (props) => {
  return (
    <div>
      <h2>Name: {props.name}</h2>
      <h3>Address</h3>
      <h4>Contact</h4>
    </div>
  );
};

export default User;
```

-> <h4>Class Based Components:</h4>

```jsx
/** About Page component */

const AboutPage = (props) => {
  return (
    <div>
      <h1>About Page</h1>
      <User name={"XYZ"} />
    </div>
  );
};

/** User component */
import React from "react";

class User extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>Name: {this.props.name}</h2>
        <h3>Address</h3>
        <h4>Contact</h4>
      </div>
    );
  }
}

export default User;
```

5. Creating state in class based components v/s functional components:

-> <h4>In functional components:</h4>

```jsx
/** User component */
const User = (props) => {
  const [count] = useState(0);
  return (
    <div>
      <h2>Name: {props.name}</h2>
      <h3>Address</h3>
      <h4>Contact</h4>
    </div>
  );
};

export default User;
```

<h1>Day 23</h1>

-> <h4>In Class based components:</h4>

-> When we say loading a class based component, we are actually creating an instance of the class based component.

-> It is done through constructor() method. Because, constructor() method is called when we create an instance of the class based component.

-> Earlier, there were no hooks in react. So, we used to create state in class based components using constructor() method.

```jsx
/** User component */
import React from "react";

class User extends React.Component {
  constructor(props) {
    super(props);

    // creating state
    this.state = {
      count: 0,
    };
  }
  render() {
    return (
      <div>
        <h2>Count: {this.state.count}</h2>
        <h2>Name: {this.props.name}</h2>
        <h3>Address</h3>
      </div>
    );
  }
}

export default User;
```

<h3>Now, if we have to create more than 1 state:</h3>

-> <h4>In Functional components:</h4>

```jsx
/** User component */
const User = (props) => {
  const [count] = useState(0);
  const [count2] = useState(1);
  return (
    <div>
      <h2>Name: {props.name}</h2>
      <h3>Count: {count}</h3>
      <h3>Count2: {count2}</h3>
      <h4>Contact</h4>
    </div>
  );
};

export default User;
```

-> <h4>In Class based components:</h4>

```jsx
/** User component */
import React from "react";

class User extends React.Component {
  constructor(props) {
    super(props);

    // creating state
    this.state = {
      count: 0,
      count2: 1, // just like this, we can create multiple states in class based components.
    };
  }
  render() {
    return (
      <div>
        <h2>Count: {this.state.count}</h2>
        <h2>Count2: {this.state.count2}</h2>
        <h2>Name: {this.props.name}</h2>
        <h3>Address</h3>
      </div>
    );
  }
}

export default User;
```

6. Updating state in class based components:

```jsx
/** User component */
import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    // creating state
    this.state = {
      count: 0,
      // count2: 1, in case of multiple state
    };
  }
  render() {
    return (
      <div>
        <button
          onClick={() => {
            // Never update the state variable directly like this {this.state.count = this.state.count + 1};
            // Do this instead:
            this.setState({
              count: this.state.count + 1,
              //count2: this.state.count2 + 1, in case of multiple state
            });
          }}
        >
          +++
        </button>

        <h2>Count: {this.state.count}</h2>

        <button
          onClick={() => {
            if (this.state.count > 0) {
              this.setState({
                count: this.state.count - 1,
                // count2: this.state.count2 - 1,  for multiple state
              });
            }
          }}
        >
          -----
        </button>
      </div>
    );
  }
}

export default User;
```

7. Lifecycle methods in class based components:

-> Lifecycle methods are the methods which are called at different stages of the component.

Let's understand this with an example:

Let's say, we have an About Page component and a User component like in previous example.
But this time, both components are class based components.

So, consider the About Page component as the parent component and the User component as the child component.

```jsx
// About Page component
import React from "react";

class AboutPage extends React.Component {
  constructor(props) {
    super(props);
    console.log("About Page constructor() method called: Parent constructor");
  }

  render() {
    console.log("About Page render() method called: Parent render");
    return (
      <div>
        <h1>About Page</h1>
        <UserClass name={"XYZ"} />
      </div>
    );
  }
}
```

```jsx
// User component
import { Component } from "react"; // we can also import Component like this: destructuring

class UserClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };
    console.log("UserClass constructor() method called: Child constructor");
  }

  render() {
    console.log("UserClass render() method called: Child render");
    return (
      <div>
        <h2>Count: {this.state.count}</h2>
        <h2>Name: {this.props.name}</h2>
      </div>
    );
  }
}
```

Consider the above code layout for understanding.

Now, the question is in what cycle the components are rendered?

-> Here, the About Page component is rendered first and then the User component is rendered.

Steps in which the components are rendered:

1. When the About Page component is rendered, the constructor() method of the About Page component is called.
   -> "About Page constructor() method called: Parent constructor" is printed in the console.

2. Then, the render() method of the About Page component is called. "About Page render() method called: Parent render" is printed in the console.

3. The render() method of the About Page component contains the User component. So, the User component is rendered.
   But it still, the render() method of About component that is parent render has not yet completed mounting.

4. Since, it contains the User component, the constructor() method of the User component is called.
   "UserClass constructor() method called: Child constructor" is printed in the console.

5. Then, the render() method of the User component is called. "UserClass render() method called: Child render" is printed in the console.

This is the lifecycle of the components which is followed in the Class based components i.e.,

1. Parent constructor,
2. Parent render,
3. Child constructor,
4. Child render.

-> Now, there is a component lifecycle method provided by React which is called componentDidMount() method.

-> If this method is present in the component, then it is called after the render() method of the component is called.

```jsx
// User component
import { Component } from "react"; // we can also import Component like this: destructuring

class UserClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };
    console.log("UserClass constructor() method called: Child constructor");
  }

  componentDidMount() {
    console.log("UserClass componentDidMount() method called: Child");
  }

  render() {
    console.log("UserClass render() method called: Child render");
    return (
      <div>
        <h2>Count: {this.state.count}</h2>
        <h2>Name: {this.props.name}</h2>
      </div>
    );
  }
}
```

Here, the componentDidMount() method is called after the render() method of the User component is called.

So, the last console.log() statement will be "UserClass componentDidMount() method called: Child".

Now, let's add this method in the About Page component(parent component) also:

```jsx
// About Page component
import React from "react";

class AboutPage extends React.Component {
  constructor(props) {
    super(props);
    console.log("About Page constructor() method called: Parent constructor");
  }

  componentDidMount() {
    console.log("About Page componentDidMount() method called: Parent");
  }

  render() {
    console.log("About Page render() method called: Parent render");
    return (
      <div>
        <h1>About Page</h1>
        <UserClass name={"XYZ"} />
      </div>
    );
  }
}
```

Now, what will be the sequence of the console.log() statements?

Run this code, and try to see what happens.

Here's the sequence of the console.log() statements:

1. About Page constructor() method called: Parent constructor,
2. About Page render() method called: Parent render,
3. UserClass constructor() method called: Child constructor,
4. UserClass render() method called: Child render,
5. UserClass componentDidMount() method called: Child,
6. About Page componentDidMount() method called: Parent

But why and how?

Shouldn't the componentDidMount() method of the parent component be called first?

No, let' see why? by revisiting the steps we see:

1. About Page constructor() method called: Parent constructor,
2. When the parent render() method is called, it contains the User component. So, the User component is rendered. But as we saw earlier, the parent render didn't complete it's mounting.
3. Then, the child constructor() method is called.
4. Then, the child render() method is called.
5. Then, the child componentDidMount() method is called.
   So, the componentDidMount() method of the child component is called first because the child lifecycle is completed first as it completed it's mounting first.
6. But, the parent render() method is still not completed.
   -> So, the parent componentDidMount() method is called after the child componentDidMount() method is called because, the parent render() gets completed only after the child render() method is called.

Hence, now the componentDidMount() method of the parent component is called and the last console.log() statement is printed.

<h3>Use of componentDidMount() method:</h3>

-> We can use this method to make API calls.

<h4> Why? </h4>
Remember, how we made API calls in functional components using useEffect() hook?

-> Quickly render the component, the make the API call to load the data, hence resulting in faster rendering of the component.

But earlier, useEffect() hook was not present in React. So, we used componentDidMount() method to make API calls.

We follow the same approach in class based components.

As we saw, componentDidMount() method is called after the render() method of the component. Hence, we can make API calls in this method.
Since, the page will quickly render once and then make an API call to fill the data, hence resulting in faster rendering of the page.

<h3>Day 23</h3>

<h4>What if there are more than one child class instances?</h4>

-> Let's say, we have 2 User class instances in the About Page component.

```jsx
// About Page component
import React from "react";

class AboutPage extends React.Component {
  constructor(props) {
    super(props);
    console.log("About Page constructor() method called: Parent constructor");
  }

  componentDidMount() {
    console.log("About Page componentDidMount() method called: Parent");
  }

  render() {
    console.log("About Page render() method called: Parent render");
    return (
      <div>
        <h1>About Page</h1>
        <UserClass name={"XYZ"} /> /** 1st instance */
        <UserClass name={"ABC"} /> /** 2nd instance */
      </div>
    );
  }
}
```

```jsx
// User component
import { Component } from "react";

class UserClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };
    console.log(
      this.props.name +
        "UserClass constructor() method called: Child constructor"
    );
  }

  componentDidMount() {
    console.log(
      this.props.name + "UserClass componentDidMount() method called: Child"
    );
  }

  render() {
    console.log(
      this.props.name + "UserClass render() method called: Child render"
    );
    return (
      <div>
        <h2>Count: {this.state.count}</h2>
        <h2>Name: {this.props.name}</h2>
      </div>
    );
  }
}
```

-> Now, what will be the sequence of the console.log() statements?

-> Here's the sequence of the console.log() statements:

1. About Page constructor() method called: Parent constructor,
2. About Page render() method called: Parent render,
3. XYZ UserClass constructor() method called: Child constructor,
4. XYZ UserClass render() method called: Child render,
5. ABC UserClass constructor() method called: Child constructor,
6. ABC UserClass render() method called: Child render,
7. XYZ UserClass componentDidMount() method called: Child,
8. ABC UserClass componentDidMount() method called: Child,
9. About Page componentDidMount() method called: Parent

<h3>Wait what? How? Confusing, right?</h3>

-> This is done by React to optimize it's performance.
-> React batches the renders together before updating the DOM, because updating the DOM is a costly operation.

<h4>To understand this, let's see this diagram:</h4>
<img src="/Notes/assets/images/ReactLifecycle.png" alt="React Lifecycle methods" />

There are two phases in React Lifecycle methods:

1. Render phase
2. Commit phase

What React does is, it batches the renders together in the render phase and then updates the DOM in the commit phase.

So, here when the render() of the 1st instance is called, it goes to the constructor() of the 2nd instance and likewise if there are more instances. It batches all the renders together, because this phase is fast as it is dealing in Virtual DOMs i.e., dealing with objects.

So, it batches the renders and finds the difference between the virtual DOMs and then, it updates the DOM in the commit phase. This is because the DOM manipulation is a costly operation, and react does not want to do it again and again. So, it batches the renders together and then updates the DOM in the commit phase.

Also, the commits are done in the order in which the renders are done. So, the 1st instance is rendered first, then the 2nd instance and so on. So, the commits are also done in the same order.

After the render of the 2nd instance, it will start the commit phase. So, it will call the commitDidMount() of the 1st instance and then the 2nd instance.

Finally, the parent commitDidMount() method is called.

This is the whole process!

<h3>Day 24</h3>

-> Single Responsibility Principle: A component should do only one thing and do it well.

<h4>Custom Hooks:</h4>
-> Custom Hooks are the hooks which are created by us. It is general convention to always start the name of the custom hook with the word "use".

<h3>Day 30</h3>

<h4>Optimising our app:</h4>

-> All the files in our app are minified and bundled into a single file. This is done by bundlers. But, if we do not optimize our code, that one single file will become very big in size and will take a lot of time to load. So, we need to optimize our code.

-> To optimize our code, we can take one approach of breaking our app into smaller chunks. This is known as code splitting / lazy loading.
-> Other names for this process are chunking, dynamic bundling, dynamic import, on demand loading etc.

So, What is Lazy Loading?
-> Lazy loading is a technique in which we load only the required files when they are needed. This is done by code splitting.

For example, let's suppose, our app has two verticals. One of them is for flight related stuff, and other one for bus booking.

So, when we are booking a flight, we only need the flight component bundle and not the bus component. BUt, in our app, we have a single bundle which contains both the components. So, when we are booking a flight, we are also loading the bus component bundle which is not required. This is not a good approach.

We, should load the bus booking code when we visit the bus component. This is achieved by lazy loading.

Syntax:

This is done in App.js where we have created the routes.

```jsx
import { lazy } from "react";
const BusComponent = lazy(() => import("./BusComponent"));
```

After putting this line of code in our booking app, the Bus component will be loaded only when we visit the Bus component.
Also, it will create a separate bundle for the Bus component. And, separate js files for the Bus component will be created.

There will be an error, in the beginning after putting this code.

But, why is there an error?
-> Because, the react render is very fast and till the time of rendering, as the Bus component code was not present, and bundle is loaded late as it takes time, we are calling it on-demand. Hence, react suspends the rendering until the Bus component bundle is loaded.

So, we need to handle this error. We can do this by using the Suspense component.

We can do this by wrapping the Bus component in the Suspense component.

This is done in App.js where we have created the routes.

```jsx
import { Suspense } from "react";

{
  path: "/bus-booking",
  element: <Suspense fallback = {<Shimmer />} ><BusComponent /></Suspense>
}

```

<h2>Day 30</h2>

<h3>Styling with Tailwind CSS</h3>
