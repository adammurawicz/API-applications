const city_input = document.querySelector('.bottom-query__input')
const colorBtn = document.querySelector('.top__btn--first')
const resetColorBtn = document.querySelector('.top___btn--second')
const checkBtn = document.querySelector('.bottom-query__button')
const root = document.documentElement

const letColor = () => {
    const r1 = Math.ceil(Math.random()*255)
    const r2 = Math.ceil(Math.random()*255)
    const r3 = Math.ceil(Math.random()*255)
    const r4 = Math.ceil(Math.random()*255)
    const g1 = Math.ceil(Math.random()*255)
    const g2 = Math.ceil(Math.random()*255)
    const g3 = Math.ceil(Math.random()*255)
    const g4 = Math.ceil(Math.random()*255)
    const b1 = Math.ceil(Math.random()*255)
    const b2 = Math.ceil(Math.random()*255)
    const b3 = Math.ceil(Math.random()*255)
    const b4 = Math.ceil(Math.random()*255)
    
    root.style.setProperty(`--first`, `rgb(${r1}, ${g1}, ${b1}`)
    root.style.setProperty(`--second`, `rgb(${r2}, ${g2}, ${b2}`)
    root.style.setProperty(`--third`, `rgb(${r3}, ${g3}, ${b3}`)
    root.style.setProperty(`--fourth`, `rgb(${r4}, ${g4}, ${b4}`)
}

const resetColor = () => {
    root.style.setProperty(`--first`, `rgb(13, 13, 13`)
    root.style.setProperty(`--second`, `rgb(135, 135, 135`)
    root.style.setProperty(`--third`, `rgb(202, 202, 202`)
    root.style.setProperty(`--fourth`, `rgb(247, 247, 247`)
}

const getWeather = () => {
    const main = document.querySelector('.data-main')
    const temp = document.querySelector('.data-temp')
    const feels = document.querySelector('.data-feels')
    const press = document.querySelector('.data-press')
    const hum = document.querySelector('.data-hum')
    const wind = document.querySelector('.data-wind')
    
    let id 
    const city_link = city_input.value || 'Poznań'
    const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
    const API_KEY = '&appid=abbbd50046acef4b449223c3bbf920c7'
    const UNITS = '&units=metric'
    const URL = API_LINK + city_link + API_KEY + UNITS
    
    const top = document.querySelector('.top')
    const citySpan = document.querySelector('.bottom-answer__heading--city')
    const dateSpan = document.querySelector('.bottom-answer__heading--date')
    const error = document.querySelector('.bottom-query__error')
    citySpan.textContent = `${city_input.value}` || 'Poznań'
    dateSpan.textContent = new Date().toLocaleDateString('eng')

    fetch(URL)
    .then (res => res.json())
    .then (data => {
        main.textContent = `${data.weather[0].description}`
        temp.textContent = `${data.main.temp.toFixed(1)} °C`
        feels.textContent = `${data.main.feels_like.toFixed(1)}  °C`
        press.textContent = `${data.main.pressure.toFixed(1)} hPa`
        hum.textContent = `${data.main.humidity.toFixed(1)} %`
        wind.textContent = `${data.wind.speed.toFixed(1)} m/s`
        error.textContent = ''
        id = data.weather[0].id
        
        if(id >= 200 && id < 300) {
            top.style.backgroundImage = 'url(./img/strom.jpg)'
        } else if (id >= 300 && id < 400) {
           top.style.backgroundImage = 'url(./img/drizzle.jpg)' 
        } else if (id >= 500 && id < 600) {
            top.style.backgroundImage = 'url(./img/rain.jpg)'
        } else if (id >= 600 && id < 700) {
            top.style.backgroundImage = 'url(./img/snow.jpg)'
        } else if (id >= 700 && id < 800) {
            top.style.backgroundImage = 'url(./img/fog.jpg)'
        } else if (id === 800) {
            top.style.backgroundImage = 'url(./img/sun.jpg)'
        } else if (id > 800 && id < 900) {
            top.style.backgroundImage = 'url(./img/cloud.jpg)'
        } else {
            top.style.backgroundImage = 'url(./img/error.jpg)'
        }

    })
        .catch (err => {
            console.log('Fatal Error of API')
            error.textContent = 'Fatal error of API, or wrong city name'
            citySpan.textContent = 'Wrong city name'
            top.style.backgroundImage = 'url(./img/error.png)'
            main.textContent = `?`
            temp.textContent = `?`
            feels.textContent = `?`
            press.textContent = `?`
            hum.textContent = `?`
            wind.textContent = `?`
})
}

const pushEnter = (e) => {
    if(e.key === 'Enter') {
        getWeather()
    }
}

colorBtn.addEventListener('click', letColor)
resetColorBtn.addEventListener('click', resetColor)
checkBtn.addEventListener('click', getWeather)
city_input.addEventListener('keyup', pushEnter)

