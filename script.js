document.addEventListener('DOMContentLoaded', () => {
    // ====================== Filtering Logic ======================
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
            if (!cell) return;
            if (show) {
                cell.style.display = "";
                requestAnimationFrame(() => { cell.classList.remove("col-hidden"); });
            } else {
                cell.classList.add("col-hidden");
                setTimeout(() => { cell.style.display = "none"; }, 250);
            }
        });
    }

    // ================== Collapsible sections ==================
    document.querySelectorAll('.toggle-section').forEach(button => {
        button.addEventListener('click', () => {
            const sectionHeader = button.closest('.section-header');
            const sectionName = sectionHeader.dataset.section;
            const rows = document.querySelectorAll('.section-row.' + sectionName);
        
            const isCollapsed = rows[0].classList.contains('collapsed');
            rows.forEach(row => {
                if (isCollapsed) {
                    row.classList.remove('collapsed');
                } else {
                    row.classList.add('collapsed');
                }
            });
        
            button.textContent = isCollapsed ? '-' : '+';
        });    
    });

    // ================== Lightbox ==================
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

    closeBtn.addEventListener('click', () => {
        lightbox.classList.add('hidden');
        lightboxImg.src = '';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.add('hidden');
            lightboxImg.src = '';
        }
    });

});
