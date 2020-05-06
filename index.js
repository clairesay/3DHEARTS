const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render('index')
})

// app.engine('.hbs', exphbs({
//     defaultLayout: 'main',
//     extname: '.hbs',
//     partialsDir: 'views/components'
// }));

// app.set('view engine', '.hbs')
// app.set('views', 'views')

app.listen(PORT, function() {
    console.log(`Server running on port ${PORT}`)
})



