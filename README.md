# Project

A collaborative scrum retrospective tool

## Scripts

In the project directory, you can run:


### `npm install`

installs required dependecies

### `npm run client`

Runs the front end of the app in the development mode.\
Open [http://localhost:3000]

The page will reload when you make changes.
You may also see any lint errors in the console.

### `npm run server`

Runs the express js server in development mode. \

This script uses the nodemon library to monitor changes to the server code.
The server will be reset after every saved change.

## Pages

### Home

- Landing page for website, users can choose to create of join a game from this page

## CreateRoom

- page for creating a new room to host a retrospective

## JoinRoom

- page for joining an existing room hosted by another player, room code must be acquired from the host

## Room

- waiting room for users before the retrospective starts. Connected users are displayed on this page

## Game

- main game page, displays a 5 pointed star with a button at each point. Each button is a prompt for a quesiton

## Question

- page for answering a question, quesiton depends on which button user has selected from the main game screen

## Whiteboard

- page for categorizing answers, answers can be dragged and dropped on the whiteboard. Players must refresh to see the updated positions. Users can select the Action item button on this page to add an action item

## Action Item

- page displaying final score for a team and the action items they have submitted
