import store from "../store.js";
import House from "../Models/House.js";

let _api = axios.create({
  baseURL: "http://bcw-sandbox.herokuapp.com/api/houses",
  timeout: 15000,
});

class HouseService {
  constructor() {
    this.getHouses();
  }

  getHouses() {
    _api
      .get()
      .then((res) => {
        // console.log(res.data.data);
        let newhouses = res.data.data.map((houseData) => new House(houseData));
        // console.log(newhouses)
        store.commit("houses", newhouses);
      })
      .catch((err) => console.error(err));
  }

  create(newHouseObj) {
    //NOTE POST always takes a url first,and then the data to create second
    console.log(newHouseObj);
    _api
      .post("", newHouseObj)
      .then((res) => {
        console.log("res", res);
        //NOTE two ways of updating data after a request
        //first way
        //PROS: only one call to db | cons: cant trust that local array contains the same information as database
        let newhouse = new House(res.data.data);
        let houses = [newhouse, ...store.State.houses];
        store.commit("houses", houses);

        //pros: our data will always be up to date with the database | cons: potential slower app time/reload from extra call to db
        //second way
        this.getHouses();
      })
      .catch((err) => console.error(err));
  }

  bid(houseId) {
    let foundHouse = store.State.houses.find((house) => house.id == houseId);
    if (foundHouse) {
      foundHouse.price += 100;
      //first argument is whats appended to your url, 2nd arg is the data to be updated with
      _api
        .put(houseId, foundHouse)
        .then((res) => {
          console.log(res);
          this.getHouses();
        })
        .catch((err) => console.error(err));
    }
  }

  ///api/houses/:houseId
  delete(houseId) {
    _api
      .delete(houseId)
      .then((res) => {
        console.log(res.data);
        //NOTE 2 ways of updating data here as well
        //first way is to handle it ourselves by finding it and taking it out of the state
        //second way it going and getting the data again from the database
        //pros: always updated to reflect database at the time
        //cons: 2 calls to database, 1 for delete 1 for the get
        this.getHouses();
      })
      .catch((err) => console.error(err));
  }
}

const SERVICE = new HouseService();
export default SERVICE;
