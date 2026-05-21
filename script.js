// your code goes here
// script.js

// Функция скрытия прелоадера
function hidePreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader && !preloader.classList.contains('hidden')) {
    preloader.classList.add('hidden');
  }
}

// Основной сценарий: ждём DOM и дополнительно 2 секунды для красоты
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(hidePreloader, 2000);
});

// Страховка: если через 5 секунд прелоадер всё ещё виден (зависшие картинки) – скрываем принудительно
setTimeout(hidePreloader, 5000);

// ---------- остальной код без изменений ----------

// Бургер-меню
const toggleBtn = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (toggleBtn && navMenu) {
  toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

// Печатающийся текст
const typingElement = document.getElementById('typing-text');
if (typingElement) {
  const words = ['здоровье в цифровой эре', 'инновационные препараты', 'биохакинг и долголетие'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 80;
  const deletingSpeed = 40;
  const pauseBetween = 2000;

  function type() {
    const currentWord = words[wordIndex];
    if (!isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, pauseBetween);
        return;
      }
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 300);
        return;
      }
    }
    setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
  }

  type();
}

// Intersection Observer для reveal-элементов
const revealElements = document.querySelectorAll('.reveal');
if (revealElements.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => observer.observe(el));
}

// Плавная прокрутка для якорей
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
