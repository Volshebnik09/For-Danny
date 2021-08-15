const gulp = require('gulp');
const bs = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');

bs.init({
    server:{
        baseDir: './build',
    },
    open:false,
})

gulp.task('default',function(){
    gulp.watch('./build/index.html').on('change', bs.reload);
    gulp.watch('./src/scss/*', function(cb){
        gulp
            .src('./src/scss/style.scss')
            .pipe(sass({
                outputStyle:'compressed'
            })
            .on('error', sass.logError))
            .pipe(autoprefixer({cascade:false,  overrideBrowserslist:['last 16 versions']}))
            .pipe(gulp.dest('./build/css'))
            .pipe(bs.stream());
        cb();
    })
});