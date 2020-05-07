const express = require('express');
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 5000;
const app = express();

//////////// GET STORYBLOK STORIES //////////////

var StoryblokClient = require('storyblok-js-client')
var ben;

const Storyblok = new StoryblokClient({
    accessToken: "cxBOVdDowPMBH7h41jTGuQtt"
})

Storyblok.get('cdn/stories', {
        version: 'published'
    })
    .then((response) => {
        response.data.stories.forEach((story) => {
            ben = story.content
        })
    })
    .catch((error) => {
        console.log(error)
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
    var heartId = req.params.heartId
    var stage = req.params.stage

    //pass story information into client
    res.render(`${heartId}-${stage}`, {
        title: `${ben.name}'s Story`,
        prelim: ben.prelim.split("\n"),
        oe: ben.oe.split("\n"),
        xray: `https://s3.amazonaws.com${ben.xray.slice(1, ben.xray.length)}`
    })
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.use(function(req, res) {
    res.status(404).render('404')
})

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    partialsDir: 'views/components'
}));


app.set('view engine', '.hbs')
app.set('views', 'views')


app.listen(PORT, function() {
    console.log(`Server running on port ${PORT}`)
})



