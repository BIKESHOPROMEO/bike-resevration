const calendarTable = document.getElementById("calendar-table");
let baseDate = new Date();

function getWeekDates(base) {
  const sunday = new Date(base);
  sunday.setDate(base.getDate() - base.getDay());
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    dates.push(d);
  }
  return dates;
}

function formatDate(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}/${mm}/${dd}`;
}

function renderCalendar() {
  calendarTable.innerHTML = "";

  const weekDates = getWeekDates(baseDate);
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const times = [...Array(9)].map((_, i) => `${10 + i}:00`);

  const headerRow = document.createElement("tr");
  const timeTh = document.createElement("th");
  timeTh.textContent = "時間";
  headerRow.appendChild(timeTh);

  weekDates.forEach(date => {
    const th = document.createElement("th");
    const day = date.getDay();
    th.className = day === 0 ? "sunday" : day === 6 ? "saturday" : "";
    th.textContent = `${date.getMonth() + 1}/${date.getDate()}（${weekdays[day]}）`;
    headerRow.appendChild(th);
  });
  calendarTable.appendChild(headerRow);

  times.forEach(time => {
    const row = document.createElement("tr");
    const timeCell = document.createElement("td");
    timeCell.textContent = time;
    row.appendChild(timeCell);

    weekDates.forEach(date => {
      const td = document.createElement("td");
      const isAvailable = Math.random() < 0.7;
      td.textContent = isAvailable ? "◎" : "×";

      if (isAvailable) {
        td.classList.add("available");
        td.dataset.date = formatDate(date);
        td.dataset.time = time;

        td.addEventListener("click", () => {
          const selectedDate = td.dataset.date;
          const selectedTime = td.dataset.time;

          const formURL = "https://docs.google.com/forms/d/e/1FAIpQLScYI0E_FOFE5JbEKG3Ir56cWBN2PLJ2AQmnQ_Uu33MhRgMs_g/viewform";
          const queryParams = new URLSearchParams({
            "entry.1097177404": selectedDate,
            "entry.1500320493": selectedTime
          });

          const fullURL = `${formURL}?${queryParams.toString()}`;
          window.open(fullURL, "_blank");
        });
      }

      row.appendChild(td);
    });

    calendarTable.appendChild(row);
  });
}

function changeWeek(offset) {
  baseDate.setDate(baseDate.getDate() + offset * 7);
  renderCalendar();
}

renderCalendar();