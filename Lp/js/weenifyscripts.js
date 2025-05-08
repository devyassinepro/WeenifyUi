document.addEventListener('DOMContentLoaded', function() {
    // Update current year in footer
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // User dropdown menu functionality
    const userMenuButton = document.getElementById('user-menu-button');
    const userDropdown = document.getElementById('user-dropdown');
    const chevronIcon = userMenuButton?.querySelector('.chevron-down');
    
    if (userMenuButton && userDropdown) {
        // Toggle dropdown when clicking the button
        userMenuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            const expanded = userMenuButton.getAttribute('aria-expanded') === 'true';
            userMenuButton.setAttribute('aria-expanded', !expanded);
            userDropdown.classList.toggle('hidden');
            
            // Rotate chevron icon
            if (chevronIcon) {
                chevronIcon.style.transform = expanded ? 'rotate(0deg)' : 'rotate(180deg)';
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!userMenuButton.contains(event.target) && !userDropdown.contains(event.target)) {
                userMenuButton.setAttribute('aria-expanded', 'false');
                userDropdown.classList.add('hidden');
                
                if (chevronIcon) {
                    chevronIcon.style.transform = 'rotate(0deg)';
                }
            }
        });
    }

    // Mobile menu functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuClosedIcon = document.getElementById('menu-closed-icon');
    const menuOpenIcon = document.getElementById('menu-open-icon');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            const expanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
            mobileMenuToggle.setAttribute('aria-expanded', !expanded);
            mobileMenu.classList.toggle('hidden');
            
            // Toggle menu icons
            if (menuClosedIcon && menuOpenIcon) {
                menuClosedIcon.classList.toggle('hidden');
                menuOpenIcon.classList.toggle('hidden');
            }
        });
    }

    // Accordion functionality for FAQ section
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Get the content associated with this header
            const content = this.nextElementSibling;
            
            // Toggle the expanded state
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle the content visibility
            if (!isExpanded) {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.classList.remove('hidden');
            } else {
                content.style.maxHeight = null;
                // Add a small delay before hiding to allow for animation
                setTimeout(() => {
                    content.classList.add('hidden');
                }, 300);
            }
            
            // Close other accordion items
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== this) {
                    otherHeader.setAttribute('aria-expanded', 'false');
                    const otherContent = otherHeader.nextElementSibling;
                    otherContent.style.maxHeight = null;
                    setTimeout(() => {
                        otherContent.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });

    // Initialize all accordion items as closed
    accordionHeaders.forEach(header => {
        header.setAttribute('aria-expanded', 'false');
    });

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
            
            // If password confirmation field exists, validate it matches
            const passwordField = form.querySelector('input[id="password"]');
            const confirmPasswordField = form.querySelector('input[id="confirm-password"]');
            
            if (passwordField && confirmPasswordField && 
                passwordField.value.trim() && confirmPasswordField.value.trim()) {
                if (passwordField.value !== confirmPasswordField.value) {
                    isValid = false;
                    confirmPasswordField.classList.add('border-red-500');
                    
                    // Add error message if it doesn't exist
                    let errorMsg = confirmPasswordField.parentNode.querySelector('.error-message');
                    if (!errorMsg) {
                        errorMsg = document.createElement('p');
                        errorMsg.className = 'error-message text-red-500 text-sm mt-1';
                        errorMsg.textContent = 'Passwords do not match';
                        confirmPasswordField.parentNode.appendChild(errorMsg);
                    } else {
                        errorMsg.textContent = 'Passwords do not match';
                    }
                }
            }
            
            if (isValid) {
                // Form is valid, you could submit it here
                console.log('Form is valid, would submit...');
                // form.submit(); // Uncomment to actually submit the form
                
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
});