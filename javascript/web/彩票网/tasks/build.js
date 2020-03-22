import gulp from 'gulp';
import gulpSequence from 'gulp-sequence'; // 顺序执行

gulp.task( 'build',
    // 规定顺序执行
            gulpSequence(
                'clean', 'css', 'pages', 'scripts',
                [ 'browser', 'server' ]
            )
);
