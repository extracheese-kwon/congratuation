// ===== 설정 =====
const PASSWORD = "0214";
const NAVER_MAP_URL = "https://naver.me/Gn0yAgEt";

// ✅ 3x3 (총 9개가 이상적이지만, 너가 넣는 만큼 렌더됨)
const images = [
  "image/1.png","image/2.png","image/3.png",
  "image/4.png","image/5.png","image/6.png",
  "image/7.png","image/8.png","image/9.png",
];

// 이미지 없을 때 안 깨지게(선택)
const fallback = (n) =>
  "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0' stop-color='#2a1452'/>
          <stop offset='1' stop-color='#0c0618'/>
        </linearGradient>
      </defs>
      <rect width='100%' height='100%' fill='url(#g)'/>
      <text x='50%' y='50%' text-anchor='middle' dominant-baseline='middle'
        font-size='52' fill='#f7d36a' font-family='serif'>${n}</text>
    </svg>
  `);

document.addEventListener("DOMContentLoaded", () => {
  // ===== 1) 3x3 갤러리 렌더링 + 클릭 시 확대 모달 =====
  const gallery = document.getElementById("gallery");
  const imgModal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");

  if (!gallery) console.error("id='gallery' 요소가 없어요.");
  if (!imgModal) console.error("id='imgModal' 요소가 없어요.");
  if (!modalImg) console.error("id='modalImg' 요소가 없어요.");

  if (gallery) {
    gallery.innerHTML = images.map((src, i) => `
      <div class="gallery-item">
        <img src="${src}" alt="image ${i + 1}" onerror="this.src='${fallback(i + 1)}'">
      </div>
    `).join("");

    // 이미지 클릭 → 모달 열기
    gallery.addEventListener("click", (e) => {
      const img = e.target.closest("img");
      if (!img || !imgModal || !modalImg) return;

      modalImg.src = img.src;
      imgModal.classList.add("show");
      document.body.style.overflow = "hidden"; // 배경 스크롤 방지(선택)
    });
  }

  // 모달 아무데나 클릭 → 닫기
  if (imgModal) {
    imgModal.addEventListener("click", () => {
      imgModal.classList.remove("show");
      document.body.style.overflow = "";
    });
  }

  // ===== 2) 위치보기 버튼 → 비밀번호 모달 → 일치 시 네이버 URL 호출 =====
  const mapBtn = document.getElementById("mapBtn");
  const pwModal = document.getElementById("pwModal");
  const pwInput = document.getElementById("pwInput");
  const pwError = document.getElementById("pwError");
  const pwCancel = document.getElementById("pwCancel");
  const pwOk = document.getElementById("pwOk");

  if (!mapBtn) console.error("id='mapBtn' 요소가 없어요.");
  if (!pwModal || !pwInput || !pwError || !pwCancel || !pwOk) {
    console.error("비밀번호 모달 요소(id)가 일부 없어요.", { pwModal, pwInput, pwError, pwCancel, pwOk });
  }

  // 버튼은 항상 보이게 (원하면 CSS로 처리해도 됨)
  if (mapBtn) mapBtn.style.display = "inline-block";

  function openPwModal() {
    if (!pwModal || !pwInput || !pwError) return;
    pwError.textContent = "";
    pwInput.value = "";
    pwModal.classList.add("show");
    pwModal.setAttribute("aria-hidden", "false");
    setTimeout(() => pwInput.focus(), 50);
  }

  function closePwModal() {
    if (!pwModal) return;
    pwModal.classList.remove("show");
    pwModal.setAttribute("aria-hidden", "true");
  }

  function openMapPopup() {
    // 모바일에서 팝업 차단될 수 있어서, 새창 대신 현재창 이동을 원하면 location.href로 바꿔도 됨.
    // location.href = NAVER_MAP_URL;  // <- 팝업 없이 이동
    window.open(NAVER_MAP_URL, "_blank");
  }

  function checkPassword() {
    if (!pwInput || !pwError) return;
    const val = pwInput.value;

    if (val === PASSWORD) {
      closePwModal();
      openMapPopup();
    } else {
      pwError.textContent = "비밀번호가 일치하지 않습니다.";
      pwInput.focus();
      pwInput.select();
    }
  }

  if (mapBtn) mapBtn.addEventListener("click", openPwModal);
  if (pwCancel) pwCancel.addEventListener("click", closePwModal);
  if (pwOk) pwOk.addEventListener("click", checkPassword);

  // Enter=확인, Esc=닫기
  if (pwInput) {
    pwInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") checkPassword();
      if (e.key === "Escape") closePwModal();
    });
  }

  // 모달 배경 클릭 시 닫기
  if (pwModal) {
    pwModal.addEventListener("click", (e) => {
      if (e.target === pwModal) closePwModal();
    });
  }
});