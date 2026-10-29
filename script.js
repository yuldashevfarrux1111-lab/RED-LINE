document.addEventListener("DOMContentLoaded", function () {
  // Мобильное меню
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("open");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", function (event) {
      if (
        !nav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        nav.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Появление блоков при прокрутке
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries, currentObserver) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    revealElements.forEach(function (element, index) {
      element.style.transitionDelay = (index % 3) * 80 + "ms";
      observer.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add("visible");
    });
  }

  // Кнопка прокрутки наверх
  const backToTop = document.getElementById("backToTop");

  function updateBackToTop() {
    if (backToTop) {
      backToTop.classList.toggle("visible", window.scrollY > 450);
    }
  }

  window.addEventListener("scroll", updateBackToTop, {
    passive: true
  });

  updateBackToTop();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Автоматически обновляем год в подвале
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Форма записи: подготавливаем сообщение для WhatsApp
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("clientName").value.trim();
      const phone = document.getElementById("clientPhone").value.trim();
      const car = document.getElementById("carModel").value.trim();
      const service = document.getElementById("serviceType").value;

      if (!name || !phone || !service) {
        alert("Пожалуйста, заполните имя, телефон и выберите услугу.");
        return;
      }

      const message = [
        "Здравствуйте! Хочу записаться в RED LINE.",
        "",
        "Имя: " + name,
        "Телефон: " + phone,
        "Автомобиль: " + (car || "Не указан"),
        "Услуга: " + service
      ].join("\n");

      const whatsappURL =
        "https://wa.me/998884009880?text=" +
        encodeURIComponent(message);

      window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
  }

  // Плавное появление страницы
  document.body.classList.add("page-loaded");
});
// ===== RED LINE: СЛАЙДЕР АВТОМОБИЛЕЙ =====
document.addEventListener("DOMContentLoaded", function () {
  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  const currentNumber = document.getElementById("slideCurrent");
  const nextButton = document.getElementById("slideNext");
  const prevButton = document.getElementById("slidePrev");

  if (!slides.length) return;

  let current = 0;
  let timer;

  function showSlide(index) {
    current = (index + slides.length) % slides.length;

    slides.forEach(function (slide, i) {
      slide.classList.toggle("active", i === current);
    });

    if (currentNumber) {
      currentNumber.textContent = String(current + 1).padStart(2, "0");
    }
  }

  function nextSlide() {
    showSlide(current + 1);
  }

  function startSlider() {
    clearInterval(timer);
    timer = setInterval(nextSlide, 5000);
  }

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      nextSlide();
      startSlider();
    });
  }

  if (prevButton) {
    prevButton.addEventListener("click", function () {
      showSlide(current - 1);
      startSlider();
    });
  }

  showSlide(0);
  startSlider();
});