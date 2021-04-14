var nwords = 5000;

function showAnswer(){
  document.getElementById("answer").hidden = false;
}

function changePosition(e){
  if (e.value !== ""){
    if (e.nextElementSibling !== null){
      e.nextElementSibling.focus();
    }
  }
  else {
    e.previousElementSibling.focus();
  }
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
  res3 = res3.split(' ');
  return res3;
}

async function getWiki(){
  let url = 'enwiki.txt';
  let res1 = await fetch(url);
  let words = await res1.text();
  words = words.split('\n');
  words.shift();
  return words;
}

function removingIndex(paraph, qwords){
  let removingList = [];
  let l1 = paraph.length;
  for (i=0; i<l1; i++){
    if (qwords.includes(paraph[i])){
      removingList.push(i);
    }
  }
  return removingList;
}

function checkParaph(rlist){
  if (rlist.length < 8){
    return true;
  } else {
    return false;
  }
}

function getRandom(arr, n) {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

function replaceBlank(word){
  let l = word.length;
  let l2 = Math.ceil(word.length/2);
  let l3 = l-l2;
  let word2 = word.slice(0,l2);
  for (i=0; i<l3; i++){
    word2 += '<input type="text" maxlength="1" style="width: 10px; padding: 0; margin: 0;" onkeyup="changePosition(this)">';
  }
  return word2;
}

function makeQuestion(paraph, rlist){
  let q = paraph; // to change
  // this part of code should be changed to work in a for loop
  // just to remember when I add a for loop it goes to infinite with the loop of replaceBlank function
  q[rlist[0]] = replaceBlank(paraph[rlist[0]]);
  q[rlist[1]] = replaceBlank(paraph[rlist[1]]);
  q[rlist[2]] = replaceBlank(paraph[rlist[2]]);
  q[rlist[3]] = replaceBlank(paraph[rlist[3]]);
  q[rlist[4]] = replaceBlank(paraph[rlist[4]]);
  q[rlist[5]] = replaceBlank(paraph[rlist[5]]);
  // up to here
  return q;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function main(){
  document.getElementById("answer").hidden = true;
  let pageid = await getPageID();
  let paraph = await getParaph(pageid);
  let words = await getWiki();
  let qwords = words.slice(0, nwords);
  let rlist = removingIndex(paraph, qwords);
  while (checkParaph(rlist)){
    pageid = await getPageID();
    paraph = await getParaph(pageid);
    rlist = removingIndex(paraph, qwords);
  }
  document.getElementById('answer').innerHTML = paraph.join(' ');
  rlist = getRandom(rlist, 6);
  let q = makeQuestion(paraph, rlist);
  document.getElementById('question').innerHTML = q.join(' ');
}
