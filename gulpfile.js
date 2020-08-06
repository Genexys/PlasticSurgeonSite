var gulp = require("gulp"),
	sass = require("gulp-sass"),
	browserSync = require("browser-sync"),
	concat = require("gulp-concat"),
	uglify = require("gulp-uglify-es").default,
	cleancss = require("gulp-clean-css"),
	rsync = require("gulp-rsync"),
	newer = require("gulp-newer"),
	rigger = require("gulp-rigger"),
	rename = require("gulp-rename"),
	responsive = require("gulp-responsive"),
	autoprefixer = require("gulp-autoprefixer"),
	pug = require("gulp-pug"),
	pugbem = require('gulp-pugbem'),
	sourcemaps = require("gulp-sourcemaps"),
	imagemin = require("gulp-imagemin"),
	pngquant = require("imagemin-pngquant"),
	svgSprite = require("gulp-svg-sprite"),
	svgmin = require("gulp-svgmin"),
	cheerio = require("gulp-cheerio"),
	replace = require("gulp-replace"),
	svgSymbols = require("gulp-svg-symbols"),
	ttf2woff2 = require("gulp-ttf2woff2"),
	postcss = require("gulp-postcss"),
	sorting = require("postcss-sorting"),
	del = require("del")

var path = {
	build: {
		html: "build/",
		js: "build/js/",
		css: "build/css/",
		img: "build/img/",
		fonts: "build/fonts/"
	},
	src: {
		html: "app/*.pug",
		js: "app/js/app.js",
		style: "app/style/app.scss",
		img: "app/img/**/*.*",
		sprite: "app/img/sprite/*.svg",
		fonts: "app/fonts/**/*.*"
	},
	watch: {
		html: "app/**/*.pug",
		js: "app/js/**/*.js",
		style: "app/style/**/*.scss",
		img: "app/img/**/*.*",
		fonts: "app/fonts/**/*.*"
	},
	clean: "./build"
}

var config = {
	server: {
		baseDir: "./build"
	},
	tunnel: false,
	host: "localhost",
	port: 9000,
	open: "external",
	logPrefix: "genexys"
}

// Local Server
gulp.task("browser-sync", function () {
	browserSync(config)
})

function bsReload(done) {
	browserSync.reload()
	done()
}

// pug
gulp.task("html", function () {
	return gulp
		.src(path.src.html)
		.pipe(
			pug({
				pretty: true,
				plugins: [pugbem]
			})
		)
		.pipe(gulp.dest(path.build.html))
		.pipe(
			browserSync.reload({
				stream: true
			})
		)
})

// Scripts & JS Libraries
gulp.task("scripts", function () {
	return (
		gulp
		.src(path.src.js)
		.pipe(rigger())
		.pipe(sourcemaps.init())
		// .pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.js))
		.pipe(
			browserSync.reload({
				stream: true
			})
		)
	)
})

// Custom Styles
gulp.task("styles", function () {
	return gulp
		.src(path.src.style)
		.pipe(sourcemaps.init())
		.pipe(
			sass({
				outputStyle: "expanded"
			})
		)
		.pipe(
			autoprefixer({
				grid: true,
				overrideBrowserslist: ["last 10 versions"]
			})
		)
		.pipe(
			cleancss({
				level: {
					1: {
						specialComments: 0
					}
				}
			})
		) // Optional. Comment out when debugging
		.pipe(
			postcss([
				sorting({
					"properties-order": [
						"content",
						"position",
						"top",

					]
				})
			])
		)
		.pipe(concat("styles.min.css"))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.css))
		.pipe(
			browserSync.stream({
				stream: true
			})
		)
})

// Fonts
// gulp.task("fonts", function () {
//   return gulp.src(path.src.fonts).pipe(gulp.dest(path.build.fonts));
// });

gulp.task("fonts", function () {
	return gulp
		.src(path.src.fonts)
		.pipe(ttf2woff2())
		.pipe(gulp.dest(path.build.fonts))
})

// Responsive Images
gulp.task("img-responsive", async function () {
	return gulp
		.src(["app/img/**/*.{png,jpg,jpeg,webp,raw}", "!app/img/icons"])
		.pipe(newer("app/img/@1x"))
		.pipe(
			responsive({
				"*": [{
						// Produce @2x images
						width: "100%",
						quality: 80,
						rename: {
							prefix: "@2x/"
						}
					},
					{
						// Produce @1x images
						width: "50%",
						quality: 80,
						rename: {
							prefix: "@1x/"
						}
					}
				]
			})
		)
		.on("error", function () {
			console.log("No matching images found")
		})
		.pipe(
			rename(function (path) {
				path.extname = path.extname.replace("jpeg", "jpg")
			})
		)
		.pipe(gulp.dest(path.build.img))
})

// Clean @*x IMG's
gulp.task("cleanimg", function () {
	return del(path.clean, {
		force: true
	})
})

gulp.task("img-min", function () {
	return gulp
		.src(path.src.img)
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [{
					removeViewBox: false
				}],
				use: [pngquant()],
				interlaced: true
			})
		)
		.pipe(gulp.dest(path.build.img))
})

gulp.task("svgSprite", function () {
	return gulp
		.src(path.src.sprite)
		.pipe(
			svgmin({
				js2svg: {
					pretty: true
				}
			})
		)
		.pipe(
			cheerio({
				run: function ($) {
					$("[fill]").removeAttr("fill")
					$("[style]").removeAttr("style")
					$("[stroke]").removeAttr("stroke")
				},
				parserOptions: {
					xmlMode: true
				}
			})
		)
		.pipe(replace("&gt;", ">"))
		.pipe(
			svgSprite({
				mode: {
					stack: {
						sprite: "../sprite.svg" //sprite file name
					}
				},
				symbol: true
			})
		)
		.pipe(gulp.dest(path.build.img))
})

gulp.task("img", gulp.series("img-responsive", "img-min", "svgSprite", bsReload))

// Code & Reload
gulp.task("code", function () {
	return gulp.src("app/**/*.pug").pipe(
		browserSync.reload({
			stream: true
		})
	)
})

// Deploy
gulp.task("rsync", function () {
	return gulp.src("app/").pipe(
		rsync({
			root: "app/",
			hostname: "username@yousite.com",
			destination: "yousite/public_html/",
			// include: ['*.htaccess'], // Included files
			exclude: ["**/Thumbs.db", "**/*.DS_Store"], // Excluded files
			recursive: true,
			archive: true,
			silent: false,
			compress: true
		})
	)
})

gulp.task("watch", function () {
	gulp.watch(path.watch.html, gulp.parallel("html"))
	gulp.watch(path.watch.style, gulp.parallel("styles"))
	gulp.watch(path.watch.js, gulp.parallel("scripts"))
	gulp.watch(path.watch.fonts, gulp.parallel("fonts"))
	gulp.watch("app/*.pug", gulp.parallel("code"))
	gulp.watch(path.watch.img, gulp.parallel("img"))
})

gulp.task(
	"default",
	gulp.parallel("img", "html", "styles", "scripts", "fonts", "browser-sync", "watch")
)