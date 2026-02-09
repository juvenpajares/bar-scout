const barsList = document.getElementById("barsList");
const compareList = document.getElementById("compareList");
const reportsList = document.getElementById("reportsList");
const priceFilter = document.getElementById("priceFilter");
const vibeFilter = document.getElementById("vibeFilter");
const applyFilters = document.getElementById("applyFilters");

let selectedBars = [];

async function fetchBars() {
  const params = new URLSearchParams();
  if (priceFilter.value) params.set("priceRange", priceFilter.value);
  if (vibeFilter.value) params.set("vibe", vibeFilter.value);

  const response = await fetch(`/api/bars?${params.toString()}`);
  const payload = await response.json();
  renderBars(payload.data);
}

function renderBars(bars) {
  barsList.innerHTML = "";
  if (!bars.length) {
    barsList.innerHTML = '<p class="muted">No bars match the filters.</p>';
    return;
  }

  bars.forEach((bar) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h4>${bar.name}</h4>
      <p class="muted">${bar.address}</p>
      <p>Beer Avg: ₱${bar.avgBeerPrice} · Entry: ₱${bar.entryFee}</p>
      <div>
        ${bar.vibeTags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
        ${bar.cautionBadge.enabled ? `<span class="tag caution">User Caution</span>` : ""}
      </div>
      <button class="ghost" data-id="${bar.id}">Compare</button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      toggleCompare(bar);
    });

    barsList.appendChild(card);
  });
}

function toggleCompare(bar) {
  if (selectedBars.find((item) => item.id === bar.id)) {
    selectedBars = selectedBars.filter((item) => item.id !== bar.id);
  } else if (selectedBars.length < 3) {
    selectedBars = [...selectedBars, bar];
  }

  renderCompare();
  fetchReports();
}

function renderCompare() {
  compareList.innerHTML = "";
  if (!selectedBars.length) {
    compareList.innerHTML = '<p class="muted">Select bars to compare.</p>';
    return;
  }

  selectedBars.forEach((bar) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h4>${bar.name}</h4>
      <p>Rating: ${bar.ratingAvg} ⭐ (${bar.reviewCount} reviews)</p>
      <p>Beer Avg: ₱${bar.avgBeerPrice}</p>
      <p>Entry Fee: ₱${bar.entryFee}</p>
    `;
    compareList.appendChild(card);
  });
}

async function fetchReports() {
  reportsList.innerHTML = "";
  if (!selectedBars.length) {
    reportsList.innerHTML = '<p class="muted">Select a bar to see live reports.</p>';
    return;
  }

  const bar = selectedBars[0];
  const response = await fetch(`/api/bars/${bar.id}/reports`);
  const payload = await response.json();

  if (!payload.data.length) {
    reportsList.innerHTML = '<p class="muted">No live reports yet.</p>';
    return;
  }

  payload.data.forEach((report) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h4>${report.type}</h4>
      <p class="muted">${report.description}</p>
      <p>Helpful: ${report.helpfulVotes}</p>
    `;
    reportsList.appendChild(card);
  });
}

applyFilters.addEventListener("click", fetchBars);

fetchBars();
renderCompare();
fetchReports();
