// const

const nav = document.querySelector('.nav')
const navBtn = document.querySelector('.burger-btn')
const navItems = document.querySelectorAll('.nav__item')

const navBtnBars = document.querySelector('.burger-btn__bars')
const allSection = document.querySelectorAll('.section')

// founction

//navi 
const getNavItemsAnimation  = () => {
    let delayTime = 0
    
    for (navItem of navItems) {
        navItem.classList.toggle('nav-items-animation')
        navItem.style.animationDelay = '.' + delayTime + 's'
        delayTime++
    }
}

const showNav = () => {
    nav.classList.toggle('nav--active')
    navBtnBars.classList.remove('black-bars-color')
    
    for (navItem of navItems) {
        navItem.addEventListener('click', () => {
            nav.classList.remove('nav--active')
        })
    }
    
    getNavItemsAnimation()
}

const getNaviColor = () => {
    const currentSection = window.scrollY

    allSection.forEach(section => {

        if (section.classList.contains('white-section') && section.offsetTop <= currentSection + 60) {
            navBtnBars.classList.add('black-bars-color')
            
        } else if (!section.classList.contains('white-section') && section.offsetTop <= currentSection + 60) {
            navBtnBars.classList.remove('black-bars-color')
        }
    })
}

// footer year

const getCurrentYear = () => {
    const footerYear = document.querySelector('.footer__year')
    const year = (new Date).getFullYear()

    footerYear.innerText = year
}

//weather API

const getWeather = () => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=`
    const cityName = 'Poznan'
    const APIkey = '&appid=abbbd50046acef4b449223c3bbf920c7'
    const units = '&units=metric'
    const tempSpan = document.querySelector('.animals__weather--temp')
    const feelSpan = document.querySelector('.animals__weather--feels')
    const symbolImg = document.querySelector('.animals__weather--symbol')

    fetch(URL+cityName+APIkey+units)
        .then (res => res.json())
        .then (data => {
            tempSpan.textContent = `${data.main.temp.toFixed(1)}°C`
            feelSpan.textContent = `${data.main.feels_like.toFixed(1)}C`
            
            const weatherId = Object.assign({}, ...data.weather)

            if (weatherId.id >= 200 && weatherId.id < 300) {
                symbolImg.setAttribute('src', './img/thunderstorm.png')
            } else if (weatherId.id >= 300 && weatherId.id < 400) {
                symbolImg.setAttribute('src', './img/drizzle.png')
            } else if (weatherId.id >= 500 && weatherId.id < 600) {
                symbolImg.setAttribute('src', './img/rain.png')
            } else if (weatherId.id >= 600 && weatherId.id < 700) {
                symbolImg.setAttribute('src', './img/ice.png')
            } else if (weatherId.id >= 700 && weatherId.id < 800) {
                symbolImg.setAttribute('src', './img/fog.png')
            } else if (weatherId.id === 800) {
                symbolImg.setAttribute('src', './img/sun.png')
            } else if (weatherId.id >= 800 && weatherId.id < 900) {
                symbolImg.setAttribute('src', './img/cloud.png')
            } else {
                symbolImg.setAttribute('src', './img/unknown.png')
            }
        })

        .catch (err => console.log('fatal error of weather API'))
}
// animal API

const getAnimal1 = () => {
    const URL = 'https://zoo-animal-api.herokuapp.com'
    const animalRand = '/animals/rand'
    const animalImg = document.querySelector('.animals__img--one')
    const animalTitle = document.querySelector('.animals__title--one')
    const animalDiet = document.querySelector('.animals__diet--one')
    const animalHabitat = document.querySelector('.animals__habitat--one')
    const animalSpan = document.querySelector('.animals__lifespan--one')
    
    fetch(URL+animalRand)
        .then (res => res.json())
        .then (data => {
            console.log(data);
            animalImg.setAttribute('src', `${data.image_link}`)
            animalTitle.textContent = data.name
            animalDiet.textContent = `Diet: ${data.diet.toLowerCase()}`
            animalHabitat.textContent = `Habitat: ${data.habitat.toLowerCase()}`
            animalSpan.textContent = `Lifespan: ${data.lifespan.toLowerCase()}`
        })
        .catch (err => console.log('fatal error of animal API'))

}

const getAnimal2 = () => {
    const URL = 'https://zoo-animal-api.herokuapp.com'
    const animalRand = '/animals/rand'
    const animalImg = document.querySelector('.animals__img--two')
    const animalTitle = document.querySelector('.animals__title--two')
    const animalDiet = document.querySelector('.animals__diet--two')
    const animalHabitat = document.querySelector('.animals__habitat--two')
    const animalSpan = document.querySelector('.animals__lifespan--two')
    
    fetch(URL+animalRand)
        .then (res => res.json())
        .then (data => {
            console.log(data);
            animalImg.setAttribute('src', `${data.image_link}`)
            animalTitle.textContent = data.name
            animalDiet.textContent = `Diet: ${data.diet.toLowerCase()}`
            animalHabitat.textContent = `Habitat: ${data.habitat.toLowerCase()}`
            animalSpan.textContent = `Lifespan: ${data.lifespan.toLowerCase()}`
        })
        .catch (err => console.log('fatal error of animal API2'))

}

// start founction

navBtn.addEventListener('click', showNav)
window.addEventListener('DOMContentLoaded', () => {
    getWeather()
    getAnimal1()
    getAnimal2()
    getCurrentYear()
})
window.addEventListener('scroll', getNaviColor)