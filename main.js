var nwords = 5000;

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

function changeNumber(){
  nwords = document.getElementById('nwords').value;
  sliceWords = words.slice(0,nwords);
}

async function getPageID(){
  let url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&list=random&exintro=1&explaintext=1&rnnamespace=0';
  let res1 = await fetch(url);
  let res2 = await res1.json();
  let res3 = await res2.query.random[0].id;
  return res3;
}

async function getParaph(pageId){
  let url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&exintro=1&explaintext=1&pageids='+pageId;
  let res1 = await fetch(url);
  let res2 = await res1.json();
  let res3 = await res2.query.pages[pageId].extract;
  return res3;
}

async function getWiki(){
  let url = 'enwiki.txt';
  let res1 = await fetch(url);
  let words = await res1.text();
  words = words.split('\n');
  words.shift();
  return words
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function main(){
  let pageid = await getPageID();
  //console.log(pageid);
  let paraph = await getParaph(pageid);
  //console.log(paraph);
  let words = await getWiki();
  console.log(words[5]);
}

main();
