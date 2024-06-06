import axios from "axios";
export default async function disconnectUnit(innerId, loadingCallBack) {
  const URL = "http://192.168.30.109:5038/api/utilities/disconnectUnit";
  loadingCallBack(true);
  console.log("disconnect unit", innerId);
  if (innerId === "") {
    loadingCallBack(false);
    return "InnerId is missing";
  }
  try {
    return await axios
      .post(URL, {
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
