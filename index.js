import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const jokeBlocks1 = document.querySelector("#jokeBlocks1");
const jokeBlocks2 = document.querySelector("#jokeBlocks2");
const jokeBlocks3 = document.querySelector("#jokeBlocks3");
const startGenerator = document.querySelector("#startGenerator");
const stopGenerator = document.querySelector("#stopGenerator");
const favJoke = document.querySelector("#favJoke");
const favJokeL = document.querySelector("#favJokeL");
const clearJkList = document.querySelector("#clearJkList");

const link = "https://official-joke-api.appspot.com/random_joke";

const request = async () => {
  try {
    const response = await fetch(link);
    const data = await response.json();
    getJokes(data);
  } catch (error) {
    console.error("Error fetching joke:", error);
  }
};

const getJokes = data => {
  const { setup, punchline } = data;
  jokeBlocks1.textContent = `Setup: ${setup}`;
  jokeBlocks2.textContent = `Punchline: ${punchline}`;
};

let intervalId;

startGenerator.onclick = () => {
  if (!intervalId) {
    request();
    intervalId = setInterval(request, 3000);
  }
};

stopGenerator.onclick = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

favJoke.onclick = () => {
  Toastify({
    text: "Your joke has been succesfuly added",
    duration: 3000,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      padding: "1.5rem",
      background: "linear-gradient(to right, #cb356b, #bd3f32)",
      cursor: "default",
      userSelect: "none",
      filter: "drop-shadow(0 0 0.1rem rgba(255, 255, 255, 0.4))",
    },
  }).showToast();
  const jokeKey = jokeBlocks1.textContent;
  const jokeValue = jokeBlocks2.textContent;
  if (jokeKey && jokeValue) {
    localStorage.setItem(jokeKey, jokeValue);
  }
};

clearJkList.onclick = () => {
  localStorage.clear();
  jokeBlocks3.style.display = "none";
  Toastify({
    text: "This list has been succesfuly cleared",
    duration: 3000,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      padding: "1.5rem",
      background: "linear-gradient(to right, #cb2d3e, #ef473a)",
      cursor: "default",
      userSelect: "none",
      filter: "drop-shadow(0 0 0.1rem rgba(255, 255, 255, 0.4))",
    },
  }).showToast();
};

let isStarted = false;
favJokeL.onclick = () => {
  if (!isStarted) {
    isStarted = true;
    let html = "";
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      html += `
        <li>
          ${key}<br>
          ${value}
        </li>`;
    }
    jokeBlocks3.innerHTML = html;
    jokeBlocks3.style.display = "block";
  } else {
    jokeBlocks3.style.display = "none";
    isStarted = false;
  }
};
