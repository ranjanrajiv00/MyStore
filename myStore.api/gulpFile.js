var gulp = require('gulp'),
nodemon = require('gulp-nodemon'),
ts = require("gulp-typescript");

var tsProject = ts.createProject('tsconfig.json');
gulp.task('compile', function() {
    var tsResult = tsProject.src()
        .pipe(tsProject());
 
    return tsResult.js.pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.ts', ['compile']);
 });

gulp.task('default', ['watch', 'compile'], function(){
    nodemon({
        script: './dist/server.js',
        ext: 'js',
        watch: "./",
        env: {
            PORT:8080
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function(){
        console.log('Restarting');
        gulp.watch(tsProject.files, ['compile']);
    });
});