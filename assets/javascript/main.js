const Kk = window["kontentDelivery"];
const deliveryClient = new Kk.createDeliveryClient({
    environmentId: "41366c09-a20f-0098-e739-83ed43abd726",
});

deliveryClient
    .items()
    .type("resume_page")
    .toPromise()
    .then((response) => {
        const resumeData = response.data.items[0].elements;

        // console.log({
        //     resumeData,
        // });
        setName(resumeData);
        setEducation(resumeData);
        setAbout(resumeData);
        setContacts(resumeData);
    })
    .catch((err) => {
        console.error({ err });
    });

function setName(resumeData) {
    const nameEl = document.getElementById("name");
    const photoEl = document.getElementById("photo");

    nameEl.innerText = resumeData.full_name.value;
    photoEl.src = resumeData.photo.value[0].url || "./assets/images/illia_big.png";
}

function setEducation(resumeData) {
    const educationEl = document.getElementById("education-content");
    const colorBegin = [236, 164, 0];
    const colorEnd = [184, 87, 65];
    const educationAmount = resumeData.education.linkedItems.length;

    educationEl.innerHTML = resumeData.education.linkedItems
        .map((education) => education.elements)
        .sort((educationA, educationB) => educationB.year_to.value - educationA.year_to.value)
        .map((education, educationIdx) => {
            const finalColor = colorEnd.map(
                (color, idx) => colorBegin[idx] + (color - colorBegin[idx]) * (educationIdx / (educationAmount - 1))
            );

            return `
                <div class="education-card" style="--decoration-color: rgb(${finalColor})">
                    <div class="education-card-details">
                        <div class="width-100">
                            <div class="education-card-details-main">
                                <div class="text-bold education-card-details-period">
                                    ${education.year_from.value}-${education.year_to.value}
                                </div>
                                <h3>${education.nazvanie_universiteta.value}</h3>
                            </div>
                            <div class="level">${education.stepen_.value}</div>
                        </div>
                        <div class="direction color-light">${education.napravlenie.value}</div>
                    </div>
                    <div class="education-card-description">${education.opisanie.value}</div>
                </div>
            `;
        })
        .join("");
}

function setAbout(resumeData) {
    document.getElementById("about").innerHTML = resumeData.description.value;
    document.getElementById("about_img").src =
        resumeData.description_img?.value[0].url || "./assets/images/about_me.jpg";
}

function setContacts(resumeData) {
    const emailEl = document.getElementById("email");
    const phoneEl = document.getElementById("phone");
    const whatsappEl = document.getElementById("whatsapp");
    const telegramEl = document.getElementById("telegram");
    const facebookEl = document.getElementById("facebook");

    if (resumeData.email?.value) {
        const emailLinkEl = emailEl.querySelector("a");
        emailLinkEl.href = `mailto:${resumeData.email.value.replaceAll(" ", "")}`;
        emailLinkEl.innerText = resumeData.email.value;
    } else {
        emailEl.parentElement.removeChild(emailEl);
    }

    if (resumeData.phone?.value) {
        const phoneLinkEl = phoneEl.querySelector("a");
        phoneLinkEl.href = `tel:${resumeData.phone.value.replaceAll(" ", "")}`;
        phoneLinkEl.innerText = resumeData.phone.value;
    } else {
        phoneEl.parentElement.removeChild(phoneEl);
    }
    if (resumeData.whatsapp?.value) {
        whatsappEl.href = `https://wa.me/${resumeData.whatsapp.value.replaceAll(" ", "")}`;
    } else {
        whatsappEl.parentElement.removeChild(whatsappEl);
    }
    if (resumeData.telegram?.value) {
        telegramEl.href = resumeData.telegram.value;
    } else {
        telegramEl.parentElement.removeChild(telegramEl);
    }
    if (resumeData.facebook?.value) {
        facebookEl.href = resumeData.facebook.value;
    } else {
        facebookEl.parentElement.removeChild(facebookEl);
    }
}
