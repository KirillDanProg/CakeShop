const { src, dest, watch, parallel, series } = require("gulp");

const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const uglify = require("gulp-uglify-es").default;
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const del = require("del")

function cleanDist() {
  return del("dist")
}
function styles() {
  return src("docs/scss/style.scss")
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(concat("style.min.css"))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 10 version"],
        grid: true,
      })
    )
    .pipe(dest("docs/css"))
    .pipe(browserSync.stream());
}

function scripts() {
  return src("docs/js/main.js")
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("docs/js"))
    .pipe(browserSync.stream());
}
function build() {
  return src(
    [
      "docs/css/style.min.css",
      "docs/fonts/**/*",
      "docs/js/main.min.js",
      "docs/*.html",
    ],
    { base: "docs" }
  ).pipe(dest("dist"));
}

function watching() {
  watch(["docs/scss/**/*.scss"], styles);
  watch(["docs/js/main.js"], scripts);
  watch(["docs/*.html"]).on("change", browserSync.reload);
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "docs/",
    },
  });
}

function images() {
  return src("docs/images/**/*").pipe(imagemin()).pipe(dest("dist/images"));
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, images, build);
exports.default = parallel(scripts, browsersync, watching);
