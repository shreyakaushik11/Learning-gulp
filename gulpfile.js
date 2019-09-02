var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var htmlbuild = require('gulp-htmlbuild')

//define gulp task by the name of js
gulp.task('js', function(){
    return gulp.src('src/*.js') //we will concatenate all files in the src folder
    .pipe(concat('all.js')) //the file name in while all files will be concatenated will be all.js
    .pipe(gulp.dest('dist')); //choose destination folder which will be dist
})

gulp.task('other-js', function(){
    return gulp.src(['src/a.js', 'src/b.js'])
    .pipe(concat('two.js'))
    .pipe(gulp.dest('dist'));
})

//default task depends on other two tasks
// gulp.task('default', gulp.series('js', 'other-js'), function(){
//     console.log('You did it!')
// })

gulp.task('watch', function(){
    gulp.watch('src/*', gulp.series('default')) //watch the changes in the files under src folder and run default task if anyy change occurs
})

gulp.task('js1', function(){
    return gulp.src('src/*.js')
    .pipe(concat('alljs.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
})

gulp.task('css', function(){
    return gulp.src('src/*.css')
    .pipe(minify())
    .pipe(gulp.dest('dist'))
})

gulp.task('images', function(){
    return gulp.src('src/*.png')
    .pipe(imagemin())
    .pipe(gulp.dest('dist'))
})

gulp.task('default', gulp.series('js1', 'css', 'images'));

gulp.task('js2', function(){
    return gulp.src('src/*.js')
    .pipe(concat('every.js'))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(concat('every.min.js'))
    .pipe(gulp.dest('dist'))
})

gulp.task('html', function(){
    return gulp.src('src/index.html')
    .pipe(htmlbuild({
        js: htmlbuild.preprocess.js(function(block){
            block.write('jsfile.js')
            block.end();
        })
    }))
    .pipe(gulp.dest('dist'))
})