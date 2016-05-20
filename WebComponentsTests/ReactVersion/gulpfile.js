/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
    merge = require("merge-stream"),
    rimraf = require("rimraf");

var paths = {
    webroot: "./wwwroot/",
    node_modules: "./node_modules/"
};

paths.libDest = paths.webroot + "lib/";

gulp.task("clean:libs", function (cb)
{
    rimraf(paths.libDest, cb);
});

gulp.task("copy:libs", ["clean:libs"], function ()
{
    var react = gulp.src(paths.node_modules + "react/dist/**/*.js")
        .pipe(gulp.dest(paths.libDest));

    var react_dom = gulp.src(paths.node_modules + "react-dom/dist/**/*.js")
        .pipe(gulp.dest(paths.libDest));

    var systemjs = gulp.src(paths.node_modules + "systemjs/dist/*.js")
        .pipe(gulp.dest(paths.libDest));

    return merge(react, react_dom, systemjs);
});