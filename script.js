let explosionIcon = "💗";
let isGifting = false;
let giftInterval = null;
let isMessaging = false;
let messageInterval = null;

let messages = [
  "Bông hoa đẹp nhấttt",
  "Cục vàng m5 ^^",
  "Hay cứ nói ra một lần rồi tính sauuu",
  "Luôn hạnh phúcc",
  "Hay la vi da lo yeu em roi",
  "Chìm đắm trong đôi mắt nàngg",
];

let customImages = [];

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has("msgs")) {
  try {
    const rawMsgs = urlParams.get("msgs");
    let msgsParam;
    try {
      msgsParam = decodeURIComponent(atob(rawMsgs));
    } catch (e) {
      msgsParam = rawMsgs;
    }

    if (msgsParam.trim() !== "") {
      messages = msgsParam
        .split("|")
        .map((msg) => msg.trim())
        .filter((msg) => msg !== "");
    }
  } catch (e) {
    console.error("Invalid string in msgs param", e);
  }
}
if (urlParams.has("imgs")) {
  try {
    const rawImgs = urlParams.get("imgs");
    let imgsParam;
    try {
      imgsParam = decodeURIComponent(atob(rawImgs));
    } catch (e) {
      imgsParam = rawImgs;
    }

    if (imgsParam.trim() !== "") {
      customImages = imgsParam.split("||");
    }
  } catch (e) {
    console.error("Invalid string in imgs param", e);
  }
}

const bgMusic = document.getElementById("bgMusic");
const popSound = document.getElementById("popSound");
const introOverlay = document.getElementById("introOverlay");
const mainContent = document.getElementById("mainContent");

function playPopSound() {
  if (popSound) {
    popSound.currentTime = 0;
    popSound.play().catch((err) => console.log("Sound play blocked"));
  }
}

function showToast(message) {
  let toast = document.querySelector(".toast-notification");
  if (toast) toast.remove();

  toast = document.createElement("div");
  toast.className = "toast-notification";
  toast.innerText = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 1500);
}

function startExperience(e) {
  if (e) {
    if (e.type === "touchstart" && e.cancelable) e.preventDefault();
  }

  // Khởi động âm nhạc ngay lập tức khi người dùng tương tác
  if (bgMusic) {
    bgMusic.play().catch((err) => {
      console.log("Music play blocked", err);
      // Fallback: Thử lại sau 100ms
      setTimeout(() => bgMusic.play(), 100);
    });
  }

  if (popSound) {
    popSound.play().catch((err) => console.log("Pop sound blocked", err));
  }

  introOverlay.classList.add("fade-out");
  mainContent.classList.remove("hidden");
  document.body.classList.remove("container");

  setTimeout(() => {
    isGifting = true;
    isMessaging = true;
    createFallingImage();
    createFallingMessage();
    giftInterval = setInterval(createFallingImage, 1000);
    messageInterval = setInterval(createFallingMessage, 1500);
  }, 7000);

  setTimeout(() => {
    if (introOverlay) introOverlay.remove();
  }, 1000);
}

// Lắng nghe cả click và touchstart để đảm bảo trên mobile hoạt động tốt
introOverlay.addEventListener("click", startExperience);
introOverlay.addEventListener("touchstart", startExperience, { passive: false });

const floatingGift = document.querySelector(".floating-gift");
if (floatingGift) {
  floatingGift.addEventListener("click", startExperience);
  floatingGift.addEventListener("touchstart", startExperience, { passive: false });
}

function autoPlayMusic() {
  if (bgMusic.paused) {
    bgMusic
      .play()
      .catch((err) => {
        console.log("Browser blocked autoplay. Waiting for user interaction.");
      });
  }
}

function createFallingImage() {
  if (!isGifting) return;

  const img = document.createElement("img");
  if (customImages.length > 0) {
    img.src = customImages[Math.floor(Math.random() * customImages.length)];
  } else {
    const randomNum = Math.floor(Math.random() * 10) + 1;
    img.src = `./style/img/Anh (${randomNum}).jpg`;
  }
  img.className = "falling-image";

  const width = window.innerWidth;
  const size = width < 600 ? Math.random() * 30 + 40 : Math.random() * 60 + 60;
  const startX = Math.random() * (width - size);
  const duration = Math.random() * 5 + 8; // Rơi chậm hơn (8s đến 13s)

  img.style.left = startX + "px";
  img.style.width = size + "px";
  img.style.height = "auto";
  img.style.animationDuration = duration + "s";

  document.body.appendChild(img);

  setTimeout(() => {
    img.remove();
  }, duration * 1000);
}

function createFallingMessage() {
  if (!isMessaging) return;

  const msgDiv = document.createElement("div");
  msgDiv.className = "falling-message";
  msgDiv.innerText = messages[Math.floor(Math.random() * messages.length)];

  // Cute color palette
  const colors = [
    { text: "#ff69b4", border: "#ffb6c1" }, // Pink
    { text: "#9370db", border: "#e6e6fa" }, // Purple
    { text: "#40e0d0", border: "#afeeee" }, // Turquoise
    { text: "#ff8c00", border: "#ffe4b5" }, // Orange
    { text: "#20b2aa", border: "#e0ffff" }, // Light Sea Green
    { text: "#ff1493", border: "#ffc0cb" }, // Deep Pink
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const width = window.innerWidth;
  const padding = 20;
  const duration = Math.random() * 5 + 5; // 5s to 10s
  const fontSize = width < 600 ? Math.random() * 4 + 12 : Math.random() * 6 + 16;

  document.body.appendChild(msgDiv);

  // Sau khi append mới lấy được chiều rộng thực tế của div
  const msgWidth = msgDiv.offsetWidth;
  const maxLeft = width - msgWidth - padding;
  const startX = Math.random() * (maxLeft - padding) + padding;

  msgDiv.style.left = Math.max(padding, startX) + "px";
  msgDiv.style.fontSize = fontSize + "px";
  msgDiv.style.color = randomColor.text;
  msgDiv.style.borderColor = randomColor.border;
  msgDiv.style.animationDuration = duration + "s";

  setTimeout(() => {
    msgDiv.remove();
  }, duration * 1000);
}

document.addEventListener("click", (e) => {
  autoPlayMusic();
  playPopSound();

  createHearts(e.clientX, e.clientY);
});

document.addEventListener("touchstart", (e) => {
  autoPlayMusic();
  playPopSound();

  createHearts(e.touches[0].clientX, e.touches[0].clientY);
});

function createHearts(x, y) {
  const numHearts = 15;
  const icons = Array.from(explosionIcon).filter((char) => char.trim() !== "");

  for (let i = 0; i < numHearts; i++) {
    const heart = document.createElement("div");
    heart.innerHTML = icons[Math.floor(Math.random() * icons.length)] || "💗";
    heart.className = "heart";

    const angle = Math.random() * Math.PI * 2;
    const distance = 50 + Math.random() * 150;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    heart.style.setProperty("--x", dx);
    heart.style.setProperty("--y", dy);
    heart.style.left = x + "px";
    heart.style.top = y + "px";
    const width = window.innerWidth;
    heart.style.fontSize = width < 600 ? Math.random() * 12 + 8 + "px" : Math.random() * 20 + 10 + "px";
    heart.style.setProperty("--r", Math.random() * 360 - 180 + "deg");

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1000);
  }
}

function program(delay = 200) {
  (function () {
    const _b = (s) => decodeURIComponent(escape(atob(s)));
    const _d = [
      "QuG6o24gcXV54buBbiB0aHXhu5ljIHbhu4IgRHIuR2lmdGVy",
      "VGlrdG9rOiBodHRwczovL3d3dy50aWt0b2suY29tL0Bkci5naWZ0ZXIzMDY=",
      "R2l0aHViOiBodHRwczovL2dpdGh1Yi5jb20vRHJHaWZ0ZXI=",
    ];

    setTimeout(() => {
      _d.forEach((x) => console.log(_b(x)));
    }, delay);
  })();
}

program();

