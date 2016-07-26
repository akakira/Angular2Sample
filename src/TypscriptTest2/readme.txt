1. Open visual studio (make sure you get latest update as it is improving frequently.) click new project web > ASP.Net Core Web Application > Web Application (this will give you MVC stuff) 
2. Ensure you have the latest version of typescript by opening a command prompt and typing tsc -v anything under 1.7 is bad, ensure your path variable points to C:\Program Files (x86)\Microsoft SDKs\Typescript\{latest}
2. Add the Typings. open command prompt in project root and type "npm install typings"
3. Search for desired typings "typings search --name jquery"
4. Import using typings "install dt~jquery --global --save" ,don't use global if you wish to use this in a modular fashion
5. Add a typescript file and reference your desired d.ts files from above. 
5. Setup your tsconfig.json in the root folder I suggest at least usin "experimentalDecorators": true and "compileOnSave": true unless you use gulp to run tsc
6. Remove the microsoft minifier delete bundleconfig.json since we'll be using gulp
7. Open .bowercc disable ssl (if behind enterprise mim server without verisign or other major brand certificate authority)
8. Open nmp package.json add gulp in devdependencies and angular2 in dependencies.
9. Create tsapps folder if you want to. (alternately you could put your ts files in your js but this is more fun)
10. Add gulpfile.js create a task for cleaning and minifying and moving your compiled ts files into the js folder. https://docs.asp.net/en/latest/client-side/using-gulp.html
11. Choose your package loader. For this example i used systemjs as they did on angular.io
12. Go to http://www.typescriptlang.org/docs/tutorial.html and learn typescript, k?
13. Go to http://www.angular.io and learn angular2, there are differences in package names, when in doubt refer to the samples in the npm package instead of the website.
14. Need a hand check out https://github.com/akakira/Angular2Sample
