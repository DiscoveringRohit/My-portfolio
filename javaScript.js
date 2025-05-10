// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize 3D Animation
    initThreeJsAnimation();
    
    // Initialize navigation functionality
    initNavigation();
    
    // Initialize project tabs
    initProjectTabs();
    
    // Initialize video players
    initVideoPlayers();
    
    // Initialize contact form modal
    initContactModal();
    
    // Initialize form submission
    initFormSubmission();
    
    // Initialize scroll animations
    initScrollAnimations();
});

// Three.js 3D Animation
function initThreeJsAnimation() {
    const container = document.getElementById('canvas-container');
    
    if (!container) return;
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 7;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create particles material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x00bcd4,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    // Create particle mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Set camera position
    camera.position.z = 2;
    
    // Mouse movement interaction
    let mouseX = 0;
    let mouseY = 0;
    
    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - window.innerWidth / 2) / 100;
        mouseY = (event.clientY - window.innerHeight / 2) / 100;
    }
    
    document.addEventListener('mousemove', onDocumentMouseMove);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate particles
        particlesMesh.rotation.x += 0.001;
        particlesMesh.rotation.y += 0.001;
        
        // Mouse interaction
        particlesMesh.rotation.x += mouseY * 0.001;
        particlesMesh.rotation.y += mouseX * 0.001;
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');
    
    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('open');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && hamburger.classList.contains('open')) {
                hamburger.classList.remove('open');
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Handle scroll and active link state
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        const scrollPosition = window.scrollY;
        
        // Add scrolled class to header
        if (scrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active link based on scroll position
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                links.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Project tabs functionality
function initProjectTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const projectContainers = document.querySelectorAll('.project-container');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all project containers
            projectContainers.forEach(container => container.classList.remove('active'));
            
            // Show the selected container
            const targetId = this.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });
}

// Video player functionality
function initVideoPlayers() {
    const projectVideos = document.querySelectorAll('.project-video');
    const playButtons = document.querySelectorAll('.play-btn');
    
    playButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const video = projectVideos[index];
            
            if (video.paused) {
                // Reset all videos
                projectVideos.forEach(v => {
                    if (!v.paused) {
                        v.pause();
                    }
                });
                
                // Play the clicked video
                video.play();
                this.textContent = '❚❚'; // Pause symbol
                this.parentElement.style.background = 'rgba(0, 0, 0, 0.2)';
            } else {
                // Pause the video
                video.pause();
                this.textContent = '▶'; // Play symbol
                this.parentElement.style.background = 'rgba(0, 0, 0, 0.5)';
            }
        });
    });
    
    // Reset play button when video ends
    projectVideos.forEach((video, index) => {
        video.addEventListener('ended', function() {
            playButtons[index].textContent = '▶';
            playButtons[index].parentElement.style.background = 'rgba(0, 0, 0, 0.5)';
        });
    });
}

// Contact modal functionality
function initContactModal() {
    const contactBtn = document.querySelector('.contact-btn');
    const modal = document.getElementById('contact-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (contactBtn && modal) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    }
    
    if (closeModal && modal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Form submission functionality
function initFormSubmission() {
    const contactForm = document.getElementById('contact-form');
    const modalForm = document.getElementById('modal-contact-form');
    
    const handleFormSubmit = function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formDataObj = {};
        
        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });
        
        // Show submission feedback (in a real project, you would send this data to a server)
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
        
        // Close modal if it's the modal form
        if (this.id === 'modal-contact-form') {
            document.getElementById('contact-modal').style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    if (modalForm) {
        modalForm.addEventListener('submit', handleFormSubmit);
    }
}

// Scroll animations
function initScrollAnimations() {
    // Add animation delay to intro paragraphs
    const introParagraphs = document.querySelectorAll('.intro p');
    introParagraphs.forEach((p, index) => {
        p.style.setProperty('--i', index + 1);
    });
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.project-card, .section-header, .form-group, .info-item');
    animateElements.forEach(el => {
        el.classList.add('scroll-animation');
        observer.observe(el);
    });
}

// Helper function for smooth scrolling
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