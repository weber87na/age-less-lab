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
