/* ===========================
   Internationalization System (i18n)
   ========================== */

const i18n = {
  currentLanguage: 'en',
  
  translations: {
    en: {
      'nav.home': 'Home',
      'nav.competitions': 'Competitions',
      'nav.asphalt': 'Asphalt',
      'nav.racing3': 'Real Racing 3',
      'nav.carting': 'Carting',
      'nav.podcasts': 'Podcasts',
      'nav.be_guest': 'Be our first guest!',
      'section.formula6': 'FORMULA6',
      'section.featured': 'Featured Videos',
      'section.categories': 'Content Categories',
      'section.repair': 'REPAIR',
      'section.knowables': 'KNOWABLES',
      'section.knowable': 'KNOWABLE',
      'section.more': 'More From Our Collection',
      'section.competitions': 'Competition Highlights',
      'section.connect': 'Connect With Us',
      'footer.copyright': '© 2026 ISRAEL-MOTORS. All rights reserved.',
      'footer.tagline': 'Where Passion Meets Performance',
      'btn.contact': 'Contact Us',
      'social.facebook': 'Facebook Group',
      'social.youtube': 'YouTube',
      'social.twitter': 'Twitter',
      'social.linkedin': 'LinkedIn',
      'social.instagram': 'Instagram'
    },
    he: {
      'nav.home': 'בית',
      'nav.competitions': 'תחרויות',
      'nav.asphalt': 'אספלט',
      'nav.racing3': 'מרוץ אמיתי 3',
      'nav.carting': 'קרטינג',
      'nav.podcasts': 'פודקאסטים',
      'nav.be_guest': 'היו האורח הראשון שלנו!',
      'section.formula6': 'פורמולה6',
      'section.featured': 'סרטונים נבחרים',
      'section.categories': 'קטגוריות תוכן',
      'section.repair': 'תיקון',
      'section.knowables': 'ניתנים לדעת',
      'section.knowable': 'נתונים ממויין',
      'section.more': 'עוד מהאוסף שלנו',
      'section.competitions': 'הדגשים התחרויות',
      'section.connect': 'התחברו איתנו',
      'footer.copyright': '© 2026 ISRAEL-MOTORS. כל הזכויות שמורות.',
      'footer.tagline': 'כאשר תשוקה פוגשת ביצועים',
      'btn.contact': 'צור קשר',
      'social.facebook': 'קבוצת פייסבוק',
      'social.youtube': 'יוטיוב',
      'social.twitter': 'טוויטר',
      'social.linkedin': 'לינקדאין',
      'social.instagram': 'אינסטגרם'
    }
  },

  init() {
    // Check for saved language preference
    const saved = localStorage.getItem('language');
    if (saved) {
      this.currentLanguage = saved;
    } else {
      // Auto-detect browser language
      const browserLang = navigator.language.split('-')[0];
      this.currentLanguage = (browserLang === 'he') ? 'he' : 'en';
      localStorage.setItem('language', this.currentLanguage);
    }
    
    this.applyLanguage(this.currentLanguage);
  },

  t(key) {
    return this.translations[this.currentLanguage][key] || key;
  },

  setLanguage(lang) {
    if (lang === 'en' || lang === 'he') {
      this.currentLanguage = lang;
      localStorage.setItem('language', lang);
      this.applyLanguage(lang);
    }
  },

  applyLanguage(lang) {
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'he') ? 'rtl' : 'ltr';

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = this.t(key);
    });

    // Update language selector
    const selector = document.getElementById('language-selector');
    if (selector) {
      selector.value = lang;
    }

    // Emit custom event
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => i18n.init());
} else {
  i18n.init();
}