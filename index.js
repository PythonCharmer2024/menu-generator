const monthSelect = document.getElementById("month");
const yearSelect = document.getElementById("year");


const months = [
"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//menu part of the code

function populateBreakfast(selectElement) {
    const options = ["Aloo Parathas", "Poha", "Upma", "Dosa", "Idli"];
    options.sort();
    
    options.forEach(option => {
        const element = document.createElement("option");
        element.textContent = option;
        element.value = option;
        selectElement.appendChild(element);
    });
}

function populateExtras(selectElement) {
    const options = ["Apple", "Banana", "Orange", "Grapes", "Mango"];
    options.sort();
    
    options.forEach(option => {
        const element = document.createElement("option");
        element.textContent = option;
        element.value = option;
        selectElement.appendChild(element);
    });
}

function createBreakfastDropdown() {
    const select1 = document.createElement("select");
    populateBreakfast(select1);

    const select2 = document.createElement("select");
    populateExtras(select2);

    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.gap = "5px";
    container.appendChild(select1);
    container.appendChild(document.createTextNode(" + "));
    container.appendChild(select2);
    return container;
}

function populateLunch(selectElement) {
    const options = ["Rice and Dal", "Roti and Sabzi", "Pasta", "Pizza", "Burger"];
    options.sort();
    
    options.forEach(option => {
        const element = document.createElement("option");
        element.textContent = option;
        element.value = option;
        selectElement.appendChild(element);
    });
}

function populateLunchExtras(selectElement) {
    const options = ["Rice", "Roti", "Paratha", "Naan", "Chapati"];
    options.sort();
    
    options.forEach(option => {
        const element = document.createElement("option");
        element.textContent = option;
        element.value = option;
        selectElement.appendChild(element);
    });
}

function populateLunchSides(selectElement) {
    const options = ["Salad", "Raita", "Pickle", "Papad", "Curds"];
    options.sort();
    
    options.forEach(option => {
        const element = document.createElement("option");
        element.textContent = option;
        element.value = option;
        selectElement.appendChild(element);
    });
}

function createLunchDropdown() {
    const select1 = document.createElement("select");
    populateLunch(select1);

    const select2 = document.createElement("select");
    populateLunchExtras(select2);

    const select3 = document.createElement("select");
    populateLunchSides(select3);
    
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.gap = "5px";
    container.appendChild(select1);
    container.appendChild(document.createTextNode(" + "));
    container.appendChild(select2);
    container.appendChild(document.createTextNode(" + "));
    container.appendChild(select3);
    return container;
}

function populateSnacks(selectElement) {
    const options = ["Poha", "Bhel", "Chips", "Samosa", "Biscuits"];
    options.sort();
    
    options.forEach(option => {
        const element = document.createElement("option");
        element.textContent = option;
        element.value = option;
        selectElement.appendChild(element);
    });
}

function populateSnacksExtras(selectElement) {
    const options = ["Tea", "Coffee", "Milk", "Juice", "Water"];
    options.sort();
    
    options.forEach(option => {
        const element = document.createElement("option");
        element.textContent = option;
        element.value = option;
        selectElement.appendChild(element);
    });
} 

function createSnacksDropdown() {
    const select1 = document.createElement("select");
    populateSnacks(select1);

    const select2 = document.createElement("select");
    populateSnacksExtras(select2);

    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.gap = "5px";
    container.appendChild(select1);
    container.appendChild(document.createTextNode(" + "));
    container.appendChild(select2);

    return container;
}

//menu part ends

(function populateMonths() {
    for (let i = 0; i < months.length ; i++){
        const option = document.createElement("option");
        option.textContent = months[i];
        monthSelect.appendChild(option);
    }
    monthSelect.value = "January";
})();

(function populateYears() {
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 10; i++){
        const option = document.createElement("option");
        option.textContent = currentYear + i;
        yearSelect.appendChild(option);
    }
    yearSelect.value = currentYear;
})();


const daysinMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
}


const button = document.getElementById("GenerateRows");
button.addEventListener("click", generateRows);


function generateRows() {
    const tbody = document.getElementById("days");
    tbody.innerHTML = "";

    const days = daysinMonth(months.indexOf(monthSelect.value) + 1, yearSelect.value);

    for (let i = 1; i <= days; i++) {
        const row = document.createElement("tr");

        const date = document.createElement("td");
        const day = document.createElement("td");
        const breakfast = document.createElement("td");
        const lunch = document.createElement("td");
        const snacks = document.createElement("td");

        // Populate Date and Day
        const currentDate = new Date(yearSelect.value, months.indexOf(monthSelect.value), i);
        date.textContent = i;
        day.textContent = currentDate.toLocaleString('en-us', { weekday: 'long' });

        breakfast.appendChild(createBreakfastDropdown());
        lunch.appendChild(createLunchDropdown());
        snacks.appendChild(createSnacksDropdown());


        // Apply uniform styling
        [date, day, breakfast, lunch, snacks].forEach(cell => {
            cell.style.padding = "8px";
            cell.style.textAlign = "center";
            cell.style.width = 20 + "%";
        });


        const rowDetails = [date, day, breakfast, lunch, snacks];
        for (const option of rowDetails) {
            row.appendChild(option)
        }
        tbody.appendChild(row);

        document.getElementById("exporter").style.display = "inline-block";
    }
}

const randomizer = document.getElementById("Randomize");
randomizer.addEventListener("click", randomizeMenu);

function randomizeMenu() {
    document.querySelectorAll("#days tr").forEach((row, index) => {
        // Get all <select> elements in the row
        const selects = row.querySelectorAll("select");

        selects.forEach(select => {
            const options = select.options;
            if (options.length > 1) {
                select.value = options[Math.floor(Math.random() * options.length)].value;
            }
        });
    });
}


const darkModeButton = document.getElementById("darkModeToggle");

darkModeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Update button text based on mode
    if (document.body.classList.contains("dark-mode")) {
        darkModeButton.textContent = "Disable Dark Mode";
    } else {
        darkModeButton.textContent = "Enable Dark Mode";
    }
});


function exportToExcel() {
    let table = document.getElementById("days"); // Replace with your table ID
    let data = [];

    // Extract table header
    let headers = ["Date", "Day", "Breakfast", "Lunch", "Snacks"];
    data.push(headers);

    // Extract table rows
    table.querySelectorAll("tr").forEach(row => {
        let rowData = [];
        let cells = row.querySelectorAll("td, th");
        cells.forEach(cell => {
            // If it's a dropdown, get selected value
            let select = cell.querySelector("select");
            rowData.push(select ? select.value : cell.innerText);
        });

        if (rowData.length > 0) data.push(rowData);
    });

    // Convert to a worksheet
    let ws = XLSX.utils.aoa_to_sheet(data);

    // Create a new workbook and append the worksheet
    let wb = XLSX.utils.book_new();
    const monthOfPrint = document.getElementById("month").value.substring(0, 3);
    const yearOfPrint = document.getElementById("year").value;
    const sheetName = `Meal-Plan-${monthOfPrint}-${yearOfPrint}`;
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    // Save the file
    XLSX.writeFile(wb, "Meal_Plan.xlsx");
}

