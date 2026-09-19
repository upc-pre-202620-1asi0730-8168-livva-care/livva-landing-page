document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        en: {
            'nav.home': 'Home',
            'nav.insurance': 'Insurance',
            'nav.plans': 'Plans',
            'nav.about': 'About',
            'nav.contact': 'Contact',
            'nav.login': 'Sign In',
            'nav.start': 'Get Started',

            'hero.title': "Your peace of mind and your family's in one place",
            'hero.description': 'Compare, quote and manage vehicle and health insurance in a simple, transparent and digital way.',
            'hero.quote': 'Get a Quote',
            'hero.coverage': 'View Coverage'
        },

        es: {
            'nav.home': 'Inicio',
            'nav.insurance': 'Seguros',
            'nav.plans': 'Planes',
            'nav.about': 'Nosotros',
            'nav.contact': 'Contacto',
            'nav.login': 'Iniciar Sesión',
            'nav.start': 'Empezar Gratis',

            'hero.title': 'Tu tranquilidad y la de tu familia en un solo lugar',
            'hero.description': 'Compara, cotiza y gestiona seguros vehiculares y de salud de forma simple, transparente y digital.',
            'hero.quote': 'Cotizar mi Seguro',
            'hero.coverage': 'Ver Coberturas'
        }
    };

    const languageButtons = document.querySelectorAll('.lang-btn');

    function setLanguage(language) {
        document.documentElement.lang = language === 'en' ? 'en' : 'es-419';

        document.querySelectorAll('[data-i18n]').forEach((element) => {
            const key = element.dataset.i18n;

            if (translations[language][key]) {
                element.textContent = translations[language][key];
            }
        });

        languageButtons.forEach((button) => {
            button.classList.toggle(
                'active',
                button.id === `lang-${language}`
            );
        });
    }

    document.getElementById('lang-en')?.addEventListener('click', () => {
        setLanguage('en');
    });

    document.getElementById('lang-es')?.addEventListener('click', () => {
        setLanguage('es');
    });

    /* English is the default language */
    setLanguage('en');

    const billingToggle = document.getElementById('billingToggle');
    const prices = document.querySelectorAll('.price');
    const periods = document.querySelectorAll('.period');

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

            periods.forEach((period) => {
                period.textContent = isYearly
                    ? '/ year'
                    : '/ month';
            });
        });
    }
});