# URL Shortner

### Description

A simple app built with typescript and Dynamobdb that shortens a URL and redirects it when clicked. The enviromental vairables have been added to aid quick setup.

### Setup
#### Docker

- Download and install docker in your local system. you can download docker here [DOWNLOAD DOCKER](https://www.docker.com/products/docker-desktop/)
- Start docker and ensure it is running.
- Clone app into your local system. by running ``` git clone https://github.com/donkovah/url-shortner.git ```
- CD into the folder of the app and run  ``` docker-compose up -d```
- Vist the Urls as shown below.

##### Routes
- GET http://localhost:3000/url : 
Description: Get all existing urls
- POST http://localhost:3000/url and the body of the request i.e {shortUrl?, longUrl}. Where shortUrl is optional and longUrl is required. 
Description: Create shortUrls
- GET http://localhost:3000/url/:id/stats : 
Description: Get urls stats
- GET http://localhost:3000/url/:id/details : 
Description: Get urls details
- 
### Testing
Start your docker container and run the following in the project folder. 
- Run ```npm test```

####
