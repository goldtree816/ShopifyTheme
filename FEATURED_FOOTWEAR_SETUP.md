# Featured Footwear Section - Setup Guide

## Overview
This implementation creates a dynamic featured footwear section with color options for your Shopify theme. Users can click on color swatches to see different product images and add items to cart without leaving the page.

## Features
- ✅ **Dynamic Image Swapping**: Click color swatches to change product images
- ✅ **Add to Cart**: Quick add to cart functionality
- ✅ **Responsive Design**: Works on all devices
- ✅ **Accessibility**: Keyboard navigation and screen reader support
- ✅ **Loading States**: Smooth transitions and loading indicators
- ✅ **Error Handling**: Graceful error handling for failed requests
- ✅ **Admin Customizable**: Easy to configure in Shopify admin

## Files Created
1. `sections/featured-footwear.liquid` - Main section template
2. `assets/featured-footwear.css` - Styles for the section
3. `assets/featured-footwear.js` - JavaScript functionality
4. `snippets/featured-footwear-example.liquid` - Usage example

## Setup Instructions

### Step 1: Add CSS and JavaScript to Theme
Add these lines to your `layout/theme.liquid` file:

**In the `<head>` section:**
```liquid
{{ 'featured-footwear.css' | asset_url | stylesheet_tag }}
```

**Before the closing `</body>` tag:**
```liquid
{{ 'featured-footwear.js' | asset_url | script_tag }}
```

### Step 2: Add Section to Templates
Add the section to any template where you want to display featured footwear:

```liquid
{% section 'featured-footwear' %}
```

**Recommended locations:**
- `templates/index.liquid` - Homepage
- `templates/collection.liquid` - Collection pages
- `templates/product.liquid` - Product pages

### Step 3: Configure in Shopify Admin
1. Go to **Online Store > Themes**
2. Click **Customize** on your active theme
3. Navigate to the page where you added the section
4. Click **Add section** and select **Featured Footwear**
5. Configure the section settings:
   - **Heading**: "Featured Footwear"
   - **Subheading**: "Discover our latest collection..."
   - **Collection**: Select your footwear collection
   - **Number of products to show**: Choose 1-8 products
   - **Button Text**: "View All Footwear"
   - **Button URL**: Link to your footwear collection

### Step 4: Product Setup in Shopify
For each footwear product, ensure you have:

1. **Multiple Variants**: Create variants for different colors
   - Example: White, Black, Navy, Brown
   - Each variant should have its own image

2. **Product Images**: Upload images for each color variant
   - Use descriptive alt text
   - Recommended size: 400x400px or larger
   - Consistent aspect ratio across all variants

3. **Variant Options**: Name your first option "Color" or "Colour"
   - This helps the section identify color variants

## Customization Options

### Color Scheme
The section uses your theme's color scheme settings. You can customize:
- Background colors
- Text colors
- Accent colors (swatches, buttons)

### Styling
Key CSS classes you can customize:
- `.featured-footwear-section` - Main container
- `.footwear-card` - Individual product cards
- `.color-swatch` - Color selection buttons
- `.footwear-add-to-cart` - Add to cart button

### JavaScript Behavior
The JavaScript handles:
- Image swapping on color selection
- Add to cart functionality
- Loading states and animations
- Error handling

## Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Mobile Optimization
- Touch-friendly color swatches
- Responsive grid layout
- Optimized for mobile shopping experience
- Swipe gestures supported

## Performance Considerations
- Images are lazy-loaded
- CSS and JS are optimized for performance
- Smooth animations using CSS transforms
- Minimal DOM manipulation

## Troubleshooting

### Images Not Swapping
1. Check that each variant has an associated image
2. Verify variant IDs are correct
3. Check browser console for JavaScript errors

### Add to Cart Not Working
1. Ensure product variants are available
2. Check that variant IDs match between swatches and form
3. Verify cart functionality is working on your store

### Styling Issues
1. Check for CSS conflicts with your theme
2. Ensure the CSS file is properly loaded
3. Verify responsive breakpoints work with your theme

## Advanced Customization

### Adding More Products
The section supports 1-8 products by default. To add more:
1. Increase the "Number of products to show" setting in the admin
2. Modify the grid layout in CSS if needed
3. Consider pagination for many products

### Custom Color Detection
The section automatically detects colors from variant names. To customize:
1. Modify the color detection logic in the Liquid template
2. Add custom color mapping in JavaScript
3. Use CSS custom properties for color swatches

### Integration with Other Apps
The section is compatible with:
- Cart drawer apps
- Wishlist apps
- Product recommendation apps
- Analytics tracking

## Support
For issues or questions:
1. Check the browser console for errors
2. Verify all files are properly uploaded
3. Test in an incognito window to rule out caching issues
4. Check Shopify's theme development documentation

## License
This code is provided as-is for your Shopify theme. Feel free to modify and customize as needed for your store.
