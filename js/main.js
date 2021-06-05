const btn = document.getElementById('jokeBtn');
const count = 0

sessionStorage.setItem("countStore",count);

btn.addEventListener("click", joke);


async function joke(e){
    e.preventDefault();
    const btnCount = sessionStorage.getItem("countStore");
    console.log(btnCount);
    if(btnCount == 0){
        let countIncr = count + 1;
        sessionStorage.setItem("countStore",countIncr);
        btn.innerText = 'Get Another Joke'; 
    }

    await processJokeRequest();
}


function jokeUrl(requestData){
    return `https://api.icndb.com/jokes/random?firstName=${requestData.firstName}&
    lastName=${requestData.lastName}&limitTo=${requestData.categories}`;
}

function jokeData(){
    const jokeObj = {
        firstName:'Rajesh',
        lastName:'Dai',
        categories:['nerdy']
    }

    return jokeObj;
}


async function getJoke(url){
    const response = await fetch(url);
    const jsonResponse = await response.json();
    const joke = jsonResponse.value.joke;
    return joke;



}

async function processJokeRequest(){
    const data = jokeData();
    const passUrl = jokeUrl(data);

    const jokes = await getJoke(passUrl);
    printJoke(jokes);
}

function printJoke(jokes){
    const jokeLocation = document.getElementById('myContent');
    jokeLocation.innerHTML = `<strong>${jokes}</strong>`;
}