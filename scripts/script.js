import {
    subMonths,
    addMonths,
    getMonth,
    getYear,
    format,
    getDaysInMonth,
    getDay,
    getDate,
    addDays,
    subDays,
    setDate,
    endOfMonth,
    startOfMonth,
    parseJSON,
} from "date-fns";

const calendarToggle = document.querySelector(".date-picker-btn");
const calendarContainer = document.querySelector(".calendar-container");
const calendarSpan = document.querySelector(".calendar-header-month-yr");
calendarSpan.innerText = format(new Date(), "LLLL Y");

const arrowBtn = document.querySelectorAll(".calendar-header-arrow-btn");
const datePickerBtn = document.querySelector(".date-picker-btn");
datePickerBtn.innerText = format(new Date(), "PPP");

// contains the dates themselves, not just the numbers
// we render just their numbers tho
// we update this M every time we flip to a new calendar page

// M of dates to be rendered in each cell [0..35]
let M = new Array(35).fill(new Date());

// updates M of dates
function updateM(cmsd) {
    let t = subDays(cmsd, cmsd.getDay());
    M = M.map((x, i) => addDays(t, i));
}

// renders M of dates
function renderM(M) {
    let cellParent = document.querySelector(".calendar-main");
    cellParent.innerHTML = "";

    // For each of the 35 cells supposed to be in the calendar page, make it and then append it to the calendar
    M.forEach((d, i) => {
        let cell = document.createElement("div");
        cell.classList.add("calendar-date");
        cell.innerText = M[i].getDate();
        // so when we select a cell, we can access its "date-value" attribute
        // to get access to the date it represents
        cell.setAttribute("date-value", JSON.stringify(M[i]));
        // shading
        if (M[i].getMonth() != cmsd.getMonth()) {
            // shade it
            cell.setAttribute("shaded", "");
        }
        // styling
        // cell.style.flex = "1";
        // cell.style.flexBasis = "calc(100%/7)";
        cellParent.appendChild(cell);
    });
}

let cd = new Date();
let cmsd = startOfMonth(cd);
let cmed = endOfMonth(cd);

// initial M setup and rendering
updateM(cmsd);
renderM(M);

console.log(M);

// page flipping, updating M and rerendering the updated M
arrowBtn[1].addEventListener("click", (e) => {
    // update the text showing the month and yr on top of each pg
    calendarSpan.innerText = format(addMonths(cmsd, 1), "LLLL Y");

    cmsd = addMonths(cmsd, 1);
    updateM(cmsd);
    renderM(M);
});
arrowBtn[0].addEventListener("click", (e) => {
    //
    calendarSpan.innerText = format(addMonths(cmsd, 1), "LLLL Y");

    cmsd = subMonths(cmsd, 1);
    updateM(cmsd);
    renderM(M);
});

// clicking a cell
document.addEventListener("click", (e) => {
    if (e.target.matches("div.calendar-date")) {
        if (e.target.hasAttribute("shaded")) return;
        let dtext = e.target.getAttribute("date-value");
        dtext = parseJSON(dtext);
        datePickerBtn.setAttribute("date-val", dtext);
        dtext = format(dtext, "PPP");
        console.log(typeof dtext);
        datePickerBtn.innerText = dtext;
    }
});

datePickerBtn.addEventListener("click", (e) => {
    calendarContainer.toggleAttribute("show");
});
