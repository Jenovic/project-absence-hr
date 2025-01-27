# project-absence-hr

The project is hosted on the following public Github repo: (https://github.com/Jenovic/project-absence-hr).

This is a React App written with Typescript. It has the following features, given the endpoints provided:

- Displays a table displaying absences
- Include a visual indication that an absence has conflicts, using the conflict endpoint
- Allow the list to be sorted by dates, absence type, and name
- When an employee's name is clicked show all of their absences

I use the [Create React App](https://github.com/facebook/create-react-app), boilerplate to get started with the App.

## Available Scripts

In the project root directory, navigate to the my-app folder: `cd .\my-app`.

The following scripts can be used to setup the app locally, run it and run tests on it:

### `npm install`

Installs the App dependencies (Modules and libraries) needed for the App to run.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode. I use **Jest and @testing-library/react** to write and run my tests

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Notes and Further Considerations

### Testing

All tests should run and pass and running the `npm test` command. However, there will be one console error. This error happens when I test my ErrorBoundary Component. To make sure the component works I throw an unhandled error in my test, which is caught by my component and displays a fallback UI.

I've stored the original console.error function and replaced it with a jest mock to prevent error messages from cluttering the test output. I restore it after the test. However, React intentionally logs errors caught by error boundaries so an error still shows on the console.

### Further considerations

- I'd work further on improving the filter UI on desktop and also implement the filtering on mobile
- Consider lazy loading by adding a 'load more' button or pagination on the absence table to further improve the speed of the app.
- Would further improve my `AbsenceRow` component, especially if more columns are added to the table.
- Would further improve my `AbsenceCard` component UI and tidy up my css file further.
