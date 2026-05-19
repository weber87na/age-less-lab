// 註冊 GSAP 插件
gsap.registerPlugin(ScrollTrigger);

const panels = document.querySelectorAll(".panel");
const links = document.querySelectorAll(".nav-hit");
const stickyLinks = document.querySelectorAll(".sticky-nav a");
const allNavLinks = [...links, ...stickyLinks];

/**
 * 1. 導覽與區塊進場動畫
 */
panels.forEach((panel) => {
  gsap.set(panel, { opacity: 0, y: 40 });

  gsap.to(panel, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: panel,
      start: "top 90%",
      toggleActions: "play none none none",
      once: true,
    }
  });

  ScrollTrigger.create({
    trigger: panel,
    start: "top 40%",
    end: "bottom 40%",
    onToggle: (self) => {
      if (self.isActive) {
        const id = panel.id;
        allNavLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${id}`) {
            link.setAttribute("aria-current", "page");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      }
    }
  });
});

/**
 * 2. 懸浮導覽列顯示控制
 */
const stickyHeader = document.querySelector(".sticky-header");
const titleSection = document.querySelector(".title");

if (stickyHeader && titleSection) {
  ScrollTrigger.create({
    trigger: titleSection,
    start: "bottom top",
    onEnter: () => stickyHeader.classList.add("is-visible"),
    onLeaveBack: () => stickyHeader.classList.remove("is-visible"),
  });
}

/**
 * 3. 影片滾動視差
 */
const video = document.querySelector(".feature-video");
const videoSection = document.querySelector(".video-section");

if (video && videoSection) {
  gsap.to(video, {
    y: 120,
    rotation: 2,
    ease: "none",
    scrollTrigger: {
      trigger: videoSection,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    }
  });
}

/**
 * 4. 進階拆解式滾動視差 (Deconstructed Parallax)
 * 為每個蔬菜獨立元素賦予不同的位移參數，營造深淺層次感
 */
const parallaxGaps = document.querySelectorAll('.parallax-gap');

parallaxGaps.forEach(gap => {
  const bg = gap.querySelector('.layer-bg');
  const front = gap.querySelector('.layer-front');
  
  // 遠景、中景、近景元素分組
  const farItems = gap.querySelectorAll('.v-far');
  const midItems = gap.querySelectorAll('.v-mid');
  const nearItems = gap.querySelectorAll('.v-near');

  // 1. 遠景：極慢速位移 (y: 100)
  if (bg) {
    gsap.to(bg, {
      y: 100,
      ease: "none",
      scrollTrigger: { trigger: gap, start: "top bottom", end: "bottom top", scrub: true }
    });
  }
  farItems.forEach(item => {
    gsap.to(item, {
      y: 150,
      x: 30,
      rotation: 10,
      ease: "none",
      scrollTrigger: { trigger: gap, start: "top bottom", end: "bottom top", scrub: true }
    });
  });

  // 2. 中景：中速位移 (y: -300 ~ -400)
  midItems.forEach((item, index) => {
    gsap.to(item, {
      y: -300 - (index * 50),
      x: (index % 2 === 0) ? 50 : -50,
      rotation: (index % 2 === 0) ? 20 : -20,
      ease: "none",
      scrollTrigger: { trigger: gap, start: "top bottom", end: "bottom top", scrub: true }
    });
  });

  // 3. 近景：快速位移，營造極強穿透感 (y: -600 ~ -800)
  nearItems.forEach(item => {
    gsap.to(item, {
      y: -700,
      x: 100,
      scale: 1.5,
      rotation: 45,
      filter: "blur(0px)",
      ease: "none",
      scrollTrigger: { trigger: gap, start: "top bottom", end: "bottom top", scrub: true }
    });
  });

  // 4. 前景碎點：最快速位移
  if (front) {
    gsap.to(front, {
      yPercent: -100,
      ease: "none",
      scrollTrigger: { trigger: gap, start: "top bottom", end: "bottom top", scrub: true }
    });
  }
});

/**
 * 5. 初始載入控制
 */
window.addEventListener("DOMContentLoaded", () => {
  gsap.to(document.body, { opacity: 1, duration: 1 });
});
