document.addEventListener('DOMContentLoaded', function() {
    // Update current year in footer
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Mobile menu functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            document.body.classList.toggle('overflow-hidden');
        });
    }

    const mobileMenuClose = document.getElementById('mobile-menu-close');
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        });
    }

    // Mobile menu links (close menu when clicked)
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a[href^="#"]');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        });
    });

    // Accordion functionality for FAQ section
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    // Open first accordion by default
    if (accordionHeaders.length > 0) {
        const firstContent = accordionHeaders[0].nextElementSibling;
        const firstChevron = accordionHeaders[0].querySelector('.chevron-down');
        
        firstContent.classList.remove('hidden');
        firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
        accordionHeaders[0].setAttribute('aria-expanded', 'true');
        if (firstChevron) {
            firstChevron.style.transform = 'rotate(180deg)';
        }
    }
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Get the content associated with this header
            const content = this.nextElementSibling;
            const chevron = this.querySelector('.chevron-down');
            
            // Toggle the expanded state
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle the content visibility
            if (!isExpanded) {
                // Close all other accordions
                accordionHeaders.forEach(otherHeader => {
                    if (otherHeader !== this) {
                        const otherContent = otherHeader.nextElementSibling;
                        const otherChevron = otherHeader.querySelector('.chevron-down');
                        otherHeader.setAttribute('aria-expanded', 'false');
                        if (otherContent) {
                            otherContent.style.maxHeight = null;
                            otherContent.classList.add('hidden');
                        }
                        if (otherChevron) {
                            otherChevron.style.transform = 'rotate(0deg)';
                        }
                    }
                });
                
                // Open this accordion
                content.classList.remove('hidden');
                content.style.maxHeight = content.scrollHeight + 'px';
                if (chevron) {
                    chevron.style.transform = 'rotate(180deg)';
                }
            } else {
                // Close this accordion
                content.style.maxHeight = null;
                setTimeout(() => {
                    content.classList.add('hidden');
                }, 300);
                if (chevron) {
                    chevron.style.transform = 'rotate(0deg)';
                }
            }
        });
    });

    // Product Carousel
    const productsContainer = document.querySelector('#product-carousel .products-container');
    const productPrevBtn = document.querySelector('#product-prev');
    const productNextBtn = document.querySelector('#product-next');
    const productDots = document.querySelectorAll('#product-indicators .dot');
    
    if (productsContainer && productPrevBtn && productNextBtn) {
        let productCurrentPage = 0;
        const productTotalPages = Math.ceil(productsContainer.children.length / 4);
        
        // Initialize dots
        updateProductDots(0);
        
        productPrevBtn.addEventListener('click', function() {
            if (productCurrentPage > 0) {
                productCurrentPage--;
                slideProducts();
            }
        });
        
        productNextBtn.addEventListener('click', function() {
            if (productCurrentPage < productTotalPages - 1) {
                productCurrentPage++;
                slideProducts();
            }
        });
        
        // Add click events to indicator dots
        productDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                productCurrentPage = index;
                slideProducts();
            });
        });
        
        function slideProducts() {
            // Calculate slide position
            const slideAmount = -productCurrentPage * 100 + '%';
            productsContainer.style.transform = 'translateX(' + slideAmount + ')';
            
            // Update prev/next button states
            productPrevBtn.classList.toggle('opacity-50', productCurrentPage === 0);
            productNextBtn.classList.toggle('opacity-50', productCurrentPage === productTotalPages - 1);
            
            // Update dots
            updateProductDots(productCurrentPage);
        }
        
        function updateProductDots(active) {
            productDots.forEach((dot, index) => {
                dot.classList.toggle('bg-weenify-purple', index === active);
                dot.classList.toggle('bg-gray-300', index !== active);
            });
        }
    }
    
    // Testimonial Carousel
    const testimonialContainer = document.querySelector('#testimonial-carousel .testimonials-container');
    const testimonialPrevBtn = document.querySelector('#testimonial-prev');
    const testimonialNextBtn = document.querySelector('#testimonial-next');
    const testimonialDots = document.querySelectorAll('#testimonial-indicators .dot');
    let testimonialInterval;
    
    if (testimonialContainer && testimonialPrevBtn && testimonialNextBtn) {
        let testimonialCurrentIndex = 0;
        const testimonialTotal = testimonialContainer.children.length;
        
        // Initialize dots
        updateTestimonialDots(0);
        
        // Auto rotation
        startTestimonialAutoRotation();
        
        testimonialPrevBtn.addEventListener('click', function() {
            testimonialCurrentIndex = (testimonialCurrentIndex - 1 + testimonialTotal) % testimonialTotal;
            slideTestimonials();
            resetTestimonialAutoRotation();
        });
        
        testimonialNextBtn.addEventListener('click', function() {
            testimonialCurrentIndex = (testimonialCurrentIndex + 1) % testimonialTotal;
            slideTestimonials();
            resetTestimonialAutoRotation();
        });
        
        // Add click events to indicator dots
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                testimonialCurrentIndex = index;
                slideTestimonials();
                resetTestimonialAutoRotation();
            });
        });
        
        function slideTestimonials() {
            // Calculate slide position
            const slideAmount = -testimonialCurrentIndex * 100 + '%';
            testimonialContainer.style.transform = 'translateX(' + slideAmount + ')';
            
            // Update dots
            updateTestimonialDots(testimonialCurrentIndex);
        }
        
        function updateTestimonialDots(active) {
            testimonialDots.forEach((dot, index) => {
                dot.classList.toggle('bg-weenify-purple', index === active);
                dot.classList.toggle('bg-gray-300', index !== active);
            });
        }
        
        function startTestimonialAutoRotation() {
            testimonialInterval = setInterval(function() {
                testimonialCurrentIndex = (testimonialCurrentIndex + 1) % testimonialTotal;
                slideTestimonials();
            }, 5000);
        }
        
        function resetTestimonialAutoRotation() {
            clearInterval(testimonialInterval);
            startTestimonialAutoRotation();
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            
            if (!targetId) return; // Skip if href is just "#"
            
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky header effect
    const header = document.querySelector('header');
    const scrollUpBtn = document.getElementById('scroll-up-btn');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('sticky-header');
                if (scrollUpBtn) {
                    scrollUpBtn.classList.remove('hidden');
                }
            } else {
                header.classList.remove('sticky-header');
                if (scrollUpBtn) {
                    scrollUpBtn.classList.add('hidden');
                }
            }
        });
    }
    
    // Scroll to top button
    if (scrollUpBtn) {
        scrollUpBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Animate on scroll elements
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    // Unobserve after animation is triggered
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animateElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        animateElements.forEach(element => {
            element.classList.add('animated');
        });
    }
    
    // Number counters animation
    const counters = document.querySelectorAll('.counter');
    
    // Only run this if the counters are actually on the page
    if (counters.length > 0) {
        // Check if IntersectionObserver is supported
        if ('IntersectionObserver' in window) {
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counterElement = entry.target;
                        const target = parseInt(counterElement.getAttribute('data-target'));
                        const duration = 2000; // 2 seconds
                        const step = Math.ceil(target / (duration / 16)); // 60 fps
                        
                        // Start counting
                        let current = 0;
                        const timer = setInterval(() => {
                            current += step;
                            if (current >= target) {
                                counterElement.textContent = target.toLocaleString();
                                clearInterval(timer);
                            } else {
                                counterElement.textContent = current.toLocaleString();
                            }
                        }, 16);
                        
                        // Unobserve after animation starts
                        counterObserver.unobserve(counterElement);
                    }
                });
            }, { threshold: 0.5 });
            
            counters.forEach(counter => {
                counterObserver.observe(counter);
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                counter.textContent = target.toLocaleString();
            });
        }
    }
    
    // Form validation (basic example)
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = form.querySelectorAll('input[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                    
                    // Add error message if it doesn't exist
                    let errorMsg = field.parentNode.querySelector('.error-message');
                    if (!errorMsg) {
                        errorMsg = document.createElement('p');
                        errorMsg.className = 'error-message text-red-500 text-sm mt-1';
                        errorMsg.textContent = 'This field is required';
                        field.parentNode.appendChild(errorMsg);
                    }
                } else {
                    field.classList.remove('border-red-500');
                    
                    // Remove error message if it exists
                    const errorMsg = field.parentNode.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                }
            });
            
            // If email field exists, validate email format
            const emailField = form.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value.trim())) {
                    isValid = false;
                    emailField.classList.add('border-red-500');
                    
                    // Add error message if it doesn't exist
                    let errorMsg = emailField.parentNode.querySelector('.error-message');
                    if (!errorMsg) {
                        errorMsg = document.createElement('p');
                        errorMsg.className = 'error-message text-red-500 text-sm mt-1';
                        errorMsg.textContent = 'Please enter a valid email address';
                        emailField.parentNode.appendChild(errorMsg);
                    } else {
                        errorMsg.textContent = 'Please enter a valid email address';
                    }
                }
            }
            
            if (isValid) {
                // Form is valid, you could submit it here
                console.log('Form is valid, submitting...');
                
                // Show success message (example)
                const successMsg = document.createElement('div');
                successMsg.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4';
                successMsg.innerHTML = '<strong class="font-bold">Success!</strong> <span class="block sm:inline">Your form has been submitted.</span>';
                form.appendChild(successMsg);
                
                // Reset form after success
                setTimeout(() => {
                    form.reset();
                    successMsg.remove();
                }, 3000);
            }
        });
    });
    
    // Newsletter subscription popup (shows after 5 seconds)
    const newsletterPopup = document.getElementById('newsletter-popup');
    const closePopup = document.getElementById('close-popup');
    
    if (newsletterPopup && closePopup) {
        // Check if the user has previously closed the popup
        if (!localStorage.getItem('newsletter_closed')) {
            // Show popup after 5 seconds
            setTimeout(function() {
                newsletterPopup.classList.remove('hidden');
                newsletterPopup.classList.add('flex');
            }, 5000);
        }
        
        closePopup.addEventListener('click', function() {
            newsletterPopup.classList.add('hidden');
            newsletterPopup.classList.remove('flex');
            
            // Save that the user has closed the popup
            localStorage.setItem('newsletter_closed', 'true');
        });
    }
});