const ACTIVE_WORK_ITEM_CLASS = "active";
const UNACTIVE_WORK_CLASS = "hide";
let currentWorkItemEl;
let currentWorkEl;

function setExperience(resumeData) {
    const listEl = document.getElementById("experience-list");
    const containerEl = document.getElementById("experience-container");

    const experienceData = resumeData.experience.linkedItems
        .map((experience) => experience.elements)
        .sort((experienceA, experienceB) => (experienceA.date_begin.value < experienceB.date_begin.value ? 1 : -1));

    listEl.innerHTML = experienceData
        .map(
            (experience, idx) => `<div class="experience-list-item" data-work-for="work-${idx + 1}">
                <div>
                    <div class="hide-mobile">0${idx + 1}.</div>
                    ${experience.date_begin.value.split(".")[0]}-<div class="experience-date-to">${
                experience.date_end.value ? experience.date_end.value.split(".")[0] : " current "
            }</div>
                </div>
            </div>
        `
        )
        .join("");

    experienceData
        .map((experience, idx) => {
            const el = document.createElement("div");
            el.className = "flex hide";
            el.id = "work-" + (idx + 1);

            el.innerHTML = `
                    <div class="experience-details">
                        <h3 class="no-margin">
                            ${experience.name.value}
                        </h3>
                        <div class="color-light text-center period">
                            ${_getMonthName(experience.date_begin.value.split(".")[1])}
                            ${experience.date_begin.value.split(".")[0]}
                            -
                            ${
                                experience.date_end.value
                                    ? _getMonthName(experience.date_end.value.split(".")[1]) +
                                      " " +
                                      experience.date_end.value.split(".")[0]
                                    : ""
                            }
                        </div>
                        <div class="color-light text-center position">${experience.position.value}</div>
                        <div class="text-indent">
                            ${experience.description.value}
                        </div>
                    </div>
                    <img alt="Фотография Януша Соколов" src="./assets/images/illia_big.png" class="tablet-hide" />`;
            return el;
        })
        .forEach((experienceEl) => containerEl.append(experienceEl));

    initExperience();
}

function initExperience() {
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

    experienceItems[0].click();
}
