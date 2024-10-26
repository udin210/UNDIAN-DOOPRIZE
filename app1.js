// Ambil elemen yang dibutuhkan
const numberDisplay = document.getElementById('number-display');
const startButton = document.getElementById('start-button');
const winnerInfo = document.getElementById('winner-info');
const nipDisplay = document.getElementById('nip');
const namaDisplay = document.getElementById('nama');
const jabatanDisplay = document.getElementById('jabatan');

// Data pemenang (dapat diganti dengan data dari server atau database)
const winner = {
    NIP: '1234567890123456', // NIP dengan 16 digit
    nama: 'John Doe',
    jabatan: 'Manager'
};

// Fungsi untuk menghasilkan nomor acak 16 digit
function generateRandom16DigitNumber() {
    let number = '';
    for (let i = 0; i < 16; i++) {
        number += Math.floor(Math.random() * 10); // Angka acak antara 0 dan 9
    }
    return number;
}

// Fungsi untuk memulai pengacakan nomor
function shuffleNumbers() {
    winnerInfo.style.display = 'none'; // Sembunyikan informasi pemenang
    startButton.disabled = true; // Nonaktifkan tombol selama pengacakan

    const shuffleDuration = 3000; // Durasi pengacakan (3 detik)
    const intervalTime = 100; // Interval perubahan angka (100ms)

    let shuffleInterval = setInterval(function() {
        const randomNumber = generateRandom16DigitNumber();
        numberDisplay.textContent = randomNumber;
    }, intervalTime);

    // Hentikan pengacakan setelah durasi tertentu
    setTimeout(function() {
        clearInterval(shuffleInterval); // Hentikan pengacakan
        displayWinner(); // Tampilkan hasil pemenang
        startButton.disabled = false; // Aktifkan kembali tombol
    }, shuffleDuration);
}

// Fungsi untuk menampilkan pemenang
function displayWinner() {
    numberDisplay.textContent = winner.NIP; // Tampilkan NIP pemenang
    nipDisplay.textContent = winner.NIP;
    namaDisplay.textContent = winner.nama;
    jabatanDisplay.textContent = winner.jabatan;

    winnerInfo.style.display = 'block'; // Tampilkan informasi pemenang
}

// Event listener pada tombol undi
startButton.addEventListener('click', shuffleNumbers);