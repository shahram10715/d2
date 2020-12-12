var words;

function showanswer() {
  document.getElementById("answer").hidden = false;
}

function replaceBlank(word) {
  let l = word.length;
  let l2 = Math.ceil(l/2);
  let word2 = word.slice(0,l2);
  for (i=0; i<l-l2; i++){
    word2 += '<input type="text" maxlength="1" style="width: 10px; padding: 0; margin: 0;" onkeyup="changePosition(this)">';
  }
  return word2;
}

function readWords() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     words = this.responseText;
     words = words.split('\n')
     delete words[0]
    }
  };
  xhttp.open("GET", "src/enwiki.txt", true);
  xhttp.send();
}

function changePosition(e){
  if (e.value !== ""){
    e.nextElementSibling.focus();
  }
  else {
    e.previousElementSibling.focus();
  }
}
