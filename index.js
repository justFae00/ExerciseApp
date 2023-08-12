const typeSelector = document.getElementById("type-selector");
const muscleContainer = document.getElementById("muscle-container");
const result = document.getElementById("result");
const manual = document.getElementById("manual");
const exitManual = document.getElementById("exit-manual");
const question = document.getElementById("question-container");
const difficultyInput = document.getElementById("difficulty-input");

let exerciseType = "";
let exerciseMuscle = "";
let exerciseDifficulty = "";
let exerciseCount = "";

exitManual.addEventListener("click", function () {
  manual.style.visibility = "hidden";
});

question.addEventListener("click", function () {
  manual.style.visibility = "visible";
});

const options = {
  method: "GET",
  headers: {
    "X-Api-Key": "xvIWsqAy/lFB7xK4jWzaew==9STiGLqII3easjax",
  },
};

async function getAPI() {
  fetch(
    "https://api.api-ninjas.com/v1/exercises?" +
      `&type=${exerciseType}` +
      `&muscle=${exerciseMuscle}` +
      `&difficulty=${exerciseDifficulty}` +
      `&offset=${exerciseCount}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.length > 0) {
        showData(data);
      } else {
        result.innerHTML = "No result available :(";
      }
    })
    .catch((err) => {
      console.error(err);
      result.innerHTML = "No result available :(";
    });
}

difficultyInput.addEventListener("change", function () {
  if (difficultyInput.value < 1) {
    exerciseDifficulty = "beginner";
  } else if (difficultyInput.value > 2) {
    exerciseDifficulty = "expert";
  } else {
    exerciseDifficulty = "intermediate";
  }
  result.innerHTML = "Please wait...";
  getAPI();
});

typeSelector.addEventListener("change", (e) => {
  if (e.target.value !== "default") {
    exerciseType = e.target.value;
    result.innerHTML = "Please wait...";
    getAPI();
  }
});

muscleContainer.addEventListener("click", (e) => {
  if (e.target.id !== "main-muscle") {
    exerciseMuscle = e.target.id;
    result.innerHTML = "Please wait...";
    getAPI();
  }
});

function showData(data) {
  let tempStr = "";
  for (let index = 0; index < data.length; index++) {
    tempStr +=
      "▶ <span style='text-decoration: underline;'>" +
      data[index].name +
      "</span>: <br>" +
      "muscle: " +
      data[index].muscle +
      "<br>" +
      "type: " +
      data[index].type +
      "<br>" +
      "difficulty: " +
      data[index].difficulty +
      "<br>" +
      "equipment: " +
      data[index].equipment +
      "<br>" +
      "instruction: " +
      data[index].instructions +
      "<br><br>";
  }
  result.innerHTML = tempStr;
}

getAPI();
