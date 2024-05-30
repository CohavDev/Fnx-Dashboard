import axios from "axios";
export default async function replaceUnit(
  license,
  vehicle_id,
  loadingCallBack
) {
  const URL = "http://localhost:5038/api/traffilogHtml/replaceUnit";
  loadingCallBack(true);
  console.log("calling replace Unit API");
  if (license === "" || vehicle_id === "") {
    loadingCallBack(false);
    return "License is missing";
  }
  try {
    return await axios
      .post(URL, {
        license: license,
        vehicle_id: vehicle_id,
      })
      .then((res) => {
        loadingCallBack(false);

        console.log(res);
        if (res.status === 200) {
          return res.data;
        }
        return false; //error
      });
  } catch (error) {
    console.log(error);
    loadingCallBack(false);

    return "Network error occured";
  }
}
