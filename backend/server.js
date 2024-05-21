const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/studentDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  enrollNumber: String,
  dateOfAdmission: Date,
});

const Student = mongoose.model('Student', studentSchema);


app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/students', async (req, res) => {
    const student = new Student({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        enrollNumber: req.body.enrollNumber,
        dateOfAdmission: req.body.dateOfAdmission,
    });

    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/students/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (student == null) {
            return res.status(404).json({ message: 'Cannot find student' });
        }
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/students/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (student == null) {
            return res.status(404).json({ message: 'Cannot find student' });
        }

        if (req.body.name != null) {
            student.name = req.body.name;
        }
        if (req.body.email != null) {
            student.email = req.body.email;
        }
        if (req.body.phone != null) {
            student.phone = req.body.phone;
        }
        if (req.body.enrollNumber != null) {
            student.enrollNumber = req.body.enrollNumber;
        }
        if (req.body.dateOfAdmission != null) {
            student.dateOfAdmission = req.body.dateOfAdmission;
        }

        const updatedStudent = await student.save();
        res.json(updatedStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Cannot find student' });
    }

    await student.remove();
    res.json({ message: 'Student deleted' });
  } catch (err) {
    console.error('Error deleting student:', err);
    res.status(500).json({ message: 'Error deleting student', error: err.message });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
