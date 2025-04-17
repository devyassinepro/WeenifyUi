// common.js - Shared functionality for ProductNexus

document.addEventListener('DOMContentLoaded', function() {
    initializeSidebar();
    initializeThemeToggle();
    highlightCurrentPage();
    setupMobileMenu();
  });
  
  // Initialize sidebar functionality
  function initializeSidebar() {
    // Make sure sidebar links are working
    const sidebarLinks = document.querySelectorAll('.sidebar-nav-link');
    
    sidebarLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Remove active class from all links
        sidebarLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // On mobile, close the sidebar after clicking a link
        if (window.innerWidth < 768) {
          toggleSidebar(false);
        }
      });
    });
  }
  
  // Toggle sidebar visibility (for mobile)
  function toggleSidebar(show) {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');
    
    if (show === undefined) {
      show = !sidebar.classList.contains('open');
    }
    
    if (show) {
      sidebar.classList.add('open');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
  
  // Setup mobile menu button
  function setupMobileMenu() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const overlay = document.querySelector('.overlay');
    
    if (menuButton) {
      menuButton.addEventListener('click', function() {
        toggleSidebar(true);
      });
    }
    
    if (overlay) {
      overlay.addEventListener('click', function() {
        toggleSidebar(false);
      });
    }
    
    // Close sidebar when ESC key is pressed
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        toggleSidebar(false);
      }
    });
  }
  
  // Initialize theme toggle
  function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) return;
    
    // Check for saved theme preference or preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
      themeToggle.checked = true;
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.remove('dark');
      themeToggle.checked = false;
    }
    
    // Handle theme toggle changes
    themeToggle.addEventListener('change', function() {
      if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    });
  }
  
  // Highlight the current page in the sidebar
  function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const filename = currentPath.split('/').pop();
    
    const sidebarLinks = document.querySelectorAll('.sidebar-nav-link');
    
    sidebarLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      // Check if the link's href matches the current page
      if (href === filename || 
          (filename === '' && href === 'Index.html') || 
          (filename === 'index.html' && href === 'Index.html')) {
        link.classList.add('active');
      }
    });
  }
  
  // Utility function to format currency
  function formatCurrency(value, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(value);
  }
  
  // Utility function to format dates
  function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }
  
  // Show toast notifications
  function showToast(message, type = 'info', duration = 3000) {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Add toast to container
    toastContainer.appendChild(toast);
    
    // Remove toast after duration
    setTimeout(() => {
      toast.classList.add('toast-hiding');
      toast.addEventListener('transitionend', () => {
        toast.remove();
      });
    }, duration);
  }
  
  // Handle tabs functionality
  function initializeTabs(tabsContainerId) {
    const tabsContainer = document.getElementById(tabsContainerId);
    if (!tabsContainer) return;
    
    const tabs = tabsContainer.querySelectorAll('.tab-trigger');
    const tabContents = tabsContainer.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const target = this.dataset.target;
        
        // Hide all tab contents
        tabContents.forEach(content => {
          content.classList.remove('active');
        });
        
        // Remove active class from all tabs
        tabs.forEach(t => {
          t.classList.remove('active');
        });
        
        // Show target tab content
        document.getElementById(target).classList.add('active');
        
        // Add active class to clicked tab
        this.classList.add('active');
      });
    });
  }
  
  // Generate a random ID
  function generateId(prefix = 'id') {
    return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
  }
  
  // Initialize dropdown functionality
  function initializeDropdowns() {
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
    
    dropdownTriggers.forEach(trigger => {
      const dropdownContent = trigger.nextElementSibling;
      
      trigger.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Close all other open dropdowns
        document.querySelectorAll('.dropdown-content.show').forEach(dropdown => {
          if (dropdown !== dropdownContent) {
            dropdown.classList.remove('show');
          }
        });
        
        // Toggle this dropdown
        dropdownContent.classList.toggle('show');
      });
    });
    
    // Close dropdowns when clicking elsewhere
    document.addEventListener('click', function() {
      document.querySelectorAll('.dropdown-content.show').forEach(dropdown => {
        dropdown.classList.remove('show');
      });
    });
  }
  
  // Create chart with Chart.js
  function createChart(canvasId, type, data, options = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;
    
    return new Chart(canvas, {
      type: type,
      data: data,
      options: options
    });
  }
  
  // Load content dynamically (for demo purposes, showing loading indicator)
  function loadContent(containerId, delay = 500) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Show loading indicator
    container.innerHTML = '<div class="loading"></div>';
    
    // Simulate loading delay
    setTimeout(() => {
      // Remove loading indicator
      container.innerHTML = '';
      // Content should be populated here
    }, delay);
  }
  
  // Handle modal functionality
  function initializeModals() {
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    
    modalTriggers.forEach(trigger => {
      const modalId = trigger.dataset.modalTarget;
      const modal = document.getElementById(modalId);
      
      if (!modal) return;
      
      const closeButtons = modal.querySelectorAll('.modal-close');
      
      // Open modal when trigger is clicked
      trigger.addEventListener('click', () => {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
      
      // Close modal when close button is clicked
      closeButtons.forEach(button => {
        button.addEventListener('click', () => {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
      
      // Close modal when clicking outside content
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
      
      // Close modal when ESC key is pressed
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    });
  }