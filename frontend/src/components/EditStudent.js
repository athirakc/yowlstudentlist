import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({
    name: '',
    email: '',
    phone: '',
    enrollNumber: '',
    dateOfAdmission: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/students/${id}`)
      .then(response => setStudent(response.data))
      .catch(error => console.error('There was an error fetching the student!', error));
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`/students/${id}`, student)
      .then(response => navigate('/'))
      .catch(error => console.error('There was an error updating the student!', error));
  };

  return (
    <div className="container">
      <h1>Edit Student</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={student.name} onChange={handleChange} placeholder="Name" />
        <input type="email" name="email" value={student.email} onChange={handleChange} placeholder="Email" />
        <input type="text" name="phone" value={student.phone} onChange={handleChange} placeholder="Phone" />
        <input type="text" name="enrollNumber" value={student.enrollNumber} onChange={handleChange} placeholder="Enroll Number" />
        <input type="date" name="dateOfAdmission" value={student.dateOfAdmission} onChange={handleChange} placeholder="Date of Admission" />
        <button type="submit">Update</button>
        <button type="button" style={{backgroundColor:"red"}} onClick={() => navigate('/')}>Cancel</button>
      </form>
    </div>
  );
};

export default EditStudent;
