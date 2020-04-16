import Axios from "./axios";

class Api extends Axios {
  async test(params = {}) {
    return await this.axios("POST", "user/smscode", params);
  }
  
}

export default new Api();