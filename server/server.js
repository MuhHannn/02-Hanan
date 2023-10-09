const express = require("express");
const bodyParser = require("body-parser");
const { connectDB } = require("./db"); // Import koneksi database

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/absen", async (req, res) => {
  const { employeeId } = req.body;
  const currentDate = new Date().toLocaleString();

  if (employeeId.length !== 5) {
    res.status(400).json({ message: "Gagal: ID harus memiliki 5 karakter" });
    return;
  }

  // Menggunakan koneksi ke database MongoDB
  const db = await connectDB();

  // Menyimpan data absensi ke dalam koleksi "absensi"
  await db.collection("absensi").insertOne({ employeeId, date: currentDate });

  console.log(
    `Karyawan dengan ID ${employeeId} melakukan absen pada ${currentDate}`
  );

  res.status(200).json({ message: "Absen berhasil!" });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
