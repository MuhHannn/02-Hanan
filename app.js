const express = require("express");
const {
  validateEmployeeId,
  tambahAbsensi,
  absensiData,
  isEmployeeIdExists,
  getAbsensiData,
} = require("./memory");

const app = express();
app.use(express.json());
app.use(express.static("./public"));

app.post("/absensi", (req, res) => {
  const { employeeId } = req.body;

  if (validateEmployeeId(employeeId)) {
    const timestamp = new Date(); // Timestamp saat ini
    tambahAbsensi(employeeId, timestamp);
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.get("/absensiData", (req, res) => {
  res.json(absensiData.map((entry) => entry.employeeId));
});

app.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});
