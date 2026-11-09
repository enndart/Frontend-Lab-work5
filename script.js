document.addEventListener("DOMContentLoaded", () => {
    // ==========================================================
    // Завдання 1:
    // ==========================================================

    const form = document.getElementById("user-form");
    const resultCard = document.getElementById("result-card");
    const resultContent = document.getElementById("result-content");

    const patterns = {
        fullName: /^([А-ЯІЇЄҐа-яіїєґ]+\s[А-ЯІЇЄҐ]\.[А-ЯІЇЄҐ]\.|[А-ЯІЇЄҐа-яіїєґ]+\s[А-ЯІЇЄҐа-яіїєґ]+\s[А-ЯІЇЄҐа-яіїєґ]+)$/,
        groupCode: /^[А-ЯІЇЄҐа-яіїєґ]{2}-\d{2}$/,
        phoneNum: /^(\(\d{3}\)-\d{3}-\d{2}-\d{2}|\+\d{12})$/,
        idCard: /^[А-ЯІЇЄҐа-яіїєґ]{2}\s№\d{6}$/,
        faculty: /^[А-ЯІЇЄҐа-яіїєґ]{4}$/
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let isValid = true;
        const formData = {};

        Object.keys(patterns).forEach((fieldId) => {
            const input = document.getElementById(fieldId);
            const parentGroup = input.parentElement;
            const value = input.value.trim();

            if (!patterns[fieldId].test(value)) {
                parentGroup.classList.add("invalid");
                isValid = false;
            } else {
                parentGroup.classList.remove("invalid");
                formData[fieldId] = value;
            }
        });

        if (isValid) {
            resultContent.innerHTML = `
                <p><strong>ПІБ:</strong> ${formData.fullName}</p>
                <p><strong>Група:</strong> ${formData.groupCode}</p>
                <p><strong>Телефон:</strong> ${formData.phoneNum}</p>
                <p><strong>ID-card:</strong> ${formData.idCard}</p>
                <p><strong>Факультет:</strong> ${formData.faculty}</p>
            `;
            resultCard.classList.remove("hidden");
        } else {
            resultCard.classList.add("hidden");
        }
    });

    // ==========================================================
    // Завдання 2:
    // ==========================================================

    const table = document.getElementById("interactive-table");
    const colorPicker = document.getElementById("colorPicker");
    const VARIANT_CELL_NUM = 2;
    let cellCount = 1;

    for (let r = 0; r < 6; r++) {
        const row = document.createElement("tr");
        for (let c = 0; c < 6; c++) {
            const cell = document.createElement("td");
            cell.textContent = cellCount;
            cell.dataset.col = c;

            if (cellCount === VARIANT_CELL_NUM) {
                cell.addEventListener("mouseenter", () => {
                    cell.style.backgroundColor = getRandomColor();
                });

                cell.addEventListener("click", () => {
                    cell.style.backgroundColor = colorPicker.value;
                });

                cell.addEventListener("dblclick", () => {
                    const colIndex = cell.dataset.col;
                    const allCells = table.querySelectorAll("td");
                    
                    allCells.forEach((cCell) => {
                        if (cCell.dataset.col === colIndex) {
                            cCell.style.backgroundColor = colorPicker.value;
                        }
                    });
                });
            }

            row.appendChild(cell);
            cellCount++;
        }
        table.appendChild(row);
    }

    function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }
});