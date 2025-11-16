import { getCartCount } from "./cart.js";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatCurrency = (value) =>
  currencyFormatter.format(Number(value));

// Helper function to get image path with base URL for GitHub Pages
export const getImagePath = (path) => {
  // Get base URL from Vite config or detect from current location
  let baseUrl = import.meta.env.BASE_URL;
  
  // If BASE_URL is not set or is '/', try to detect from current path
  if (!baseUrl || baseUrl === '/') {
    const currentPath = window.location.pathname;
    // Check if we're on GitHub Pages (path contains repo name)
    if (currentPath.includes('/COMIC_VERSE/')) {
      baseUrl = '/COMIC_VERSE/';
    } else {
      baseUrl = '/';
    }
  }
  
  // Ensure baseUrl ends with /
  if (!baseUrl.endsWith('/')) {
    baseUrl += '/';
  }
  
  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  return `${baseUrl}${cleanPath}`;
};

export const renderComics = (container, comics) => {
  if (!container) return;
  if (!comics.length) {
    container.innerHTML = `<div class="catalog-empty">No comics match your filters. Try a different combination.</div>`;
    return;
  }
  container.innerHTML = comics.map((comic) => createComicCard(comic)).join("");
};

export const createComicCard = (comic) => {
  const detailUrl = `comic-detail.html?id=${encodeURIComponent(comic.id)}`;
  return `
    <article class="card-comic">
      <img src="${getImagePath(comic.coverImg)}" alt="Cover for ${comic.title}" loading="lazy" />
      <div class="card-body">
        <p class="badge">${comic.publisher}</p>
        <h3>${comic.title}</h3>
        <p class="card-meta">
          <span>${comic.genre.join(", ")}</span>
          <span class="price-tag">${formatCurrency(comic.price)}</span>
        </p>
        <a class="btn btn-secondary" href="${detailUrl}">View Details</a>
      </div>
    </article>
  `;
};

export const showToast = (message) => {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
};

export const syncCartBadge = () => {
  const badge = document.querySelector("[data-cart-count]");
  if (badge) {
    badge.textContent = getCartCount();
  }
};

window.addEventListener("cart:update", syncCartBadge);
window.addEventListener("DOMContentLoaded", syncCartBadge);

export const getQueryParam = (key) => {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
};
