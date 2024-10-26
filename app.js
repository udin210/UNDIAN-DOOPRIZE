const startButton = document.getElementById('start-btn');
const numberDisplay = document.getElementById('number-display');
const winnerInfo = document.getElementById('winner-info');
const shuffleAudio = document.getElementById('shuffle-sound');

// Data dummy NIP, nama, jabatan
const participants = [
    { NIP: '1234567890119944', nama: 'Andi', jabatan: 'Manager' },
    { NIP: '0987654321990067', nama: 'Budi', jabatan: 'Supervisor' },
    { NIP: '1122334455678573', nama: 'Citra', jabatan: 'Staff' },
    // Tambahkan lebih banyak data peserta sesuai kebutuhan
];

// Fungsi untuk menghasilkan nomor acak 16 digit
function generateRandom16DigitNumber() {
    let number = '';
    for (let i = 0; i < 16; i++) {
        number += Math.floor(Math.random() * 10); // Menambahkan angka acak antara 0-9
    }
    return number;
}

// Fungsi untuk memulai pengacakan nomor dengan suara dan menampilkan 16 digit nomor
function shuffleNumbers() {
    shuffleAudio.volume = 1.0;
    shuffleAudio.currentTime = 0;
    shuffleAudio.play(); // Mainkan suara pengacakan

    // Simulasikan pengacakan nomor selama beberapa detik
    const shuffleDuration = 8000; // Durasi pengacakan dalam milidetik (3 detik)
    let shuffleInterval = setInterval(function() {
        // Hasilkan nomor acak 16 digit dan tampilkan di layar
        const randomNumber = generateRandom16DigitNumber();
        numberDisplay.textContent = randomNumber;
    }, 100); // Ubah angka setiap 100ms

    // Hentikan pengacakan setelah durasi tertentu
    setTimeout(function() {
        clearInterval(shuffleInterval); // Hentikan pengacakan angka
        shuffleAudio.pause(); // Hentikan suara pengacakan
        shuffleAudio.currentTime = 0; // Reset audio ke awal

        // Tampilkan hasil pengundian setelah pengacakan selesai
        const winner = {
            NIP: generateRandom16DigitNumber(), // NIP pemenang dengan 16 digit
            nama: 'John Doe',
            jabatan: 'Manager'
        };

        // Tampilkan pemenang dengan interval waktu yang diatur
        displayWinnerWithInterval(winner);
    }, shuffleDuration);
}


// Fungsi ketika tombol "Undi" ditekan
startButton.addEventListener('click', function() {
    playSound(); // Mainkan suara tombol undi jika ada

    // Mulai pengundian dengan interval yang dipilih sebelum pengacakan
    startDrawWithInterval();
});

// Fungsi untuk memulai undian dengan interval waktu yang dipilih
function startDrawWithInterval() {
    const startInterval = startIntervalSlider.value * 1000; // Ubah detik ke milidetik
    numberDisplay.textContent = 'Tunggu...';

    setTimeout(function() {
        // Mulai pengacakan nomor
        shuffleNumbers();
    }, startInterval);
}
// Fungsi untuk mengacak peserta
function drawWinner() {
    const randomIndex = Math.floor(Math.random() * participants.length);
    const winner = participants[randomIndex];
    return winner;
}

// Fungsi untuk menampilkan hasil pengundian
function displayWinner(winner) {
    // Menampilkan NIP dengan segera
    numberDisplay.textContent = winner.NIP;

    // Menghapus konten lama jika ada
    winnerInfo.innerHTML = '';

    // Membuat elemen nama dan jabatan dengan animasi
    const nameElement = document.createElement('p');
    nameElement.textContent = `${winner.nama}`;
    nameElement.classList.add('slide-in'); // Menambahkan kelas animasi fade-in

    const jobElement = document.createElement('p');
    jobElement.textContent = `${winner.jabatan}`;
    jobElement.classList.add('slide-in'); // Menambahkan kelas animasi slide-in

    // Menambahkan elemen ke tampilan
    winnerInfo.appendChild(nameElement);
    winnerInfo.appendChild(jobElement);
}

startButton.addEventListener('click', () => {
    // Mulai pengundian
    let counter = 0;
    const interval = setInterval(() => {
        // Menampilkan angka acak sementara sebelum menampilkan pemenang
        numberDisplay.textContent = Math.floor(Math.random() * 1e16).toString().padStart(16, '0');
        counter++;

        // Stop acak setelah beberapa detik
        if (counter > 20) {
            clearInterval(interval);
            const winner = drawWinner();
            displayWinner(winner);
        }
    }, 100); // Setiap 100ms angka berubah
    setTimeout(() => {
        shuffleAudio.currentTime = 0;
        shuffleAudio.play().then(() => {
            console.log('Audio shuffle started');
        }).catch(error => {
            console.error('Error playing shuffle audio:', error);
        });
    }, 100);
});

