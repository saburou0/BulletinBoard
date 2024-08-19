// express.jsをインポート
const express = require("express");
// express.jsを変数をして使う
const app = express();
// mongoseをインポート
const mongoose = require("mongoose");
// PORT番号を指定
const PORT = 8000;
const Thread = require("./models/Thread");

const MONGODB_URI = "mongodb+srv://akira:saburou2231@cluster0.6ax09y8.mongodb.net/threads?retryWrites=true&w=majority&appName=Cluster0"

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

app.listen(PORT, ()=>{
    console.log("Server running!");
});