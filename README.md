# snoopy

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.7.3.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`
- [SQLite](https://www.sqlite.org/quickstart.html)

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `grunt serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `grunt build` for building and `grunt serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.


{
  "name": "snoopy",
  "version": "0.0.0",
  "main": "server/app.js",
  "dependencies": {
    "express": "^4.13.3",
    
    /* HTTP request logger middleware for node.js */
    /* HTTP请求日志器中间件 */
    "morgan": "~1.7.0",
    
    "body-parser": "^1.13.3",
    
    /* Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it. */
    /* 允许您使用HTTP动词，例如PUT或DELETE的地方客户端不支持它 */
    "method-override": "^2.3.5",
    
    "cookie-parser": "^1.3.5",
    "express-session": "^1.11.3",
    "errorhandler": "^1.4.2",
    "compression": "^1.5.2",
    "composable-middleware": "^0.3.0",
    
    /* A modern JavaScript utility library delivering modularity, performance, & extras */
    /* 一个JavaScript工具库:提供模块化、性能及其它 */
    "lodash": "^4.6.1",
    
    /* Web application security middleware. */
    /* Web应用安全中间件 */
    "lusca": "^1.3.0",

    "babel-runtime": "^6.6.1",
    "babel-polyfill": "^6.7.2",
    "ejs": "^2.3.3",
    "mongoose": "^4.1.2",
    "bluebird": "^3.3.3",
    "connect-mongo": "^1.1.0",
    "sequelize": "^3.5.1",
    "sqlite3": "~3.1.1",
    "express-sequelize-session": "0.4.0",
    "jsonwebtoken": "^6.2.0",
    "express-jwt": "^3.0.0",
    "passport": "~0.3.0",
    "passport-local": "^1.0.0",
    "passport-facebook": "^2.0.0",
    "passport-twitter": "^1.0.3",
    "passport-google-oauth20": "^1.0.0",
    "serve-favicon": "^2.3.0"
  },
  "devDependencies": {
    "autoprefixer": "^6.0.0",
    "babel-core": "^6.6.5",
    "babel-register": "^6.6.5",
    "babel-plugin-transform-class-properties": "^6.6.0",
    "babel-plugin-transform-runtime": "^6.6.0",
    "babel-preset-es2015": "^6.6.0",
    "grunt": "^0.4.5",
    "grunt-wiredep": "^2.0.0",
    "grunt-concurrent": "^2.0.1",
    "grunt-contrib-clean": "^1.0.0",
    "grunt-contrib-concat": "^1.0.0",
    "grunt-contrib-copy": "^1.0.0",
    "grunt-contrib-cssmin": "^1.0.0",
    "grunt-contrib-imagemin": "^1.0.0",
    "grunt-contrib-jshint": "^1.0.0",
    "grunt-contrib-uglify": "^1.0.0",
    "grunt-contrib-watch": "^1.0.0",
    "grunt-babel": "~6.0.0",
    "grunt-google-cdn": "~0.4.0",
    "grunt-jscs": "^2.1.0",
    "grunt-newer": "^1.1.1",
    "grunt-ng-annotate": "^2.0.1",
    "grunt-ng-constant": "^2.0.1",
    "grunt-filerev": "^2.3.1",
    "grunt-usemin": "^3.0.0",
    "grunt-env": "~0.4.1",
    "grunt-node-inspector": "^0.4.1",
    "grunt-nodemon": "^0.4.0",
    "grunt-angular-templates": "^1.0.3",
    "grunt-dom-munger": "^3.4.0",
    "grunt-protractor-runner": "^3.1.0",
    "grunt-injector": "~0.6.0 ",
    "grunt-karma": "^1.0.0",
    "grunt-build-control": "^0.7.0",
    "jit-grunt": "~0.10.0",
    "grunt-express-server": "^0.5.1",
    "grunt-postcss": "~0.8.0",
    "grunt-open": "~0.2.3",
    "time-grunt": "^1.2.1",
    "grunt-mocha-test": "~0.12.7",
    "grunt-mocha-istanbul": "^4.0.2",
    "open": "~0.0.4",
    "jshint-stylish": "^2.2.0",
    "connect-livereload": "^0.5.3",
    "istanbul": "~0.4.1",
    "chai": "^3.2.0",
    "sinon": "^1.16.1",
    "chai-as-promised": "^5.1.0",
    "chai-things": "^0.2.0",
    "karma": "~0.13.3",
    "karma-firefox-launcher": "^1.0.0",
    "karma-script-launcher": "^1.0.0",
    "karma-chrome-launcher": "^1.0.1",
    "karma-jade-preprocessor": "0.0.11",
    "karma-phantomjs-launcher": "~1.0.0",
    "karma-ng-html2js-preprocessor": "^1.0.0",
    "karma-spec-reporter": "~0.0.20",
    "sinon-chai": "^2.8.0",
    "mocha": "^2.2.5",
    "jasmine-core": "^2.3.4",
    "karma-jasmine": "^1.0.2",
    "jasmine-spec-reporter": "^2.4.0",
    "karma-babel-preprocessor": "^6.0.1",
    "phantomjs-prebuilt": "^2.1.4",
    "proxyquire": "^1.0.1",
    "supertest": "^1.1.0"
  },
  "engines": {
    "node": "^4.4.0",
    "npm": "^2.14.20"
  },
  "scripts": {
    "test": "grunt test",

    "update-webdriver": "node node_modules/protractor/bin/webdriver-manager update",

    "start": "node server"
  },
  "private": true
}