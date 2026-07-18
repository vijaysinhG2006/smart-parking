// Initialize AOS Animation
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 800,
    easing: 'slide',
    once: true,
    offset: 100
  });

  // Sticky Navbar
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Counter Animation for Stats
  const counters = document.querySelectorAll('.counter');
  let hasCounted = false;

  const countUp = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      
      const speed = 200; // lower is faster
      const inc = target / speed;

      if (count < target) {
        if (Number.isInteger(target)) {
          counter.innerText = Math.ceil(count + inc);
        } else {
          counter.innerText = (count + inc).toFixed(1);
        }
        setTimeout(countUp, 10);
      } else {
        counter.innerText = target;
      }
    });
  };

  // Trigger counter when stats section is in view
  const statsSection = document.getElementById('stats');
  
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasCounted) {
        countUp();
        hasCounted = true;
      }
    }, { threshold: 0.5 });
    observer.observe(statsSection);
  }
});
