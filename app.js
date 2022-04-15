const express = require('express');
const { render } = require('express/lib/response');
const mongoose = require('mongoose');

const blogRoutes = require('./Routes/blogRoutes');
const app = express();


//Connect to MobgoDB
const dbURI = "mongodb+srv://Raja:rajazain786@cluster0.infmx.mongodb.net/note-tuts?retryWrites=true&w=majority"
mongoose.connect(dbURI, { useNewUrlParser: true, UseUnifiedTopology: true })
    .then((result) => app.listen(3000, () => {
        console.log(`Server is Listening on port 3000`);
    }))
    .catch((err) => console.log(err));

//Register view engine
app.set('view engine', 'ejs');

//middleware & static Files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

//just to see the db is saving the results
//mongoose & mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'New Blog 3',
        snippet: 'About My new Blog',
        body: 'More about my new blog'
    });

    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/single-blog', (req, res) => {
    Blog.findById('624329ca25ec4b30c5238491')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
})


//routes
app.get('/', (req, res) => {
    res.redirect('/blogs')
});

app.get('/about', (req, res) => {
    res.render('about',{title: 'About'});
});

//blog Routes (middleware)
app.use( '/blogs',blogRoutes);

app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});

