import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('/students')
      .then(response => setStudents(response.data))
      .catch(error => console.error('There was an error fetching the students!', error));
  }, []);
  
  const handleDelete = (id) => {
    if (!id) {
      console.error('No ID provided for deletion.');
      return;
    }
    
    axios.delete(`/students/${id}`)
      .then(response => {
        console.log('Student deleted:', response.data);
        setStudents(students.filter(student => student._id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the student!', error);
        console.error('Error details:', error.response ? error.response.data : error.message);
      });
  };
  
  

  return (
    <div className="container">
      <h1>Students</h1>
      <Link to="/add"><button className="add">Add New Student</button></Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Enroll Number</th>
            <th>Date of Admission</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>{student.enrollNumber}</td>
              <td>{new Date(student.dateOfAdmission).toLocaleDateString()}</td>
              <td>
                <Link to={`/edit/${student._id}`}><button className="edit">Edit</button></Link>
                <button className="delete" onClick={() => handleDelete(student._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
