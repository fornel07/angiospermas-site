// Mobile menu toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })
}

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    if (hamburger) hamburger.classList.remove("active")
    if (navMenu) navMenu.classList.remove("active")
  })
})

// Smooth scrolling
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) section.scrollIntoView({ behavior: "smooth", block: "start" })
}

// Gallery modal functions
function openModal(element) {
  const modal = document.getElementById("modal")
  const modalImg = document.getElementById("modal-img")
  const modalInfo = document.getElementById("modal-info")

  const img = element.querySelector("img")
  const overlay = element.querySelector(".gallery-overlay")

  modal.style.display = "block"
  modalImg.src = img.src
  modalImg.alt = img.alt
  modalInfo.innerHTML = overlay.innerHTML

  // Prevent body scroll when modal is open
  document.body.style.overflow = "hidden"
}

function closeModal() {
  const modal = document.getElementById("modal")
  modal.style.display = "none"

  // Restore body scroll
  document.body.style.overflow = "auto"
}

// Close modal when clicking outside of it
window.addEventListener("click", (event) => {
  const modal = document.getElementById("modal")
  if (event.target === modal) {
    closeModal()
  }
})

// Close modal with Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal()
  }
})

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(45, 90, 39, 0.95)"
    navbar.style.backdropFilter = "blur(10px)"
  } else {
    navbar.style.background = "linear-gradient(135deg, #2d5a27, #4a7c59)"
    navbar.style.backdropFilter = "none"
  }
})

// Add active class to navigation links based on scroll position
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-menu a")

  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.clientHeight

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Add CSS for active nav links and hamburger animation
const style = document.createElement("style")
style.textContent = `
    .nav-menu a.active {
        color: #a8d5a8 !important;
        font-weight: bold;
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active span:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`
document.head.appendChild(style)

// Back to top button
const backToTop = document.createElement("button")
backToTop.innerHTML = "↑"
backToTop.style.cssText =
  "position:fixed;bottom:20px;right:20px;background:#4a7c59;color:white;border:none;border-radius:50%;width:50px;height:50px;font-size:20px;cursor:pointer;display:none;z-index:1000;transition:all 0.3s"
backToTop.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" })
document.body.appendChild(backToTop)

window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none"
})
