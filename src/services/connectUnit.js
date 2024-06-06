import axios from "axios";
export default async function connectUnit(
  subscriber,
  license,
  innerId,
  loadingCallBack
) {
  const URL = "http://192.168.30.109:5038/api/utilities/connectUnit";
  loadingCallBack(true);
  console.log(
    "connect unit to vehicle: ",
    "sub:",
    subscriber,
    " license: ",
    license,
    "innerId:",
    innerId
  );
  if (subscriber === "" || license === "" || innerId === "") {
    loadingCallBack(false);
    return "Subscriber / License / InnerId is missing";
  }
  try {
    return await axios
      .post(URL, {
        subscriber: subscriber,
        license: license,
        innerId: innerId,
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
