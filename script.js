document.addEventListener('DOMContentLoaded', () => {
    const billingToggle = document.getElementById('billingToggle');
    const prices = document.querySelectorAll('.price');
    const periods = document.querySelectorAll('.period');

    if (!billingToggle) {
        return;
    }

    billingToggle.addEventListener('click', () => {
        const isYearly = billingToggle.classList.toggle('active');

        billingToggle.setAttribute(
            'aria-pressed',
            isYearly.toString()
        );

        prices.forEach((price) => {
            price.textContent = isYearly
                ? price.dataset.yearly
                : price.dataset.monthly;
        });

        periods.forEach((period) => {
            period.textContent = isYearly
                ? '/ año'
                : '/ mes';
        });
    });
});

