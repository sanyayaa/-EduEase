async function getDictionaryWord(word){
  var result = undefined;
  await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(function(response){
        if(response.ok){
          return response.json();
        }
    })
    .then(data => result = data);
  return result;
  }
  
  export default getDictionaryWord;