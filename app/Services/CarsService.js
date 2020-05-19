import Car from "../Models/Car.js";
import store from "../store.js";


let _api = axios.create({
  baseURL: 'http://bcw-sandbox.herokuapp.com/api/cars',
  timeout: 15000
})

class CarService {

  constructor() {
    console.log("hello from carService");
    this.getCars()
  }

  getCars() {
    _api.get()
      .then(res => {
        // console.log(res.data.data);
        let newCars = res.data.data.map(carData => new Car(carData))
        // console.log(newCars)
        store.commit('cars', newCars)
        console.log(store.State.cars);

      })
      .catch(err => console.error(err))
  }

  create(newCarObj) {
    //NOTE POST always takes a url first,and then the data to create second
    _api.post("", newCarObj)
      .then(res => {
        console.log(res);
        //NOTE two ways of updating data after a request
        //first way
        //PROS: only one call to db | cons: cant trust that local array contains the same information as database
        // let newCar = new Car(res.data.data)
        // let cars = [newCar, ...store.State.cars]
        // store.commit('cars', cars)

        //pros: our data will always be up to date with the database | cons: potential slower app time/reload from extra call to db
        //second way
        this.getCars()
      })
      .catch(err => console.error(err))
  }

  bid(carId) {
    let foundCar = store.State.cars.find(car => car.id == carId)
    if (foundCar) {
      foundCar.price += 100
      //first argument is whats appended to your url, 2nd arg is the data to be updated with
      _api.put(carId, foundCar)
        .then(res => {
          console.log(res);
          this.getCars()
        })
        .catch(err => console.error(err))

    }
  }

  ///api/cars/:carId
  delete(carId) {
    _api.delete(carId)
      .then(res => {
        console.log(res.data);
        //NOTE 2 ways of updating data here as well
        //first way is to handle it ourselves by finding it and taking it out of the state
        //second way it going and getting the data again from the database
        //pros: always updated to reflect database at the time
        //cons: 2 calls to database, 1 for delete 1 for the get
        this.getCars()
      })
      .catch(err => console.error(err))
  }


}


const CARSERVICE = new CarService()
export default CARSERVICE