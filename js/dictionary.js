import getDictionaryWord from "../BackEnd/getDictionaryWord.js";
var searchButton = document.querySelector('.search-btn');
var searchInput = document.querySelector('.search-input');
var middleSection = document.querySelector('.middle');
var lastSearchTerm = "";

function preformSearch(){
    var searchTerm = searchInput.value;
    searchInput.value = '';
    searchInput.blur();
    searchTerm = searchTerm.replace(/\s/g, '');
    if (searchTerm === "" || searchTerm === lastSearchTerm){
        return;
    }
    lastSearchTerm = searchTerm;
    // if the word is not empty, make the request
    getDictionaryWord(searchTerm).then(function(data){
        var responses = document.querySelectorAll('.toBeRemoved');
        for (var i = 0; i < responses.length; i++){
            responses[i].remove();
        }
        if (data === undefined){
            createResponseCard("Sorry", "No results where found :/", "");
            return;
        }
        for (var i = 0; i < data.length; i++){
            var result = data[i];
            var phonetic = result.phonetic ? result.phonetic : "";
            var title = phonetic==="" ? result.word :result.word + " (" + phonetic + ")";
            for(var j = 0; j < result.meanings.length; j++){
                var definition = result.meanings[j].definitions[0];
                var partOfSpeech = result.meanings[j].partOfSpeech;
                partOfSpeech = partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.slice(1);
                var example = definition.example ? definition.example : "";
                var description = partOfSpeech +": "+definition.definition;
                createResponseCard(title, description, example);
            }
        }
             
    }).catch(function(err){
        console.log(err);
        createResponseCard("Sorry","an unexcpected error occured", "");
    });
}
searchInput.addEventListener("keydown", (e) => {
    // if the user presses enter, perform the search
    if(e.keyCode == 13 ){
        e.preventDefault();
        preformSearch();
    }
});
searchButton.addEventListener('click', () => preformSearch());

function createResponseCard(title, description, example){
    var response = document.createElement('div');
    response.classList.add('response');
    response.classList.add('toBeRemoved');
    middleSection.appendChild(response);
    if(example !== ""){example = "Example: " + example};

    response.innerHTML = `
        <div class="response-title">${title}</div>
        <div class="response-body">${description}<br /><br />${example}</div>
    `;
    var spaceBox = document.createElement("div");
    spaceBox.classList.add("space-box");
    spaceBox.classList.add("toBeRemoved");
    middleSection.appendChild(spaceBox);
}