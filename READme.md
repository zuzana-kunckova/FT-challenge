## About this project
This is a server-rendered site that displays headlines from The Financial Times. It uses JavaScript to handle the search functionality on the client side, Node.js to work on the backend, ExpressJS framework for Node.js, node-fetch package to make it possible to make fetch call in Node.js, and Handlebars, templating engine to generate the HTML. No JavaScript or CSS framework has been used to build this site.

Even though I was not given a deadline to complete this task, I set my own deadline of one week + weekend. There are always things that could be done to make the site better, but a deadline stops me from loosing focus. I outlined the potential improvements in the [Next steps](#Next steps) section below.

In this week, I learned how to work with Node.js, Express.js and Handlebars, and I implemented the basic search functionality. Although I work with JavaScript on the client side, my main programming language is PHP, and this is my first app I built with Node.js and Express.js. 

## Task requirements
This website is responsive and accessible. I decided against using any CSS frameworks due to the small size of this website; the overhead would have been unjustified. Furthermore, due to the simple design, I decided not to use any CSS preprocessors or build tools. Instead, I decided to write plain CSS. I made the website responsive by using `@media` queries in CSS, and made sure it was accessible by using colours with sufficient contrast. I used a label on the search form to make sure it was clear to screen readers what the form is to be used for, and I made sure it was accessible by the keyboard only. The Lighthouse report gave this website full marks for performance, accessibility, best practises and SEO. 

The website performs well over 3G networks mainly due to its small size, and the fact that it isn't using any images. I made sure that even if the CSS file failed to load, the website would still be usable.

I used the same colour palette as [The Financial Times](https://ft.com) website, giving it the same look and feel.

I didn't use any JavaScript framework or libraries, except for Express.JS, and the website is deployed on Heroku. 


## Installation
To run this project locally, run `npm install` to install all npm dependencies.

To start the local development server, run `node src/app.js` or `nodemon src/app.js -e js,hbs,css` to keep your  server running and watching all changes made to JavaScript, Handlebars and CSS files. 

You may need to restart `nodemon` occasionally as it sometimes fails to register the changes.

## Further information

The home page displays the latest headlines by sending a POST request to The Financial Times Headlines API. The requirement of the API is to include the `Content-Type` and `X-Api-Key` headers. To keep the API key secure, I created a `.env` file and used the `dotenv` npm package to access the key in the Fetch call. 

The body of the call consists of the following values:
1. `queryString` - this is passed from the search form or set to an empty string to display the latest headlines. The client side JavaScript file (`public/js/app.js`) takes the form search input value, and using the Fetch API passes the value to the backend run with NodeJs.
 
2. `queryContext` - this is set to display the headlines of articles, blogs and pages
  
3. `resultContext` - this defines which aspects of the data need to be returned from the API.

The fetch call is made twice: once when the home page is first loaded so that the most recent headlines are displayed, and then again when the user searches for a specific keyword. To keep the code dry, I extracted the functionality into the `getHeadlines()` function, which is then imported into `src/app.js` file.

  The response is returned to the `index.hbs` file to be parsed by Handlebars.

## Testing
I used Postman to make sure the search was returning the correct results.

## Next steps
- Implement unit testing with Jest
- Implement pagination
- Implement PWA
- Refactor the `getHeadline.js` function to a class to make it easier to test and extend

## Author
This app has been made by Zuzana Kunckova as a part of The Financial Times technical challenge.
