    // Initialize trending page functionality
    document.addEventListener('DOMContentLoaded', function() {
        // Toggle between grid and list views
        const gridViewBtn = document.getElementById('grid-view-btn');
        const listViewBtn = document.getElementById('list-view-btn');
        const gridView = document.getElementById('grid-view');
        const listView = document.getElementById('list-view');
        
        gridViewBtn.addEventListener('click', function() {
          gridView.classList.remove('hidden');
          listView.classList.add('hidden');
          gridViewBtn.classList.remove('btn-outline');
          gridViewBtn.classList.add('btn-default');
          listViewBtn.classList.remove('btn-default');
          listViewBtn.classList.add('btn-outline');
        });
        
        listViewBtn.addEventListener('click', function() {
          gridView.classList.add('hidden');
          listView.classList.remove('hidden');
          listViewBtn.classList.remove('btn-outline');
          listViewBtn.classList.add('btn-default');
          gridViewBtn.classList.remove('btn-default');
          gridViewBtn.classList.add('btn-outline');
        });
        
        // Fix product list image sizing
        const productListImages = document.querySelectorAll('.product-list-image');
        productListImages.forEach(imgContainer => {
          imgContainer.style.width = '120px';
          imgContainer.style.height = '120px';
          imgContainer.style.flexShrink = '0';
        });
        
        // Keyword buttons functionality
        const keywordBtns = document.querySelectorAll('.keyword-btn');
        keywordBtns.forEach(btn => {
          btn.addEventListener('click', function() {
            this.classList.toggle('btn-primary');
            this.classList.toggle('btn-outline');
            
            // Filter products based on selected keywords
            // This would be implemented with actual filtering logic in a real app
          });
        });
        
        // Search functionality
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', function() {
          const searchTerm = this.value.toLowerCase();
          
          // Simple search implementation for demo
          const productTitles = document.querySelectorAll('.product-card-title, .product-list-title');
          productTitles.forEach(title => {
            const parent = title.closest('.product-card') || title.closest('.product-list-item');
            if (title.textContent.toLowerCase().includes(searchTerm)) {
              parent.style.display = '';
            } else {
              parent.style.display = 'none';
            }
          });
        });
      });