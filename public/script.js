document
  .getElementById("submitBtn")
  .addEventListener("click", async function () {
    const employeeId = document.getElementById("employeeId").value;
    const date = new Date();
    if (employeeId.length !== 5 || isNaN(employeeId)) {
      document.getElementById("validationMessage").innerText =
        "ID harus terdiri dari 5 karakter angka.";
      setTimeout(() => {
        document.getElementById("validationMessage").innerText = "";
      }, 5000);
      return;
    }

    const response = await fetch("http://localhost:3000/absensi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ employeeId }),
    });

    const data = await response.json();

    if (data.success) {
      document.getElementById("validationMessage").innerText =
        "Absensi berhasil.";
      setTimeout(() => {
        document.getElementById("validationMessage").innerText = "";
      }, 1000); // Hapus pesan setelah 3 detik
    } else {
      document.getElementById("validationMessage").innerText =
        "Gagal melakukan absensi.";
    }

    // Fungsi untuk mengambil data absensi setelah absen
    async function getAbsensiData() {
      const response = await fetch("http://localhost:3000/absensiData");
      const data = await response.json();

      const listContainer = document.getElementById("absensiList");
      listContainer.innerHTML = "";
      document.getElementById("employeeId").value = "";

      if (data.length === 0) {
        const noDataMessage = document.createElement("tr");
        noDataMessage.innerHTML =
          '<td colspan="2">Belum ada data yang dimasukkan</td>';
        listContainer.appendChild(noDataMessage);

        setTimeout(() => {
          noDataMessage.remove();
        }, 1000); // Hapus pesan setelah 3 detik
        return;
      }

      console.log(data);

      data.forEach((employeeId, index) => {
        const listItem = document.createElement("tr");
        listItem.innerHTML = `
            <td>${index + 1}</td>
            <td>${employeeId}</td>
            <td>${getCurrentDate()}</td>
        `;
        listContainer.appendChild(listItem);
      });
    }

    // Panggil fungsi untuk mengambil data absensi setelah absen
    getAbsensiData();
  });

function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
}
