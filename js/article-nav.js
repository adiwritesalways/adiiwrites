async function loadArticleNavigation() {

try {

const response =
await fetch("../data/posts.json");

if (!response.ok)
throw new Error(
"Failed to load posts"
);

let posts =
await response.json();

posts.sort(
(a,b)=>
new Date(b.date)
-
new Date(a.date)
);

const currentSlug =
window.location.pathname
.split("/")
.pop();

const currentIndex =
posts.findIndex(post => {

const slug =
post.slug
.split("/")
.pop();

return slug === currentSlug;

});

if (
currentIndex === -1
)
return;

const previous =
posts[currentIndex - 1];

const next =
posts[currentIndex + 1];

const container =
document.getElementById(
"essay-navigation"
);

if (!container)
return;

container.innerHTML = "";

function createCard(
post,
direction
){

if (!post)
return "";

const label =
direction === "prev"
? "← Previous Essay"
: "Next Essay →";

const categories =
Array.isArray(
post.category
)
? post.category
.join(" • ")
: post.category;

return `

<div class="essay-card">

<div>

<span class="card-meta">

${categories}

</span>

<h3 class="card-title">

${post.title}

</h3>

<p class="card-excerpt">

${post.excerpt}

</p>

</div>

<a
href="../${post.slug}"
class="card-link"
>

${label}

</a>

</div>

`;

}

container.innerHTML =
createCard(
previous,
"prev"
)
+
createCard(
next,
"next"
);

}

catch(error){

console.error(
"Article navigation error:",
error
);

}

}

document.addEventListener(
"DOMContentLoaded",
loadArticleNavigation
);