# URL Shortner

### Description

A simple app built with typescript and Dynamobdb that shortens a URL and redirects it when clicked. The enviromental vairables have been added to aid quick setup.
##### Routes
- GET /url : get all existing urls
- POST /url {shortUrl?, longUrl}: create shortUrls
- GET /url/:id/stats : get urls stats
- GET /url/:id/details : get urls details

### Setup
#### 1) Using Docker

- Clone app into your local system
- Run  ``` docker-compose up -d```
- Vist the Urls in the above routes or visit the url doc

#### 2) Downloading dependencies
- Clone app into your local system
- Download ```Nodejs```
- Download ```Dynamodb```
- CD into the project
- Run ```npm install``` 
- Run ```npm build```
- Run ```npm serve```

### Testing
- Run ```npm test```

####
