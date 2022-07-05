// Fetching data to update the quote after loading page or pressing refresh button.
const quoteText = document.querySelector(".header__quote__text")
const authorName = document.querySelector(".header__quote__author")
const refreshButton = document.querySelector(".header__button")
const quoteBox = document.querySelector(".header")

    const loadQuote = async function(randomNumber) {
        const response = await fetch("https://programming-quotes-api.herokuapp.com/Quotes?count=0")
        const data = await response.json()
        quoteText.textContent = data[randomNumber].en;
        authorName.textContent = data[randomNumber].author;
    }

    const updateQuote = () => {
        let randomNumber = Math.floor(Math.random() * (500 - 1 + 1)) + 1
        loadQuote(randomNumber);   
    }

document.addEventListener("DOMContentLoaded", updateQuote, false)
refreshButton.addEventListener("click", updateQuote)

// When loading the page the clock will be updated.
const time = document.querySelector(".time__display__numeric")
const timeZone = document.querySelector(".time__display__zone")
const timeLocation = document.querySelector(".time__location__city")

const greetingSymbol = document.querySelector(".time__symbol");
const greetingText = document.querySelector(".time__status__message__msg");

const timezoneData = document.querySelector(".timezone__data")
const dayData = document.querySelector(".day__data")
const weekData = document.querySelector(".week__data")
const calenderWeekData = document.querySelector(".calendar-week__data")

    const updateTime = async function(){
        // Get IP address to get the correct location.
        const responseIP = await fetch("https://api64.ipify.org/?format=json");
        const dataIP = await responseIP.json()
        const ipAddress = dataIP.ip

        // Get location with IP address to get timezone, city and country.
        const responseLocation = await fetch(`https://api.ipbase.com/v2/info?apikey=MlbHNIvaoHTtJsW25uGXnWe3ixUbSOacn9QS55Om&ip=${ipAddress}`)
        const dataLocation = await responseLocation.json();
        const timezone = dataLocation.data.timezone.id;
        const timeCity = dataLocation.data.location.city.name;
        const timeCountry = dataLocation.data.location.country.alpha2
        
        // Get correct time to display.
        const responseTime = await fetch(`http://worldtimeapi.org/api/timezone/${timezone}`);
        const dataTime = await responseTime.json();

        // Display time.
        const hours = dataTime.datetime.substring(11,13)
        const minutes = dataTime.datetime.substring(14, 16)
        time.textContent = `${hours}:${minutes}`
        timeZone.textContent = dataTime.abbreviation;
        timeLocation.textContent = `${timeCity}, ${timeCountry}`; 

        // Display greeting.
        updateGreeting(parseInt(hours))

        // Display time details.
        timezoneData.textContent = timezone;
        dayData.textContent = dataTime.day_of_year
        weekData.textContent = dataTime.day_of_week
        calenderWeekData.textContent = dataTime.week_number
    }

    const updateGreeting = hours => {
        if(hours >= 5 && hours <= 12){
            greetingText.textContent = "Good morning";
            greetingSymbol.setAttribute("src", "/dist/assets/desktop/icon-sun.svg")
            document.querySelector("body").setAttribute("theme", "day")
            return
        }
        if(hours > 12 && hours <= 18){
            greetingText.textContent = "Good afternoon";
            greetingSymbol.setAttribute("src", "/dist/assets/desktop/icon-sun.svg")
            document.querySelector("body").setAttribute("theme", "day")
            return
        }
        greetingText.textContent = "Good evening";
        greetingSymbol.setAttribute("src", "/dist/assets/desktop/icon-moon.svg")
        document.querySelector("body").setAttribute("theme", "night")
    }

document.addEventListener("DOMContentLoaded", updateTime, false)

// When clicking the More button the footer appears.
const moreButton = document.querySelector(".more__button")
const moreButtonArrow = document.querySelector(".more__button__arrow img")
const moreButtonText = document.querySelector(".more__button p");
const footer = document.querySelector("footer")

    const slide = () => {
        footer.classList.toggle("hide");
        if(moreButtonArrow.getAttribute("src") === "/dist/assets/desktop/icon-arrow-down.svg"){
            moreButtonArrow.setAttribute("src", "/dist/assets/desktop/icon-arrow-up.svg");
            moreButtonText.textContent = "less";
            return;
        }
            moreButtonArrow.setAttribute("src", "/dist/assets/desktop/icon-arrow-down.svg");
            moreButtonText.textContent = "more";
    }

    const hideQuote = () => {
        quoteBox.classList.toggle("hide")
    }

moreButton.addEventListener("click", () => {
    if(window.innerWidth < 768){
        slide();
        return;
    }
    slide();
    hideQuote();
})
