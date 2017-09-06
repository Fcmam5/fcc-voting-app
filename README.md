# FreeCodeCamp.com backend project: Voting application

This is my `Voting application` for [FreeCodeCamp backend challenges](https://www.freecodecamp.org/challenges/build-a-voting-app). The I focused on satisfying the user stories, the UI needs more work, and also there are many buggy solutions.

The project was built upon my [Express boilerplate](https://github.com/Fcmam5/mini-express-boilerplate), and it uses [billboard.js](https://naver.github.io/billboard.js/) for drawing charts.

## User stories
* **User Story:** As an authenticated user, I can keep my polls and come back later to access them.
* **User Story:** As an authenticated user, I can share my polls with my friends.
* **User Story:** As an authenticated user, I can see the aggregate results of my polls.
* **User Story:** As an authenticated user, I can delete polls that I decide I don't want anymore.
* **User Story:** As an authenticated user, I can create a poll with any number of possible items.
* **User Story:** As an unauthenticated or authenticated user, I can see and vote on everyone's polls.
* **User Story:** As an unauthenticated or authenticated user, I can see the results of polls in chart form. (This could be implemented using Chart.js or Google Charts.)
* **User Story:** As an authenticated user, if I don't like the options on a poll, I can create a new option.

## Running this project

### Prerequisites
* [MongoDB](https://docs.mongodb.com/manual/installation/)
* [NodeJs](http://nodejs.org/download/)

### Setup

```shell
# Clone this repository
git clone https://github.com/Fcmam5/fcc-voting-app && cd fcc-voting-app

# Copy '.env.example' to '.env' then edit this new file using your Facebook/Twitter API keys, and your DB URL
cp .env.example .env && nano .env

# Install node packages with NPM (you can use Yarn instead)
npm install

# Run the project
npm start
```
