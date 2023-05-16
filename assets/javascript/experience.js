const ACTIVE_WORK_ITEM_CLASS = "active";
const UNACTIVE_WORK_CLASS = "hide";
let currentWorkItemEl;
let currentWorkEl;

const experienceItems = document.querySelectorAll("#experience .experience-list-item");

experienceItems.forEach((experienceItem) => {
    experienceItem.addEventListener("click", () => activateWork(experienceItem));
});

function activateWork(experienceItem) {
    const workId = experienceItem.dataset.workFor;
    const workEl = document.getElementById(workId);

    if (currentWorkEl) {
        currentWorkEl.classList.add(UNACTIVE_WORK_CLASS);
        currentWorkItemEl.classList.remove(ACTIVE_WORK_ITEM_CLASS);
    }

    workEl.classList.remove(UNACTIVE_WORK_CLASS);
    experienceItem.classList.add(ACTIVE_WORK_ITEM_CLASS);

    currentWorkEl = workEl;
    currentWorkItemEl = experienceItem;
}

function initExperience() {
    experienceItems[0].click();
}

initExperience();
