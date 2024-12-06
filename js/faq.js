async function loadFaqs() {
    try {
        console.log('Fetching FAQs...');
        const response = await fetch('data/faq.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const faqs = await response.json();
        console.log('FAQs fetched:', faqs);

        const faqContainer = document.querySelector('.faq-container');
        if (!faqContainer) {
            throw new Error('FAQ container not found');
        }
        faqContainer.innerHTML = '';

        if (faqs.length === 0) {
            faqContainer.innerHTML = '<p>No FAQs available at the moment.</p>';
            return;
        }

        faqs.forEach(faq => {
            const faqDiv = document.createElement('div');
            faqDiv.className = 'faq-item';
            faqDiv.innerHTML = `
                <h3>${faq.question}</h3>
                <p>${faq.answer}</p>
            `;
            faqContainer.appendChild(faqDiv);
        });

    } catch (error) {
        console.error('Error loading FAQs:', error);
        const faqContainer = document.querySelector('.faq-container');
        if (faqContainer) {
            faqContainer.innerHTML = '<p>Error loading FAQs content</p>';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    loadFaqs();
});
