const cloudinary = require("../Config/cloudinary");
const env = require("dotenv").config();
const fs = require("fs");
const db = require("../model");

// ============ ADD TASKS ===============

const addTasks = async (req, res) => {
  try {
    const taskDetails = req.body;
    const file = req.file;

    let img;
    if (file) {
      const upload = await cloudinary.cloudinary.uploader.upload(file?.path);
      img = upload.secure_url;
      await fs.unlinkSync(file.path);
    }

    db.query(
      "INSERT INTO tasks (heading,description,image,date,time,priority) VALUES(?,?,?,?,?,?)",
      [
        req.body.heading,
        req.body.description,
        img,
        req.body.date,
        req.body.time,
        req.body.priority,
      ],
      (err, result) => {
        if (err) {
          console.log(err, "insertion error");
        } else {
          console.log("Data inserted successfully");
          res.status(200).json({ message: "Data inserted successfully" });
        }
      }
    );
  } catch (error) {
    res.json(500);
  }
};

// ================= LIST TASKS =================
const listTasks = async (req, res) => {
  try {
    db.query("SELECT * FROM tasks ORDER BY created_at DESC", (err, result) => {
      if (err) {
        return res.json({ message: false });
      } else {
        res.json({ message: true, result: result });
      }
    });
  } catch (error) {
    res.status(500);
  }
};

// ================= DELETE A TASK ==============
const deleteTask = async (req, res) => {
  try {
    const { id } = req.query;
    db.query("DELETE FROM tasks WHERE id= ?", [id], (err, result) => {
      if (err) {
        res.json({ message: false });
      } else {
        res.json({ message: true, result: result });
      }
    });
  } catch (error) {
    res.status(500).json({ message: false });
  }
};

// ================== EDIT A TASK ===================
const editTask = async (req, res) => {
  try {
    const { id, heading, description, priority } = req.body;
    const file = req.file;

    let img;

    if (file) {
      const upload = await cloudinary.cloudinary.uploader.upload(file.path);
      img = upload.secure_url;
      fs.unlinkSync(file.path);
    }

    const updateData = {
      heading,
      description,
      priority,
    };

    if (img) {
      updateData.image = img;
    }

    db.query("UPDATE tasks SET ? WHERE id = ?", [updateData, id], (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: false });
      }

      db.query("SELECT * FROM tasks WHERE id = ?", [id], (err, result) => {
        if (err) {
          return res.status(500).json({ message: false });
        } else {
          return res.json({ message: true, result: result });
        }
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: false });
  }
};

module.exports = { addTasks, listTasks, deleteTask, editTask };
