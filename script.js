function openModal() {
    document.getElementById("learnMoreModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("learnMoreModal").style.display = "none";
}

// Close when clicking outside the box
window.onclick = function (e) {
    let modal = document.getElementById("learnMoreModal");
    if (e.target === modal) {
        modal.style.display = "none";
    }
}

const roles = [
    "Full-Stack Software Engineer",
    "Web Developer",
    "UI/UX Designer",
    "Problem Solver",
    "Creative Thinker",
    "Mobile App Developer",
    "Game Developer",
    "AI Researcher",
    "Graphic Designer",
    "Video Editor",
    "Content Creator",
];

let index = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const element = document.getElementById("typing-text");
    const currentRole = roles[index];

    if (isDeleting) {
        // Deleting
        charIndex--;
        element.textContent = currentRole.substring(0, charIndex);
    } else {
        // Typing
        charIndex++;
        element.textContent = currentRole.substring(0, charIndex);
    }

    // Determine speed dynamically
    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        // Word Complete -> Pause before deleting
        isDeleting = true;
        typeSpeed = 1500; 
    } else if (isDeleting && charIndex === 0) {
        // Deletion Complete -> Move to next word
        isDeleting = false;
        index = (index + 1) % roles.length;
        typeSpeed = 500; // Small pause before typing next word
    }

    setTimeout(typeEffect, typeSpeed);
}

document.addEventListener("DOMContentLoaded", typeEffect);

const contactForm = document.getElementById("contactForm");
const formResult = document.getElementById("formResult");
const submitBtn = document.getElementById("submitBtn");

if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                formResult.className = "mt-3 text-center custom-alert-success";
                formResult.innerHTML = '<i class="fas fa-check-circle me-2"></i> Message sent successfully!';
                contactForm.reset(); 
            } else {
                formResult.className = "mt-3 text-center custom-alert-error";
                formResult.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i> Something went wrong. Please try again.';
            }
        } catch (error) {
            formResult.className = "mt-3 text-center custom-alert-error";
            formResult.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i> Network error. Please try again later.';
        } finally {
            submitBtn.innerHTML = "Send Message";
            submitBtn.disabled = false;

            setTimeout(() => {
                formResult.classList.add("d-none");
            }, 5000);
        }
    });
}