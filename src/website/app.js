const initialSetup = () => {
  document.querySelector(".generate").addEventListener("click", async () => {
    console.log("postData1");
    const zipCode = document.querySelector(".zip-input").value;
    console.log(zipCode);
    try {
      const apiResponse = await getWeatherData(parseInt(zipCode));
      await postData("/addNew", apiResponse);
      console.log(apiResponse);
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
  return result;
  console.log(result);
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
  const weatherElement = document.querySelector(".weather-data");
  const dateElement = document.querySelector(".day-data");
  const userResponseElement = document.querySelector(".user-response-data");

  weatherElement.textContent = data.main.temp + "F";
  dateElement.textContent = data.day;
};
