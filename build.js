// BUILT FOLLOWING TUTORIAL AT https:
// //www.neustadt.fr/essays/crafting-a-simple-blog-with-metalsmith/
// INCLUDES FOUNDATION STYLINGS

var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var handlebars = require('handlebars');
var collections = require('metalsmith-collections');

var templates = require('metalsmith-templates');
var pagination = require('metalsmith-pagination');

var permalinks = require('metalsmith-permalinks');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');

metalsmith(__dirname)
  .metadata({
    site: {
      name: 'Data Viz Portfolio',
      description: "Blog portfolio highlighting data visualization and other programming work"
    }
  })
  .source('./src')
  .destination('./public')
	.use(collections({
	      articles: {
	        pattern: 'articles/**/*.md',
	        sortBy: 'date',
	        reverse: true
	        },
	      }))

    // .use(pagination({
    //     'collections.articles': {
    //         perPage: 1,
    //         first: 'index.html',
    //         path: 'page/:num/index.html',
    //         template: 'index.html'
    //     }
    // }))


    .use(pagination({
        'collections.articles': {
            perPage: 2,
            layout: 'index.html',

            // template: 'partials/index.html',
            first: 'index.html',
            path: 'page-:num.html'
            // filter: function (page) {
            //     return !page.private
            // },
            // pageMetadata: {
            //     title: 'Archive'
            // }
        }
    }))
    //
    // .use(paginate({
    //     'collections.blogposts':{
    //         perPage: 10,
    //         //template: 'test.hbt'
    //         //template: 'blog-list-pages.hbt',
    //         layout: 'blog-list-pages.hbt',
    //         first: 'blog/index.html',
    //         path: 'blog/page-:num.html'
    //         //noPageOne: true
    //         //pageMetadata: {
    //         //    title: 'Blog'
    //         //}
    //     }
    // }))

	.use(markdown())
	.use(permalinks({
	  relative: false,
		pattern: ':title'
	}))

    // .use(templates('handlebars'))


	.use(layouts({
		engine: 'handlebars',
		directory: './layouts',
		default: 'article.html',
		pattern: ["*/*/*html","*/*html","*html"],
	  partials: {
	        header: 'partials/header',
	        footer: 'partials/footer'
	        }
	}))
	.use(serve({
	  port: 3000,
	  verbose: true
	}))
	.use(watch({
	    paths: {
	      "${source}/**/*": true,
	      "layout/**/*": "**/*",
	    }
	  }))
  .build(function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('All has been compiled!');
    }
  });