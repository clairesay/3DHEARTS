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
var lucy = new Object();

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
                case "Lucy":
                    lucy = story.content
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
        var list = "<p class='case-content'>"

        // Iterate over the lines, sandwiching them inbetween <li> tags, then add them into the list var
        for (i in lines) {
            if (i == 0) {
                list = list + lines[i]
            } else {
                list = list + "<br><span>&#8226 </span>" + lines[i]
                // list = list + "<li>" + lines[i] + "</li>"
            }
        }
        return new Handlebars.SafeString(list + "</p>")
    } else {
        return new Handlebars.SafeString("<p class='case-content'>" + context + "</p>")
    }

})

Handlebars.registerHelper("review", function (context) {
    if (context === "<<start>>" || context === "<<end>>") return

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

Handlebars.registerHelper('toLowerCase', function(str) {
    return str.toLowerCase();
})



Handlebars.registerHelper('makeModuleSlides', function(context, heading) {
    //to have dynamic sections, have ben.preInteraction and ben.postInteraction instead of passing the different sections(preliminary info, background info, oe, interaction, explanation)

    // Split the Storyblok section into an array of lines
    const lines = context.split("\n")

    // Iterate over lines
    for(i in lines) {
        // ... to check for either the start or end of the section
        if(lines[i] === "<<start>>") return new Handlebars.SafeString("<section class='content module-slide'><h1>" + heading + "</h1>")
        if(lines[i] === "<<end>>") return new Handlebars.SafeString("</section>")

        // ... to check if the line is a list of bullet points
        if(lines[i].includes("--")) {
            // We'll split the line by "--" to make an array of bullet points
            const points = lines[i].split("--")
            let list = "<p>"
            
            for (j in points) {
                if (j == 0) {
                    list = list + points[j]
                } else {
                    list = list + "<br><span>&#8226 </span>" + points[j]
                }
            }

            return new Handlebars.SafeString(list + "</ul>")

        // Otherwise, it's a straight up sentence and just return it   
        } else {
            return new Handlebars.SafeString("<p>" + lines[i] + "</p>")
        }
    }
})

Handlebars.registerHelper('nameCheck', function(caseName, nameCheck) {
    return caseName === nameCheck
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

app.get('/:heartId-:stage.html', (req, res) => {
    // These variables used to call the .hbs file according to the URL
    var heartId = req.params.heartId
    var stage = req.params.stage

    // pass story information into client depending on heartId
    switch (heartId) {

        // Ben
        case "17040":
            console.log(heartId)
            res.render(`${stage}`, {
                title: `Ben, a 3-month old boy`,
                name: ben.name,
                heartId: heartId,
                preliminary_information: ben.preliminary_information.split("\n"),
                background_history: ben.background_history.split("\n"),
                on_examination: ben.on_examination.split("\n"),
                differential_diagnoses: ben.differential_diagnoses.split("\n"),
                xray: `https://s3.amazonaws.com${ben.xray.slice(1)}`,
                model: `https://s3.amazonaws.com${ben.model.slice(1)}`,
                cardiac_explanation: ben.cardiac_explanation.split("\n"),
                explanation: ben.explanation.split("\n")
            })
            break

        // Ayanthi
        case "19401":
            console.log(heartId)
            res.render(`${stage}`, {
                title: `Ayanthi, a 1-month old girl`,
                name: ayanthi.name,
                heartId: heartId,
                preliminary_information: ayanthi.preliminary_information.split("\n"),
                background_history: ayanthi.background_history.split("\n"),
                on_examination: ayanthi.on_examination.split("\n"),
                differential_diagnoses: ayanthi.differential_diagnoses.split("\n"),
                xray: `https://s3.amazonaws.com${ayanthi.xray.slice(1)}`,
                model: `https://s3.amazonaws.com${ayanthi.model.slice(1)}`,
                cardiac_explanation: ayanthi.cardiac_explanation.split("\n"),
                explanation: ayanthi.explanation.split("\n")
            })
            break

        // Amin
        case "16751":
            console.log(heartId)
            res.render(`${stage}`, {
                title: `Amin, a 6-month old boy`,
                name: amin.name,
                heartId: heartId,
                preliminary_information: amin.preliminary_information.split("\n"),
                background_history: amin.background_history.split("\n"),
                on_examination: amin.on_examination.split("\n"),
                differential_diagnoses: amin.differential_diagnoses.split("\n"),
                xray: `https://s3.amazonaws.com${amin.xray.slice(1)}`,
                model: `https://s3.amazonaws.com${amin.model.slice(1)}`,
                cardiac_explanation: amin.cardiac_explanation.split("\n"),
                explanation: amin.explanation.split("\n")
            })
            break

        // Lucy
        case "19863":
            console.log(heartId)
            res.render(`${stage}`, {
                title: `Lucy, a 7 day old neonate`,
                name: lucy.name,
                heartId: heartId,
                preliminary_information: lucy.preliminary_information.split("\n"),
                background_history: lucy.background_history.split("\n"),
                on_examination: lucy.on_examination.split("\n"),
                progress: lucy.progress.split("\n"),
                differential_diagnoses: lucy.differential_diagnoses.split("\n"),
                xray: `https://s3.amazonaws.com${lucy.xray.slice(1)}`,
                model: `https://s3.amazonaws.com${lucy.model.slice(1)}`,
                cardiac_explanation: lucy.cardiac_explanation.split("\n"),
                explanation: lucy.explanation.split("\n")
            })
            break

        default:
            break
    }
})

app.get

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



