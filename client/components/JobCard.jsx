import React, { useState } from "react";

export default function JobCard({ job, updateViewJob, jobColumn, setColumns }) {
  const [company, updateCompany] = useState(job.company);
  const [position, updatePosition] = useState(job.position);
  const [listing, updateListing] = useState(job.listing);
  const [applicationStatus, updateStatus] = useState(job.status);
  const [questions, updateQuestions] = useState(job.questions);
  const [notes, updateNotes] = useState(job.notes);

  const updateJob = () => {
    if (!company || !position || !listing) return;
    const body = {
      company,
      position,
      listing,
      status: applicationStatus,
      questions,
      notes,
    };

    fetch(`/jobs/update/${job._id}`, {
      method: "PUT",
      headers: { "Content-Type": "Application/JSON" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        const columnsCopy = JSON.parse(JSON.stringify(jobColumn));
        Object.keys(columnsCopy).forEach((key) => {
          // removes old
          const idx = columnsCopy[key].items.findIndex(job => job._id === data.job._id);
          if (idx >= 0) columnsCopy[key].items.splice(idx, 1);
          // adds new
          if (columnsCopy[key].name === data.job.status) columnsCopy[key].items.push(data.job);
        });
        setColumns(columnsCopy);
      });
  };
  return (
    <div className="modal">
      <div className="x" onClick={() => updateViewJob({})}>
        x
      </div>
      <label htmlFor="company">Company:</label>
      <input
        type="text"
        name="position"
        value={company}
        onChange={(e) => updateCompany(e.target.value)}
      ></input>
      <br />
      <label htmlFor="position">Position:</label>
      <input
        type="text"
        name="position"
        value={position}
        onChange={(e) => updatePosition(e.target.value)}
      ></input>
      <br />
      <label htmlFor="listing">Listing:</label>
      <input
        name="listing"
        type="text"
        value={listing}
        onChange={(e) => updateListing(e.target.value)}
      ></input>
      <br />
      <select
        name="status"
        id="status"
        value={applicationStatus}
        onChange={(e) => updateStatus(e.target.value)}
      >
        <option value="Saved">Saved</option>
        <option value="Applied">Applied</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <br />
      <label htmlFor="questions">Questions:</label>
      <br />
      <textarea
        name="questions"
        value={questions}
        onChange={(e) => updateQuestions(e.target.value)}
      ></textarea>
      <br />
      <label htmlFor="notes">Notes:</label>
      <br />
      <textarea
        name="notes"
        value={notes}
        onChange={(e) => updateNotes(e.target.value)}
      ></textarea>
      <button className="submit" onClick={updateJob}>
        Update
      </button>
    </div>
  );
}
