var gulp = require('gulp');
var concat = require('gulp-concat');

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
gulp.task('default', gulp.series('js', 'other-js'), function(){
    console.log('You did it!')
})

gulp.task('watch', function(){
    gulp.watch('src/*', gulp.series('default')) //watch the changes in the files under src folder and run default task if anyy change occurs
})