# wizer
wizer webapp WIP

##installation instructions:
<br>1. Install nodejs latest version through [`https://nodejs.org/en/`](https://nodejs.org/en/)
<br>2. Install mongodb latest version through [`https://www.mongodb.org/downloads`](https://www.mongodb.org/downloads)
<br>3. Install python 2.7 under c:\python27 through [`https://www.python.org/downloads/`](https://www.python.org/downloads/)
<br>4. Add mongodb path to the PATH through the environment variables
<br>5. In a new command window, go to the repo dir and run:
```shell
  mongod --dbpath data/db
```
<br>6. In a new command window, go to the repo dir and install dependencies:
```shell
  npm install -g grunt
  npm install -g bower
  npm install --python=C:\Python27\python.exe
  bower install
```
<br>7. Wire dependencies using:
```shell
  grunt wiredep
```
<br>8. Descend to app dir and run the server:
```shell
  node upload.js
```
<br>9. Open [`http://localhost:8090`](http://localhost:8090) in the browser
