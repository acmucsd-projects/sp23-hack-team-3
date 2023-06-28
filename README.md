# Eventify

A webapp for UCSD event organizers to post their events in one place so students can more easily keep track of on-campus events.  

## Website Demo
[Link to demo](https://drive.google.com/file/d/1F9bkqCA2rr1uSqV7UaVINxvwV6Srdf_m/view?usp=sharing)

## Key Features
- To post, users need to be logged in and authenticated
- The map zooms in to the location of the event when an event card is clicked
- User can click on the event flyer to see a larger version of it
- Events in the home page is sorted by time


## Process to Setup Locally

- Install Node and npm [here](https://nodejs.org/en/download/)
- Install `yarn` with the command `npm install -g yarn`
- Set up a [MongoDB Atlas](https://www.mongodb.com/) instance. See [this video](https://www.youtube.com/watch?v=CcOL5h_ZFJM) for help!
- Create a `.env` file with a variable called `DB_URL` and paste your MongoDB url:

```bash
DB_URL=mongodb://mongodburl.example.com:portnumber
```

## Running Locally

1. `cd` into `client` and run the command `yarn install` to install all dependencies
2. To start the client, run `yarn start` in the same directory
3. In another command window, `cd` into `server` and run `yarn install` and `yarn start`
   to install all dependencies and start the server.
4. Happy hacking!
