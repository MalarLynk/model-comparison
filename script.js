const motorFilter = document.getElementById("motorFilter");
const variantFilter = document.getElementById("variantFilter");

motorFilter.addEventListener("change", filterColumns);
variantFilter.addEventListener("change", filterColumns);

function filterColumns() {
    const motorValue = motorFilter.value;
    const variantValue = variantFilter.value;

    const rows = document.querySelectorAll("#tableBody tr");

    let motorRow, variantRow;

    rows.forEach(row => {
        const label = row.querySelector("th")?.innerText.trim();
        if (label === "Motor Type") motorRow = row;
        if (label === "Variant") variantRow = row;
    });

    if (!motorRow || !variantRow) return;

    const motorCells = motorRow.querySelectorAll("td");
    const variantCells = variantRow.querySelectorAll("td");

    for (let i = 0; i < motorCells.length; i++) {
        const motorMatch = !motorValue || motorCells[i].innerText.trim() === motorValue;
        const variantMatch = !variantValue || variantCells[i].innerText.trim() === variantValue;

        toggleColumn(i + 1, motorMatch && variantMatch);
    }
}

function toggleColumn(colIndex, show) {
    document.querySelectorAll("table tr").forEach(row => {
        const cell = row.children[colIndex];
        if (cell) cell.style.display = show ? "table-cell" : "none";
    });
}
