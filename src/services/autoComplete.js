import axios from "axios";
import cors from "cors";
const URL = "http://192.168.30.109:5038/api/traffilogHtml/getVehicleByPolicy";

export default async function autoCompleteBySubscriber(subscriber, callback) {
  console.log("auto complete called with subscriber code: ", subscriber);
  try {
    return await axios
      .get(URL, { params: { subscriber: subscriber } })
      .then((res) => {
        console.log("server response: ", res.data);
        return res.data;
      });
  } catch (error) {
    console.log(error);
    return "Network error occured";
  }
}
