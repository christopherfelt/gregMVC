import store from "../store.js";
import service from "../Services/JobsServices.js";

//Private
function _drawJobs() {
  let jobs = store.State.jobs;

  let template = "";
  jobs.forEach((j) => (template += j.Template));
  document.getElementById("jobs").innerHTML = template;
}

//Public
export default class JobsController {
  constructor() {
    store.subscribe("jobs", _drawJobs);
    service.getJobs();
  }

  addJob(event) {
    event.preventDefault();
    let formData = event.target;
    let rawJobData = {
      company: formData.company.value,
      description: formData.description.value,
      jobTitle: formData.jobTitle.value,
      hours: formData.hours.value,
      rate: formData.rate.value,
    };
    service.createJob(rawJobData);
    formData.reset();
  }

  bid(id) {
    service.bid(id);
  }

  delete(id) {
    service.delete(id);
  }
}
