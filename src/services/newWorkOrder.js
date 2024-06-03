import axios from "axios";
export default async function newWorkOrder(
  isReal,
  subscriber,
  vehicle_id,
  loadingCallBack
) {
  const URL =
    "http://localhost:5038/api/utilities/" +
    (isReal ? "realNewWorkOrder" : "fakeNewWorkOrder");
  loadingCallBack(true);
  console.log("calling new work order API", subscriber, vehicle_id);
  if (subscriber === "" || vehicle_id === "") {
    loadingCallBack(false);
    return "Subscriber / License is missing";
  }
  try {
    const clientID = await getClientID(subscriber);
    if (!clientID) {
      loadingCallBack(false);
      console.log("get client failed", clientID);
      return "could not fetch client id";
    }
    return await axios
      .post(URL, {
        subscriber: subscriber,
        vehicle_id: vehicle_id,
        client_id: clientID,
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
async function getClientID(subscriber) {
  const URL = "http://localhost:5038/api/traffilogHtml/getClientID";
  try {
    return await axios
      .get(URL, { params: { subscriber: subscriber } })
      .then((res) => {
        console.log(res);
        return res.data;
      });
  } catch (error) {
    console.log(error);
    return false;
  }
}
