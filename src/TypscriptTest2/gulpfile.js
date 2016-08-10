/// <binding BeforeBuild='min' Clean='clean, clean:js, clean:css' ProjectOpened='firstapp:watch' />
//"use strict";

var gulp = require("gulp"),
  rimraf = require("rimraf"), //to remove files
  concat = require("gulp-concat"),
  cssmin = require("gulp-cssmin"),
  uglify = require("gulp-uglify"),
  debug = require("gulp-debug"), //great to see whats getting uglified / concatenated
  merge = require("merge-stream");
var root = "./wwwroot/";
var paths = {
    webroot: "./wwwroot/",
    js : root + "js/**/*.js",
    minJs: root + "js/**/*.min.js",
    css: root + "css/**/*.css",
    minCss: root + "css/**/*.min.css",
    concatJsDest: root + "js/site.min.js",
    concatCssDest: root + "css/site.min.css",
    node: "./node_modules/",
    libsdest: root + "lib/",
    tsapps: "./tsapps/",
    tsappsmin: root + "js/apps/",
    tsappscss: "./tsapps/*/*.css",
    tsappsmincss: root + "js/apps/app.min.css",
    nodeLibsDest : root + "lib/node/"
};

gulp.task("clean:js", function (cb) {
    return gulp.src(["./wwwroot/js/**/*.min.js", "./wwwroot/js/apps/**/*.js","./wwwroot/libs/node/**/"])
    .pipe(rimraf());    
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
gulp.task("firstapp:min", function () {
    return gulp.src([paths.tsapps + "FirstApp/*.js", "!" + paths.tsapps + "FirstApp/systemjs.config.js"])
      .pipe(debug({ title: "First App" }))
      .pipe(uglify())
      .pipe(gulp.dest(paths.tsappsmin+"FirstApp")) 
});

gulp.task("firstapp:mincss", function () {
    return gulp.src([paths.tsapps + "FirstApp/**/*.css"], { base: "." })
      .pipe(debug({ title: "First App CSS" }))
      .pipe(concat("FirstApp/app.min.css"))
      .pipe(debug({ title: "First App Concat CSS" }))
      .pipe(cssmin())
      .pipe(gulp.dest("./wwwroot/js/apps"))
});

gulp.task("copy:npmmodules", ["firstapp:min", "firstapp:mincss"],
    function () { ///Feel free to strip these down to what you need, just doing this for example
        return merge(gulp.src(paths.node + "core-js/client/**/").pipe(gulp.dest(paths.nodeLibsDest + "core-js/client/"),
            gulp.src(paths.node + "zone.js/dist/**/").pipe(gulp.dest(paths.nodeLibsDest + "zone.js/dist/")),
            gulp.src(paths.node + "reflect-metadata/**/").pipe(gulp.dest(paths.nodeLibsDest + "reflect-metadata/")),
            gulp.src(paths.node + "@angular/**/").pipe(gulp.dest(paths.nodeLibsDest + "@angular/")),
            gulp.src(paths.node + "angular2-in-memory-web-api/**/").pipe(gulp.dest(paths.nodeLibsDest + "angular2-in-memory-web-api/")),
            gulp.src(paths.node + "rxjs/**/").pipe(gulp.dest(paths.nodeLibsDest + "rxjs/")),
            gulp.src(paths.node + "systemjs/dist/**/").pipe(gulp.dest(paths.nodeLibsDest + "systemjs/dist/"))
        )
        )
    });

gulp.task("firstapp:output", ["firstapp:min", "firstapp:mincss", "copy:npmmodules"],
    function () {
        return gulp.src([paths.tsapps + "FirstApp/systemjs.config.js"])
        .pipe(debug({ title: "First App Output" }))
        .pipe(gulp.dest("./wwwroot/js/apps/FirstApp/", {}))
    });

gulp.task("firstapp:watch", function () {
    var watcher = gulp.watch([paths.tsapps + "FirstApp/**/*.js"], ['firstapp:output'])
    watcher.on('change', function (event) { console.log('File ' + event.path + ' was ' + event.type + ', building firstapp'); })
});

gulp.task("min", ["min:js", "firstapp:output"]);

