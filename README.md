## User Management Tool

This system allows you to monitor and update users and groups

## Features Available
 
### Listing users & groups

See the list of existing users and groups

### Add new user & groups

You can add new users & group with the form at the end of the corresponding page

### Assign users/ groups

You can assign an existing user to a group or vice-versa with the input field at the listing

### Delete from users/ groups

You can remove a user from a group or vice-versa with the "-" button next to its name

### Remove a user or group

You can remove a user or group with the "-" button next to its name

### Note:

The application starts with some initial data - 2 users and 2 groups. "Admin" and "General" are part of the system maintenance and cannot be edited by the user.

## Inital Setup

### npm init

Installs node modules and initializes the system

### npm start

Runs the app in the development mode. Open http://localhost:3000 to view it in the browser.
You will also see any lint errors in the console.

## Known Errors

### Page Doesnt update when you remove a group member / user's group - If you navigate to the other page and return, you see it's actually updated although it doesn't reflect instantaneously.

### Occaisionally, the application crashes after adding a new user / group - Intermittent error, I was unable to reproduce it exactly. Please reload the page to start.

## Implementation details

This application uses the following - 

* React JS
* Redux state management
* React Router
* Initial data - a JSON object
* ES Lint - For linting

## Planned Improvements 

* More extensive testing - using Enzyme
* Offline capabilities with service workers
* More extensive linting
