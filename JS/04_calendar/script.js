const monthElement = document.querySelector('.month');
const daysList = document.querySelector('.days');
const lastMonthBtn = document.querySelector('.last-month');
const nextMonthBtn = document.querySelector('.next-month');
const yearElement = document.querySelector('.year-txt');
const todayMonthBtn = document.querySelector('.today-month');

let currentDate = new Date(); 

todayMonthBtn.addEventListener('click', goToCurrentMonth);

function goToCurrentMonth() {
    currentDate = new Date(); // 將 currentDate 設置為當前日期
    renderCalendar(); // 重新顯示日曆
}


function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const firstWeekDay = firstDayOfMonth.getDay();

    const monthNames = [
        'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
    ];

    monthElement.innerHTML = `<span>${(month + 1).toString().padStart(2, '0')}</span> ${monthNames[month]}`;
    yearElement.textContent = year.toString();

    daysList.innerHTML = '';

    const today = new Date(); // 取得今天日期
    for (let i = 0; i < firstWeekDay; i++) {
        const emptyDayElement = document.createElement('li');
        emptyDayElement.textContent = '';
        daysList.appendChild(emptyDayElement);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('li');

        const dateNumElement = document.createElement('p');
        dateNumElement.classList.add('date-num');
        dateNumElement.innerText = i;

        dayElement.appendChild(dateNumElement);
        daysList.appendChild(dayElement);

        if (
            i === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear()
        ) {
            dayElement.classList.add('today');
        }
    }

    const remainingDays = (firstWeekDay + daysInMonth) % 7 === 0 ? 0 : 7 - ((firstWeekDay + daysInMonth) % 7);
    if (remainingDays !== 0) {
        for (let i = 0; i < remainingDays; i++) {
            const emptyDayElement = document.createElement('li');
            emptyDayElement.textContent = '';
            daysList.appendChild(emptyDayElement);
        }
    }
}

function goToLastMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function goToNextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

lastMonthBtn.addEventListener('click', goToLastMonth);
nextMonthBtn.addEventListener('click', goToNextMonth);

renderCalendar();
