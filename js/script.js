// Wait for DOM and preloader
document.addEventListener('DOMContentLoaded', function() {
  // Preloader
  const preloader = document.getElementById('preloader');
  preloader.style.opacity = '0';
  setTimeout(() => {
    preloader.style.display = 'none';
    document.body.classList.remove('preload');
  }, 500);
  
  // Particles
  if (typeof tsParticles !== 'undefined') {
    tsParticles.load('tsparticles', {
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      particles: {
        number: { value: 100, density: { enable: true, value_area: 800 } },
        color: { value: ['#00d4ff', '#0099cc', '#ffffff20'] },
        shape: { type: 'circle' },
        opacity: { value: 0.4, random: true, animation: { enable: true, speed: 1, opacity_min: 0.1 } },
        size: { value: 3, random: { enable: true, minimumValue: 1 } },
        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: { enable: false }
        },
        links: { enable: false }
      },
      detectRetina: true
    });
  }
  
  initApp();
});

function initApp() {
  // Typing effect
  initTyping();
  
  // Navigation
  initNav();
  
  // Scroll reveal
  initReveal();
  
  // Stats counter
  initCounters();
  
  // Theme toggle
  initTheme();
  
  // Scroll to top
  initScrollTop();
  
  // Form handling
  initForm();
}

// Typing Effect
function initTyping() {
  const textElement = document.getElementById('typing-text');
  const cursor = document.querySelector('.cursor');
  const roles = ['Fresher', 'Java Full Stack Developer', 'Full Stack Web developer', 'MCA Student'];
  let index = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function type() {
    const currentText = roles[index];
    
    if (isDeleting) {
      textElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      textElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 150;
    
    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      index = (index + 1) % roles.length;
      typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
  }
  
  type();
}

// Navigation
function initNav() {
  const navLinks = document.querySelectorAll('.nav-link');
  const hamburger = document.querySelector('.hamburger');
  const navbar = document.getElementById('navbar');
  
  // Smooth scroll
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
      closeMobileMenu();
      setActiveLink(link);
    });
  });
  
  // Mobile menu
  hamburger.addEventListener('click', toggleMobileMenu);
  
  function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navbar.classList.toggle('active');
  }
  
  function closeMobileMenu() {
    hamburger.classList.remove('active');
    navbar.classList.remove('active');
  }
  
  function setActiveLink(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
  }
  
  // Active nav on scroll
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      if (scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Scroll Reveal
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Stats Counter
function initCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  });
  
  document.querySelectorAll('.stat-num').forEach(stat => observer.observe(stat));
}

function animateCounter(statNum) {
  const target = parseInt(statNum.getAttribute('data-target'));
  let current = 0;
  const increment = target / 100;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    statNum.textContent = Math.floor(current) + (target > 100 ? '+' : '%');
  }, 30);
}

// Skills Progress
function initSkills() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBars = entry.target.querySelectorAll('.skill-progress');
        progressBars.forEach(bar => {
          const width = bar.getAttribute('data-width');
          bar.style.width = width;
        });
        observer.unobserve(entry.target);
      }
    });
  });
  
  document.querySelectorAll('.skill-category').forEach(category => observer.observe(category));
}

// Theme Toggle
function initTheme() {
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const html = document.documentElement;
  
  // Load saved theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  themeIcon.className = savedTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    themeIcon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    localStorage.setItem('theme', newTheme);
  });
}

// Scroll to Top
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scrollTop');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });
  
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Form Handling
function initForm() {
  const form = document.getElementById('contactForm');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name') || document.getElementById('name').value;
    const email = formData.get('email') || document.getElementById('email').value;
    
    if (validateForm(name, email)) {
      showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
      form.reset();
    }
  });
}

function validateForm(name, email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!name || name.length < 2) {
    showToast('Please enter a valid name (2+ characters).', 'error');
    return false;
  }
  
  if (!emailRegex.test(email)) {
    showToast('Please enter a valid email address.', 'error');
    return false;
  }
  
  return true;
}

// Toast Notification
function showToast(message, type = 'success') {
  const toastContainer = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  toastContainer.appendChild(toast);
  
  setTimeout(() => toast.classList.add('show'), 100);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// Modal Controls
function openHire() {
  document.getElementById('hireModal').style.display = 'flex';
}

function closeHire() {
  document.getElementById('hireModal').style.display = 'none';
}

// Scroll to Top Global
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize skills after reveal
setTimeout(initSkills, 100);

// Handle theme change for particles (optional)
document.addEventListener('themechange', () => {
  // Particles theme sync could be added here
});

// Prevent mobile zoom on inputs
document.addEventListener('gesturestart', function(e) {
  e.preventDefault();
});

// PWA-like smooth scrolling everywhere
document.documentElement.style.scrollBehavior = 'smooth';

