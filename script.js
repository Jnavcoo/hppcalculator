// ... (kode sebelumnya tetap sama) ...

// Tambahkan variabel untuk grafik
let hppChart;

// Fungsi validasi sederhana
function validateForm(formId, errorId) {
    const inputs = document.querySelectorAll(`#${formId} input`);
    let isValid = true;
    inputs.forEach(input => {
        if (input.type === 'number' && parseFloat(input.value) < 0) {
            document.getElementById(errorId).textContent = 'Nilai harus positif!';
            isValid = false;
        } else {
            document.getElementById(errorId).textContent = '';
        }
    });
    return isValid;
}

// Update event listeners dengan validasi
document.getElementById('equipment-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm('equipment-form', 'equipment-error')) return;
    // ... (kode tambah peralatan sama) ...
    updateTables();
    updateDashboard();
});

document.getElementById('material-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm('material-form', 'material-error')) return;
    // ... (kode tambah bahan sama) ...
    updateTables();
    updateDashboard();
});

document.getElementById('sales-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm('sales-form', 'sales-error')) return;
    // ... (kode tambah penjualan sama) ...
    updateTables();
    updateDashboard();
});

// Fungsi update tabel
function updateTables() {
    // Tabel peralatan
    const equipmentTable = document.querySelector('#equipment-table tbody');
    equipmentTable.innerHTML = '';
    equipments.forEach((item, index) => {
        const row = `<tr>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.lifespan}</td>
            <td><button class="delete-btn" onclick="deleteItem('equipments', ${index})">Hapus</button></td>
        </tr>`;
        equipmentTable.innerHTML += row;
    });

    // Tabel bahan (sama seperti di atas)
    const materialTable = document.querySelector('#material-table tbody');
    materialTable.innerHTML = '';
    materials.forEach((item, index) => {
        const row = `<tr>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.usage}</td>
            <td><button class="delete-btn" onclick="deleteItem('materials', ${index})">Hapus</button></td>
        </tr>`;
        materialTable.innerHTML += row;
    });

    // Tabel penjualan
    const salesTable = document.querySelector('#sales-table tbody');
    salesTable.innerHTML = '';
    sales.forEach((item, index) => {
        const row = `<tr>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
            <td><button class="delete-btn" onclick="deleteItem('sales', ${index})">Hapus</button></td>
        </tr>`;
        salesTable.innerHTML += row;
    });
}

// Fungsi hapus item
function deleteItem(type, index) {
    if (type === 'equipments') equipments.splice(index, 1);
    else if (type === 'materials') materials.splice(index, 1);
    else if (type === 'sales') sales.splice(index, 1);
    localStorage.setItem(type, JSON.stringify(eval(type)));
    updateTables();
    updateDashboard();
}

// Fungsi reset semua
document.getElementById('reset-all').addEventListener('click', () => {
    if (confirm('Yakin ingin reset semua data?')) {
        localStorage.clear();
        equipments = [];
        materials = [];
        sales = [];
        updateTables();
        updateDashboard();
    }
});

// Update dashboard dengan grafik
function updateDashboard() {
    // ... (kode kalkulasi sama) ...
    document.getElementById('hpp-total').textContent = totalHPP.toFixed(2);
    // ... (update lainnya sama) ...

    // Update grafik
    const ctx = document.getElementById('hpp-chart').getContext('2d');
    if (hppChart) hppChart.destroy();
    hppChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['HPP', 'Profit', 'Income'],
            datasets: [{
                label: 'Nilai (Rp)',
                data: [totalHPP, profit, income],
                backgroundColor: ['#3498db', '#2ecc71', '#f39c12'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Load awal
updateTables();
updateDashboard();
