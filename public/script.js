// data fetching
const inputTextDOM = document.getElementById("inputTitle");
const inputContentDOM = document.getElementById("inputContent");

const formDOM = document.querySelector(".form-section");
const threadSectionDOM = document.querySelector(".thread-section");
let inputText = "";
let inputcontentText = "";


//Threadの全てを読み込む
const getAllThreads = async() => {
    try{
        let allThreads = await axios.get("/api/vi/threads");
        let { data } = allThreads;

        //出力
        allThreads = data.map((thread) => {
            const { title, content} = thread;
            return `
            <div class="single-thread">
            <h3>${title}</h3>
            <p>${content}</p>
            </div>
            `;
        })
        .join("");
        threadSectionDOM.innerHTML = allThreads;
    } catch(err){
        console.log(err)
    }
};

window.onload = getAllThreads();

//Postメソッド
inputTextDOM.addEventListener("change", (e) =>{
    inputText = e.target.value;
});
inputContentDOM.addEventListener("change", (e) =>{
    inputcontentText = e.target.value;
});

formDOM.addEventListener("submit", async (e) =>{
    e.preventDefault();

    if(inputText && inputcontentText) {
        try{
            await axios.post("/api/vi/thread", {
                title: inputText,
                content: inputcontentText,
            });
            getAllThreads();
        } catch(err){
            console.log(err)
        }
    }
});