// Initialize Billing page functionality
    document.addEventListener('DOMContentLoaded', function() {
 // Initialize sidebar theme toggle to match the main theme toggle
 const mainThemeToggle = document.getElementById('theme-toggle');
 const sidebarThemeToggle = document.getElementById('sidebar-theme-toggle');
 
 if (mainThemeToggle && sidebarThemeToggle) {
   // Sync the sidebar toggle with the main toggle
   sidebarThemeToggle.checked = mainThemeToggle.checked;
   
   // Keep them in sync when either changes
   mainThemeToggle.addEventListener('change', function() {
     sidebarThemeToggle.checked = this.checked;
   });
   
   sidebarThemeToggle.addEventListener('change', function() {
     mainThemeToggle.checked = this.checked;
     // Trigger the change event to update the theme
     const event = new Event('change');
     mainThemeToggle.dispatchEvent(event);
   });
 }
 
 // Modal functionality for adding payment method
 const modal = document.getElementById('payment-method-modal');
 const addPaymentBtn = document.getElementById('add-payment-method');
 const closeButtons = document.querySelectorAll('.modal-close');
 const addCardBtn = document.getElementById('add-card-btn');
 
 if (addPaymentBtn && modal) {
   addPaymentBtn.addEventListener('click', function() {
     modal.classList.add('open');
     document.body.style.overflow = 'hidden';
   });
   
   closeButtons.forEach(button => {
     button.addEventListener('click', function() {
       modal.classList.remove('open');
       document.body.style.overflow = '';
     });
   });
   
   // Close modal when clicking outside content
   modal.addEventListener('click', function(e) {
     if (e.target === modal) {
       modal.classList.remove('open');
       document.body.style.overflow = '';
     }
   });
   
   // Add card button functionality (demo only)
   if (addCardBtn) {
     addCardBtn.addEventListener('click', function() {
       // In a real app, this would handle form validation and submission
       showToast('Payment method added successfully!', 'success');
       modal.classList.remove('open');
       document.body.style.overflow = '';
     });
   }
 }
 
 // Toast notification functionality 
 function showToast(message, type = 'info', duration = 3000) {
   // Create toast container if it doesn't exist
   let toastContainer = document.querySelector('.toast-container');
   if (!toastContainer) {
     toastContainer = document.createElement('div');
     toastContainer.className = 'toast-container';
     toastContainer.style.position = 'fixed';
     toastContainer.style.bottom = '1rem';
     toastContainer.style.right = '1rem';
     toastContainer.style.zIndex = '9999';
     document.body.appendChild(toastContainer);
   }
   
   // Create toast element
   const toast = document.createElement('div');
   toast.className = `toast toast-${type}`;
   toast.style.padding = '0.75rem 1rem';
   toast.style.backgroundColor = 'var(--card)';
   toast.style.color = 'var(--card-foreground)';
   toast.style.borderRadius = 'var(--radius)';
   toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
   toast.style.marginTop = '0.5rem';
   toast.style.display = 'flex';
   toast.style.alignItems = 'center';
   toast.style.animation = 'fadeIn 0.3s';
   toast.style.border = '1px solid var(--border)';
   
   // Add icon based on type
   const iconElement = document.createElement('i');
   iconElement.style.marginRight = '0.5rem';
   
   if (type === 'success') {
     iconElement.className = 'fas fa-check-circle';
     iconElement.style.color = '#10b981';
   } else if (type === 'error') {
     iconElement.className = 'fas fa-exclamation-circle';
     iconElement.style.color = '#ef4444';
   } else {
     iconElement.className = 'fas fa-info-circle';
     iconElement.style.color = '#3b82f6';
   }
   
   toast.appendChild(iconElement);
   
   // Add message
   const textElement = document.createElement('span');
   textElement.textContent = message;
   toast.appendChild(textElement);
   
   // Add toast to container
   toastContainer.appendChild(toast);
   
   // Remove toast after duration
   setTimeout(() => {
     toast.style.opacity = '0';
     toast.style.transition = 'opacity 0.3s';
     
     setTimeout(() => {
       toast.remove();
     }, 300);
   }, duration);
 }
});