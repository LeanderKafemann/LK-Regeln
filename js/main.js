// Mobile menu toggle functionality
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;
        
if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
        // Toggle active classes
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
        
    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
        
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
                
        if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
}
        
document.addEventListener('DOMContentLoaded', function() {
    const homeHeading = document.querySelector('h1#home');
    const homeDiv = document.querySelector('div#home');
    const regelnHeading = document.querySelector('h2#regeln');
    const regelnDiv = document.querySelector('div#regeln');
            
    if (homeDiv) homeDiv.id = 'home-content';
    if (regelnDiv) regelnDiv.id = 'regeln-content';
            
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');
            
    const navMapping = {
        '#': 'home',
        '#regeln': 'regeln',
        '#weblinks': 'weblinks',
        '#hinweise': 'hinweise'
    };
            
    const sections = [];
    Object.values(navMapping).forEach(id => {
        const element = document.getElementById(id);
        if (element) sections.push(element);
    });
            
    const backToTopButton = document.createElement('div');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '↑';
    backToTopButton.setAttribute('title', 'Nach oben scrollen');
    document.body.appendChild(backToTopButton);
            
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
            
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
                
        if (scrollPosition > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
                
        if (scrollPosition > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
                
        let currentSection = '';
        let closestSection = null;
        let closestDistance = Infinity;
                
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const distanceFromTop = Math.abs(scrollPosition - sectionTop);
                    
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.id;
                return;
            }
                    
            if (distanceFromTop < closestDistance) {
                closestDistance = distanceFromTop;
                closestSection = section;
            }
        });
                
        if (!currentSection && closestSection) {
            currentSection = closestSection.id;
        }
                
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
                    
            const targetSection = navMapping[href];
                    
            if (targetSection === currentSection) {
                link.classList.add('active');
            }
        });
    });
            
    document.querySelectorAll('details.rules').forEach(details => {
        const summary = details.querySelector('summary');
                
        summary.addEventListener('click', function(e) {
            if (!details.open) {
                details.classList.add('opening');
                setTimeout(() => {
                    details.classList.remove('opening');
                }, 300);
            }
        });
    });
            
    window.dispatchEvent(new Event('scroll'));
});