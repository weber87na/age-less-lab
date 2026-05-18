const panels = document.querySelectorAll(".panel");
const links = document.querySelectorAll(".nav-hit");

/**
 * 使用 IntersectionObserver 追蹤當前捲動到的區塊
 * 並更新導覽列連結的 aria-current 狀態
 */
const observerOptions = {
  root: null,
  // 設定 rootMargin 讓判定點稍微靠上，提升使用者體驗
  rootMargin: "-20% 0px -70% 0px",
  threshold: 0,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      links.forEach((link) => {
        if (link.getAttribute("href") === `#${id}`) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }
  });
}, observerOptions);

panels.forEach((panel) => observer.observe(panel));

/**
 * 影片滾動視差效果
 */
const video = document.querySelector(".feature-video");
const videoSection = document.querySelector(".video-section");

window.addEventListener("scroll", () => {
  if (!video || !videoSection) return;

  const sectionRect = videoSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // 當區塊進入視窗時計算偏移量
  if (sectionRect.top < windowHeight && sectionRect.bottom > 0) {
    // 計算區塊中心相對於視窗中心的位移 (比例從 -1 到 1)
    const distanceToCenter = (sectionRect.top + sectionRect.height / 2) - (windowHeight / 2);
    const scrollRatio = distanceToCenter / (windowHeight / 2);
    
    // 設定位移量 (負值代表與捲動方向相反)
    const translateY = scrollRatio * 50; // 最大位移 50px
    video.style.transform = `translateY(${translateY}px)`;
  }
});
