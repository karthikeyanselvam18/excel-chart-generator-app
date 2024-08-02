const express = require("express");
const router = express.Router();
const multer = require("multer");
const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");
const Data = require("../models/data");

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Endpoint to handle file upload
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const fileName = req.file.originalname; // Use original filename as title
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    // Prepare the document for MongoDB
    const document = {
      title: fileName,
      data: jsonData
    };

    // Store the document in MongoDB
    await Data.create(document);

    // Remove the uploaded file
    fs.unlinkSync(filePath);

    res.json({
      message: "File uploaded and data stored in MongoDB successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
