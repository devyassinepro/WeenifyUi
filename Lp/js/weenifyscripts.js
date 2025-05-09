document.addEventListener('DOMContentLoaded', function() {
    // Update current year in footer
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Mobile menu functionality (to be implemented)
    // const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    // const mobileMenu = document.getElementById('mobile-menu');
    // if (mobileMenuToggle && mobileMenu) {
    //     mobileMenuToggle.addEventListener('click', function() {
    //         mobileMenu.classList.toggle('hidden');
    //     });
    // }

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

// Mobile menu functionality
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('is-active');
        // Toggle aria-expanded attribute for accessibility
        const expanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true' || false;
        mobileMenuToggle.setAttribute('aria-expanded', !expanded);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !mobileMenuToggle.contains(event.target) && mobileMenu.classList.contains('is-active')) {
            mobileMenu.classList.remove('is-active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Close mobile menu when clicking a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('is-active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}
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
            // Calculate offset with respect to viewport width (smaller offset on mobile)
            let offset = window.innerWidth < 768 ? 60 : 80;
            
            window.scrollTo({
                top: targetElement.offsetTop - offset,
                behavior: 'smooth'
            });
        }
    });
});


    // User dropdown menu functionality
    const userMenuButton = document.getElementById('user-menu-button');
    const userDropdown = document.getElementById('user-dropdown');
    
    if (userMenuButton && userDropdown) {
        // Toggle dropdown when clicking the button
        userMenuButton.addEventListener('click', function() {
            const expanded = userMenuButton.getAttribute('aria-expanded') === 'true';
            userMenuButton.setAttribute('aria-expanded', !expanded);
            userDropdown.classList.toggle('hidden');
            
            // Rotate chevron when open
            const chevron = userMenuButton.querySelector('.chevron-down');
            if (chevron) {
                if (!expanded) {
                    chevron.style.transform = 'rotate(180deg)';
                } else {
                    chevron.style.transform = 'rotate(0)';
                }
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!userMenuButton.contains(event.target) && !userDropdown.contains(event.target)) {
                userMenuButton.setAttribute('aria-expanded', 'false');
                userDropdown.classList.add('hidden');
                
                // Reset chevron rotation
                const chevron = userMenuButton.querySelector('.chevron-down');
                if (chevron) {
                    chevron.style.transform = 'rotate(0)';
                }
            }
        });
    }

    initProductRadar();
        // Initialize Product Spy Section
    initProductSpy();

    // Initialize One-Click Import Section
    initOneClickImport();
    
    // Initialize Product Research Database
    initProductDatabase();
    
    // Initialize Market Research Dashboard
    initMarketDashboard();
});

// Product Spy Section
function initProductSpy() {
    const spyNotification = document.getElementById('spy-notification');
    if (spyNotification) {
        // Show notification with slight delay for demo
        setTimeout(() => {
            spyNotification.style.transform = 'translateY(0)';
        }, 1500);
    }
}

// One-Click Import Section
function initOneClickImport() {
    const importBtn = document.getElementById('import-btn');
    const importTrigger = document.getElementById('import-trigger');
    const importProgress = document.getElementById('import-progress');
    const importDot = document.getElementById('import-dot');
    const sourceImage = document.getElementById('source-image');
    const destImage = document.getElementById('dest-image');
    const successBadge = document.getElementById('success-badge');
    const destinationCard = document.querySelector('.store-card.destination');
    
    // Skip initialization if elements don't exist
    if (!importBtn || !importTrigger || !importProgress || !importDot) return;
    
    // Simple animation function for the import demo
    function animateImport() {
        // Reset
        importProgress.style.width = '0%';
        importDot.style.left = '0%';
        importDot.style.opacity = '1';
        destImage.style.opacity = '0.3';
        successBadge.style.transform = 'translateY(100%)';
        destinationCard.querySelector('.product-name').style.color = '#E5E7EB';
        destinationCard.querySelector('.product-price').style.color = '#E5E7EB';
        destinationCard.querySelector('.product-stats').style.color = '#E5E7EB';
        destinationCard.querySelector('.product-stats').innerHTML = '<span>Ready to import</span>';
        
        // Disable button during animation
        importBtn.style.pointerEvents = 'none';
        importTrigger.style.pointerEvents = 'none';
        
        // Animate progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += 1;
            importProgress.style.width = progress + '%';
            importDot.style.left = progress + '%';
            
            if (progress >= 100) {
                clearInterval(interval);
                
                // Complete the import
                setTimeout(() => {
                    importDot.style.opacity = '0';
                    destImage.style.opacity = '1';
                    destImage.src = sourceImage.src;
                    
                    // Update destination card
                    destinationCard.querySelector('.product-name').textContent = 'Pet Cleaning Spray';
                    destinationCard.querySelector('.product-name').style.color = '#1F2937';
                    destinationCard.querySelector('.product-price').textContent = '$24.99';
                    destinationCard.querySelector('.product-price').style.color = 'var(--weenify-purple)';
                    destinationCard.querySelector('.product-stats').innerHTML = `
                        <div class="product-stat">
                            <div class="product-stat-dot dot-green"></div>
                            <span>Imported</span>
                        </div>
                    `;
                    destinationCard.querySelector('.product-stats').style.color = '#6B7280';
                    
                    // Show success badge
                    successBadge.style.transform = 'translateY(0)';
                    
                    // Re-enable buttons
                    setTimeout(() => {
                        importBtn.style.pointerEvents = 'auto';
                        importTrigger.style.pointerEvents = 'auto';
                    }, 500);
                }, 300);
            }
        }, 15);
    }
    
    // Add click event listeners
    importBtn.addEventListener('click', animateImport);
    importTrigger.addEventListener('click', animateImport);
    
    // Auto-trigger the animation after a delay for demo purposes
    setTimeout(animateImport, 1500);
}

// Product Research Database
function initProductDatabase() {
    // Add hover effects to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
            card.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        });
    });

    // Add hover effects to buttons in product cards
    const productButtons = document.querySelectorAll('.product-button');
    productButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            if (button.classList.contains('primary')) {
                button.style.backgroundColor = 'var(--weenify-purple-dark)';
            } else {
                button.style.backgroundColor = 'rgba(139, 92, 246, 0.05)';
            }
        });
        
        button.addEventListener('mouseleave', () => {
            if (button.classList.contains('primary')) {
                button.style.backgroundColor = 'var(--weenify-purple)';
            } else {
                button.style.backgroundColor = 'white';
            }
        });
    });

    // Make product detail visible on page load for demo purposes
    const productDetail = document.querySelector('.product-detail');
    if (productDetail) {
        productDetail.style.opacity = '1';
        productDetail.style.visibility = 'visible';
    }

    // Make filter buttons functional
    const filterButtons = document.querySelectorAll('.results-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Make pagination buttons appear interactive
    const pageButtons = document.querySelectorAll('.page-button');
    pageButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            if (!button.classList.contains('active')) {
                button.style.backgroundColor = '#F3F4F6';
            }
        });
        
        button.addEventListener('mouseleave', () => {
            if (!button.classList.contains('active')) {
                button.style.backgroundColor = 'transparent';
            }
        });
    });
}

// Market Research Dashboard
function initMarketDashboard() {
    // Make marketplace items interactive
    const marketplaceItems = document.querySelectorAll('.marketplace-item');
    marketplaceItems.forEach(item => {
        item.addEventListener('click', () => {
            marketplaceItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Make filter pills interactive
    const filterPills = document.querySelectorAll('.filter-pill');
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
        });
    });

    // Make view options interactive
    const viewOptions = document.querySelectorAll('.view-option');
    viewOptions.forEach(option => {
        option.addEventListener('click', () => {
            viewOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });
    });

    // Add hover effects to product dots
    const productDots = document.querySelectorAll('.product-dot');
    productDots.forEach(dot => {
        dot.addEventListener('mouseenter', () => {
            dot.style.transform = 'translate(-50%, -50%) scale(1.1)';
            dot.style.zIndex = '15';
            
            // If this dot has an associated card, show it
            const dotClasses = dot.classList;
            if (dotClasses.contains('product-dot-hot')) {
                showProductCard();
            }
        });
        
        dot.addEventListener('mouseleave', () => {
            dot.style.transform = 'translate(-50%, -50%) scale(1)';
            dot.style.zIndex = '10';
        });
        
        dot.addEventListener('click', () => {
            showProductCard();
        });
    });

    // Show product card function
    function showProductCard() {
        const productCard = document.querySelector('.product-card');
        if (productCard) {
            productCard.style.opacity = '1';
            productCard.style.visibility = 'visible';
            productCard.style.transform = 'translate(-50%, -50%) scale(1)';
            
            // After a short delay, show the notification
            setTimeout(() => {
                const notification = document.querySelector('.notification');
                if (notification) {
                    notification.style.opacity = '1';
                    notification.style.visibility = 'visible';
                    
                    // Hide notification after some time
                    setTimeout(() => {
                        notification.style.opacity = '0';
                    }, 3000);
                }
            }, 1000);
        }
    }

    // Make buttons in product card interactive
    const productCardButtons = document.querySelectorAll('.card-actions .btn');
    productCardButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            if (button.classList.contains('btn-primary')) {
                button.style.backgroundColor = 'var(--primary-dark, #4338CA)';
            } else {
                button.style.backgroundColor = 'rgba(99, 102, 241, 0.05)';
            }
        });
        
        button.addEventListener('mouseleave', () => {
            if (button.classList.contains('btn-primary')) {
                button.style.backgroundColor = 'var(--primary)';
            } else {
                button.style.backgroundColor = 'white';
            }
        });
    });

    // Make action buttons in detail panel interactive
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            if (!button.classList.contains('secondary')) {
                button.style.backgroundColor = 'var(--primary-dark, #4338CA)';
            } else {
                button.style.backgroundColor = 'rgba(99, 102, 241, 0.05)';
            }
        });
        
        button.addEventListener('mouseleave', () => {
            if (!button.classList.contains('secondary')) {
                button.style.backgroundColor = 'var(--primary)';
            } else {
                button.style.backgroundColor = 'white';
            }
        });
        
        button.addEventListener('click', () => {
            if (!button.classList.contains('secondary')) {
                button.textContent = 'Product Imported!';
                button.style.backgroundColor = 'var(--success)';
                
                // Reset after a delay
                setTimeout(() => {
                    button.textContent = 'Import Product';
                    button.style.backgroundColor = 'var(--primary)';
                }, 2000);
            }
        });
    });

    // Trigger animation sequence for the dashboard on load
    setTimeout(() => {
        const productDot = document.querySelector('.product-dot-hot');
        if (productDot) {
            productDot.style.transform = 'translate(-50%, -50%) scale(1.1)';
            setTimeout(() => {
                showProductCard();
                productDot.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 300);
        }
    }, 1000);
}

function initProductRadar() {
    // Check if radar elements exist on page
    const radarDisplay = document.querySelector('.radar-display');
    if (!radarDisplay) return;
    
    // Helper function to set multiple CSS properties at once
    function setStyles(element, styles) {
        for (const property in styles) {
            element.style[property] = styles[property];
        }
    }
    
    // Helper function to animate with setTimeout
    function animateSequence(steps) {
        let currentStep = 0;
        
        function executeNextStep() {
            if (currentStep < steps.length) {
                const step = steps[currentStep];
                step.action();
                currentStep++;
                setTimeout(executeNextStep, step.delay || 0);
            }
        }
        
        executeNextStep();
    }
    
    // Radar Toggle Functionality
    const radarToggle = document.querySelector('.radar-toggle');
    const radarStatus = document.querySelector('.radar-status');
    const radarStatusDot = document.querySelector('.radar-status-dot');
    const radarStatusText = radarStatus.querySelector('span');
    const radarSweep = document.querySelector('.radar-sweep');
    
    let isRadarActive = true;
    
    if (radarToggle) {
        radarToggle.addEventListener('click', function() {
            isRadarActive = !isRadarActive;
            
            if (isRadarActive) {
                radarToggle.style.backgroundColor = 'var(--weenify-purple)';
                radarToggle.style.justifyContent = 'flex-end';
                radarStatusText.textContent = 'Scanning';
                radarStatusDot.style.backgroundColor = 'var(--weenify-green, #10B981)';
                radarStatus.style.backgroundColor = '#ECFDF5';
                radarStatus.style.color = '#065F46';
                radarSweep.style.animationPlayState = 'running';
                startProductRadarAnimation();
            } else {
                radarToggle.style.backgroundColor = '#E5E7EB';
                radarToggle.style.justifyContent = 'flex-start';
                radarToggle.querySelector('::after') ? radarToggle.querySelector('::after').style.left = '2px' : null;
                radarToggle.querySelector('::after') ? radarToggle.querySelector('::after').style.right = 'auto' : null;
                radarStatusText.textContent = 'Paused';
                radarStatusDot.style.backgroundColor = '#9CA3AF';
                radarStatus.style.backgroundColor = '#F3F4F6';
                radarStatus.style.color = '#4B5563';
                radarSweep.style.animationPlayState = 'paused';
                resetAnimation();
            }
        });
    }
    
    // Filter Functionality
    const filterButtons = document.querySelectorAll('.radar-filter');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update radar stats based on filter
            const filterType = this.textContent.toLowerCase();
            
            const productStats = document.querySelector('.radar-stat:first-child .radar-stat-value');
            const trendingStats = document.querySelector('.radar-stat:nth-child(2) .radar-stat-value');
            const hotStats = document.querySelector('.radar-stat:nth-child(3) .radar-stat-value');
            
            if (filterType === 'all') {
                productStats.textContent = '127';
                trendingStats.textContent = '5';
                hotStats.textContent = '1';
            } else if (filterType === 'trending') {
                productStats.textContent = '5';
                trendingStats.textContent = '5';
                hotStats.textContent = '1';
            } else if (filterType === 'profitable') {
                productStats.textContent = '36';
                trendingStats.textContent = '2';
                hotStats.textContent = '1';
            }
        });
    });
    
    // Define products with their positions and data
    const products = [
        {
            id: 'product1',
            labelId: 'label1',
            signalId: 'signal1',
            position: { x: -15, y: -15 },  // Rapproché vers le centre
            name: 'Wireless Camera',
            price: '$49.99',
            delay: 1500,
            image: 'images/mini-portable-projector.png',
            notification: 'notification1'
        },
        {
            id: 'product2',
            labelId: 'label2',
            signalId: 'signal2',
            position: { x: 15, y: -15 },  // Rapproché vers le centre
            name: 'Dog Training Collar',
            price: '$37.50',
            delay: 4000,
            image: 'images/dog-training-collar.png',
            isTrending: true,
            notification: 'notification2'
        },
        {
            id: 'product3',
            labelId: 'label3',
            signalId: 'signal3',
            position: { x: 15, y: 15 },  // Rapproché vers le centre
            name: 'Smart Watch',
            price: '$78.95',
            delay: 7500,
            image: 'images/ab-wheel-roller.png',
            isProfitable: true,
            notification: 'notification3'
        },
        {
            id: 'product4',
            labelId: 'label4',
            signalId: 'signal4',
            position: { x: -15, y: 15 },  // Rapproché vers le centre
            name: 'LED Projector',
            price: '$129.95',
            delay: 10000,
            image: 'images/mini-portable-projector.png'
        },
        {
            id: 'product5',
            labelId: 'label5',
            signalId: 'signal5',
            position: { x: 0, y: 25 },  // Rapproché vers le centre
            name: 'Pet Cleaning Spray',
            price: '$24.99',
            delay: 13000,
            isHot: true,
            image: 'images/pet-cleaner.png'
        }
    ];
    
    // Product Animation Sequence
    function startProductRadarAnimation() {
        // Reset any existing animations
        resetAnimation();
        
        // Get the radar container dimensions
        const radarRect = radarDisplay.getBoundingClientRect();
        const radarCenter = {
            x: radarRect.width / 2,
            y: radarRect.height / 2
        };
        
        // Position all products and related elements
        products.forEach(product => {
            const productElement = document.getElementById(product.id);
            const labelElement = document.getElementById(product.labelId);
            const signalElement = document.getElementById(product.signalId);
            
            if (!productElement || !labelElement || !signalElement) return;
            
            // Calculate absolute positions
            const productX = radarCenter.x + (product.position.x / 100) * radarRect.width;
            const productY = radarCenter.y + (product.position.y / 100) * radarRect.height;
            
            // Position product dot - adjust for larger size (30px is half of 60px)
            setStyles(productElement, {
                left: `${productX - 30}px`,  
                top: `${productY - 30}px`,   
                transform: 'scale(0)',
                opacity: '0'
            });
            
            // Position label (above the product)
            setStyles(labelElement, {
                left: `${productX - 60}px`,  // Center the label
                top: product.position.y < 0 ? `${productY - 80}px` : `${productY + 40}px`,  // Above if at top, below if at bottom
                opacity: '0',
                transform: 'translateY(10px)'
            });
            
            // Position signal (same position as product but larger)
            setStyles(signalElement, {
                left: `${productX - 40}px`,  // 40px is half of the 80px width
                top: `${productY - 40}px`,   // 40px is half of the 80px height
                width: '80px',
                height: '80px',
                transform: 'scale(0)',
                opacity: '0'
            });
            
            // Set product image if available
            const imgElement = document.getElementById(`${product.id}Img`);
            if (imgElement && product.image) {
                try {
                    imgElement.src = product.image;
                } catch(e) {
                    console.log('Using placeholder image for', product.id);
                }
            }
        });
        
        // Position detailed product card
        const detailedProduct = document.getElementById('detailedProduct');
        setStyles(detailedProduct, {
            transform: 'scale(0)',
            opacity: '0'
        });

        // Create animation steps for each product
        let animationSteps = [];
        
        // Start initial delay
        animationSteps.push({
            action: () => {
                console.log('Starting radar animation...');
            },
            delay: 500
        });
        
        // Add animation steps for each product
        products.forEach((product, index) => {
            const productElement = document.getElementById(product.id);
            const labelElement = document.getElementById(product.labelId);
            const signalElement = document.getElementById(product.signalId);
            const notificationElement = product.notification ? document.getElementById(product.notification) : null;
            
            if (!productElement || !labelElement || !signalElement) return;
            
            // Step 1: Signal pulse animation
            animationSteps.push({
                action: () => {
                    setStyles(signalElement, {
                        transform: 'scale(1)',
                        opacity: '0.5',
                        transition: 'all 0.5s ease-out'
                    });
                },
                delay: index === 0 ? 0 : product.delay - (index === 0 ? 0 : products[index - 1].delay) - 1000  // Adjust delay based on product configuration
            });
            
            // Step 2: Signal expands and product appears
            animationSteps.push({
                action: () => {
                    setStyles(signalElement, {
                        transform: 'scale(2)',
                        opacity: '0',
                        transition: 'all 0.5s ease-out'
                    });
                    
                    setStyles(productElement, {
                        transform: product.isHot ? 'scale(1.2)' : 'scale(1)',
                        opacity: '1',
                        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)', // Spring effect
                        boxShadow: product.isHot ? '0 0 15px rgba(220, 38, 38, 0.6), 0 0 0 3px rgba(254, 202, 202, 0.7)' : 
                                  (product.isTrending ? '0 0 15px rgba(245, 158, 11, 0.6), 0 0 0 3px rgba(254, 240, 138, 0.7)' : 
                                  (product.isProfitable ? '0 0 15px rgba(16, 185, 129, 0.6), 0 0 0 3px rgba(209, 250, 229, 0.7)' : 
                                   '0 0 10px rgba(139, 92, 246, 0.3), 0 0 0 3px rgba(255, 255, 255, 0.7)'))
                    });
                },
                delay: 500
            });
            
            // Step 3: Show label
            animationSteps.push({
                action: () => {
                    setStyles(labelElement, {
                        opacity: '1',
                        transform: 'translateY(0)',
                        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        boxShadow: product.isHot ? '0 10px 15px -3px rgba(220, 38, 38, 0.2), 0 4px 6px -4px rgba(220, 38, 38, 0.2)' : 
                                  (product.isTrending ? '0 10px 15px -3px rgba(245, 158, 11, 0.2), 0 4px 6px -4px rgba(245, 158, 11, 0.2)' :
                                  (product.isProfitable ? '0 10px 15px -3px rgba(16, 185, 129, 0.2), 0 4px 6px -4px rgba(16, 185, 129, 0.2)' :
                                   '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'))
                    });
                    
                    // If notification element exists, show it
                    if (notificationElement) {
                        setStyles(notificationElement, {
                            transform: 'scale(1)',
                            opacity: '1',
                            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        });
                        
                        // Hide notification after delay
                        setTimeout(() => {
                            setStyles(notificationElement, {
                                transform: 'scale(0)',
                                opacity: '0',
                                transition: 'all 0.3s ease-out'
                            });
                        }, 2000);
                    }
                },
                delay: 300
            });
            
            // Step 4: Show detailed card for the hot product
            if (product.isHot) {
                animationSteps.push({
                    action: () => {
                        // Update detailed product image if possible
                        const detailedProductImg = document.getElementById('detailedProductImg');
                        if (detailedProductImg && product.image) {
                            try {
                                detailedProductImg.src = product.image;
                            } catch(e) {
                                console.log('Using placeholder image for detailed product');
                            }
                        }
                        
                        // Show the detailed product card
                        setStyles(detailedProduct, {
                            transform: 'scale(1)',
                            opacity: '1',
                            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        });
                    },
                    delay: 1000
                });
            }
        });
        
        // Final step: Keep animation running
        animationSteps.push({
            action: () => {
                // Keep everything visible
                console.log('Animation complete');
            },
            delay: 5000
        });
        
        // Reset animation step - only if radar is toggled off
        animationSteps.push({
            action: () => {
                if (isRadarActive) {
                    resetAnimation();
                    startProductRadarAnimation();
                }
            },
            delay: 10000
        });
        
        // Execute the animation sequence
        animateSequence(animationSteps);
    }
    
    // Reset animation function
    function resetAnimation() {
        const productElements = document.querySelectorAll('.product-dot');
        const labelElements = document.querySelectorAll('.product-label');
        const signalElements = document.querySelectorAll('.product-signal');
        const notificationElements = document.querySelectorAll('.notification-bubble');
        const detailedProduct = document.getElementById('detailedProduct');
        
        // Reset all products
        productElements.forEach(element => {
            setStyles(element, {
                transform: 'scale(0)',
                opacity: '0',
                transition: 'all 0.3s ease-out',
                boxShadow: 'none'
            });
        });
        
        // Reset all labels
        labelElements.forEach(element => {
            setStyles(element, {
                opacity: '0',
                transform: 'translateY(10px)',
                transition: 'all 0.3s ease-out',
                boxShadow: 'none'
            });
        });
        
        // Reset all signals
        signalElements.forEach(element => {
            setStyles(element, {
                transform: 'scale(0)',
                opacity: '0',
                transition: 'all 0.3s ease-out'
            });
        });
        
        // Reset all notifications
        notificationElements.forEach(element => {
            setStyles(element, {
                transform: 'scale(0)',
                opacity: '0',
                transition: 'all 0.3s ease-out'
            });
        });
        
        // Reset detailed product card
        if (detailedProduct) {
            setStyles(detailedProduct, {
                transform: 'scale(0)',
                opacity: '0',
                transition: 'all 0.3s ease-out'
            });
        }
    }
    
    // Add animated blips to make the radar look active
    function addRandomBlips() {
        const radarBase = document.querySelector('.radar-base');
        
        if (!radarBase || !isRadarActive) return;
        
        // Create 3 random blips
        for (let i = 0; i < 3; i++) {
            createRandomBlip(radarBase);
        }
        
        // Schedule next batch of blips
        setTimeout(addRandomBlips, 3000);
    }
    
    function createRandomBlip(radarBase) {
        const blip = document.createElement('div');
        const size = Math.random() * 6 + 4; // Random size between 4-10px
        
        // Position randomly in the radar (in polar coordinates)
        const angle = Math.random() * Math.PI * 2; // Random angle in radians
        const radius = Math.random() * 45; // Random distance from center (0-45% of radius)
        
        // Convert polar to cartesian coordinates
        const radarRect = radarBase.getBoundingClientRect();
        const radarRadius = radarRect.width / 2;
        const x = radarRadius + Math.cos(angle) * (radius * radarRadius / 100);
        const y = radarRadius + Math.sin(angle) * (radius * radarRadius / 100);
        
        // Style the blip
        setStyles(blip, {
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            backgroundColor: 'rgba(139, 92, 246, 0.7)',
            left: `${x - size/2}px`,
            top: `${y - size/2}px`,
            animation: 'blink 1.5s ease-in-out',
            pointerEvents: 'none',
            zIndex: '2'
        });
        
        // Add to radar and remove after animation
        radarBase.appendChild(blip);
        
        // Remove after animation finishes
        setTimeout(() => {
            if (radarBase.contains(blip)) {
                radarBase.removeChild(blip);
            }
        }, 1500);
    }
    
    // Radar buttons functionality
    const importBtn = document.querySelector('.radar-actions .radar-btn:first-child');
    const saveBtn = document.querySelector('.radar-actions .radar-btn:last-child');
    
    if (importBtn) {
        importBtn.addEventListener('click', function() {
            const detailedProduct = document.getElementById('detailedProduct');
            const importProductBtn = document.querySelector('.detailed-product__btn');
            
            if (detailedProduct && getComputedStyle(detailedProduct).opacity > 0) {
                importProductBtn.textContent = 'Importing...';
                importProductBtn.style.backgroundColor = 'var(--weenify-green, #10B981)';
                
                setTimeout(() => {
                    importProductBtn.textContent = 'Imported!';
                    
                    // Create a notification bubble for successful import
                    const notificationDiv = document.createElement('div');
                    notificationDiv.className = 'notification-bubble';
                    notificationDiv.innerHTML = `
                        <div class="notification-bubble__icon notification-bubble__icon--success">✓</div>
                        <span>Product Imported!</span>
                    `;
                    
                    setStyles(notificationDiv, {
                        position: 'absolute',
                        top: '30px',             // Ajustez selon besoin
                        left: '30px',            // Plus près du centre, à gauche plutôt qu'à droite
                        transform: 'scale(0)',
                        opacity: '0',
                        zIndex: '30'
                    });
                    
                    document.querySelector('.radar-display').appendChild(notificationDiv);
                    
                    setTimeout(() => {
                        setStyles(notificationDiv, {
                            transform: 'scale(1)',
                            opacity: '1',
                            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        });
                        
                        setTimeout(() => {
                            setStyles(notificationDiv, {
                                transform: 'scale(0)',
                                opacity: '0',
                                transition: 'all 0.3s ease-out'
                            });
                            
                            setTimeout(() => {
                                notificationDiv.remove();
                            }, 300);
                        }, 2000);
                    }, 100);
                }, 1000);
            }
        });
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            // Create a notification bubble for save
            const notificationDiv = document.createElement('div');
            notificationDiv.className = 'notification-bubble';
            notificationDiv.innerHTML = `
                <div class="notification-bubble__icon notification-bubble__icon--info">★</div>
                <span>Product Saved!</span>
            `;
            
            setStyles(notificationDiv, {
                position: 'absolute',
                top: '80px',
                right: '-80px',
                transform: 'scale(0)',
                opacity: '0',
                zIndex: '30'
            });
            
            document.querySelector('.radar-display').appendChild(notificationDiv);
            
            setTimeout(() => {
                setStyles(notificationDiv, {
                    transform: 'scale(1)',
                    opacity: '1',
                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                });
                
                setTimeout(() => {
                    setStyles(notificationDiv, {
                        transform: 'scale(0)',
                        opacity: '0',
                        transition: 'all 0.3s ease-out'
                    });
                    
                    setTimeout(() => {
                        notificationDiv.remove();
                    }, 300);
                }, 2000);
            }, 100);
        });
    }
    
    // Detailed product button functionality
    const detailedProductBtn = document.querySelector('.detailed-product__btn');
    
    if (detailedProductBtn) {
        detailedProductBtn.addEventListener('click', function() {
            this.textContent = 'Importing...';
            this.style.backgroundColor = 'var(--weenify-green, #10B981)';
            
            setTimeout(() => {
                this.textContent = 'Imported!';
                
                // Create a notification bubble for successful import
                const notificationDiv = document.createElement('div');
                notificationDiv.className = 'notification-bubble';
                notificationDiv.innerHTML = `
                    <div class="notification-bubble__icon notification-bubble__icon--success">✓</div>
                    <span>Product Imported!</span>
                `;
                
                setStyles(notificationDiv, {
                    position: 'absolute',
                    top: '30px',
                    right: '-80px',
                    transform: 'scale(0)',
                    opacity: '0',
                    zIndex: '30'
                });
                
                document.querySelector('.radar-display').appendChild(notificationDiv);
                
                setTimeout(() => {
                    setStyles(notificationDiv, {
                        transform: 'scale(1)',
                        opacity: '1',
                        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    });
                    
                    setTimeout(() => {
                        setStyles(notificationDiv, {
                            transform: 'scale(0)',
                            opacity: '0',
                            transition: 'all 0.3s ease-out'
                        });
                        
                        setTimeout(() => {
                            notificationDiv.remove();
                        }, 300);
                    }, 2000);
                }, 100);
            }, 1000);
        });
    }
    
    // Add hover effects for product dots
    const productDots = document.querySelectorAll('.product-dot');
    
    productDots.forEach(dot => {
        dot.addEventListener('mouseenter', function() {
            // Find corresponding label
            const dotId = this.id;
            const labelId = dotId.replace('product', 'label');
            const label = document.getElementById(labelId);
            
            if (label) {
                // Highlight label when hovering product
                label.style.boxShadow = '0 10px 25px -5px rgba(139, 92, 246, 0.3), 0 8px 10px -6px rgba(139, 92, 246, 0.2)';
                label.style.transform = 'translateY(-5px) scale(1.05)';
            }
            
            // Scale up product dot slightly
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.5), 0 0 0 4px rgba(139, 92, 246, 0.2)';
            this.style.zIndex = '15';
        });
        
        dot.addEventListener('mouseleave', function() {
            // Find corresponding label
            const dotId = this.id;
            const labelId = dotId.replace('product', 'label');
            const label = document.getElementById(labelId);
            
            if (label) {
                // Restore label style
                label.style.boxShadow = '';
                label.style.transform = 'translateY(0)';
            }
            
            // Restore product dot style
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
            this.style.zIndex = '5';
            
            // Check if this is a special product (hot, trending, profitable)
            const productNumber = parseInt(dotId.replace('product', ''));
            if (products[productNumber - 1]) {
                const product = products[productNumber - 1];
                
                if (product.isHot) {
                    this.style.boxShadow = '0 0 15px rgba(220, 38, 38, 0.6), 0 0 0 3px rgba(254, 202, 202, 0.7)';
                    this.style.transform = 'scale(1.2)';
                } else if (product.isTrending) {
                    this.style.boxShadow = '0 0 15px rgba(245, 158, 11, 0.6), 0 0 0 3px rgba(254, 240, 138, 0.7)';
                } else if (product.isProfitable) {
                    this.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.6), 0 0 0 3px rgba(209, 250, 229, 0.7)';
                }
            }
        });
    });
    
    // Start intro animations
    function animateRadarIntro() {
        const radarBase = document.querySelector('.radar-base');
        const radarHeader = document.querySelector('.radar-header');
        const radarStats = document.querySelector('.radar-stats');
        const radarFooter = document.querySelector('.radar-footer');
        const radarCenter = document.querySelector('.radar-center');
        
        if (!radarBase || !radarHeader || !radarStats || !radarFooter || !radarCenter) return;
        
        // Initial state
        setStyles(radarBase, {
            transform: 'scale(0.8)',
            opacity: '0'
        });
        
        setStyles(radarHeader, {
            transform: 'translateY(-20px)',
            opacity: '0'
        });
        
        setStyles(radarStats, {
            transform: 'translateY(-10px)',
            opacity: '0'
        });
        
        setStyles(radarFooter, {
            transform: 'translateY(20px)',
            opacity: '0'
        });
        
        setStyles(radarCenter, {
            transform: 'translate(-50%, -50%) scale(0)',
            opacity: '0'
        });
        
        // Animate in sequence
        setTimeout(() => {
            setStyles(radarHeader, {
                transform: 'translateY(0)',
                opacity: '1',
                transition: 'all 0.5s ease-out'
            });
            
            setTimeout(() => {
                setStyles(radarStats, {
                    transform: 'translateY(0)',
                    opacity: '1',
                    transition: 'all 0.5s ease-out'
                });
                
                setTimeout(() => {
                    setStyles(radarBase, {
                        transform: 'scale(1)',
                        opacity: '1',
                        transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    });
                    
                    setTimeout(() => {
                        setStyles(radarCenter, {
                            transform: 'translate(-50%, -50%) scale(1)',
                            opacity: '1',
                            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        });
                        
                        setTimeout(() => {
                            setStyles(radarFooter, {
                                transform: 'translateY(0)',
                                opacity: '1',
                                transition: 'all 0.5s ease-out'
                            });
                            
                            // Start the main animation sequence after intro
                            setTimeout(() => {
                                startProductRadarAnimation();
                                addRandomBlips();
                            }, 500);
                        }, 200);
                    }, 300);
                }, 200);
            }, 200);
        }, 300);
    }
    
    // Create product info popup on product click
    productDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const dotId = this.id;
            const productNumber = parseInt(dotId.replace('product', ''));
            if (!products[productNumber - 1]) return;
            
            const product = products[productNumber - 1];
            
            // Find existing popup or create new one
            let popup = document.querySelector('.product-popup');
            
            if (!popup) {
                popup = document.createElement('div');
                popup.className = 'product-popup';
                document.querySelector('.radar-display').appendChild(popup);
                
                // Style the popup
                setStyles(popup, {
                    position: 'absolute',
                    backgroundColor: 'white',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    zIndex: '25',
                    width: '250px',
                    transform: 'scale(0)',
                    opacity: '0',
                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                });
            }
            
            // Position popup near the product
            const dotRect = this.getBoundingClientRect();
            const displayRect = document.querySelector('.radar-display').getBoundingClientRect();
            
            const popupLeft = dotRect.left - displayRect.left + 40;
            const popupTop = dotRect.top - displayRect.top - 60;
            
            // Update popup content and position
            popup.innerHTML = `
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                    <div style="width: 50px; height: 50px; border-radius: 0.5rem; background: linear-gradient(135deg, #f5f3ff, #ede9fe); display: flex; align-items: center; justify-content: center; padding: 0.4rem;">
                        <img src="${product.image || 'https://via.placeholder.com/50'}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: contain;">
                    </div>
                    <div>
                        <h3 style="font-weight: 600; font-size: 1rem; color: #1F2937; margin: 0;">${product.name}</h3>
                        <p style="font-size: 0.75rem; color: #6B7280; margin: 0;">Click for details</p>
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem; padding-bottom: 0.75rem; border-bottom: 1px solid #F3F4F6;">
                    <div style="text-align: center;">
                        <p style="font-weight: 700; color: var(--weenify-purple); font-size: 1.125rem; margin: 0;">${product.price}</p>
                        <p style="font-size: 0.75rem; color: #6B7280; margin: 0;">Price</p>
                    </div>
                    <div style="text-align: center;">
                        <p style="font-weight: 700; color: var(--weenify-green, #10B981); font-size: 1.125rem; margin: 0;">86%</p>
                        <p style="font-size: 0.75rem; color: #6B7280; margin: 0;">Profit %</p>
                    </div>
                </div>
                <button style="width: 100%; background-color: var(--weenify-purple); color: white; font-size: 0.75rem; font-weight: 600; padding: 0.5rem 0.75rem; border-radius: 0.5rem; border: none; cursor: pointer;">View Details</button>
            `;
            
            setStyles(popup, {
                left: `${popupLeft}px`,
                top: `${popupTop}px`,
                transform: 'scale(1)',
                opacity: '1'
            });
            
            // Close popup when clicking outside
            function closePopup(e) {
                if (!popup.contains(e.target) && e.target !== dot) {
                    setStyles(popup, {
                        transform: 'scale(0)',
                        opacity: '0'
                    });
                    
                    // Remove the popup after animation
                    setTimeout(() => {
                        if (popup.parentNode) {
                            popup.parentNode.removeChild(popup);
                        }
                    }, 300);
                    
                    document.removeEventListener('click', closePopup);
                }
            }
            
            // Add event listener with slight delay to prevent immediate closing
            setTimeout(() => {
                document.addEventListener('click', closePopup);
            }, 100);
        });
    });
    
    // Start intro animations
    animateRadarIntro();
}