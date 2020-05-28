export default class Job {
  constructor(data) {
    this.id = data._id || data.id;
    this.company = data.company;
    this.description = data.description || "No Description Provided";
    this.jobTitle = data.jobTitle;
    this.hours = data.hours;
    this.rate = data.rate;
  }

  get Template() {
    return /*html*/ `
    <div class="col-4">
                <div class="card">
                    
                    <div class="card-body">
                        <h4 class="card-title">Job ${this.jobTitle} | Company: ${this.company} </h4>
                        <h5>Hours: ${this.hours}| Rate: ${this.rate} </h5>
                        <p class="card-text">${this.description}</p>
                        <button class="btn btn-success" onclick="app.jobsController.bid('${this.id}')">
                               Bid
                        </button>
                        <button class="btn btn-danger" onclick="app.jobsController.delete('${this.id}')">
                               Delete
                        </button>
                    </div>
                </div>
            </div>`;
  }
}
