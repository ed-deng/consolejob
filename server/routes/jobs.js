const express = require('express');
const jobsController = require('../controllers/jobsController');
const router = express.Router();

router.get('/:userId', jobsController.getJobs, (req, res) =>
  res.status(200).json({
    jobs: res.locals.jobs,
  })
);

router.post('/addJob', jobsController.postJob, (req, res) =>
  res.status(200).json({
    job: res.locals.job,
  })
);

router.delete('/deleteJob/:jobId', jobsController.deleteJobs, (req, res) => {
  res.status(200).send('Job Deleted');
});

router.put('/editJob/:jobId', jobsController.updateJob, (req, res) => {
  res.status(200).json({
    job: res.locals.job,
  });
});

module.exports = router;
