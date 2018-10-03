import axios from "axios";

const instance = axios.create({
  baseURL: "https://thebrown-lab.firebaseio.com/"
});

export default instance;
