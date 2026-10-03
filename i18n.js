document.addEventListener('DOMContentLoaded', () => {
    let currentLanguage = 'en';
    let translations = {};

    const languageButtons = document.querySelectorAll('.lang-btn');
    const supportedLanguages = ['en', 'es'];
    const translationsVersion = '1.1.2';

    function getSavedLanguage() {
        try {
            const savedLanguage = localStorage.getItem('livva-language');

            return supportedLanguages.includes(savedLanguage)
                ? savedLanguage
                : 'en';
        } catch (error) {
            return 'en';
        }
    }

    function getTranslation(key) {
        return key.split('.').reduce(
            (object, property) => object?.[property],
            translations
        );
    }

    async function loadLanguage(language) {
        try {
            const response = await fetch(
                `./locales/${language}.json?v=${translationsVersion}`
            );

            if (!response.ok) {
                throw new Error(`Unable to load language: ${language}`);
            }

            translations = await response.json();
            currentLanguage = language;

            try {
                localStorage.setItem('livva-language', language);
            } catch (error) {
                // The translation still works when browser storage is unavailable.
            }

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

            document
                .querySelectorAll('[data-i18n-content]')
                .forEach((element) => {
                    const key = element.dataset.i18nContent;
                    const translation = getTranslation(key);

                    if (translation !== undefined) {
                        element.setAttribute('content', translation);
                    }
                });

            document
                .querySelectorAll('[data-i18n-aria-label]')
                .forEach((element) => {
                    const key = element.dataset.i18nAriaLabel;
                    const translation = getTranslation(key);

                    if (translation !== undefined) {
                        element.setAttribute('aria-label', translation);
                    }
                });

            languageButtons.forEach((button) => {
                button.classList.toggle(
                    'active',
                    button.id === `lang-${language}`
                );

                button.setAttribute(
                    'aria-pressed',
                    (button.id === `lang-${language}`).toString()
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

    loadLanguage(getSavedLanguage());
});
