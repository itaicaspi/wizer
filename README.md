# wizer
wizer webapp WIP

installation instructions:
1. install nodejs latest version
2. install mongodb latest version
3. install python 2.7 under c:\python27
4. add mongodb path to the PATH through the environment variables
5. in a new command window, go to the repo dir and run:
  mongod --dbpath data/db
6. in a new command window, go to the repo dir and install dependencies:
  npm install -g grunt
  npm install -g bower
  npm install --python=C:\Python27\python.exe
  bower install
7. wire dependencies using:
  grunt wiredep
8. descend to app dir and run the server:
  node upload.js
9. open http://localhost:8090 in the browser
