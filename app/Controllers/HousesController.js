import _store from "../store.js";
import SERVICE from "../Services/HousesService.js";

function _drawHouses() {
  let template = "";
  let houses = _store.State.houses;
  houses.forEach((house) => (template += house.Template));
  document.getElementById("houses").innerHTML = template;
}

export default class HousesController {
  constructor() {
    _store.subscribe("houses", _drawHouses);
  }

  addHouse(event) {
    event.preventDefault();
    let formData = event.target;
    let newHouseObj = {
      bedrooms: formData.bedrooms.value,
      bathrooms: formData.bathrooms.value,
      price: formData.price.value,
      year: formData.year.value,
      imgUrl: formData.imgUrl.value,
      description: formData.description.value,
      levels: formData.levels.value,
    };

    SERVICE.create(newHouseObj);
    formData.reset();
  }

  delete(houseId) {
    SERVICE.delete(houseId);
  }

  bid(houseId) {
    SERVICE.bid(houseId);
  }
}
