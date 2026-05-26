let allPosts = [];

async function loadPosts() {
  try {
    const response = await fetch("data/posts.json");
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    allPosts = await response.json();
    renderPosts("all");
  } catch (error) {
    console.error("Failed to load posts:", error);
  }
}

function renderPosts(category) {
  const container = document.getElementById("posts-container");
  
  if (!container) {
    console.error("Target container #posts-container not found in the DOM.");
    return;
  }

  container.innerHTML = "";

  // UPDATED FILTER LOGIC: Uses .includes() to check inside the category array
  const filtered = category === "all" 
    ? allPosts 
    : allPosts.filter(post => Array.isArray(post.category) && post.category.includes(category));

  filtered.forEach((post, index) => {
    container.innerHTML += `
      <a href="${post.slug}" class="blog-card ${index === 0 ? "featured" : ""}">
        <div>
          <span class="blog-card-num">${String(index + 1).padStart(2, "0")}</span>
          <span class="blog-card-tag">${post.tag}</span>
          <h2 class="blog-card-title">${post.title}</h2>
          <p class="blog-card-excerpt">${post.excerpt}</p>
        </div>
        <div class="blog-card-footer">
          <span class="blog-card-meta">${post.date}</span>
          <span class="blog-card-read">${post.read}</span>
        </div>
      </a>
    `;
  });
}

function blogFilter(category, button) {
  document.querySelectorAll(".blog-filter-btn").forEach(btn => btn.classList.remove("active"));
  button.classList.add("active");
  renderPosts(category);
}

document.addEventListener("DOMContentLoaded", loadPosts);