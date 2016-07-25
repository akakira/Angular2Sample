1. Open visual studio click new project web > ASP.Net Core Web Application > Web Application (this will give you MVC stuff) 
2. Add the Typings. open command prompt in project root and type "npm install typings""
3. Search for desired typings "typings search --name jquery""
4. Import using typings "install dt~jquery --global --save" ,don't use global if you wish to use this in a modular fashion
5. Add a typescript file
6. Remove out microsoft minifier delete bundleconfig.json
7. Open .bowercc disable ssl (if behind enterprise mim server without verisign or other major brand certificate bower doesn't use a store, just precompiled trusted certs)
8. Open nmp package.json add gulp in devdependencies and angular2 in dependencies.
9. Create tsapps folder if you want to. (alternately you could put your ts files in your js but this is more fun)
10. Add gulpfile.js create a task for cleaning and minifying and moving your compiled ts files into the js folder. https://docs.asp.net/en/latest/client-side/using-gulp.html
11. If you're using angular 2 then move the libs from your node modules to the libs folder using gulp
12. Go to http://www.typescriptlang.org/docs/tutorial.html and learn typescript, k?
13. Go to http://www.angular.io and learn angular2, k?
14. Need a hand check out https://github.com/akakira/Angular2Sample
