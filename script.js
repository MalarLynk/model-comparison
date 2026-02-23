document.addEventListener('DOMContentLoaded', () => {

    const motorFilter = document.getElementById("motorFilter");
    const variantFilter = document.getElementById("variantFilter");

    motorFilter.addEventListener("change", applyFilters);
    variantFilter.addEventListener("change", applyFilters);

    // =====================================================
    // ✅ Collapsible functionality for ALL sections
    // =====================================================
    const sectionHeaders = document.querySelectorAll('.section-header');

    sectionHeaders.forEach(header => {
        const sectionName = header.dataset.section;
        const toggleButton = header.querySelector('.toggle-section');
        const sectionRows = document.querySelectorAll(`.section-row.${sectionName}`);

        if (!toggleButton || sectionRows.length === 0) return;

        toggleButton.addEventListener('click', () => {
            const isCollapsed = sectionRows[0].classList.contains('collapsed');

            sectionRows.forEach(row => {
                if (!isCollapsed) {
                    row.classList.add('collapsed');
                    setTimeout(() => row.classList.add('hidden'), 350);
                } else {
                    row.classList.remove('hidden');
                    requestAnimationFrame(() => row.classList.remove('collapsed'));
                }
            });

            toggleButton.textContent = isCollapsed ? '-' : '+';
        });
    });

    // =====================================================
    // Filters
    // =====================================================
    function applyFilters() {
        const motorValue = motorFilter.value;
        const variantValue = variantFilter.value;

        const table = document.querySelector("table");
        const rows = table.querySelectorAll("tbody tr");

        let motorRow, variantRow, colorRow;

        rows.forEach(row => {
            const label = row.querySelector("th")?.innerText.trim();
            if (label === "Motor Type") motorRow = row;
            if (label === "Variant") variantRow = row;
            if (label === "Colors") colorRow = row;
        });

        if (!motorRow || !variantRow || !colorRow) return;

        const motorCells = motorRow.querySelectorAll("td");
        const variantCells = variantRow.querySelectorAll("td");
        const colorCells = colorRow.querySelectorAll("td");

// ---------------- Variant Split Cells (GLOBAL) ----------------
    document.querySelectorAll(".variant-split").forEach(split => {
        const core = split.querySelector(".core");
        const more = split.querySelector(".more");

        if (!core || !more) return;

        // Reset
        core.style.display = "";
        more.style.display = "";
        split.style.gridTemplateColumns = "1fr 1fr";

        if (variantValue === "Core") {
            more.style.display = "none";
            split.style.gridTemplateColumns = "1fr";
        }

        if (variantValue === "More") {
            core.style.display = "none";
            split.style.gridTemplateColumns = "1fr";
        }
    });

        // ---------------- Color Cell Visibility ----------------
        colorCells.forEach(cell => {
            const color1 = cell.querySelector(".color1");
            const color2 = cell.querySelector(".color2");
            const split = cell.querySelector(".color-split");

            if (!color1 || !color2 || !split) return;

            color1.style.display = "";
            color2.style.display = "";
            split.style.gridTemplateColumns = "1fr 1fr";

            if (variantValue === "Core") {
                color2.style.display = "none";
                split.style.gridTemplateColumns = "1fr";
            } else if (variantValue === "More") {
                color1.style.display = "none";
                split.style.gridTemplateColumns = "1fr";
            }
        });

        // ---------------- Combined Motor + Variant Column Filtering ----------------
        motorCells.forEach((motorCell, i) => {
            const motorMatch = !motorValue || motorCell.innerText.trim() === motorValue;

            const variantCell = variantCells[i];
            let variantMatch = true;

            if (variantValue) {
                if (!variantCell) {
                    variantMatch = false;
                } else {
                    const core = variantCell.querySelector(".core");
                    const more = variantCell.querySelector(".more");

                    if (!core || !more) {
                        variantMatch = false;
                    } else {
                        if (variantValue === "Core") variantMatch = core.style.display !== "none";
                        if (variantValue === "More") variantMatch = more.style.display !== "none";
                    }
                }
            }

            toggleColumn(i + 1, motorMatch && variantMatch);
        });

        centerVisibleColumns();
    }

    // =====================================================
    // Column toggler
    // =====================================================
    function toggleColumn(colIndex, show) {
        document.querySelectorAll("table tr").forEach(row => {
            const cell = row.children[colIndex];
            if (!cell) return;

            if (show) {
                cell.style.display = "";
                requestAnimationFrame(() => cell.classList.remove("col-hidden"));
            } else {
                cell.classList.add("col-hidden");
                setTimeout(() => { cell.style.display = "none"; }, 250);
            }
        });
    }

    // =====================================================
    // Lightbox
    // =====================================================
    const modelImages = document.querySelectorAll('.model-img');
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.getElementById('closeLightbox');

    modelImages.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.remove('hidden');
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => e.target === lightbox && closeLightbox());

    function closeLightbox() {
        lightbox.classList.add('hidden');
        lightboxImg.src = '';
    }

    // =====================================================
    // Auto center visible columns
    // =====================================================
    function centerVisibleColumns() {
        const container = document.querySelector(".table-scroll");
        const table = container.querySelector("table");

        const visibleWidth = table.scrollWidth;
        const viewportWidth = container.clientWidth;

        const scrollLeft = Math.max((visibleWidth - viewportWidth) / 2, 0);

        container.scrollTo({
            left: scrollLeft,
            behavior: "smooth"
        });
    }

});
