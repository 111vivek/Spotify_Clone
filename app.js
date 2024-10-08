
let currentsong= new Audio();

function secondsToMinutesSeconds(seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;

  var formattedMinutes = String(minutes).padStart(2, '0');
  var formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return formattedMinutes + ':' + formattedSeconds;
}

// Example usage:
var totalSeconds = 125;
console.log(secondsToMinutesSeconds(totalSeconds)); // Output: "02:05"






console.log("lets write some javascript");
async function getSongs(){

    let a= await fetch("http://127.0.0.1:5500/songs/")
    let response= await a.text();
    

    let div= document.createElement("div")
    div.innerHTML= response;

    let as= div.getElementsByTagName("a")
    let songs= []

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1])
        }
        
    }
return songs
}
   const playmusic = (track)=>{
    //let audio= new Audio("/songs/"+track)
    currentsong.src= "/songs/"+track
    currentsong.play()
    play.src= "pause.svg"
    document.querySelector(".songinfo").innerHTML=track
    document.querySelector(".timeinfo" ).innerHTML="00:00/00:00"
   }
   
 async function main(){
    let songs= await getSongs()
    console.log(songs)

    let songul= document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songul.innerHTML= songul.innerHTML+ `<li>
        <div class="box">
        <div class="invert">
         <box-icon  class='solid' name='music'></box-icon>
        </div>
      <div class="info">
        <div>${song.replaceAll("%20", " "   )} </div>
        <div>Artist name</div>
      </div>
    <div class="playnow">
      <span>Play Now</span>
      <box-icon class="invert"  name='play-circle'></box-icon>
      </div>
       </div>
       </li>`;
        
    }
    // Attach an event listner to each song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",element=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })

    //Attach an event listener to play

    play.addEventListener("click",()=>{
      if(currentsong.paused){
        currentsong.play()
        play.src = "pause.svg" 
      }
      else{
        currentsong.pause()
        play.src="play.svg"
      }
    })

// listen for time update event
  currentsong.addEventListener("timeupdate",()=>{
    console.log(currentsong.currentTime,currentsong.duration);
    document.querySelector(".timeinfo").innerHTML=`${secondsToMinutesSeconds(currentsong.currentTime)}/${secondsToMinutesSeconds(currentsong.duration)}`
     document.querySelector(".circle").style.left= (currentsong.currentTime/currentsong.duration)*100+ "%";
  })

  // add event listener to seekbar
  document.querySelector(".seekbar").addEventListener("click",e=>{
    let percent= (e.offsetX/e.target.getBoundingClientRect().width)*100;
    document.querySelector(".circle").style.left= percent+"%";
    currentsong.currentTime= ((currentsong.duration)*percent)/100
  })

   
}
main()
    










