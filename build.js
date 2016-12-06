// BUILT FOLLOWING TUTORIAL AT https:
// //www.neustadt.fr/essays/crafting-a-simple-blog-with-metalsmith/
// INCLUDES FOUNDATION STYLINGS

var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var handlebars = require('handlebars');
var collections = require('metalsmith-collections');
var permalinks = require('metalsmith-permalinks');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');
var dateFormatter = require('metalsmith-date-formatter');



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
        scripts: {
            pattern: 'scripts/**/*.js' //changed to js instead of .md
        },
        styles: {
            pattern: 'scripts/**/*.css' //changed to CSS -- NEEDS TESTING
        },
        images: {
            pattern: 'scripts/**/*.jpg' //changed to jpg -- NEEDS TESTING
        }
    }))
    .use(markdown())
    .use(permalinks({
        relative: false,
        pattern: ':title'
    }))

    .use(dateFormatter({

        dates: [
            {
                key: 'publishDate',
                format: 'MMMM DD, YYYY'
            },
            {
                key: 'modifiedDate',
                format: 'MMMM, YYYY'
            }
        ]

    }))

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
            "layout/**/*": "**/*"
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