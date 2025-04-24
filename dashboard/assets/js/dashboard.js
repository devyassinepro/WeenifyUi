document.addEventListener('DOMContentLoaded', function() {

const mainThemeToggle = document.getElementById('theme-toggle');
const sidebarThemeToggle = document.getElementById('sidebar-theme-toggle');

if (mainThemeToggle && sidebarThemeToggle) {
  // Check if theme preference is stored in localStorage
  const storedTheme = localStorage.getItem('theme');
  
  // Apply stored theme or use system preference
  if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('data-theme', 'dark');
    mainThemeToggle.checked = true;
    sidebarThemeToggle.checked = true;
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.setAttribute('data-theme', 'light');
    mainThemeToggle.checked = false;
    sidebarThemeToggle.checked = false;
  }
  
  // Sync the sidebar toggle with the main toggle
  mainThemeToggle.addEventListener('change', function() {
    sidebarThemeToggle.checked = this.checked;
    
    if (this.checked) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      
      // Update chart theme if needed
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      
      // Update chart theme if needed
    }
  });
  
  sidebarThemeToggle.addEventListener('change', function() {
    mainThemeToggle.checked = this.checked;
    // Trigger the change event to update the theme
    const event = new Event('change');
    mainThemeToggle.dispatchEvent(event);
  });
}

// Update chart theme based on current theme
function updateChartTheme(chart, isDark) {
  if (!chart) return;
  
  const textColor = isDark ? '#f8fafc' : '#0f172a';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
  
  chart.options.scales.x.ticks.color = textColor;
  chart.options.scales.y.ticks.color = textColor;
  chart.options.scales.x.grid.color = gridColor;
  chart.options.scales.y.grid.color = gridColor;
  chart.options.plugins.legend.labels.color = textColor;
  
  chart.update();
}

// Mobile menu toggle
const menuButton = document.querySelector('.mobile-menu-button');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');

if (menuButton) {
  menuButton.addEventListener('click', function() {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
  });
}

if (overlay) {
  overlay.addEventListener('click', function() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  });
}

// Initialize dropdown functionality
const dropdownTrigger = document.querySelector('.dropdown-trigger');
const dropdownContent = document.querySelector('.dropdown-content');

if (dropdownTrigger && dropdownContent) {
  dropdownTrigger.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdownContent.classList.toggle('show');
  });
  
  // Close dropdown when clicking elsewhere
  document.addEventListener('click', function() {
    dropdownContent.classList.remove('show');
  });
}

// Handle ESC key to close modals, dropdowns, and mobile sidebar
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    // Close sidebar on mobile
    if (sidebar && sidebar.classList.contains('open')) {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    // Close any open dropdowns
    const openDropdowns = document.querySelectorAll('.dropdown-content.show');
    openDropdowns.forEach(dropdown => {
      dropdown.classList.remove('show');
    });
  }
});

// Enhance table rows with hover functionality
const tableRows = document.querySelectorAll('tbody tr');
tableRows.forEach(row => {
  row.addEventListener('mouseover', function() {
    this.style.cursor = 'pointer';
  });
  
  row.addEventListener('click', function() {
    // Get product name from this row
    const productName = this.querySelector('.product-details .font-medium').textContent;
    // For demo purposes, just show which product was clicked
    console.log(`Product clicked: ${productName}`);
    // In a real application, you would redirect to the product details page
    // window.location.href = `productdetails.html?id=${productId}`;
  });
});

// Add animation to stats cards
const statsCards = document.querySelectorAll('.stats-card');
statsCards.forEach((card, index) => {
  // Add delay to stagger animations
  setTimeout(() => {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, 100 * index);
});

// Add animation to quick action buttons
const quickActions = document.querySelectorAll('.quick-action-button');
quickActions.forEach((action, index) => {
  setTimeout(() => {
    action.style.opacity = '1';
    action.style.transform = 'translateY(0)';
  }, 150 * index);
});

// Set up responsive behavior for sidebar
function handleResize() {
  if (window.innerWidth >= 768) {
    // On larger screens, ensure sidebar is always visible
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Initial call and add event listener
handleResize();
window.addEventListener('resize', handleResize);

// Add quick tooltip functionality
const tooltipElements = document.querySelectorAll('[data-tooltip]');
tooltipElements.forEach(element => {
  element.addEventListener('mouseenter', function() {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = this.getAttribute('data-tooltip');
    document.body.appendChild(tooltip);
    
    const rect = this.getBoundingClientRect();
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 5}px`;
    tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
    tooltip.style.opacity = '1';
    
    this.addEventListener('mouseleave', function() {
      tooltip.remove();
    }, { once: true });
  });
});
});
