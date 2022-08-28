# social-network-api

## description

This application was created for the backend of a social networking site, creating the functions and routes that would be necessary to follow to complete the core functions of the webpage: creating users, adding friends, adding thoughts, and reacting to those thoughts.

## table-of-contents

1. [walkthrough-video](#walkthrough-video)
2. [usage](#usage)
3. [composition](#composition)
4. [credits](#credits)

## walkthrough-video

[Walkthrough Video](social-network-api.webm)

## usage

This app is ran through insomnia, allowing a social networking company to test their routes before deploying. In order to use this, the user will need to walk through each of the functions that are provided, filling in the necessary information in order to see the functionality of the application. 

The functions that would need to be ran through are from 3 schemas: User, Thought, and Reaction. In order to test the routes and the functions, there are 14 different routes. 
User and Thought both have a get route (collecting all of the datapoints), a singular get route (for fetching one thought or user), posting for a new object, update, and a delete. 

Reaction's routes are contained within Thought (post to create a reaction, delete). User also has friends, which also have a post and a delete.


## composition

[MongoDB](https://www.mongodb.com/) was selected for this application's database software.

This app utilized 2 different dependencies for it's creation and usage. 

- [Express](https://www.npmjs.com/package/express)

- [Mongoose](https://www.npmjs.com/package/mongoose)

It also involved the usage of the app, [Insomnia](https://insomnia.rest/), which is used outside of the users code editing software as a standalone application.

## credits

- University of Washington Bootcamp Instructors and Teaching Assistants

- [Mongoose Docs](https://mongoosejs.com/docs/api.html)
