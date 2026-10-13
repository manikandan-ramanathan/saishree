const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    navigation.classList.toggle("is-open", open);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
    }
  });
}

const playerDialog = document.querySelector(".player-dialog");
const playerFrame = playerDialog?.querySelector(".player-frame");
const playerTitle = playerDialog?.querySelector("[data-player-title]");
const fallbackLink = playerDialog?.querySelector("[data-fallback-link]");

if (playerDialog && playerFrame && playerTitle && fallbackLink) {
  document.querySelectorAll(".js-play[data-video-id]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const videoId = trigger.dataset.videoId;
      if (!/^[\w-]+$/.test(videoId || "")) {
        window.location.assign("watch.html");
        return;
      }

      const title = trigger.dataset.videoTitle || "Saishri Prabhakaran";
      const watchUrl = `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
      const embedUrl = new URL(`https://www.youtube.com/embed/${encodeURIComponent(videoId)}`);
      embedUrl.searchParams.set("autoplay", "1");
      embedUrl.searchParams.set("playsinline", "1");
      embedUrl.searchParams.set("rel", "0");
      if (location.protocol === "https:" || location.protocol === "http:") {
        embedUrl.searchParams.set("origin", location.origin);
      }

      const iframe = document.createElement("iframe");
      iframe.src = embedUrl.toString();
      iframe.title = title;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      playerTitle.textContent = title;
      fallbackLink.href = watchUrl;
      playerFrame.replaceChildren(iframe);
      playerDialog.showModal();
      document.body.classList.add("dialog-open");
      playerDialog.querySelector(".dialog-close").focus();
    });
  });

  playerDialog.querySelector(".dialog-close").addEventListener("click", () => playerDialog.close());
  playerDialog.addEventListener("close", () => {
    playerFrame.replaceChildren();
    document.body.classList.remove("dialog-open");
  });
  playerDialog.addEventListener("click", (event) => {
    if (event.target === playerDialog) playerDialog.close();
  });
}

const lightbox = document.querySelector(".lightbox");
if (lightbox) {
  const image = lightbox.querySelector("img");
  const closeButton = lightbox.querySelector(".dialog-close");

  document.querySelectorAll("[data-lightbox]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      image.src = trigger.dataset.lightbox;
      image.alt = trigger.dataset.alt || "";
      lightbox.showModal();
      document.body.classList.add("dialog-open");
      closeButton.focus();
    });
  });

  closeButton.addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("close", () => {
    image.removeAttribute("src");
    document.body.classList.remove("dialog-open");
  });
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });
}

document.querySelectorAll(".filter-button[data-filter]").forEach((filterButton) => {
  filterButton.addEventListener("click", () => {
    const filter = filterButton.dataset.filter;
    document.querySelectorAll(".filter-button[data-filter]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button === filterButton));
    });
    document.querySelectorAll("[data-category]").forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

document.querySelectorAll("[data-year]").forEach((year) => {
  year.textContent = String(new Date().getFullYear());
});

