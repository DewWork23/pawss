// Donate Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Handle custom amount selection
    const amountRadios = document.querySelectorAll('input[name="amount"]');
    const customAmountDiv = document.querySelector('.custom-amount');
    const customAmountInput = document.getElementById('custom-amount');
    
    amountRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'other') {
                customAmountDiv.style.display = 'block';
                customAmountInput.focus();
            } else {
                customAmountDiv.style.display = 'none';
                customAmountInput.value = '';
            }
        });
    });
    
    // Handle dedication option
    const dedicationCheck = document.getElementById('dedication-check');
    const dedicationFields = document.querySelector('.dedication-fields');
    
    dedicationCheck.addEventListener('change', function() {
        if (this.checked) {
            dedicationFields.style.display = 'block';
        } else {
            dedicationFields.style.display = 'none';
        }
    });
    
    // Handle donation type change
    const donationTypeRadios = document.querySelectorAll('input[name="donation-type"]');
    const submitButton = document.querySelector('.donate-submit');
    
    donationTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'monthly') {
                submitButton.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                    Start Monthly Donation
                `;
            } else {
                submitButton.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                        <line x1="1" y1="10" x2="23" y2="10"></line>
                    </svg>
                    Proceed to Payment
                `;
            }
        });
    });
    
    // Handle form submission
    const donationForm = document.querySelector('.donation-form');
    
    donationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const donationType = document.querySelector('input[name="donation-type"]:checked').value;
        const amountRadio = document.querySelector('input[name="amount"]:checked');
        let amount = amountRadio.value;
        
        if (amount === 'other') {
            amount = customAmountInput.value;
            if (!amount || amount <= 0) {
                alert('Please enter a valid donation amount.');
                customAmountInput.focus();
                return;
            }
        }
        
        // Build donation data
        const donationData = {
            type: donationType,
            amount: amount,
            isDedication: dedicationCheck.checked
        };
        
        if (dedicationCheck.checked) {
            donationData.dedicationType = document.getElementById('dedication-type').value;
            donationData.dedicationName = document.getElementById('dedication-name').value;
        }
        
        // Here you would normally integrate with a payment processor
        // For now, we'll show a message
        console.log('Donation data:', donationData);
        
        // Show thank you message
        alert(`Thank you for your ${donationType} donation of $${amount}! In a real implementation, you would be redirected to a secure payment processor.`);
    });
    
    // Smooth scroll to donation form when clicking monthly giving button
    const monthlyGivingBtn = document.querySelector('.monthly-text .btn');
    if (monthlyGivingBtn) {
        monthlyGivingBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Set to monthly donation
            const monthlyRadio = document.querySelector('input[name="donation-type"][value="monthly"]');
            if (monthlyRadio) {
                monthlyRadio.checked = true;
                monthlyRadio.dispatchEvent(new Event('change'));
            }
            
            // Scroll to form
            const formSection = document.querySelector('.donation-options');
            if (formSection) {
                formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
    
    // Add hover effect to impact cards
    const impactCards = document.querySelectorAll('.impact-card');
    impactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});