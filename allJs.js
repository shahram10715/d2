var words;

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
      alert(words[1]);
    });
}

function testFunc(){
  let url = "https://en.wikipedia.org/w/api.php";
  let params = {
    action: "query",
    format: "json",
    list: "random",
    rnlimit: "5"
  };
  url = url + "?origin=*";
  Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

  fetch(url)
    .then(function(response){return response.json();})
    .then(function(response) {
        var randoms = response.query.random;
        for (var r in randoms) {
            alert(randoms[r].title);
        }
    })
}
