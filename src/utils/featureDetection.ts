// Feature detection and progressive enhancement
export const FeatureDetection = {
  // Check if browser supports modern features
  supportsModernJS: () => {
    try {
      // Test for async/await support
      new Function('async () => {}');
      // Test for arrow functions
      new Function('() => {}');
      // Test for template literals
      new Function('`template`');
      return true;
    } catch {
      return false;
    }
  },

  supportsES6: () => {
    try {
      return typeof Symbol !== 'undefined' && 
             typeof Promise !== 'undefined' && 
             typeof Map !== 'undefined';
    } catch {
      return false;
    }
  },

  supportsCSS: {
    grid: () => {
      return typeof document !== 'undefined' && 
             'CSS' in window && 
             CSS.supports && 
             CSS.supports('display', 'grid');
    },
    
    flexbox: () => {
      return typeof document !== 'undefined' && 
             'CSS' in window && 
             CSS.supports && 
             (CSS.supports('display', 'flex') || 
              CSS.supports('display', '-webkit-flex'));
    },
    
    customProperties: () => {
      return typeof document !== 'undefined' && 
             'CSS' in window && 
             CSS.supports && 
             CSS.supports('--custom-property', '0');
    }
  },

  deviceCapabilities: {
    isOldMobile: () => {
      const ua = navigator.userAgent;
      // Detect iOS < 10
      const iosMatch = ua.match(/iPhone OS ([0-9]_[0-9])/);
      if (iosMatch && parseInt(iosMatch[1]) < 10) return true;
      
      // Detect Android < 5
      const androidMatch = ua.match(/Android ([0-9.]+)/);
      if (androidMatch && parseFloat(androidMatch[1]) < 5) return true;
      
      return false;
    },
    
    isLowPowerDevice: () => {
      // Check for old devices or slow connections
      return FeatureDetection.deviceCapabilities.isOldMobile() ||
             (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) ||
             ((navigator as any).connection && (navigator as any).connection.effectiveType === 'slow-2g');
    },

    supportsTouch: () => {
      return 'ontouchstart' in window || 
             navigator.maxTouchPoints > 0 || 
             (navigator as any).msMaxTouchPoints > 0;
    }
  },

  // Apply appropriate CSS classes based on capabilities
  applyFeatureClasses: () => {
    if (typeof document === 'undefined') return;
    
    const html = document.documentElement;
    
    // Add feature detection classes
    html.classList.add(FeatureDetection.supportsModernJS() ? 'modern-js' : 'legacy-js');
    html.classList.add(FeatureDetection.supportsES6() ? 'es6' : 'no-es6');
    html.classList.add(FeatureDetection.supportsCSS.grid() ? 'css-grid' : 'no-css-grid');
    html.classList.add(FeatureDetection.supportsCSS.flexbox() ? 'flexbox' : 'no-flexbox');
    html.classList.add(FeatureDetection.supportsCSS.customProperties() ? 'css-vars' : 'no-css-vars');
    html.classList.add(FeatureDetection.deviceCapabilities.supportsTouch() ? 'touch' : 'no-touch');
    html.classList.add(FeatureDetection.deviceCapabilities.isLowPowerDevice() ? 'low-power' : 'high-power');
    html.classList.add(FeatureDetection.deviceCapabilities.isOldMobile() ? 'old-mobile' : 'modern-mobile');
  },

  // Load appropriate polyfills
  loadPolyfills: () => {
    const polyfills = [];
    
    if (!window.Promise) polyfills.push('es6-promise');
    if (!window.fetch) polyfills.push('whatwg-fetch');
    if (!Array.prototype.includes) polyfills.push('array.prototype.includes');
    if (!Object.assign) polyfills.push('object.assign');
    
    if (polyfills.length > 0 && typeof document !== 'undefined') {
      const script = document.createElement('script');
      script.src = `https://polyfill.io/v3/polyfill.min.js?features=${polyfills.join(',')}`;
      script.onload = () => console.log('Polyfills loaded for older browser');
      document.head.appendChild(script);
    }
  }
};

// Auto-initialize on load
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    FeatureDetection.applyFeatureClasses();
    if (FeatureDetection.deviceCapabilities.isOldMobile()) {
      FeatureDetection.loadPolyfills();
    }
  });
}