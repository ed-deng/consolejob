<<<<<<< HEAD
import React, { useState, useReducer, useEffect, useRef } from "react";
import {
  initialAppliedState,
  updateAppliedStateReducer,
} from "../state/reducers";

export default function NewJobModal({ updateShowModal }) {
  const [company, updateCompany] = useState("");
  const [position, updatePosition] = useState("");
  const [listing, updateListing] = useState("");
  const [applicationStatus, updateStatus] = useState("Saved");
  const [questions, updateQuestions] = useState("");
  const [notes, updateNotes] = useState("");
=======
import React, { useState, useReducer } from 'react';
import {
  updateAppliedStateReducer,
  initialAppliedState,
} from '../state/reducers';

export default function NewJobModal({
  userInfo,
  updateShowModal,
  jobColumn,
  setColumns,
}) {
  const [company, updateCompany] = useState('');
  const [position, updatePosition] = useState('');
  const [listing, updateListing] = useState('');
  const [applicationStatus, updateStatus] = useState('Saved');
  const [questions, updateQuestions] = useState('');
  const [notes, updateNotes] = useState('');
>>>>>>> c3cc21354408d089244c26d0cec6c1fc4633fead
  const [appliedJob, appliedDispatch] = useReducer(
    updateAppliedStateReducer,
    initialAppliedState
  );

  const resetState = () => {
<<<<<<< HEAD
    updateCompany("");
    updatePosition("");
    updateListing("");
    updateStatus("Saved");
    updateQuestions("");
    updateNotes("");
=======
    updateCompany('');
    updatePosition('');
    updateListing('');
    updateStatus('Saved');
    updateQuestions('');
    updateNotes('');
>>>>>>> c3cc21354408d089244c26d0cec6c1fc4633fead
  };

  const addJob = () => {
    if (!company || !position || !listing) return;
    const body = {
      user_id: userInfo._id,
      company,
      position,
      listing,
      status: applicationStatus,
      questions,
      notes,
    };
<<<<<<< HEAD
    fetch(`/jobs/new`, {
      method: "POST",
      headers: { "Content-Type": "Application/JSON" },
=======
    console.log('appliedJob: ', appliedJob);
    fetch(`/jobs/new`, {
      method: 'POST',
      headers: { 'Content-Type': 'Application/JSON' },
>>>>>>> c3cc21354408d089244c26d0cec6c1fc4633fead
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
<<<<<<< HEAD
        if (data.job.status === "Applied") {
          appliedDispatch({ type: "APPLIED" });
        }
      });
    resetState();
    updateShowModal(false);
=======
        const columnsCopy = JSON.parse(JSON.stringify(jobColumn));
        Object.keys(columnsCopy).forEach((key) => {
          if (columnsCopy[key].name === data.job.status) {
            columnsCopy[key].items.push(data.job);
          }
        });
        setColumns(columnsCopy);
        // if (data.job.status === 'Applied') {
        //   setColumns()
        // }
        updateShowModal(false);
      });
    resetState();
>>>>>>> c3cc21354408d089244c26d0cec6c1fc4633fead
  };

  return (
    <div id="new-job-modal">
      <label htmlFor="company">Company:</label>
      <input
        id="company"
        name="company"
        type="text"
        value={company}
        onChange={(e) => updateCompany(e.target.value)}
        required={true}
      ></input>
      <br />
      <label htmlFor="position">Position:</label>
      <input
        id="position"
        name="position"
        type="text"
        value={position}
        onChange={(e) => updatePosition(e.target.value)}
        required={true}
      ></input>
      <br />
      <label htmlFor="listing">Listing:</label>
      <input
        name="listing"
        type="text"
        value={listing}
        onChange={(e) => updateListing(e.target.value)}
        required={true}
      ></input>
      <br />
      <label htmlFor="Status">Status:</label>
      <select
        name="status"
        id="status"
        value={applicationStatus}
        onChange={(e) => updateStatus(e.target.value)}
      >
        <option value="Saved">Saved</option>
        <option value="Applied">Applied</option>
        <option value="In Progress">In Progress</option>
<<<<<<< HEAD
        <option value="Complete">Complete</option>
=======
        <option value="Completed">Completed</option>
>>>>>>> c3cc21354408d089244c26d0cec6c1fc4633fead
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
        id="notes"
        name="notes"
        value={notes}
        onChange={(e) => updateNotes(e.target.value)}
      ></textarea>
      <br />
      <button onClick={addJob}>Submit</button>
    </div>
  );
}
