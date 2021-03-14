window.addEventListener('load', getData);
window.addEventListener('load', getMotivation);

async function getData() {
    const response = await fetch(`device/device_23/temperature`);
    const json = await response.json();
    const rows = json.map(row => [new Date(row.recorded_at), row.temperature]);
    console.log(rows[0]);
    var temp = document.getElementById('temp');
    temp.innerHTML = rows[0][1]+'\u00B0F';
    //motivation
}

function getMotivation(){
    fetch('https://api.quotable.io/random')
  .then(response => response.json())
  .then(data => {
    processWords(data);
  });
  var d = new Date();
  document.getElementById("date").innerHTML = d.toDateString();
}

function processWords(data){
    var author = `-${data.author}`;
    var content = data.content;
    const re = /\b[\w']+(?:\s+[\w']+){0,2}/g;
    var wordList = content.match(re);
    wordList.push(author);
    const el = document.querySelector('.text')
    const fx = new TextScramble(el)
    
    let counter = 0
    const next = () => {
      fx.setText(wordList[counter]).then(() => {
        setTimeout(next, 1500)
      })
      counter = (counter + 1) % wordList.length
    }
    
    next()
}
setInterval(getData,600000);
setInterval(getMotivation,24*60*60000);

  


  