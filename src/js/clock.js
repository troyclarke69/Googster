setInterval(setClock, 1000)
var counter = 0

const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')

function setClock() {
    counter++
    const currentDate = new Date()
    const secondsRatio = currentDate.getSeconds() / 60
    const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12
    setRotationSeconds(secondHand, secondsRatio, counter)
    setRotation(minuteHand, minutesRatio)
    setRotation(hourHand, hoursRatio)
}

function setRotation(element, rotationRatio) {
    element.style.setProperty('--rotation', rotationRatio * 360)
}

function setRotationSeconds(element, rotationRatio, counter) {
    element.style.setProperty('--rotation', rotationRatio * 360)
    document.getElementById('d').innerHTML = ''

    if (counter % 22 == 0) {
        document.getElementById('d').innerHTML = "Another death"
        counter = 0
    }
}

setClock()