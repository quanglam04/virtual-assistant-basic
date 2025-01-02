const APP_ID = 'cf26e7b2c25b5acd18ed5c3e836fb235';
const DEFAULT_VALUE = '--';
const searchInput = document.querySelector('#search-input');
const cityName = document.querySelector('.city-name');
const weatherState = document.querySelector('.weather-state');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');


const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');
//test

searchInput.addEventListener('change', (e) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${APP_ID}&units=metric&lang=vi`)
        .then(async res => {
            const data = await res.json();
            console.log('[Search Input]', data);
            cityName.innerHTML = data.name || DEFAULT_VALUE;
            weatherState.innerHTML = data.weather[0].description || DEFAULT_VALUE;
            weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            temperature.innerHTML = Math.round(data.main.temp) || DEFAULT_VALUE;

            sunrise.innerHTML = moment.unix(data.sys.sunrise).format('H:mm') || DEFAULT_VALUE;
            sunset.innerHTML = moment.unix(data.sys.sunset).format('H:mm') || DEFAULT_VALUE;
            humidity.innerHTML = data.main.humidity || DEFAULT_VALUE;
            windSpeed.innerHTML = (data.wind.speed * 3.6).toFixed(2) || DEFAULT_VALUE;
        });
});

/*
Một số sự kiện phổ biến trong Web Speech API:
 - onstart : khi nhận diện giọng nói bắt đầu
 - onend : khi nhận diện giọng nói kết thúc
 - onaudiostart : Khi hệ thống bắt đầu thu âm
 - onaudioend : Khi hệ thống dừng thu âm
 - onsoundstart : Khi bắt đầu phát hiện âm thanh
 - onsoundend : Khi dừng phát hiện âm thanh
 - onspeechstart : Khi bắt đầu phát hiện giọng nói
 - onspeeched : Khi dừng phát hiện giọng nói
 - onerror : Khi xảy ra lỗi trong nhận diện giọng nói

*/

// Tro ly ao
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
const recognition = new SpeechRecognition()
recognition.lang = 'vi-Vi' // Nhận diện dọng nói bằng tiếng việt
recognition.continuous = false

const microphone = document.querySelector('.microphone')
microphone.addEventListener('click', (e) => {
    e.preventDefault()
    recognition.start()
})

recognition.onspeechend = () => {
    recognition.stop()

}
recognition.onerror = (err) => {
    console.log(err)
}
recognition.onresult = (e) => {
    console.log('onresult', e)
}