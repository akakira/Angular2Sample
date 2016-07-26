/// <binding BeforeBuild='min' Clean='clean, clean:js, clean:css' ProjectOpened='firstapp:watch' />
//"use strict";

var gulp = require("gulp"), 
  rimraf = require("rimraf"), //to remove files
  concat = require("gulp-concat"), 
  cssmin = require("gulp-cssmin"),
  uglify = require("gulp-uglify"),
  debug = require("gulp-debug"); //great to see whats getting uglified / concatenated
var root = "./wwwroot/";
var paths = {
    webroot: "./wwwroot/",
    js : root + "js/**/*.js",
    minJs: root + "js/**/*.min.js",
    css: root + "css/**/*.css",
    minCss: root + "css/**/*.min.css",
    concatJsDest: root + "js/site.min.js",
    concatCssDest: root + "css/site.min.css",
    nodeangular: "./node_modules/angular2/bundles/**", //refine this for your apps
    angulardest: root + "lib/angular2/",
    tsapps: "./tsapps/",
    tsappsmin: root + "js/apps/",
    tsappscss: "./tsapps/*/*.css",
    tsappsmincss: root + "js/apps/app.min.css"
};

gulp.task("clean:js", function (cb) {
    rimraf("./wwwroot/js/**/*.min.js", cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
      .pipe(debug({ title: paths.js }))
      .pipe(concat(paths.concatJsDest))
      .pipe(uglify())
      .pipe(gulp.dest("."));
});

//only do this if you want to keep your typescript in a separate folder from the compiled javascript at runtime. 
//I suggest breaking this into a move, then minify function for more complex apps.
gulp.task("firstapp:min", function () {
    return gulp.src([paths.tsapps + "FirstApp/**/*.js"], { base: "." })
      .pipe(debug({ title: "First App" }))
      .pipe(concat("FirstApp/app.min.js"))
      .pipe(debug({ title: "First App Concat" }))
      .pipe(uglify())
      .pipe(gulp.dest("./wwwroot/js/apps"));
});

gulp.task("firstapp:watch", function () {
    var watcher = gulp.watch([paths.tsapps + "FirstApp/**/*.js"], ['firstapp:min'])
    watcher.on('change', function (event) { console.log('File ' + event.path + ' was ' + event.type + ', building firstapp'); })
});

gulp.task("min", ["min:js", "min:css","firstapp:min"]);
