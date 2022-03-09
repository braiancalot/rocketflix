import { API_KEY, BASE_URL, IMG_URL, language } from './api.js'

const main = document.querySelector('main')
const button = document.getElementById('button')
const poster = document.getElementById('poster')
const title = document.getElementById('title')
const description = document.getElementById('description')
const rate = document.getElementById('rate')
const date = document.getElementById('date')
const  infoContainer = document.getElementById('infoContainer')
const defaultMsg = 'Ops, hoje não é dia de assistir filme. Bora codar! 🚀'

main.style.display = 'none';

function generateRandomNumber(){
    return Math.floor(Math.random() * 1000)
}

function showMovie(){
    let movieNumber = generateRandomNumber()
    let url = BASE_URL + movieNumber + '?' + API_KEY + '&' + language

    fetch(url)
        .then(response => {
            if(!response.ok){
                throw Error(response.statusText)
            }
            else{
                return response
            }
        })
        .then(response => response.json())
        .then(data => {
            main.style.display = 'flex';
            console.log(data)
            poster.src = IMG_URL + data.poster_path
            title.textContent = data.title
            description.style.display = 'block'
            description.textContent = data.overview
            infoContainer.style.display = 'flex'
            rate.textContent = `${data.vote_average} (${data.vote_count})` 
            date.textContent = data.release_date

        })
        .catch(() => {
            main.style.display = 'flex';
            poster.src = 'assets/poster.png'
            title.textContent = defaultMsg
            description.style.display = 'none'
            infoContainer.style.display = 'none'
        })
}

button.addEventListener('click', showMovie)


    