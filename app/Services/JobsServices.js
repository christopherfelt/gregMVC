import store from "../store.js";
import Job from "../Models/Job.js";

let _api = axios.create({
  baseURL: "http://bcw-sandbox.herokuapp.com/api/jobs",
  timeout: 15000,
});

class JobsService {
  delete(id) {
    _api
      .delete(id)
      .then((res) => {
        console.log(res);
        this.getJobs();
      })
      .catch((error) => console.log(error));
  }
  bid(id) {
    let job = store.State.jobs.find((j) => j.id == id);
    if (job) {
      job.rate += 10;
      _api
        .put(id, job)
        .then((res) => {
          this.getJobs();
        })
        .catch((error) => console.error(error));
    }
  }
  constructor() {
    this.getJobs();
  }

  getJobs() {
    _api
      .get()
      .then((res) => {
        let newJobs = res.data.data.map((jobData) => new Job(jobData));
        store.commit("jobs", newJobs);
      })
      .catch((error) => console.error(error));
  }
  createJob(rawJobData) {
    console.log(rawJobData);
    _api
      .post("", rawJobData)
      .then((res) => {
        // this.getJobs();
        let newJob = new Job(rawJobData);
        store.commit("jobs", [newJob, ...store.State.jobs]);
      })
      .catch((error) => console.error(error));
  }
}

const service = new JobsService();
export default service;
