document.addEventListener('DOMContentLoaded', () => {
    const billingToggle = document.getElementById('billingToggle');
    const prices = document.querySelectorAll('.price');
    const periods = document.querySelectorAll('.period');

    function updateBillingPeriods() {
        if (!window.i18n) {
            return;
        }

        const isYearly = billingToggle?.classList.contains('active');

        const key = isYearly
            ? 'plans.yearPeriod'
            : 'plans.monthPeriod';

        const translatedPeriod = window.i18n.getTranslation(key);

        periods.forEach((period) => {
            if (translatedPeriod !== undefined) {
                period.textContent = translatedPeriod;
            }
        });
    }

    if (billingToggle) {
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

            updateBillingPeriods();
        });
    }

    window.addEventListener('languageChanged', () => {
        updateBillingPeriods();
    });
});