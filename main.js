var words;
var sliceWords;
var nwords = 5000;

async function myGetJson(url){
  let res = await fetch(url);
  let data = await res.json();
  return data;
}

async function myGetText(url){
  let res = await fetch(url);
  let data = await res.text();
  return data;
}

async function main(){
  var wiki = await myGetText('enwiki.txt');
  console.log(wiki);
}

main();
/*
fetch('novels.txt')
.then(function(response){return response.text();})
.then(function(data){
  words = data;
  words = words.split('\n');
});

words50 = words.slice(0,50);
*/

////////////////////////////////////////////////////////////////////////////////////////////


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

function getTitle(){
  let url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&list=random&exintro=1&explaintext=1&rnnamespace=0'
  fetch(url)
    .then(function(response){return response.json();})
    .then(function(response){
      let pageId = response.query.random[0].id;
      getParaph(pageId);
    });
}

function getParaph(pageId){
  let url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&exintro=1&explaintext=1&pageids='+pageId;
  fetch(url)
    .then(function(response){return response.json();})
    .then(function(response){
      let paraph = response.query.pages[pageId].extract;
      removingWordsIndex(paraph);
    });
}

function changeNumber(){
  nwords = document.getElementById('nwords').value;
  sliceWords = words.slice(0,nwords);
}

function removingWordsIndex(paraph){
  spParaph = paraph.split(' ');
  lenParaph = spParaph.length;
  let ind = []
  l1 = spParaph.length;
  l2 = swords.length;
  for (i=0; i<l1; i++){
    for (j=0; j<l2; j++){
      //
      if (spParaph[i] == swords[j]){
        ind.push(i);
      }
    }
  }
  console.log(ind);
  return ind;
}

//getTitle();