// page-transition.js - Page transition functionality for ProductNexus

document.addEventListener('DOMContentLoaded', function() {
    // Initialize page transitions
    initPageTransitions();
    
    // Add dynamic skeleton loading to all navigation links
    addSkeletonToNavigation();
  });
  
  function initPageTransitions() {
    // Create page transition elements
    createPageTransitionElements();
    
    // Set up global navigation handler
    setupNavigationHandler();
  }
  
  function createPageTransitionElements() {
    // Create main container for page transitions
    const transitionsContainer = document.createElement('div');
    transitionsContainer.style.display = 'none';
    
    // Create transition overlay
    const transitionOverlay = document.createElement('div');
    transitionOverlay.id = 'page-transition-overlay';
    transitionOverlay.className = 'page-transition';
    transitionOverlay.innerHTML = `
      <div class="page-transition-content">
        <div class="page-transition-logo">
          <i class="fas fa-chart-line" style="font-size: 2rem; color: var(--primary);"></i>
        </div>
      </div>
    `;
    document.body.appendChild(transitionOverlay);
    
    // Create loading bar for subtle transitions
    const loadingBar = document.createElement('div');
    loadingBar.id = 'page-loading-bar';
    loadingBar.className = 'page-loading-bar';
    document.body.appendChild(loadingBar);
    
    // Add necessary styles if not already added
    if (!document.getElementById('page-transition-styles')) {
      const styles = document.createElement('style');
      styles.id = 'page-transition-styles';
      styles.textContent = `
        .page-transition {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: var(--background);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        
        .page-transition.active {
          opacity: 1;
          pointer-events: all;
        }
        
        .page-transition-logo {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        
        .page-transition-logo::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 3px solid transparent;
          border-top-color: var(--primary);
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .page-loading-bar {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          background-color: var(--primary);
          z-index: 9999;
          width: 0%;
          transition: width 0.3s ease-out;
        }
      `;
      document.head.appendChild(styles);
    }
  }
  
  function setupNavigationHandler() {
    // Create a function to show full page transition
    window.showPageTransition = function(type = 'full') {
      if (type === 'full') {
        // Full page transition with overlay
        const overlay = document.getElementById('page-transition-overlay');
        overlay.classList.add('active');
        return function hideTransition() {
          overlay.classList.remove('active');
        };
      } else {
        // Subtle loading bar transition
        const loadingBar = document.getElementById('page-loading-bar');
        loadingBar.style.width = '0%';
        loadingBar.style.opacity = '1';
        
        // Animate loading bar
        setTimeout(() => { loadingBar.style.width = '30%'; }, 100);
        setTimeout(() => { loadingBar.style.width = '60%'; }, 200);
        
        return function hideTransition() {
          loadingBar.style.width = '100%';
          setTimeout(() => {
            loadingBar.style.opacity = '0';
            setTimeout(() => {
              loadingBar.style.width = '0%';
            }, 300);
          }, 300);
        };
      }
    };
  }
  
  function addSkeletonToNavigation() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.sidebar-nav-link:not(.active)');
    
    navLinks.forEach(link => {
      // Store original click handler if any
      const originalClickHandler = link.onclick;
      
      // Replace with our custom handler
      link.onclick = function(e) {
        // Don't intercept if it's the current active page
        if (link.classList.contains('active')) return;
        
        // Current page - from the URL or fallback to trending
        const currentPage = window.location.pathname.split('/').pop() || 'trending.html';
        
        // Target page - from the link href
        const targetPage = link.getAttribute('href');
        
        // Only handle standard page navigations (not external links or anchors)
        if (targetPage && targetPage.includes('.html')) {
          e.preventDefault();
          
          // Show page transition based on the page type
          const isMainSection = targetPage.includes('Index') || 
                               targetPage.includes('dashboard') || 
                               targetPage.includes('trending');
          
          const hideTransition = window.showPageTransition(isMainSection ? 'full' : 'bar');
          
          // Create whole page skeleton
          const mainContent = document.querySelector('.main-content');
          if (mainContent) {
            // Store original content
            const originalContent = mainContent.innerHTML;
            
            // Different skeleton based on the target page
            if (targetPage.includes('trending')) {
              mainContent.innerHTML = createTrendingSkeleton();
            } else {
              // Default skeleton for other pages
              mainContent.innerHTML = createDefaultSkeleton();
            }
            
            // Simulate page load delay
            setTimeout(() => {
              // In a real implementation, you would navigate to the new page here
              window.location.href = targetPage;
              
              // Hide transition (in practice, this would happen on the new page's load event)
              hideTransition();
            }, 800);
          } else {
            // If no main content container found, just navigate normally
            window.location.href = targetPage;
          }
        }
      };
    });
    
    // Add smooth loading when clicking pagination
    const paginationButtons = document.querySelectorAll('.pagination button');
    paginationButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Determine which view is currently active
        const gridView = document.getElementById('grid-view');
        const listView = document.getElementById('list-view');
        
        let activeView;
        let viewSelector;
        
        if (!gridView.classList.contains('hidden')) {
          activeView = gridView;
          viewSelector = '#grid-view';
        } else {
          activeView = listView;
          viewSelector = '#list-view';
        }
        
        // Show subtle loading indicator
        const hideTransition = window.showPageTransition('bar');
        
        // Replace with skeleton
        const activeContainer = document.querySelector(viewSelector);
        const originalContent = activeContainer.innerHTML;
        
        if (viewSelector === '#grid-view') {
          activeContainer.innerHTML = createTrendingGridSkeleton();
        } else {
          activeContainer.innerHTML = createTrendingListSkeleton();
        }
        
        // Also replace pagination with skeleton
        const pagination = document.querySelector('.pagination');
        const originalPagination = pagination.innerHTML;
        pagination.innerHTML = createPaginationSkeleton();
        
        // Simulate loading delay
        setTimeout(() => {
          // Restore content
          activeContainer.innerHTML = originalContent;
          activeContainer.classList.add('content-fade-in');
          
          // Restore pagination but update the active state
          pagination.innerHTML = originalPagination;
          
          // Update button states
          document.querySelectorAll('.pagination button').forEach(btn => {
            if (btn.textContent.trim() === this.textContent.trim()) {
              btn.classList.remove('btn-outline');
              btn.classList.add('btn-primary');
            } else if (!isNaN(btn.textContent.trim())) {
              btn.classList.remove('btn-primary');
              btn.classList.add('btn-outline');
            }
          });
          
          // Complete transition
          hideTransition();
          
          // Remove animation class after animation completes
          setTimeout(() => {
            activeContainer.classList.remove('content-fade-in');
          }, 400);
        }, 800);
      });
    });
  }
  
  // Create skeleton templates for different page types
  function createTrendingSkeleton() {
    return `
      <div class="skeleton-page-header">
        <div class="skeleton-page-title skeleton-pulse"></div>
      </div>
      <div class="skeleton-controls">
        <div class="skeleton-view-toggle skeleton-pulse"></div>
        <div class="flex gap-4">
          <div class="skeleton-search skeleton-pulse"></div>
          <div class="skeleton-filter skeleton-pulse"></div>
        </div>
      </div>
      <div class="skeleton-keywords">
        ${Array(8).fill().map(() => `<div class="skeleton-keyword skeleton-pulse"></div>`).join('')}
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${Array(6).fill().map(() => `
          <div class="skeleton-product-card">
            <div class="skeleton-product-image skeleton-pulse"></div>
            <div class="skeleton-product-content">
              <div class="skeleton-product-title skeleton-pulse"></div>
              <div class="skeleton-product-price skeleton-pulse"></div>
              <div class="skeleton-product-actions">
                <div class="skeleton-btn skeleton-pulse"></div>
                <div class="skeleton-btn skeleton-pulse"></div>
                <div class="skeleton-btn skeleton-pulse"></div>
                <div class="skeleton-btn skeleton-pulse"></div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="skeleton-pagination">
        <div class="skeleton-pagination-item long skeleton-pulse"></div>
        <div class="skeleton-pagination-item skeleton-pulse"></div>
        <div class="skeleton-pagination-item skeleton-pulse"></div>
        <div class="skeleton-pagination-item skeleton-pulse"></div>
        <div class="skeleton-pagination-item skeleton-pulse"></div>
        <div class="skeleton-pagination-item long skeleton-pulse"></div>
      </div>
    `;
  }
  
  function createTrendingGridSkeleton() {
    return `
      ${Array(6).fill().map(() => `
        <div class="skeleton-product-card">
          <div class="skeleton-product-image skeleton-pulse"></div>
          <div class="skeleton-product-content">
            <div class="skeleton-product-title skeleton-pulse"></div>
            <div class="skeleton-product-price skeleton-pulse"></div>
            <div class="skeleton-product-actions">
              <div class="skeleton-btn skeleton-pulse"></div>
              <div class="skeleton-btn skeleton-pulse"></div>
              <div class="skeleton-btn skeleton-pulse"></div>
              <div class="skeleton-btn skeleton-pulse"></div>
            </div>
          </div>
        </div>
      `).join('')}
    `;
  }
  
  function createTrendingListSkeleton() {
    return `
      ${Array(6).fill().map(() => `
        <div class="skeleton-product-list-item">
          <div class="skeleton-product-list-image skeleton-pulse"></div>
          <div class="skeleton-product-list-content">
            <div class="skeleton-product-list-info">
              <div class="skeleton-product-list-details">
                <div class="skeleton-product-list-title skeleton-pulse"></div>
                <div class="skeleton-product-list-store skeleton-pulse"></div>
              </div>
              <div class="skeleton-product-list-price skeleton-pulse"></div>
            </div>
            <div class="skeleton-product-list-actions">
              <div class="skeleton-btn skeleton-pulse"></div>
              <div class="skeleton-btn skeleton-pulse"></div>
              <div class="skeleton-btn skeleton-pulse"></div>
              <div class="skeleton-btn skeleton-pulse"></div>
            </div>
          </div>
        </div>
      `).join('')}
    `;
  }
  
  function createPaginationSkeleton() {
    return `
      <div class="skeleton-pagination">
        <div class="skeleton-pagination-item long skeleton-pulse"></div>
        <div class="skeleton-pagination-item skeleton-pulse"></div>
        <div class="skeleton-pagination-item skeleton-pulse"></div>
        <div class="skeleton-pagination-item skeleton-pulse"></div>
        <div class="skeleton-pagination-item skeleton-pulse"></div>
        <div class="skeleton-pagination-item long skeleton-pulse"></div>
      </div>
    `;
  }
  
  function createDefaultSkeleton() {
    return `
      <div class="skeleton-page-header">
        <div class="skeleton-page-title skeleton-pulse"></div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        ${Array(4).fill().map(() => `
          <div class="card p-4">
            <div class="skeleton-pulse" style="height: 1.5rem; width: 50%; margin-bottom: 0.5rem;"></div>
            <div class="skeleton-pulse" style="height: 2rem; width: 70%; margin-bottom: 0.5rem;"></div>
            <div class="skeleton-pulse" style="height: 1rem; width: 40%;"></div>
          </div>
        `).join('')}
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <div class="card mb-6">
            <div class="card-header">
              <div class="skeleton-pulse" style="height: 1.5rem; width: 40%; margin-bottom: 0.5rem;"></div>
              <div class="skeleton-pulse" style="height: 1rem; width: 60%;"></div>
            </div>
            <div class="card-content" style="height: 300px;">
              <div class="skeleton-pulse" style="height: 100%; width: 100%;"></div>
            </div>
          </div>
        </div>
        <div>
          <div class="card mb-6">
            <div class="card-header">
              <div class="skeleton-pulse" style="height: 1.5rem; width: 60%; margin-bottom: 0.5rem;"></div>
            </div>
            <div class="card-content">
              ${Array(5).fill().map(() => `
                <div class="flex items-center gap-4 mb-4">
                  <div class="skeleton-pulse" style="height: 2.5rem; width: 2.5rem; border-radius: 9999px;"></div>
                  <div class="flex-1">
                    <div class="skeleton-pulse" style="height: 1rem; width: 80%; margin-bottom: 0.5rem;"></div>
                    <div class="skeleton-pulse" style="height: 0.75rem; width: 50%;"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }