// Initialize AOS
AOS.init({
  duration: 1000,
  once: false,
  mirror: true,
});

// Navbar scroll effect
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Network animation in hero section
const canvas = document.getElementById("networkCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
const particleCount = 100;
const maxDistance = 120;

// Set canvas dimensions
function resizeCanvas() {
  canvas.width = canvas.parentElement.offsetWidth;
  canvas.height = canvas.parentElement.offsetHeight;
}

// Create particles
function createParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      vx: Math.random() * 0.2 - 0.1,
      vy: Math.random() * 0.2 - 0.1,
    });
  }
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";

  // Update and draw particles
  particles.forEach((particle) => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    // Bounce off edges
    if (particle.x < 0 || particle.x > canvas.width) particle.vx = -particle.vx;
    if (particle.y < 0 || particle.y > canvas.height)
      particle.vy = -particle.vy;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  // Draw connections
  ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
  ctx.lineWidth = 0.5;

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        const opacity = 1 - distance / maxDistance;
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;

        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

// Initialize canvas
window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});

resizeCanvas();
createParticles();
animate();

// Portfolio filtering
const portfolioItems = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "E-Commerce Website",
    category: "web",
    description:
      "A modern e-commerce platform with secure payment integration.",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/5053740/pexels-photo-5053740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Learning Management System",
    category: "education",
    description: "A comprehensive LMS for online education with video courses.",
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/6804581/pexels-photo-6804581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Social Media Campaign",
    category: "marketing",
    description:
      "Strategic social media campaign that increased engagement by 150%.",
  },
  {
    id: 4,
    image:
      "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Corporate Website",
    category: "web",
    description: "Professional website design for a multinational corporation.",
  },
  {
    id: 5,
    image:
      "https://images.pexels.com/photos/5053743/pexels-photo-5053743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Virtual Classroom",
    category: "education",
    description:
      "Interactive virtual classroom with real-time collaboration tools.",
  },
  {
    id: 6,
    image:
      "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Digital Marketing Strategy",
    category: "marketing",
    description:
      "Comprehensive digital marketing strategy that doubled conversion rates.",
  },
];

const portfolioGrid = document.querySelector(".portfolio-grid");
const filterButtons = document.querySelectorAll(".filter-btn");

// Render portfolio items
function renderPortfolioItems(items) {
  portfolioGrid.innerHTML = items
    .map(
      (item, index) => `
    <div class="col-md-6 col-lg-4 portfolio-item" data-aos="fade-up" data-aos-delay="${
      index * 100
    }">
      <div class="portfolio-card" onclick="openModal(${item.id})">
        <div class="portfolio-img">
          <img src="${item.image}" alt="${item.title}" class="img-fluid">
        </div>
        <div class="portfolio-overlay">
          <h3>${item.title}</h3>
          <p>${item.category}</p>
          <button class="btn btn-sm btn-light">View Details</button>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

// Filter portfolio items
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filteredItems =
      filter === "all"
        ? portfolioItems
        : portfolioItems.filter((item) => item.category === filter);

    renderPortfolioItems(filteredItems);
  });
});

// Initial render
renderPortfolioItems(portfolioItems);

// Contact form handling
const contactForm = document.getElementById("contactForm");
const submitButton = contactForm.querySelector('button[type="submit"]');
const buttonText = submitButton.querySelector(".button-text");
const spinner = submitButton.querySelector(".spinner-border");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Form validation
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  let isValid = true;

  // Reset previous errors
  contactForm.querySelectorAll(".is-invalid").forEach((input) => {
    input.classList.remove("is-invalid");
  });

  // Validate required fields
  ["name", "email", "subject", "message"].forEach((field) => {
    const input = contactForm.querySelector(`[name="${field}"]`);
    if (!data[field].trim()) {
      input.classList.add("is-invalid");
      input.nextElementSibling.textContent = "This field is required";
      isValid = false;
    }
  });

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    const emailInput = contactForm.querySelector('[name="email"]');
    emailInput.classList.add("is-invalid");
    emailInput.nextElementSibling.textContent =
      "Please enter a valid email address";
    isValid = false;
  }

  if (isValid) {
    // Show loading state
    submitButton.disabled = true;
    buttonText.textContent = "Sending...";
    spinner.classList.remove("d-none");

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Show success message
    const successAlert = document.createElement("div");
    successAlert.className =
      "alert alert-success animate__animated animate__fadeIn";
    successAlert.textContent =
      "Your message has been sent successfully! We'll get back to you soon.";
    contactForm.insertBefore(successAlert, contactForm.firstChild);

    // Reset form
    contactForm.reset();

    // Reset button state
    submitButton.disabled = false;
    buttonText.textContent = "Send Message";
    spinner.classList.add("d-none");

    // Remove success message after 5 seconds
    setTimeout(() => {
      successAlert.remove();
    }, 5000);
  }
});

// Set current year in footer
document.getElementById("currentYear").textContent = new Date().getFullYear();
