const firstColumn = document.querySelector('.first-column');
const hamburger = document.querySelector('.hamburger');
const midColumn = document.querySelector('.mid-column');

const jobsWrapper = document.querySelector('.mid-column .jobs');
const thirdColumn = document.querySelector('.third-column');
const thirdColCloseIcon = thirdColumn.querySelector('.fa-xmark');
let thirdColcompanyLogo = thirdColumn.querySelector('.company-name-lg .company-logo img');
let thirdColcompanyName = thirdColumn.querySelector('.company-name-lg h3');
let thirdColjobPosition = thirdColumn.querySelector('.company-name-lg p');
let thirdColAboutCompany = thirdColumn.querySelector('.about-company-lg p');
let thirdColJobQualificationWrapper = thirdColumn.querySelector('.job-qualification-lg ul');

hamburger.addEventListener('click', () => {

    firstColumn.classList.add('open-column');
});

midColumn.addEventListener('click', () => {

    firstColumn.classList.remove('open-column');
    firstColumn.style.transition = 'all .05s ease-in-out';

    setTimeout(() => {
        firstColumn.style.transition = '.3s ease-in-out';
    }, 700);
});


const openThirdColumn = () => {

    const readMoreBtns = thirdColumn.querySelectorAll('.read-more-btn');

    readMoreBtns.forEach((btn) => {
        btn.addEventListener('click', () => {

            thirdColumn.classList.add('open-third-column');
        });

    });
}


const handleJobCards = (data) => {

    // jobsWrapper.innerHTML = ``;

    data.forEach((job) => {
        const jobSalary = job.jobPosition.salary.slice(1, -1).split(',')[0];
        const jobQualificationsData = job.qualifications;

        const jobCard = document.createElement('div');
        jobCard.classList.add('card', 'job-card');
        jobCard.innerHTML = `
        <div class="company-icon">
            <img src="${job.companyLogoSrc}" alt="${job.companyName}-icon">
        </div>
        <div class="basic-job-info">
            <h3 class="company-name">${job.companyName}</h3>
            <p class="job-catergory">${job.jobPosition.title}</p>
            <div class="job-address">
            <i class="fa-solid fa-location-dot"></i>
            <address>${job.address}</address>
        </div>
        <div class="job-timings">
            <p class="posted-time">${job.postedTime}</p>
            <p class="job-time">${job.workingPlace}</p>
            <p class="job-applicants">${job.applicants} Applicants</p>
        </div>
        </div>
        <div class="other-job-info">
            <h5>Division</h5>
            <p class="job-position">${job.jobPosition.division}</p>
            <p class="job-salary"><span class="salary-amnt">$${jobSalary}k</span>/year</p>
        </div>

        <div class="advance-job-info about-company">
            <p>
                ${job.aboutCompany}
            </p>
        </div>

        <ul class="advance-job-info job-qualifications">

        </ul>
        
        `;

        jobsWrapper.appendChild(jobCard);

        const jobQualificationsWrapperMain = jobCard.querySelector('.job-qualifications');
        

        jobQualificationsData.forEach((qualification) => {

            const jobQualification = document.createElement('li');
            jobQualification.innerText = qualification;
            jobQualificationsWrapperMain.appendChild(jobQualification);
        });


        jobCard.addEventListener('click', () => {

            const companyLogoSrc = jobCard.querySelector('.company-icon img').src;
            const companyName = jobCard.querySelector('.basic-job-info .company-name').innerText;
            const jobPositions = jobCard.querySelector('.basic-job-info .job-catergory').innerText;
            const relevantJobPosition = jobPositions.split(",")[0];
            const aboutCompany = jobCard.querySelector('.about-company p').innerText;
            const jobQualificationsWrapper = jobCard.querySelector('.job-qualifications');

            thirdColcompanyLogo.src = companyLogoSrc;
            thirdColcompanyName.innerText = companyName;
            thirdColjobPosition.innerText = relevantJobPosition;
            thirdColAboutCompany.innerText = aboutCompany;
            thirdColJobQualificationWrapper.innerHTML = jobQualificationsWrapper.innerHTML;

            thirdColumn.classList.remove('open-third-column');
            openThirdColumn();

            thirdColumn.classList.add('open-third-column-md');
        });
    });



};

thirdColCloseIcon.addEventListener('click', () => {

    thirdColumn.classList.remove('open-third-column');
    thirdColumn.classList.remove('open-third-column-md');
});

openThirdColumn();



// Fetch data from the JSON file

fetch('./jobs.json')
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        handleJobCards(data);
    })
    .catch((error) => {
        console.error('Error loading JSON data:', error);
    });