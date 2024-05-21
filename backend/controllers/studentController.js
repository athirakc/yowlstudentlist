const Student = require('../models/Student');

exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.createStudent = async (req, res) => {
    const student = req.body;

    const newStudent = new Student(student);

    try {
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

exports.updateStudent = async (req, res) => {
    const { id } = req.params;
    const student = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No student with id: ${id}`);

    const updatedStudent = await Student.findByIdAndUpdate(id, student, { new: true });

    res.json(updatedStudent);
};

exports.deleteStudent = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No student with id: ${id}`);

    await Student.findByIdAndRemove(id);

    res.json({ message: "Student deleted successfully." });
};
