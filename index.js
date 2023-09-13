import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = 3000;
const today = new Date();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// let items = [];
// let workItems = [];

// Mongoose start
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://alexdxxn:alex24607217@cluster0.lvftxui.mongodb.net/todolistDB');
    }


const month = today.toLocaleString('en-US', { month: 'long' });
const day = today.toLocaleString('en-US', { weekday: 'long' });
const dayOfMonth = today.getDate();

//Mongoose Schema
const itemsSchema = new mongoose.Schema ({
    name: String,
});

const workSchema = new mongoose.Schema ({
    name: String,
});

//Mongoose model
const Item = new mongoose.model ("Item", itemsSchema);

const Work = new mongoose.model ("Work", workSchema);

//Testing new item

// const work1 = new Work ({
//     name: "Testing work item"
// });

// try {
//     await work1.save();
//     console.log("item saved successfully")
// } catch (error) {
//     console.error("Error at saving item", error);
// }

const date = `${day}, ${month} ${dayOfMonth}`;
const emptyData = [];
const emptyWorkData = [];

app.get("/", (req, res) => {
    res.render("index.ejs");
})

//Get items

app.get("/today", async (req, res) => {
    try{
        let itemsList = await Item.find({});

        if(itemsList.length === 0){
            res.render("today.ejs", {date, emptyData});
        } else {
            // itemsList.forEach(item => {
            //     console.log(item.name);
            // });
            res.render("today.ejs", {date, itemsList});
        }
        
    } catch (err) {
        console.error("Error at finding items");
    }  
})

app.get("/work", async (req, res) => {
    try{
        let workList = await Work.find({});
        if(workList.length === 0){
            res.render("work.ejs", {date, emptyWorkData});
        } else {
            // workList.forEach(work => {
            //     console.log(work.name);
            // });
            res.render("work.ejs", {date, workList});
        }
        
    } catch (err) {
        console.error("Error at finding items");
    }  
})

//Post Items

app.post("/today", async (req, res) => {

    const item1 = new Item ({
    name: req.body.newItem
    });

    try {
        await item1.save();
        console.log("item saved successfully");
        res.redirect("/today")
    } catch (error) {
        console.error("Error at saving item", error);
    }

})


app.post("/work", async (req, res) => {

    const work1 = new Work ({
        name: req.body.newWorkItem
        });
    
        try {
            await work1.save();
            console.log("item saved successfully");
            res.redirect("/work")
        } catch (error) {
            console.error("Error at saving item", error);
        }
    
})


//Delete items

app.post("/delete", (req,res) => {
    const checkedId = req.body.itemDelete;
    Item.findOneAndDelete ({_id: checkedId})
    .then (function() {
        console.log("Item removed successfully");
        res.redirect("/today");
    })
    .catch (function (err) {
        console.log(err);
    })
       
})

app.post("/deletework", (req,res) => {
    const checkedWorkId = req.body.workDelete;
    Work.findOneAndDelete ({_id: checkedWorkId})
    .then (function() {
        console.log("Item removed successfully");
        res.redirect("/work");
    })
    .catch (function (err) {
        console.log(err);
    })
       
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });