const APP_ID = "cf26e7b2c25b5acd18ed5c3e836fb235";
const DEFAULT_VALUE = "--";
const searchInput = document.querySelector("#search-input");
const cityName = document.querySelector(".city-name");
const weatherState = document.querySelector(".weather-state");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const container = document.querySelector(".container");
const microphone = document.querySelector(".microphone");
const synth = window.speechSynthesis;

const sunrise = document.querySelector(".sunrise");
const sunset = document.querySelector(".sunset");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind-speed");
//test
searchInput.addEventListener("change", (e) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${APP_ID}&units=metric&lang=vi`
  ).then(async (res) => {
    const data = await res.json();
    console.log("[Search Input]", data);
    cityName.innerHTML = data.name || DEFAULT_VALUE;
    weatherState.innerHTML = data.weather[0].description || DEFAULT_VALUE;
    weatherIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    );
    temperature.innerHTML = Math.round(data.main.temp) || DEFAULT_VALUE;

    sunrise.innerHTML =
      moment.unix(data.sys.sunrise).format("H:mm") || DEFAULT_VALUE;
    sunset.innerHTML =
      moment.unix(data.sys.sunset).format("H:mm") || DEFAULT_VALUE;
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
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "vi-Vi"; // Nhận diện dọng nói bằng tiếng việt
recognition.continuous = false;
const speak = (text) => {
  if (synth.speaking) {
    console.log("Busy. Speaking...");
    return;
  }
  const ulter = new SpeechSynthesisUtterance(text);
  ulter.onend = () => {
    console.log("end");
  };
  ulter.onerror = (error) => {
    console.log("error");
  };
  synth.speak(ulter);
};

const handleVoice = (text) => {
  console.log(text);
  const handledText = text.toLowerCase();
  // thời tiết tại [thành phố]
  if (handledText.includes("thời tiết tại")) {
    const location = handledText.split("tại")[1].trim();
    console.log("location", location);
    searchInput.value = location;
    const changedEvent = new Event("change");
    searchInput.dispatchEvent(changedEvent);
    return;
  }
  // thay đổi màu nền [blue]
  if (handledText.includes("thay đổi màu nền")) {
    const color = handledText.split("màu nền")[1].trim();
    container.style.background = color;
  }

  if (handledText.includes("màu nền mặc định")) {
    container.style.background = "";
  }

  // hiển thị thời gian
  if (handledText.includes("mấy giờ")) {
    const textToSpeech = `${moment().hour()} hour ${moment().minutes()} minutes `;
    speak(textToSpeech);
    return;
  }
  speak("Please try again");
};

microphone.addEventListener("click", (e) => {
  e.preventDefault();
  recognition.start();
  microphone.classList.add("recording");
});

recognition.onspeechend = () => {
  recognition.stop();
  microphone.classList.remove("recording");
};
recognition.onerror = (err) => {
  console.log(err);
  microphone.classList.remove("recording");
};
recognition.onresult = (e) => {
  console.log("onresult", e);
  const text = e.results[0][0].transcript;
  handleVoice(text);
};

//test merge request
