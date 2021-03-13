var words;
//var title2;

function showAnswer(){
  document.getElementById("answer").hidden = false;
}

function changePosition(e){
  if (e.value !== ""){
    e.nextElementSibling.focus();
  }
  else {
    e.previousElementSibling.focus();
  }
}

function replaceBlank(word){
  let l = word.length;
  let l2 = Math.ceil(word.length/2);
  let word2 = word.slice(0,l2);
  for (i=0; i<l-l2; i++){
    word2 += '<input type="text" maxlength="1" style="width: 10px; padding: 0; margin: 0;" onkeyup="changePosition(this)">';
  }
  return word2;
}

function readWords(){
  fetch('enwiki.txt')
    .then(function(response){return response.text();})
    .then(function(data){
      words = data;
      words = words.split('\n');
      words.shift()
      document.getElementById('answer').innerHTML = replaceBlank(words[20]);
    });
}

function getTitle(){
  var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&list=random&exintro=1&explaintext=1&rnnamespace=0";
  //let title2;

  fetch(url)
    .then(function(response){
      return response.json();
    })
    .then(function(response){
      return (response.query.random[0].title);
      //console.log(title2);
      //document.getElementById("answer").innerHTML = title2;
    })
  //return title2;
}

console.log("ehlllllo");
