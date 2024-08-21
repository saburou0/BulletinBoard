// express.jsをインポート
const express = require("express");
// express.jsを変数をして使う
const app = express();
// mongoseをインポート
const mongoose = require("mongoose");
// PORT番号を指定
const port = process.env.PORT;
const Thread = require("./models/Thread");

const MONGODB_URI = process.env.DATABASE_URL;

//静的なファイルはpublicフォルダを参照
app.use(express.json());
app.use(express.static("public"));


// データベース接続
mongoose.connect(MONGODB_URI
).then(() => console.log("DataBase Running!"))
.catch((err) => console.log(err));

//Getメソッド
app.get("/api/vi/threads", async(req,res) => {
    try{
        const allThread = await Thread.find({});
        res.status(200).json(allThread);
    } catch(err){
        console.log(err);
    }
});

//Postメソッド
app.post("/api/vi/thread", async(req,res) => {
    try{
        const createThread = await Thread.create(req.body);
        res.status(200).json(createThread);
    } catch(err){
        console.log(err);
    }
});

app.listen(port, ()=>{
    console.log("Server running!");
});