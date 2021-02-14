const initialSetup = () => {
  console.log("out");
  document.querySelector("#generate").addEventListener("click", async () => {
    console.log("postData1");
    const zipCode = document.querySelector("#zip").value;
    const feelings = document.querySelector("#feelings").value;
    try {
      const apiResponse = await getWeatherData(parseInt(zipCode));
      let data = apiResponse;
      data["feelings"] = feelings;
      await postData("/addNew", data);
      const serverResonse = await getData("/getData");
      updateUI(serverResonse);
    } catch (error) {
      console.error(error);
    }
  });
};

///////////////////////////////////////////////////////////////////

// add event handles when the page loaded
window.addEventListener("DOMContentLoaded", initialSetup);
console.log("fuckers");

///////////////////////////////////////////////////////////////////

// weather API key
const weatherAPIKey = "cccc9022986366e01c65ffc73e3cf7af";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?";
/**
 * send API request for weather
 * @param zipCode USA zip code for now
 *
 * @return object API response
 */
const getWeatherData = async (zipCode) => {
  const endPointURL = `${baseURL}zip=${zipCode}&appid=${weatherAPIKey}`;
  const response = await fetch(endPointURL);
  const result = await response.json();
  console.log(result);
  return result;
};

///////////////////////////////////////////////////////////////////

/**
 *
 * @param url endpoint to fetch data from
 */
const getData = async (url) => {
  console.log(url);
  const response = await fetch(url);
  return await response.json();
};

///////////////////////////////////////////////////////////////////

/**
 * @param url  Express end point to post request
 * @param data object to send with the post request
 */
const postData = async (url = "", data = {}) => {
  try {
    await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json", // the body of the request will be json
      },
      body: JSON.stringify(data),
    });
    console.log("postData()");
  } catch (error) {
    console.error(`postData error : ${error.message}`);
  }
};

///////////////////////////////////////////////////////////////////

const updateUI = (data) => {
  console.log("Update UI");
  const cityElement = document.querySelector("#city");
  const tempElement = document.querySelector("#temp");
  const dateElement = document.querySelector("#date");
  const feelingsElement = document.querySelector("#content");

  cityElement.textContent = data.name;
  tempElement.textContent = data.main.temp + "F";
  dateElement.textContent = data.day;
  feelingsElement.textContent = data.feelings;
};
