const sections = document.querySelectorAll('section');
const navbarList = document.getElementById('navbar__list');

// Function helper: Check if element is in viewport..
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Build the navigation menu ..
function buildNav() {
    const fragment = document.createDocumentFragment();
    sections.forEach(section => {
        const navItem = document.createElement('li');
        const sectionId = section.id;
        const sectionName = section.dataset.nav;
        navItem.innerHTML = `<a class="menu__link" href="#${sectionId}">${sectionName}</a>`;
        fragment.appendChild(navItem);
    });
    navbarList.appendChild(fragment);
}

// Add active class to section when near top of viewport ..
function setActiveClass() {
    sections.forEach(section => {
        if (isInViewport(section)) {
            section.classList.add('your-active-class');
        } else {
            section.classList.remove('your-active-class');
        }
    });
}

// Highlight the active link in the navigation bar ..
function setActiveNav() {
    sections.forEach(section => {
        const navItem = navbarList.querySelector(`[href="#${section.id}"]`);
        if (isInViewport(section)) {
            navItem.classList.add('active');
        } else {
            navItem.classList.remove('active');
        }
    });
}

// Function to scroll to section on link click ..
function scrollToSection(event) {
    event.preventDefault();
    const targetId = event.target.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
}

// Events

// Build menu ..
document.addEventListener('DOMContentLoaded', buildNav);

// Scroll to section on link click ..
navbarList.addEventListener('click', scrollToSection);

// Set sections as active and highlight nav links ..
document.addEventListener('scroll', () => {
    setActiveClass();
    setActiveNav();
});

// Hide fixed navigation bar while not scrolling ..
let timer = null;
window.addEventListener('scroll', function () {
    navbarList.style.display = 'block';
    clearTimeout(timer);
    timer = setTimeout(function () {
        navbarList.style.display = 'none';
    }, 5000);
});

// Scroll to the top button ..
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.textContent = 'Scroll to Top';
scrollToTopBtn.classList.add('scroll-to-top');
document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add event listeners to card titles ..
document.querySelectorAll('.card-titles li').forEach(title => {
    title.addEventListener('click', function () {
        const cardId = this.getAttribute('data-card');
        const card = document.getElementById(cardId);

        // Hide all cards ..
        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('active');
        });

        // Show the selected card ..
        card.classList.add('active');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.menu__link');

    function changeActiveLink() {
        let index = sections.length;

        while(--index && window.scrollY + 50 < sections[index].offsetTop) {}
        
        navLinks.forEach((link) => link.classList.remove('active'));
        navLinks[index].classList.add('active');
    }

    changeActiveLink();
    window.addEventListener('scroll', changeActiveLink);
});

