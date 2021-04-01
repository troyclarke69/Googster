import React from 'react'
import '../js/clockStyles.css'

const DoomClock = () => {

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

    return (
        <div>
            <div class="clock">              
                <div class="hand hour" data-hour-hand></div>
                <div class="hand minute" data-minute-hand></div>
                <div class="hand second" data-second-hand></div>
                {/* Emmet tip: div.number.number$*12{$}*12 */}
                <div class="number number1">&bull;</div>
                <div class="number number2">&bull;</div>
                <div class="number number3">
                    <div class="flipNumber270">3</div>
                </div>
                <div class="number number4">
                    <div class="flipNumber">&bull;</div> 
                </div>
                <div class="number number5 flipNumber">
                    <div class="flipNumber">&bull;</div> 
                </div>
                <div class="number number6 flipNumber">
                    <div class="flipNumber">6</div> 
                </div>
                <div class="number number7 flipNumber">
                    <div class="flipNumber">&bull;</div> 
                </div>
                <div class="number number8 flipNumber">
                    <div class="flipNumber">&bull;</div> 
                </div>
                <div class="number number9">
                    <div class="flipNumber90">9</div>
                </div>
                <div class="number number10">&bull;</div>
                <div class="number number11">&bull;</div>
                <div class="number number12">12</div>
            </div>
            <div class="footer">
                <div id="d"></div>
            </div>
        </div>
    )
}

export default DoomClock
