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


const sortDataAccendingOrder = (anyArray) => {

    anyArray.sort((job1, job2) => {
        // Extract the numbers from the postedTime property
        const getNumber = (postedTime) => {
            const number = parseInt(postedTime.match(/\d+/)[0], 10);
            return isNaN(number) ? 0 : number;
        };

        // Extract numbers from the postedTime strings
        const number1 = getNumber(job1.postedTime);
        const number2 = getNumber(job2.postedTime);

        // Compare the extracted numbers to sort in ascending order
        return number1 - number2;
    });
}

const sortDataDeccendingOrder = (anyArray) => {

    anyArray.sort((job1, job2) => {
        // Extract the numbers from the postedTime property
        const getNumber = (postedTime) => {
            const number = parseInt(postedTime.match(/\d+/)[0], 10);
            return isNaN(number) ? 0 : number;
        };

        // Extract numbers from the postedTime strings
        const number1 = getNumber(job1.postedTime);
        const number2 = getNumber(job2.postedTime);

        // Compare the extracted numbers to sort in ascending order
        return number2 - number1;
    });
}

const displayJobCard = (job) => {

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


}

let displayedJobCards = null;

const handleJobCards = (data) => {

    jobsWrapper.innerHTML = ``;

    data.forEach((job) => {

        displayJobCard(job);

    });


};

thirdColCloseIcon.addEventListener('click', () => {

    thirdColumn.classList.remove('open-third-column');
    thirdColumn.classList.remove('open-third-column-md');
});

openThirdColumn();

const sortSelect = document.querySelector(".mid-column .sort-area #job-sortings");
let selectedOption = '';
let sortedData = [];

const sortData = (data) => {

    sortSelect.addEventListener('change', () => {
        selectedOption = sortSelect.value; // Use sortSelect.value to get the selected option

        if (selectedOption == 'All') {
            sortedData = [...data] // Reset to default order

        } else if (selectedOption == 'Newest Post' || selectedOption == 'Most Relevant') {

            // First, sort in ascending order based on postedTimeInt
            const sortedDataAscending = [...data];
            sortDataAccendingOrder(sortedDataAscending);

            // Now, create separate arrays for "hour," "day," and "week"
            const hourData = sortedDataAscending.filter(job => job.postedTime.includes('hour'));
            const dayData = sortedDataAscending.filter(job => job.postedTime.includes('day'));
            const weekData = sortedDataAscending.filter(job => job.postedTime.includes('week'));

            // Concatenate these arrays to get the final sorted data
            sortedData = [...hourData, ...dayData, ...weekData];

        } else if (selectedOption == 'Oldest Post') {

            // First, sort in desending order based on postedTimeInt
            const sortedDataDeccending = [...data];
            sortDataDeccendingOrder(sortedDataDeccending);

            // Now, create separate arrays for "hour," "day," and "week"
            const hourData = sortedDataDeccending.filter(job => job.postedTime.includes('hour'));
            const dayData = sortedDataDeccending.filter(job => job.postedTime.includes('day'));
            const weekData = sortedDataDeccending.filter(job => job.postedTime.includes('week'));

            // Concatenate these arrays in reverse order to get the final sorted data for "Oldest Post"
            sortedData = [...weekData, ...dayData, ...hourData];

        } else if (selectedOption == 'Highest Paid') {
            sortedData = data.slice(); // Copy the original data array
            sortedData.sort((job1, job2) => {
                const job1Salary = parseInt(job1.jobPosition.salary.slice(1).replace(/,/g, ''), 10);
                const job2Salary = parseInt(job2.jobPosition.salary.slice(1).replace(/,/g, ''), 10);
                return job2Salary - job1Salary;
            });
        }

        jobsWrapper.innerHTML = ``;
        sortedData.forEach((job) => {
            displayJobCard(job);
        });

    });

}

const categoriesArray = [
    "All",
    "Data Science",
    "Engineering",
    "Data Analysis",
    "Management",
    "UI Design",
    "Amazon Web Services",
    "Web Development",
    "Cloud"
    // Add new categories here if needed
];

const uniqueCategoriesArray = categoriesArray.filter((value, index, self) => {
    // Convert all items to lowercase for comparison
    const lowerValue = value.toLowerCase();
    // Check if the lowercase version of the item is the same as the lowercase version of the first occurrence in the array
    return index === self.findIndex((item) => item.toLowerCase() === lowerValue);
});

const categoriesDiv = document.querySelector(".categories-wrapper .categories");
const categories = categoriesDiv.querySelectorAll("button");
let categorizedData = [];

let newCategoryBtns = [];
// Function to update category buttons
const handleCategoryButtons = (data) => {
    uniqueCategoriesArray.forEach((item) => {

        // Convert item and existing categories to lowercase for case-insensitive comparison
        const itemLower = item.toLowerCase();
        let existingCategory = false;

        categories.forEach((category) => {
            // Convert the text content of the existing category to lowercase for comparison
            const categoryTextLower = category.textContent.toLowerCase();
            // Check if the division button already exists (case-insensitive comparison)
            if (categoryTextLower === itemLower) {
                existingCategory = true;
            }
        });

        if (!existingCategory) {
            const newButton = document.createElement("button");
            newButton.className = "btn btn-light rounded-pill me-3 mb-2";
            newButton.textContent = item;
            categoriesDiv.appendChild(newButton);

            newCategoryBtns.push(newButton);

        }
    });

    let prevClickedBtn = '';

    newCategoryBtns.forEach((btn) => {

        if (btn.textContent == 'All') {
            btn.classList.add('active');
        }

        btn.addEventListener('click', () => {

            newCategoryBtns[0].classList.remove('active');

            if (prevClickedBtn) {
                prevClickedBtn.classList.remove('active');
            } 
            btn.classList.add('active');
            
            const selectedCategory = btn.textContent;
            if (!(selectedCategory == 'All')) {
                categorizedData = data.filter(job => job.jobPosition.division.includes(`${selectedCategory}`));
            } else {

                categorizedData = [...data];
            }

            jobsWrapper.innerHTML = ``;
            categorizedData.forEach((job) => {
                displayJobCard(job);
            });

            sortData(categorizedData);

            prevClickedBtn = btn;
        });
    });
}



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
        sortData(data);
        handleCategoryButtons(data);
    })
    .catch((error) => {
        console.error('Error loading JSON data:', error);
    });