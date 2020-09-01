window.addEventListener('load', () => {
    const weatherForm = document.forms.weather_form
    const messageOne = document.querySelector("#message-1")
    const messageTwo = document.querySelector("#message-2")
    weatherForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const location = weatherForm.search_input.value
        messageOne.textContent = "Loading..."
        messageTwo.textContent = ""
        fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.error
        }
        else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
    })
})

console.log("Loading")


