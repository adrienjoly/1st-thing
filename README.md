# 1st Thing In The Morning

The goal is to give you the motivation to execute your tasks, every morning.
By sending a notification to your mobile phone, with a reminder of all the tasks you want to do today, and a motivational image.

## Status: What it does now [work in progress]

After you login to Evernote Sandbox, it displays a web page listing your Evernote notebooks. 

## Inspiration

[This article](http://productivityhacks.org/overcoming-procrastination/) says that procrastination prevents us from succeeding in our projects, and that one way to beat it is to write down a list of simple tasks, and commit to it. So we are building an app that helps you do that.

## History

- Forked from [an app made with Osman Abdelnasir (@esaminu)](https://github.com/AsianMeteorites/1st-thing) [during the Meteor Hackathon, in October 2015](http://devpost.com/software/1st-thing-in-the-morning).
- Moved Wunderlist-related API code to [wunderlist-report](https://github.com/adrienjoly/wunderlist-report), and the former Meteor app was removed.
- Added an azk-based web server that successfully connects to Evernote sandbox, to fetch notes. (based on [evernote-api-test](https://github.com/adrienjoly/evernote-api-test)).

## Setup

- Install dependencies:

```sh
$ npm install
```

- Create the `.env` file to set your environment variables:

```sh
$ cp .env.sample .env
```

## Start application

### Run with Node.js

- Change the environment variables in `.env` to:

```
APP_URL=http://localhost
PORT=3000
```

You can start the express server with `npm start`.  Once the server starts, you can access `http://localhost:3000` and see the application. It will list the notebooks in your sandbox account after you authenticate. Edit express/routes/index.js to try other parts of the Evernote API.

### Run with azk (container)

- You need a sandbox account on Azk.  You can create one [here](https://sandbox.evernote.com/Registration.action).
- Fill your Azk API Consumer Key and Consumer Secret in `.env`.
- Change the environment variables in `.env` to:

```
APP_URL=http://express.dev.azk.io
PORT=3000
```

Go to your terminal and run:

```sh
$ azk start
```

And open: http://express.dev.azk.io


## Deploy to Heroku

To deploy to Heroku, just run:

```sh
git push heroku master
```
