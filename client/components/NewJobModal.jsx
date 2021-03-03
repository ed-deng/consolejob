import React, { useState } from 'react'

export default function NewJobModal({ updateShowModal }) {
  const [company, updateCompany] = useState('');
  const [position, updatePosition] = useState('');
  const [listing, updateListing] = useState('');
  const [applicationStatus, updateStatus] = useState('Saved');
  const [questions, updateQuestions] = useState('');
  const [notes, updateNotes] = useState('');

  const resetState = () => {
    updateCompany('');
    updatePosition('');
    updateListing('');
    updateStatus('Saved');
    updateQuestions('');
    updateNotes('');
  }

  const addJob = () => {
    if (!company || !position || !listing) return;
    const body = {
      user_id: 2, // needs to use user_id from global state
      company,
      position,
      listing,
      status: applicationStatus,
      questions,
      notes
    }
    fetch(`/jobs/new`, 
      { method: 'POST', 
        headers: { 'Content-Type': 'Application/JSON' }, 
        body: JSON.stringify(body) 
      })
      .then((res) => res.json())
      .then((data) => console.log(data));
    resetState();
    updateShowModal(false);
  }

  return (
    <div id='new-job-modal'>
      <label htmlFor='company'>Company:</label>
      <input id='company' name='company' type='text' value={company}
        onChange={(e) => updateCompany(e.target.value)} required={true}></input><br/>
      <label htmlFor='position'>Position:</label>
      <input id='position' name='position' type='text' value={position}
        onChange={(e) => updatePosition(e.target.value)} required={true}></input><br />
      <label htmlFor='listing'>Listing:</label>
      <input name='listing' type='text' value={listing}
        onChange={(e) => updateListing(e.target.value)} required={true}></input><br />
      <label htmlFor='Status'>Status:</label>
      <select name="status" id="status" value={applicationStatus} onChange={(e) => updateStatus(e.target.value)}>
        <option value="Saved">Saved</option>
        <option value="Applied">Applied</option>
        <option value="In Progress">In Progress</option>
        <option value="Complete">Complete</option>
      </select><br />
      <label htmlFor='questions'>Questions:</label><br />
      <textarea name='questions' value={questions}
        onChange={(e) => updateQuestions(e.target.value)}></textarea><br />
      <label htmlFor='notes'>Notes:</label><br />
      <textarea id='notes' name='notes' value={notes}
        onChange={(e) => updateNotes(e.target.value)}></textarea><br />
      <button onClick={addJob}>Submit</button>
    </div>
  )
}