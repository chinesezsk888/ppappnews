var gulp = require('gulp');
var babel = require('gulp-babel'); //es6识别
//var rename = require('gulp-rename');//重命名
//var uglify=require('gulp-uglify');//js压缩
//var minifyCss = require("gulp-minify-css");//压缩CSS
//var jshint = require("gulp-jshint");//js检查
//var concat = require("gulp-concat");//文件合并
//var autoprefixer = require("gulp-autoprefixer");//样式兼容前缀
// var rev = require('gulp-rev');//对文件名加MD5后缀
var plugins = require('gulp-load-plugins')();

// 本地打包
gulp.task('commoncss',function(){
    return gulp.src(['public/css/*.css','src/css/app_news_detail.css'])
        .pipe(plugins.autoprefixer())
        .pipe(plugins.base64())
        .pipe(plugins.minifyCss())
        .pipe(plugins.concat('newdetail.min.css'))
        // .pipe(plugins.rev())//文件名加MD5后缀 在生成css文件后执行改命令
        .pipe(gulp.dest('dist/css'))
})
gulp.task('fontcss',function(){
    return gulp.src(['src/css/font.css'])
        .pipe(plugins.concat('font.css'))
        // .pipe(plugins.rev())//文件名加MD5后缀
        .pipe(gulp.dest('dist/css'))
})
gulp.task('commonjs',function(){
    return gulp.src(['public/js/*.js', 'src/js/app_news_detail.js'])
       .pipe(babel({presets: ["env"]}))
       .pipe(plugins.uglify())
       .pipe(plugins.concat('newdetail.min.js'))
    //    .pipe(plugins.rev())
       .pipe(gulp.dest('dist/js'))          
})
gulp.task('minifyimg', function (){
    return gulp.src(['src/images/*.jpg','src/images/*.png','!.src/images/iconImg'])
        .pipe(gulp.dest('dist/img'))
});

// ios打包
gulp.task('iosCommoncss',function(){
    return gulp.src(['public/css/*.css','src/css/app_news_detail.css'])
        .pipe(plugins.autoprefixer())
        .pipe(plugins.base64())
        .pipe(plugins.minifyCss())
        .pipe(plugins.concat('newdetail.min.css'))
        .pipe(gulp.dest('ios_dist'))
})
gulp.task('iosFontcss',function(){
    return gulp.src(['src/css/iosfont.css'])
    .pipe(plugins.concat('font.css'))
        .pipe(gulp.dest('ios_dist'))
})
gulp.task('iosMinifyimg', function (){
    return gulp.src(['src/images/imageBack@2x.png','src/images/imageBack_night@2x.png'])
        .pipe(gulp.dest('ios_dist'))
});
gulp.task('iosCommonjs',function(){
    return gulp.src(['public/js/*.js', 'src/js/app_news_detail.js'])
       .pipe(babel({presets: ["env"]}))
       .pipe(plugins.uglify())
       .pipe(plugins.concat('newdetail.min.js'))
       .pipe(gulp.dest('ios_dist'))          
})

// android打包
gulp.task('androidCommoncss',function(){
    return gulp.src(['public/css/*.css','src/css/app_news_detail.css'])
        .pipe(plugins.autoprefixer())
        .pipe(plugins.base64())
        .pipe(plugins.minifyCss())
        .pipe(plugins.concat('newdetail.min.css'))
        .pipe(gulp.dest('android_dist/css'))
})
gulp.task('androidFontcss',function(){
    return gulp.src(['src/css/androidfont.css'])
    .pipe(plugins.concat('font.css'))
        .pipe(gulp.dest('android_dist/css'))
})
gulp.task('androidMinifyimg', function (){
    return gulp.src(['src/images/default.png','src/images/default2.png'])
        .pipe(gulp.dest('android_dist/img'))
});
gulp.task('androidCommonjs',function(){
    return gulp.src(['public/js/*.js', 'src/js/app_news_detail.js'])
       .pipe(babel({presets: ["env"]}))
       .pipe(plugins.uglify())
       .pipe(plugins.concat('newdetail.min.js'))
       .pipe(gulp.dest('android_dist/js'))          
})


gulp.task('default',gulp.series(gulp.parallel('commoncss','commonjs','minifyimg','fontcss')));
gulp.task('iosDefault',gulp.series(gulp.parallel('iosCommoncss','iosFontcss','iosMinifyimg','iosCommonjs')));
gulp.task('androidDefault',gulp.series(gulp.parallel('androidCommoncss','androidFontcss','androidMinifyimg','androidCommonjs')));
