# TrouveTonTrain | Marc Dubois

This my TrouveTonTrain Project! This project use SNCF API and Geacoding API.

### Project recovery
- Install [node and npm](https://nodejs.org/en/download/) 

- Install [git](https://git-scm.com/downloads)

- Clone the git repository and move in the right folder
```
git clone https://github.com/marcdubois71450/trouvetontrain.git && cd trouvetontrain
```
- Install the necessary packages
```
npm install
```
- Set [Your Google API Key](https://console.cloud.google.com/apis/credentials) (on project with [Geocoding API](https://console.cloud.google.com/marketplace/product/google/geocoding-backend.googleapis.com)) on [src/client/components/Services/geocode.js](https://github.com/marcdubois71450/trouvetontrain/blob/master/src/client/components/Services/geocode.js#L4)

The project is ready to use


### Development
- Start the project locally
```
npm run dev
```
The developement server is ready on port 3000


### Production
- Build project to "dist" folder
```
npm start
```
Open index.html and enjoy
