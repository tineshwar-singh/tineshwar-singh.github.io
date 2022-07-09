/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav_link');

function linkAction(){
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills_content'),
      skillsHeader = document.querySelectorAll('.skills_header');

function toggleSkills() {
    let itemClass = this.parentNode.className;
    
    for(i=0 ; i<skillsContent.length ; i++) {
        skillsContent[i].className = 'skills_content skills_close';
    }
    if(itemClass === 'skills_content skills_close') {
        this.parentNode.className = 'skills_content skills_open';
    }
}

skillsHeader.forEach((skills_header) => {
    skills_header.addEventListener('click', toggleSkills);
});

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]');
      
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);

        tabContents.forEach(tabContent => {
            tabContent.classList.remove('qualification_active');
        })
        target.classList.add('qualification_active');

        tabs.forEach(tab => {
            tab.classList.remove('quaification_active');
        })
        tab.classList.add('qualification_active');
    })
})


/*==================== SERVICES MODAL ====================*/

/*==================== PROJECT SWIPER  ====================*/
const swiper = new Swiper(".swiper-container", {
    cssMode: true,
    loop: true, 
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },  
});


/*==================== TESTIMONIAL ====================*/

/*==================== CONTACT ME - VALIDATIONS ====================*/
const form = document.querySelector('.contact_form');
const cname = document.querySelector("#name");
const email = document.querySelector("#email");
const contactNumber = document.querySelector("#contact-number");
const message = document.querySelector("#message");
const emailSmall = document.querySelector("#emailSmall");
const contactNumberSmall = document.querySelector("#contactNumberSmall");
const contactButton = document.querySelector(".contact_button");
const msgSent = document.getElementById('msg-sent');

const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      contactNumber_regex = /^[6-9]\d{9}$/gi;

cname.addEventListener("input", validate);
email.addEventListener("input", validate);
contactNumber.addEventListener("input", validate);

contactButton.disabled = true;

function validate(e) {
    let target = e.target;

    if(target.name === "email") {
        if(email_regex.test(target.value)) {
            //innerHTML
            emailSmall.innerHTML = "Valid Email Address";
            emailSmall.classList.add("text-success");
            emailSmall.classList.remove("text-danger");

            // contactButton.disabled = false;
        } else {
            // innerHTML
            emailSmall.innerHTML = "Invalid Email Address";
            emailSmall.classList.add("text-danger");
            emailSmall.classList.remove("text-success");

            // contactButton.disabled = true;
        }
    }
    if(target.name === "contact-number") {
        if(contactNumber_regex.test(target.value)) {
            //innerHTML
            contactNumberSmall.innerHTML = "Valid Contact Number";
            contactNumberSmall.classList.add("text-success");
            contactNumberSmall.classList.remove("text-danger");

            // contactButton.disabled = false;
        } else {
            // innerHTML
            contactNumberSmall.innerHTML = "Invalid Contact Number";
            contactNumberSmall.classList.add("text-danger");
            contactNumberSmall.classList.remove("text-success");

            // contactButton.disabled = true;
        }
    }

    if(
        cname.value !== "" &&
        emailSmall.textContent === "Valid Email Address" &&
        contactNumberSmall.textContent === "Valid Contact Number"
    ) {
        contactButton.disabled = false;
    } else {
        contactButton.disabled = true;
    }

}


function removeHash () { 
    var scrollV, scrollH, loc = window.location;
    if ("pushState" in history)
        history.pushState("", document.title, loc.pathname + loc.search);
    else {
        window.scrollTo(0,0);
        // Prevent scrolling by storing the page's current scroll offset
        // scrollV = document.body.scrollTop;
        // scrollH = document.body.scrollLeft;

        loc.hash = "";

        // Restore the scroll offset, should be flicker free
        // document.body.scrollTop = scrollV;
        // document.body.scrollLeft = scrollH;

        console.log('removed hash');
    }
}

form.addEventListener('submit', callbackFunction);

function callbackFunction(event) {
    event.preventDefault();
    const myFormData = new FormData(event.target);

    const formDataObj = {};
    myFormData.forEach((value, key) => (formDataObj[key] = value));
    Object.assign(formDataObj, {Created: 'x-sheetmonkey-current-date-time'});
    console.log(formDataObj);

    fetch('https://api.sheetmonkey.io/form/tHLs6hzjtvyAi8eDN9j7H8',
    {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObj),
    }).then((result) => {
        setTimeout(() => {
            location.reload();
        }, 2000);
    });

    //scroll to top
    window.scrollTo(0,0);

    //view sent message
    setInterval( () => {
        msgSent.style.display = "none";
    }, 3000);
    msgSent.style.display = "block";
    
    //remove hash
    removeHash();

    //reset form and remove validation message
    form.reset();
    emailSmall.innerHTML="";
    contactNumberSmall.innerHTML="";    
};

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if((scrollY > sectionTop) && (scrollY <= sectionTop + sectionHeight)) {
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    })
}    
window.addEventListener('scroll', scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader() {
    const nav = document.getElementById('header');
    //when the scroll is greater than 80 viewport height, add the scroll-height class to the header tag
    if(this.scrollY >= 80) {
        nav.classList.add('scroll-header');
    } else {
        nav.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    //when the scroll is greater than 560 viewport height, add the show-scroll class to the tag with the scroll
    if(this.scrollY >= 560) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
}
window.addEventListener('scroll', scrollUp);

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
})

