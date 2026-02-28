const PASSWORD = "0214";
const NAVER_MAP_URL = "https://naver.me/Gn0yAgEt";

  // ✅ 9개 이미지 넣기 (파일 경로 or Base64 둘 다 가능)
  const images = [
    "/image/1.png","/image/2.png","/image/2.png",
    "/image/1.png","/image/2.png","/image/2.png",
  
  ];

  // 이미지 없을 때 안 깨지게(선택) - 너가 원하면 제거해도 됨
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

  const gallery = document.getElementById("gallery");

  gallery.innerHTML = images.map((src, i) => `
    <div class="gallery-item">
      <img src="${src}" alt="image ${i+1}" onerror="this.src='${fallback(i+1)}'">
    </div>
  `).join("");

  // (옵션) 클릭 시 크게 보기(필요 없으면 삭제)
  gallery.addEventListener("click", (e) => {
    const img = e.target.closest("img");
    if(!img) return;
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");

gallery.addEventListener("click", (e) => {
  const img = e.target.closest("img");
  if(!img) return;
      modalImg.src = img.src;
      modal.classList.add("show");
    });

    /* 모달 아무데나 클릭하면 닫힘 */
    modal.addEventListener("click", () => {
      modal.classList.remove("show");
    });
  });


const gallary = document.getElementById("gallary");
const mapBtn = document.getElementById("mapBtn");
mapBtn.style.display = "inline-block";

let idx = 0;
let animating = false;
gallary.src = images[idx];

gallary.addEventListener("click", () => {
  if (animating) return;
  animating = true;

  gallary.classList.add("fade");
  setTimeout(() => {
    idx = (idx + 1) % images.length;
    gallary.src = images[idx];

    gallary.onload = () => {
      gallary.classList.remove("fade");
      mapBtn.style.display = "inline-block";
      animating = false;
    };

    setTimeout(() => {
      if (animating) {
        gallary.classList.remove("fade");
        mapBtn.style.display = "inline-block";
        animating = false;
      }
    }, 700);
  }, 400);
});



/* 위치보기 버튼 이벤트 */
const pwModal = document.getElementById("pwModal");
const pwInput = document.getElementById("pwInput");
const pwError = document.getElementById("pwError");
const pwCancel = document.getElementById("pwCancel");
const pwOk = document.getElementById("pwOk");

function openPwModal(){
  pwError.textContent = "";
  pwInput.value = "";
  pwModal.classList.add("show");
  pwModal.setAttribute("aria-hidden", "false");
  setTimeout(() => pwInput.focus(), 50);
}
function closePwModal(){
  pwModal.classList.remove("show");
  pwModal.setAttribute("aria-hidden", "true");
}
function openMapPopup(){
  const w = 1100, h = 800;
  const left = Math.max(0, Math.floor((screen.width - w) / 2));
  const top  = Math.max(0, Math.floor((screen.height - h) / 2));
  window.open(
    NAVER_MAP_URL,
    "naverMapPopup",
    `width=${w},height=${h},left=${left},top=${top},resizable=yes,scrollbars=yes`
  );
}
function checkPassword(){
  const val = pwInput.value;
  if(val === PASSWORD){
    closePwModal();
    openMapPopup();
  }else{
    pwError.textContent = "비밀번호가 일치하지 않습니다.";
    pwInput.focus();
    pwInput.select();
  }
}

mapBtn.addEventListener("click", openPwModal);
pwCancel.addEventListener("click", closePwModal);
pwOk.addEventListener("click", checkPassword);
pwInput.addEventListener("keydown", (e) => {
  if(e.key === "Enter") checkPassword();
  if(e.key === "Escape") closePwModal();
});
pwModal.addEventListener("click", (e) => {
  if(e.target === pwModal) closePwModal();
});