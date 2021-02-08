const postData = async (url = "", data = {}) => {
  console.log(data);

  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json", // the body of the request will be json
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.error(`postData error : ${error.message}`);
  }
};

postData("/addMovie", {
  movie: "tenet",
  score: 5,
});
s;
