document.getElementById("dataForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Mencegah reload halaman

    let formData = new FormData(this);
    
    // ✅ Debugging: Menampilkan data sebelum dikirim ke Google Apps Script
    for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
    }

    let url = "https://script.google.com/macros/s/AKfycbwrN23kEvhBzjvEYA2A6YR_PGQVcn2A_glRNVNHpHXQ_ljZ0uOvNSEmvOA8elBd3UxE/exec"; // Ganti dengan URL Web App yang benar

    try {
        let response = await fetch(url, {
            method: "POST",
            body: formData
        });

        let text = await response.text(); // Cek isi response
        console.log("Server Response:", text);

        let result = JSON.parse(text); // Konversi ke JSON
        if (result.status === "success") {
            document.getElementById("message").textContent = "Data berhasil ditambahkan!";
            this.reset(); // Reset form setelah sukses
        } else {
            document.getElementById("message").textContent = "Gagal mendaftar!";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("message").textContent = "Terjadi kesalahan saat mengirim data.";
    }
});
