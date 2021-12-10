let searchBtn = document.getElementById("searchBtn");
let inputField = document.getElementById("inputfield");

searchBtn.addEventListener("click", function(){
    var remObj = document.getElementById("artist");
    var childObj = remObj.lastElementChild;
    var remPct = document.getElementById("artistImg");
    var childPct = remPct.lastElementChild;
    while(childObj){
        remObj.removeChild(childObj);
        childObj = remObj.lastElementChild;
    }
    while(childPct){
        remPct.removeChild(childPct);
        childPct = remPct.lastElementChild;
    }
    
    if(inputField.value===''){
        alert("To short");
    }
    else
    {
        fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${inputField.value}&api_key=904ac7df425c8a93e205e055e69b069b&format=json`,{
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            if(inputField.value.toLowerCase() != data.toptracks.track[0].artist.name.toLowerCase() ){
                alert("Wrong input");
            }
            else{
                const html = data.toptracks.track.map(hits =>{
                    return`<div class = "artistCont" id = "artistContainer">
					<p>Title: <a href="${hits.url}">${hits.name}</a> ${hits.listeners} listeners</p>
					</div>
                    `;
                }).join("");
                document.querySelector("#artist").insertAdjacentHTML("afterbegin", html);
                document.querySelector("#artistImg").insertAdjacentHTML("afterbegin", `<h1 id = "h1Pct"><a href = "${data.toptracks.track[0].artist.url}">${data.toptracks.track[0].artist.name}</a></h1>`);
                inputField.value ='';
            }
        })
        .catch(err => {
            console.error(err);
        });
    }
})