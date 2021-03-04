const db = require("../db/model");

const jobsController = {};

jobsController.getJobs = (req, res, next) => {
  const query = "SELECT * FROM jobs WHERE user_id = $1";
  const params = [req.params.userId];
  db.query(query, params)
    .then((data) => {
      res.locals.jobs = data.rows;
      return next();
    })
    .catch((err) =>
      next({
        log: `Express error handler caught in jobsController.getJobs: ${err}`,
      })
    );
};

jobsController.postJob = (req, res, next) => {
  const {
    user_id,
    position,
    company,
    listing,
    status,
    questions,
    notes,
  } = req.body;
  const params = [
    user_id,
    position,
    company,
    listing,
    status,
    questions,
    notes,
  ];
  const query = `
    INSERT INTO jobs (user_id, position, company, listing, status, questions, notes)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
		RETURNING *
	`;
  db.query(query, params)
    .then((data) => {
      res.locals.job = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: `Express error handler caught in jobsController.postJobs: ${err}`,
      });
    });
};

jobsController.deleteJobs = (req, res, next) => {
  const params = [req.params.jobId];
  const query = "DELETE FROM jobs WHERE _id = $1";
  db.query(query, params)
    .then((data) => next())
    .catch((err) => {
      return next({
        log: `Express error handler caught in jobsController.deleteJobs: ${err}`,
      });
    });
};

jobsController.updateJob = (req, res, next) => {
  const { status } = req.body;
  const { jobId } = req.params;
  const params = [parseInt(jobId), status];
  console.log(params[0]);
  const query = `
      UPDATE jobs
      SET status = $2
      WHERE _id = $1
      RETURNING *
    `;
  db.query(query, params)
    .then((data) => {
      res.locals.job = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: `Express error handler caught in jobsController.editJobs ${err}`,
      });
    });
};

/*
jobsController.updateJob = (req, res, next) => {
  const { position, company, listing, status, questions, notes } = req.body;
  const { jobId } = req.params;
  const params = [
    parseInt(jobId),
    position,
    company,
    listing,
    status,
    questions,
    notes,
  ];
  console.log(params[0]);
  const query = `
      UPDATE jobs
      SET position = $2, company = $3, listing = $4, status = $5, questions = $6, notes = $7
      WHERE _id = $1
      RETURNING *
    `;
  db.query(query, params)
    .then((data) => {
      res.locals.job = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: `Express error handler caught in jobsController.editJobs ${err}`,
      });
    });
};
*/

module.exports = jobsController;
