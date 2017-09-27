'use strict'
import gulp from 'gulp'
import notify from 'gulp-notify'
import watch from 'gulp-watch'
import webpack from 'webpack-stream'
import webpack2 from 'webpack'
import named from 'vinyl-named'
import eslint from 'gulp-eslint'

const sassPaths = {
  src: './src/sass/index.scss',
  dest: 'core/static/css/'
}

const jsPaths = {
  src: ['src/js/components/*.js', 'src/js/core/*.js'],
  //src: 'src/js/core/index.js',
  dest: 'core/static/js/'
}

var webpack_conf_js = {
//  entry: {
//    filename: './src/js/core/index.js'
//  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules|bower_components/,
        query: { presets: [ 'react', 'es2015', 'stage-3' ] }
      }
    ]
  },
  plugins: [],
  output: {
    filename: 'build.js'
  }
}

var webpack_conf_js_production = {
  module: {
    loaders: [
      { test: /.js?$/,
        loader: 'babel',
        exclude: /node_modules|bower_components/,
        query: { presets: [ 'es2015' ] }
      },
      { test: require.resolve('jquery'), loader: 'expose?jQuery!expose?$'}
    ]
  },
  output: {
    filename: 'build.js'
  }
}

var webpack_conf_css = {
  module: {
    loaders: [
      { test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'] },
        {
          test: /\.(jpe|jpg|gif|png|eot|woff|woff2|ttf|svg)(\?.*$|$)/,
          loader: 'url-loader'
        }
    ]
  },
  output: {
    filename: '[name].js'
  }
}

var webpack_conf_css_production = {
  module: {
    loaders: [
      { test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'] },
      {
        test: /\.(jpe|jpg|gif|png|eot|woff|woff2|ttf|svg)(\?.*$|$)/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    //new UglifyJSPlugin(),
    new webpack2.optimize.DedupePlugin()
  ],
  output: {
    filename: '[name].js'
  }
}

gulp.task('js', () => {
  return gulp.src(jsPaths.src)
        .pipe(eslint())
        .pipe(eslint.format())
        // .pipe(eslint.failAfterError())
        .pipe(webpack(webpack_conf_js))
        //.pipe(minify())
        .pipe(gulp.dest(jsPaths.dest))
        .pipe(notify('JS Compiled!'))
})

gulp.task('watch', () => {
  return watch(jsPaths.src, function(){
    gulp.src(jsPaths.src)
    // .pipe(eslint())
    // .pipe(eslint.format())
    //.pipe(eslint.failAfterError())
    .pipe(webpack(webpack_conf_js))
    //.pipe(minify())
    .pipe(gulp.dest(jsPaths.dest))
    .pipe(notify('JS Compiled!'))
  })
})

gulp.task('js-single', () => {
  return gulp.src(jsPathsSingle.src)
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError())
            .pipe(named())
            .pipe(webpack(webpack_conf_js_single))
            //.pipe(minify())
            .pipe(gulp.dest(jsPathsSingle.dest))
})

gulp.task('css', () => {
  return gulp.src(sassPaths.src)
            .pipe(named())
            .pipe(webpack(webpack_conf_css))
            // .pipe(cleanCss())
            // .pipe(minify())
            .pipe(gulp.dest(sassPaths.dest))
})

// ---------------------- Production --------------------------
gulp.task('css-minify', () => {
  return gulp.src(sassPaths.src)
            .pipe(named())
            .pipe(webpack(webpack_conf_css_production))
            .pipe(gulp.dest(sassPaths.dest))
})

gulp.task('js-minify', () => {
  return gulp.src(jsPaths.src)
        .pipe(webpack(webpack_conf_js_production))
        .pipe(gulp.dest(jsPaths.dest))
})

gulp.task('default', ['css', 'js'])

gulp.task('production', ['css-minify', 'js-minify'])
