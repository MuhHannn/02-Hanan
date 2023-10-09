document.addEventListener("DOMContentLoaded", function () {
  const employeeIdInput = document.getElementById("employeeId");
  const submitButton = document.getElementById("submitButton");
  const resultMessage = document.getElementById("resultMessage");

  submitButton.addEventListener("click", async () => {
    const employeeId = employeeIdInput.value;

    if (employeeId.length !== 5) {
      resultMessage.textContent = "Gagal: ID harus memiliki 5 karakter";
      return;
    }

    // Kirim data ID ke backend
    const response = await fetch("/absen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ employeeId }),
    });

    if (response.ok) {
      resultMessage.textContent = "Absen berhasil!";
      employeeIdInput.value = "";
    } else {
      resultMessage.textContent = "Gagal: Terjadi kesalahan saat absen.";
    }
  });
});
