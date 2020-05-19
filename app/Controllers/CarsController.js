import _carService from '../Services/CarsService.js'
import _store from '../store.js';


function _drawCars() {
  let template = ""
  let cars = _store.State.cars
  cars.forEach(car => template += car.Template)
  document.getElementById("cars").innerHTML = template
}


export default class CarsController {
  constructor() {
    console.log("Hello from controller");
    _store.subscribe('cars', _drawCars)
  }


  addCar(event) {
    event.preventDefault();
    let formData = event.target
    let newCarObj = {
      make: formData.make.value,
      model: formData.model.value,
      year: formData.year.value,
      price: formData.price.value,
      imgUrl: formData.imgUrl.value,
      description: formData.description.value
    }
    _carService.create(newCarObj)
    formData.reset()
  }

  delete(carId) {
    _carService.delete(carId)
  }

  bid(carId) {
    _carService.bid(carId)
  }
}