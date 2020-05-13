const express = require('express');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 5000;
const app = express();

//////////// GET STORYBLOK CONTENT //////////////

var StoryblokClient = require('storyblok-js-client')
// This variable will contain the information to be templated
var ben = new Object();
var ayanthi = new Object();
var amin = new Object();
var richardson = new Object();

const Storyblok = new StoryblokClient({
    accessToken: "cxBOVdDowPMBH7h41jTGuQtt"
})

Storyblok.get('cdn/stories', {
    version: 'published'
})
    .then((response) => {

        response.data.stories.forEach((story) => {
            // // The following commented code is an attempt to dynamically generate sections depending on 
            // // the amount of scheme in Storyblok. I was not able to get it to work so we have to just
            // // stick with the sections already defined in Storyblok for now.

            // // Grab the content section so we can template the relevant information
            // var content = story.content

            // // Parse the 'Define Sections' schema to grab the titles of the sections to template
            // var section_titles = story.content.define_sections.split("\n")

            // // For each section name we'll add it to the Object we defined earlier
            // section_titles.forEach((title) => {
            //     ben[`${title}`] = content[`${title}`].split("\n")
            // })

            // ben.xray = `https://s3.amazonaws.com${content.xray.slice(1)}`
            // ben.name = content.name

            // console.log(ben)

            switch (story.content.name) {
                case "Ben":
                    ben = story.content
                    break
                case "Ayanthi":
                    ayanthi = story.content
                    break
                case "Amin":
                    amin = story.content
                    break
                case "Richardson":
                    richardson = story.content
                    break
                default:
                    break
            }
        })
    })
    .catch((error) => {
        console.log(error)
    })

/////////////////////////////////////////////////

//////////// HANDLEBARS HELPERS /////////////////

// Custom function helper to create lists
Handlebars.registerHelper("list", function (context) {

    // The lists in Storyblok have bullet points starting with '--'
    if (context.includes("--")) {

        // We'll split the list by '--' to give us arrays to iterate over
        const lines = context.split("--")
        var list = "<ul class='case-content'>"

        // Iterate over the lines, sandwiching them inbetween <li> tags, then add them into the list var
        for (i in lines) {
            if (i == 0) {
                list = list + lines[i]
            } else {
                list = list + "<li>" + lines[i] + "</li>"
            }
        }
        return new Handlebars.SafeString(list + "</ul>")
    } else {
        return new Handlebars.SafeString("<p class='case-content'>" + context + "</p>")
    }

})

Handlebars.registerHelper("review", function (context) {
    // The lists in Storyblok have bullet points starting with '--'
    if (context.includes("--")) {

        // We'll split the list by '--' to give us arrays to iterate over
        const lines = context.split("--")
        var list = "<ul>"

        // Iterate over the lines, sandwiching them inbetween <li> tags, then add them into the list var
        for (i in lines) {
            if (i == 0) {
                list = list + lines[i]
            } else {
                list = list + "<li>" + lines[i] + "</li>"
            }
        }
        return new Handlebars.SafeString(list + "</ul>")

    } else {
        return new Handlebars.SafeString("<li>" + context + "</li>")
    }
})

Handlebars.registerHelper("interactionSteps", function (context) {
    return new Handlebars.SafeString("<p class='step'>" + context + "</p>")
})

/////////////////////////////////////////////////


app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render('index', {
        title: '3D Hearts Workshop'
    })
})

app.get('/index.html', (req, res) => {
    res.redirect('/')
})

app.get('/pre-workshop-module', (req, res) => {
    res.render('pre-workshop-module', {
        title: "Pre-Workshop Module"
    })
})

app.get('/:heartId-:stage?.html', (req, res) => {
    // These variables used to call the .hbs file according to the URL
    var heartId = req.params.heartId
    var stage = req.params.stage

    // pass story information into client depending on heartId
    switch (heartId) {
        // Ben
        case "17040":
            res.render(`${heartId}-${stage}`, {
                title: `${ben.name}'s Story`,
                heartId: heartId,
                preliminary_information: ben.preliminary_information.split("\n"),
                background_history: ben.background_history.split("\n"),
                on_examination: ben.on_examination.split("\n"),
                differential_diagnoses: ben.differential_diagnoses.split("\n"),
                xray: `https://s3.amazonaws.com${ben.xray.slice(1)}`,
                cardiac_explanation: ben.cardiac_explanation.split("\n"),
                explanation: ben.explanation.split("\n")
            })
            break

        // Ayanthi
        case "19401":
            break

        default:
            break
    }



})

app.get('/about', (req, res) => {
    res.render('about')
})

app.use(function (req, res) {
    res.status(404).render('404')
})

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    partialsDir: 'views/components'
}));


app.set('view engine', '.hbs')
app.set('views', 'views')


app.listen(PORT, function () {
    console.log(`Server running on port ${PORT}`)
})



