let selectArea = document.querySelector("#select_area");

// Get selected area code
selectArea.addEventListener("change", async (e) => {
  let selectedAreaCode = e.target.value;
  await checkWeather(selectedAreaCode); // 選択された地域コードを引数として渡す
});
// 気象庁apiURL
const defaultWeather = async () => {
  try {
    let url = `https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json`;
    const response = await fetch(url);
    let data = await response.json();
    const areaName = data[0].timeSeries[0].areas[0].area.name;
    let weatherIcon = document.querySelector(".weather-icon");
    const weather = data[0].timeSeries[0].areas[0].weathers[2].replace(
      /\s+/g,
      ""
    );
    if (weather === "くもり時々晴れ") {
      weatherIcon.src = "./images/001lighticons-08.svg";
    } else if (weather === "晴れ") {
      weatherIcon.src = "./images/001lighticons-01.svg";
    } else if (weather === "くもり一時雨" || weather === "くもり後一時雨") {
      weatherIcon.src = "./images/001lighticons-20.svg";
    } else if (weather === "くもり") {
      weatherIcon.src = "./images/001lighticons-14.svg";
    } else {
      weatherIcon.src = "./images/001lighticons-01.svg";
    }

    document.querySelector(".city").textContent = areaName;
    document.querySelector(".weather").textContent = weather;
  } catch (error) {
    console.log(error);
  }
};
defaultWeather();
// Get weather date json function
const checkWeather = async (area = "130000", areaName) => {
  try {
    let url = `https://www.jma.go.jp/bosai/forecast/data/forecast/${area}.json`;
    const response = await fetch(url);
    let data = await response.json();
    let weatherIcon = document.querySelector(".weather-icon");
    console.log(data);
    let selectedAreaIndex =
      document.querySelector("#select_area").selectedIndex;
    // 今日の天気情報
    // const areaName = data[0].timeSeries[0].areas[0].area.name;
    const areaName =
      document.querySelector("#select_area")[selectedAreaIndex].text;
    const weather = data[0].timeSeries[0].areas[0].weathers[2].replace(
      /\s+/g,
      ""
    );
    if (weather === "くもり時々晴れ") {
      weatherIcon.src = "./images/001lighticons-08.svg";
    } else if (weather === "晴れ") {
      weatherIcon.src = "./images/001lighticons-01.svg";
    } else if (weather === "くもり一時雨" || weather === "くもり後一時雨") {
      weatherIcon.src = "./images/001lighticons-20.svg";
    } else if (weather === "くもり") {
      weatherIcon.src = "./images/001lighticons-14.svg";
    }

    console.log(areaName);
    // UIに表示する部分
    document.querySelector(".city").textContent = areaName;
    document.querySelector(".weather").textContent = weather;
  } catch (error) {
    console.log(error);
  }
};
