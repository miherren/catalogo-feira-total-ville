const filterButtons = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".item-card");
const searchInput = document.getElementById("searchInput");
const emptyMessage = document.getElementById("emptyMessage");
let activeCategory = "todos";

function updateCatalog() {
  const term = searchInput.value.trim().toLocaleLowerCase("pt-BR");
  let visibleCount = 0;

  cards.forEach((card) => {
    const categoryMatches = activeCategory === "todos" || card.dataset.category === activeCategory;
    const searchText = `${card.dataset.search} ${card.innerText}`.toLocaleLowerCase("pt-BR");
    const searchMatches = searchText.includes(term);
    const visible = categoryMatches && searchMatches;
    card.hidden = !visible;
    if (visible) visibleCount++;
  });

  emptyMessage.hidden = visibleCount > 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeCategory = button.dataset.filter;
    updateCatalog();
  });
});

searchInput.addEventListener("input", updateCatalog);
