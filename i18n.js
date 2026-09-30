document.addEventListener('DOMContentLoaded', () => {
    let currentLanguage = 'en';
    let translations = {};

    const languageButtons = document.querySelectorAll('.lang-btn');

    function getTranslation(key) {
        return key.split('.').reduce(
            (object, property) => object?.[property],
            translations
        );
    }

    async function loadLanguage(language) {
        try {
            const response = await fetch(`./locales/${language}.json`);

            if (!response.ok) {
                throw new Error(`Unable to load language: ${language}`);
            }

            translations = await response.json();
            currentLanguage = language;

            document.documentElement.lang =
                language === 'en' ? 'en' : 'es-419';

            document.querySelectorAll('[data-i18n]').forEach((element) => {
                const key = element.dataset.i18n;
                const translation = getTranslation(key);

                if (translation !== undefined) {
                    element.textContent = translation;
                }
            });

            document
                .querySelectorAll('[data-i18n-placeholder]')
                .forEach((element) => {
                    const key = element.dataset.i18nPlaceholder;
                    const translation = getTranslation(key);

                    if (translation !== undefined) {
                        element.placeholder = translation;
                    }
                });

            languageButtons.forEach((button) => {
                button.classList.toggle(
                    'active',
                    button.id === `lang-${language}`
                );
            });

            window.dispatchEvent(
                new CustomEvent('languageChanged', {
                    detail: {
                        language,
                        translations
                    }
                })
            );

        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }

    document.getElementById('lang-en')?.addEventListener('click', () => {
        loadLanguage('en');
    });

    document.getElementById('lang-es')?.addEventListener('click', () => {
        loadLanguage('es');
    });

    window.i18n = {
        getCurrentLanguage: () => currentLanguage,
        getTranslation,
        loadLanguage
    };

    loadLanguage('en');
});