export default class House {
  constructor(data) {
    this.id = data._id || data.id;
    this.year = data.year;
    this.bedrooms = data.bedrooms;
    this.bathrooms = data.bathrooms;
    this.description = data.description || "No Description Provided";
    this.imgUrl = data.imgUrl;
    this.price = data.price;
    this.levels = data.levels;
  }

  get Template() {
    return /*html*/ `
    <div class="col-4">
                <div class="card">
                    <img class="card-img-top" src="${this.imgUrl}" alt="">
                    <div class="card-body">
                        <h4 class="card-title">Bedrooms: ${this.bedrooms} | Bathrooms: ${this.bathrooms} </h4>
                        <h5>Year: ${this.year}| Price: ${this.price} </h5>
                        <p class="card-text">${this.description}</p>
                        <button class="btn btn-success" onclick="app.housesController.bid('${this.id}')">
                               Bid
                        </button>
                        <button class="btn btn-danger" onclick="app.housesController.delete('${this.id}')">
                               Delete
                        </button>
                    </div>
                </div>
            </div>`;
  }
}
