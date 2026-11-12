document.addEventListener('DOMContentLoaded', () => {
    const billingToggle = document.getElementById('billingToggle');
    const prices = document.querySelectorAll('.price');
    const periods = document.querySelectorAll('.period');
    const contactForm = document.getElementById('contactForm');

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

    contactForm?.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!contactForm.reportValidity()) {
            return;
        }

        const formData = new FormData(contactForm);
        const subject = encodeURIComponent(
            `Livva contact - ${formData.get('name')}`
        );
        const body = encodeURIComponent(
            `${formData.get('message')}\n\nEmail: ${formData.get('email')}`
        );

        window.location.href =
            `mailto:contacto@livva.com?subject=${subject}&body=${body}`;
    });

    // Videos: embeds a YouTube video when its ID is set in data-youtube-id.
    document.querySelectorAll('.video-frame').forEach((frame) => {
        const videoId = frame.dataset.youtubeId?.trim();

        if (!videoId) {
            return;
        }

        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`;
        iframe.title = window.i18n?.getTranslation(frame.dataset.titleKey) ?? 'Livva video';
        iframe.loading = 'lazy';
        iframe.allow = 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;

        frame.replaceChildren(iframe);
    });
});
