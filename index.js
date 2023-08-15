import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const today = new Date();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let items = [];
let workItems = [];

const month = today.toLocaleString('en-US', { month: 'long' });
const day = today.toLocaleString('en-US', { weekday: 'long' });
const dayOfMonth = today.getDate();

const date = `${day}, ${month} ${dayOfMonth}`;

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("/today", (req, res) => {
    res.render("today.ejs", {date, items});
})

app.get("/work", (req, res) => {
    res.render("work.ejs", {date, workItems});
})

app.post("/today", (req, res) => {
    let newItem = req.body.newItem;
    items.push(newItem);
    res.render("today.ejs", {date, items});
})

app.post("/work", (req, res) => {
    let newWorkItem = req.body.newWorkItem;
    workItems.push(newWorkItem);
    res.render("work.ejs", {date, workItems});
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });