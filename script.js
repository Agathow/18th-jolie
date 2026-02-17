
// 1. Passcode & Navigation
const unlockBtn = document.getElementById("unlockBtn");
if (unlockBtn) {
    unlockBtn.addEventListener("click", () => {
        const input = document.getElementById("passInput").value;
        if (input === "1234") {
            const card = document.querySelector(".glass-card");
            card.style.opacity = "0";
            card.style.transform = "scale(0.95)";
            setTimeout(() => {
                window.location.href = "main.html";
            }, 500);
        } else {
            alert("Kode salah, ayo ingat lagi sayang! ❤️");
        }
    });
}

function checkPasscode() {
    const code = document.getElementById("passcode").value;
    if (code === "1234") { 
        // Simpan status agar musik mulai di halaman berikutnya
        localStorage.setItem('playMusic', 'true');
        window.location.href = "main.html"; 
    } else {
        alert("Salah sayang, coba lagi!");
    }
}

// 2. Music Player
const musicBtn = document.getElementById("musicToggle");
const audio = document.getElementById("bgMusic");
if (musicBtn && audio) {
    musicBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (audio.paused) {
            audio.play();
            musicBtn.innerHTML = "⏸ Pause Music";
        } else {
            audio.pause();
            musicBtn.innerHTML = "🎵 Play Music";
        }
    });
}

// 3. Time Machine & Age Count
function initTimeMachine() {
    const ageEl = document.getElementById("age-number");
    const lifeEl = document.getElementById("life-counter");
    if (!ageEl) return;

    // Animasi Angka 1 ke 18
    let count = 0;
    const target = 18;
    const interval = setInterval(() => {
        count++;
        ageEl.innerText = count;
        if (count === target) clearInterval(interval);
    }, 60);

    // Live Counter (Birthday: 7 Maret 2008)
    const birthDate = new Date("March 7, 2008 00:00:00").getTime();
    setInterval(() => {
        const now = new Date().getTime();
        const diff = now - birthDate;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);
        
        lifeEl.innerHTML = `<b>${days.toLocaleString()}</b> days <br> <span>${hours}h : ${mins}m : ${secs}s</span>`;
    }, 1000);
}

// 4. Background Particles (Romantic Glow)
function initParticles() {
    const bg = document.getElementById("bg-anim");
    if (!bg) {
        console.error("Elemen bg-anim tidak ditemukan!");
        return;
    }

    // Bersihkan gelembung lama jika ada
    bg.innerHTML = '';

    // Buat 30 gelembung
    for (let i = 0; i < 30; i++) {
        const p = document.createElement("div");
        p.className = "heart-particle";
        
        // Ukuran acak antara 5px - 15px
        const size = Math.random() * 10 + 5 + "px";
        p.style.width = size;
        p.style.height = size;
        
        // Posisi horizontal acak (0 - 100% lebar layar)
        p.style.left = Math.random() * 100 + "vw";
        
        // Durasi animasi acak (biar gak barengan naiknya)
        p.style.animationDuration = Math.random() * 5 + 10 + "s";
        p.style.animationDelay = Math.random() * 10 + "s";
        
        bg.appendChild(p);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const bgMusic = document.getElementById('bgMusic');
    if (!bgMusic) return;

    // 1. Ambil posisi detik terakhir dari memori browser
    const savedTime = localStorage.getItem('musicCurrentTime');
    if (savedTime) {
        bgMusic.currentTime = parseFloat(savedTime);
    }

    // 2. Simpan posisi detik musik setiap 100ms agar akurat saat pindah halaman
    bgMusic.addEventListener('timeupdate', function() {
        localStorage.setItem('musicCurrentTime', bgMusic.currentTime);
    });

    // 3. Fungsi untuk memutar musik (Seamless Trigger)
    const playMusic = () => {
        bgMusic.play().then(() => {
            // Jika berhasil putar, hapus listener agar tidak boros resource
            document.removeEventListener('click', playMusic);
            window.removeEventListener('scroll', playMusic);
            document.removeEventListener('touchstart', playMusic);
        }).catch(error => {
            console.log("Menunggu interaksi user untuk lanjut musik...");
        });
    };

    // Pemicu otomatis: Musik lanjut saat user klik, scroll, atau sentuh layar
    document.addEventListener('click', playMusic);
    window.addEventListener('scroll', playMusic);
    document.addEventListener('touchstart', playMusic);

    // Otomatis coba putar jika status navigasi aman
    playMusic();
});
// PASTIKAN fungsi ini terpanggil di semua halaman
window.addEventListener('DOMContentLoaded', initParticles);

window.onload = () => {
    initTimeMachine();
    initParticles();
};