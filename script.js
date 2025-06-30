document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Download CV button
    const downloadCvBtn = document.getElementById('download-cv');
    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('CV download functionality would be implemented here.');
            // In a real implementation, you would link to an actual CV file
            // window.location.href = 'path/to/your-cv.pdf';
        });
    });

    // Contact form submission
    // const contactForm = document.getElementById('contact-form');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', function(e) {
    //         e.preventDefault();
            
    //         const formData = new FormData(this);
    //         const messageDiv = document.getElementById('form-message');
            
    //         // Simple validation
    //         const name = formData.get('name');
    //         const email = formData.get('email');
    //         const subject = formData.get('subject');
    //         const message = formData.get('message');
            
    //         if (!name || !email || !subject || !message) {
    //             messageDiv.textContent = 'Please fill in all fields.';
    //             messageDiv.className = 'error';
    //             return;
    //         }
            // Contact form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const messageDiv = document.getElementById('form-message');
        
        // Simple validation
        if (!formData.get('name') || !formData.get('email') || !formData.get('subject') || !formData.get('message')) {
            messageDiv.textContent = 'Please fill in all fields.';
            messageDiv.className = 'error';
            messageDiv.style.display = 'block';
            return;
        }
        
        try {
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                messageDiv.textContent = 'Message sent successfully!';
                messageDiv.className = 'success';
                this.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            messageDiv.textContent = 'Oops! There was a problem sending your message.';
            messageDiv.className = 'error';
        } finally {
            messageDiv.style.display = 'block';
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    });
}
            // Here you would normally send the form data to a server
            // For this example, we'll simulate a successful submission
            
            // Construct the mailto link
            const mailtoLink = `mailto:paulpinaki45@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            )}`;
            
            // Open the default email client
            window.location.href = mailtoLink;
            
            // Show success message
            messageDiv.textContent = 'Your message has been sent successfully!';
            messageDiv.className = 'success';
            
            // Reset form
            this.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        });
    }

    // Project card hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.project-info').style.transform = 'translateY(0)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.project-info').style.transform = 'translateY(100%)';
        });
    });
});