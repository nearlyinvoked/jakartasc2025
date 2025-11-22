# Browser Compatibility

This application has been configured to support older browsers with the following features:

## Supported Browsers

### Modern Browsers (Full Features)

- Chrome 61+
- Firefox 60+
- Safari 11+
- Edge 18+

### Legacy Browsers (Basic Support)

- Internet Explorer 11+ (limited support)
- Older versions of Chrome, Firefox, Safari with polyfills

## Features Implemented for Legacy Support

### 1. Vite Legacy Plugin

- Automatic polyfill injection for older browsers
- ES5 transpilation for legacy browser chunks
- Modern/legacy build dual-serving

### 2. TypeScript Configuration

- Target set to ES2015 for better compatibility
- Includes necessary polyfills for modern features

### 3. CSS Fallbacks

- Flexbox fallbacks with vendor prefixes
- Grid layout fallbacks for older browsers
- CSS Variables fallbacks
- Object-fit polyfills

### 4. JavaScript Polyfills

Automatically included:

- Promise polyfill
- Fetch API polyfill
- Symbol polyfill
- Array methods polyfills
- Object methods polyfills

### 5. Build Configuration

- Chunk splitting for optimal loading
- Legacy and modern bundles
- Vendor prefixes for CSS
- Optimized for older browsers

## Browser Testing

To test in older browsers:

1. Build the app: `npm run build`
2. Serve the dist folder: `npm run preview`
3. Test in target browsers

## File Structure

- `dist/assets/*-legacy-*.js` - Legacy browser bundles
- `dist/assets/*.js` - Modern browser bundles
- `src/legacy.css` - CSS fallbacks for older browsers

## Performance Notes

- Legacy browsers will load additional polyfills (~75KB)
- Modern browsers only load necessary code
- CSS fallbacks add minimal overhead
