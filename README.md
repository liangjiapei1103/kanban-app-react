React App Boilerplate
=====================

Quickstart project template for learning React.

### Objective

This boilerplate is purposefully simple to show the minimal setup needed to create React projects with Webpack and Babel. It aims to be a starting point for learning React, with low cognitive load and as such avoids having many separate config files and advanced configuration options, while providing a solid foundation for new React projects.

### Usage
**Clone this repository**
```
git clone git@github.com:pro-react/react-app-boilerplate.git
```

**Install**
```
npm install
```

**Start the application in development mode**
```
npm start
```

Open http://localhost:8080 in your browser.

Static files are served from the `public` folder, project JavaScript files are bundled from the `app` folder.

**When ready, build for production**
```
npm run build
```

This will generate a minimized bundle.js file on the `public` folder.


### Missing Features

This boilerplate focuses solely on transforming and bundling javascript files - all other static files are served directly from the public folder without any processing. While useful for learning React, this setup doesn't use Webpack and Babel in their full capabilities - which include transforming and bundling projects assets (such as stylesheets), modularizing CSS, hot reloading and etc. Please refer to [Pro React Appendix A](http://www.pro-react.com/materials/) to learn more about Webpack. If you are looking for a feature-rich bootstrap for React, take a look at [React App Advanced Boilerplate](//github.com/pro-react/react-app-advanced-boilerplate).


### Dependencies

* React & React-DOM
* Webpack & webpack-dev-server
* Babel Core
* Babel Loader (With "es2015" and "react" presets)

### Steps to Build The Kanban App

* Data Model
    [
        {
            id: Number
            title: String,
            description: String,
            status: String,
            tasks: [{
                id: Number,
                name: String,
                done: Booleanm
            }]
        },

        ...
    ]

* Defining Component Hierarchy

  App -> KanbanBoard Component -> List Component -> Card Component -> CheckList Component

* Build App Module (App.js)

* Build KanbanBoard Component (KanbanBoard.js)

* Build List Component (List.js)

* Build Card Component (Card.js)

* Build CheckList Component (CheckList.js)

* Add some styles to the app

* Using State to handle toggling Cards

* Adding and removing className from div

* Adding Markdown capability into Card Component

* Adding Card side color via Inline styling

* Adding Task Form to CheckList Component

* Defining Prop Types, and custom PropType Validator

* Fetching the initial Cards from the External API

* Add addTask, deleteTask, and toggleTask methods into KanbanBoardContainer

* Add Card Toggle Animation

* Add Drag and Drop functionality to Card Component

* Add Sorting Card by dragging in the same list

* Add Throttle Callbacks

* Persist the New Card's Position and Status

* Add Add Card and edit card functionality with react routing
