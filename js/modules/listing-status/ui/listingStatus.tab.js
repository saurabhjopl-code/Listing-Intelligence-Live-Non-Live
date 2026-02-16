// listingStatus.tab.js
// Full UI Rendering with Dummy Data (No Engines Connected Yet)

export function renderListingStatusTab(container) {
  container.innerHTML = "";
  container.classList.add("listing-status-wrapper");

  const dummyData = getDummyData();

  container.appendChild(renderHeader(dummyData));
  container.appendChild(renderProgressSection(dummyData));
  container.appendChild(renderFilters());
  container.appendChild(renderSummaryCards(dummyData));
  container.appendChild(renderStyleTable(dummyData));
  container.appendChild(renderLiveDateModal());
}

/* ================= HEADER ================= */

function renderHeader(data) {
  const header = document.createElement("div");
  header.className = "ls-header";

  header.innerHTML = `
    <div class="ls-header-top">
      <div class="ls-logo">
        <img src="./assets/logo.png" alt="Logo" />
      </div>
      <div class="ls-title">
        <h1>Listing Intelligence</h1>
        <span>Live / Non-Live Dashboard</span>
      </div>
    </div>
  `;

  return header;
}

/* ================= PROGRESS SECTION ================= */

function renderProgressSection(data) {
  const totalExpected = data.reduce((a, b) => a + b.expected, 0);
  const totalLive = data.reduce((a, b) => a + b.live, 0);
  const percent = Math.round((totalLive / totalExpected) * 100);

  const wrapper = document.createElement("div");
  wrapper.className = "ls-progress-section";

  wrapper.innerHTML = `
    <div class="ls-progress-bar">
      <div class="ls-progress-fill" style="width:${percent}%"></div>
    </div>
    <div class="ls-progress-meta">
      <strong>${percent}% SKU Completion</strong>
      <span>12,450 Sheet Rows Loaded</span>
    </div>
  `;

  return wrapper;
}

/* ================= FILTER BAR ================= */

function renderFilters() {
  const filterBar = document.createElement("div");
  filterBar.className = "ls-filters";

  filterBar.innerHTML = `
    <input type="text" placeholder="Search Style ID" />
    <select>
      <option>All Channels</option>
      <option>Flipkart</option>
      <option>Amazon</option>
    </select>
    <select>
      <option>All Accounts</option>
      <option>SVF</option>
      <option>Main</option>
    </select>
  `;

  return filterBar;
}

/* ================= SUMMARY CARDS ================= */

function renderSummaryCards(data) {
  const totalStyles = data.length;
  const fully = data.filter(d => d.status === "Full").length;
  const partial = data.filter(d => d.status === "Partial").length;
  const pending = data.filter(d => d.status === "Pending").length;

  const wrapper = document.createElement("div");
  wrapper.className = "ls-summary-grid";

  wrapper.innerHTML = `
    ${card("Total Styles", totalStyles)}
    ${card("Fully Listed", fully)}
    ${card("Partial", partial)}
    ${card("Pending", pending)}
  `;

  return wrapper;
}

function card(label, value) {
  return `
    <div class="ls-card">
      <div class="ls-card-value">${value}</div>
      <div class="ls-card-label">${label}</div>
    </div>
  `;
}

/* ================= STYLE TABLE ================= */

function renderStyleTable(data) {
  const table = document.createElement("div");
  table.className = "ls-table";

  data.forEach(style => {
    const styleRow = document.createElement("div");
    styleRow.className = "ls-style-row";

    styleRow.innerHTML = `
      <div class="ls-style-main">
        <span class="ls-expand">▶</span>
        <span class="ls-style-id">${style.styleId}</span>
        <span>${style.expected}</span>
        <span>${style.live}</span>
        <span>${style.missing.join(", ")}</span>
        <span class="ls-status ${style.status.toLowerCase()}">${style.status}</span>
        <span class="ls-live-btn">View</span>
      </div>
    `;

    const skuContainer = document.createElement("div");
    skuContainer.className = "ls-sku-container hidden";

    style.skus.forEach(sku => {
      const skuRow = document.createElement("div");
      skuRow.className = "ls-sku-row";

      skuRow.innerHTML = `
        <span class="ls-expand-sku">▶</span>
        <span>${sku.sku}</span>
        <span>${sku.size}</span>
        <span>${sku.listings}</span>
      `;

      const detailRow = document.createElement("div");
      detailRow.className = "ls-detail-row hidden";

      detailRow.innerHTML = `
        ${sku.accounts.map(acc => `
          <div>${acc.account} → ${acc.count} Listings → ${acc.liveDate}</div>
        `).join("")}
      `;

      skuRow.addEventListener("click", () => {
        detailRow.classList.toggle("hidden");
      });

      skuContainer.appendChild(skuRow);
      skuContainer.appendChild(detailRow);
    });

    styleRow.querySelector(".ls-expand").addEventListener("click", () => {
      skuContainer.classList.toggle("hidden");
    });

    styleRow.querySelector(".ls-live-btn").addEventListener("click", () => {
      openModal(style);
    });

    table.appendChild(styleRow);
    table.appendChild(skuContainer);
  });

  return table;
}

/* ================= MODAL ================= */

function renderLiveDateModal() {
  const modal = document.createElement("div");
  modal.className = "ls-modal hidden";
  modal.id = "ls-live-modal";

  modal.innerHTML = `
    <div class="ls-modal-content">
      <div class="ls-modal-header">
        <span id="ls-modal-title"></span>
        <button id="ls-close-modal">X</button>
      </div>
      <div id="ls-modal-body"></div>
    </div>
  `;

  modal.querySelector("#ls-close-modal").onclick = () => {
    modal.classList.add("hidden");
  };

  document.body.appendChild(modal);
  return document.createElement("div"); // placeholder
}

function openModal(style) {
  const modal = document.getElementById("ls-live-modal");
  const title = document.getElementById("ls-modal-title");
  const body = document.getElementById("ls-modal-body");

  title.innerText = `Style ${style.styleId} – Live Timeline`;

  body.innerHTML = style.skus.map(sku => `
    <div>
      <strong>${sku.sku}</strong>
      ${sku.accounts.map(acc => `
        <div>${acc.account} → ${acc.liveDate}</div>
      `).join("")}
    </div>
  `).join("");

  modal.classList.remove("hidden");
}

/* ================= DUMMY DATA ================= */

function getDummyData() {
  return [
    {
      styleId: "ST1001",
      expected: 5,
      live: 3,
      missing: ["L", "XL"],
      status: "Partial",
      skus: [
        {
          sku: "ST1001-S",
          size: "S",
          listings: 4,
          accounts: [
            { account: "Flipkart-SVF", count: 2, liveDate: "12 Jan 2024" },
            { account: "Amazon-Main", count: 2, liveDate: "15 Jan 2024" }
          ]
        },
        {
          sku: "ST1001-M",
          size: "M",
          listings: 5,
          accounts: [
            { account: "Flipkart-SVF", count: 3, liveDate: "18 Jan 2024" }
          ]
        }
      ]
    },
    {
      styleId: "ST2002",
      expected: 4,
      live: 4,
      missing: [],
      status: "Full",
      skus: [
        {
          sku: "ST2002-S",
          size: "S",
          listings: 3,
          accounts: [
            { account: "Amazon-Main", count: 3, liveDate: "05 Feb 2024" }
          ]
        }
      ]
    }
  ];
}
