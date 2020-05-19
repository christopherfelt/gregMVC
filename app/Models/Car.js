export default class Car {
  constructor(data) {
    console.log("from the car model");
    this.id = data._id
    this.make = data.make
    this.model = data.model
    this.description = data.description || "No Description Provided"
    this.imgUrl = data.imgUrl
    this.price = data.price
    this.year = data.year
  }

  get Template() {
    return /*html*/`
    <div class="col-4">
                <div class="card">
                    <img class="card-img-top" src="${this.imgUrl}" alt="">
                    <div class="card-body">
                        <h4 class="card-title">Make: ${this.make} | Model: ${this.model} </h4>
                        <h5>Year: ${this.year}| Price: ${this.price} </h5>
                        <p class="card-text">${this.description}</p>
                        <button class="btn btn-success" onclick="app.carsController.bid('${this.id}')">
                               Bid
                        </button>
                        <button class="btn btn-danger" onclick="app.carsController.delete('${this.id}')">
                               Delete
                        </button>
                    </div>
                </div>
            </div>`
  }
}