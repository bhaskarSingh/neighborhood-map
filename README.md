# Neighborhood Map Project React

> By Bhaskar Kumar
![Part of the Udacity Front-End Web Development Nanodegree](https://img.shields.io/badge/Udacity-React-02b3e4.svg)
This application follow this [Udacity Project Rubric](https://review.udacity.com/#!/rubrics/1351/view)

## Overview:
It is a single page app uses React, Google maps, Foursquare. This project was built for the Udacity's front-end web developer Nanodegree as the last project.

## Technologies & Packages:
* [Reactjs:](https://reactjs.org) A JavaScript library for building user interfaces.
* [Material UI](https://material-ui.com/) React components library that implement Google's Material Design.
* [FourSquare APIs](https://developer.foursquare.com/). a local search-and-discovery service mobile app which provides search results for its users.
* [Google Maps JavaScript API:](https://developers.google.com/maps/documentation/javascript/tutorial) It lets you customize maps with your own content and imagery for display on web pages and mobile devices.

## Start the App In Development Mode:
* Make sure that you have Node.js installed on your local and then clone this repository.
* Navigate to the cloned file and type the following command:

	`npm install`
* Then:

    `go to config js file add your GOOGLE_MAPS_API_KEY, SQUARESPACE_CLIENT_ID, SQUARESPACE_CLIENT_SECRET`
* Then
    `npm start`
* The browser will automatically open the Neighborhood Map App. If it doesn't, please [click here](http://localhost:3000/)

## Start the App in Production Mode:
* To run the App in production mode:

	`npm run build`

* Then:
    `yarn global add serve`
	`serve -s build`
* Then the App should run on [port 5000](http://localhost:5000).

Note: To check if service worker is working correcting or not, run production build