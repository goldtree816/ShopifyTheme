/**
 * Featured Footwear Section JavaScript - Robust, section-scoped
 */
(function() {
  const INIT_ATTR = 'data-footwear-init';

  class FeaturedFootwear {
    constructor(root) {
      this.root = root;
      this.colorMap = this.generateColorMap();
      if (!root || root.getAttribute(INIT_ATTR) === 'true') return;
      root.setAttribute(INIT_ATTR, 'true');
      this.bindEvents();
      this.initializeColorSwatches();
    }

    generateColorMap() {
      return {
        'black': '#000000','white': '#FFFFFF','brown': '#8B4513','tan': '#D2B48C','navy': '#000080','red': '#DC143C','blue': '#4169E1','green': '#228B22','gray': '#808080','grey': '#808080','beige': '#F5F5DC','cream': '#FFFDD0','gold': '#FFD700','silver': '#C0C0C0','pink': '#FFC0CB','purple': '#800080','orange': '#FFA500','yellow': '#FFFF00','burgundy': '#800020','nude': '#E8B5A2','camel': '#C19A6B','olive': '#808000','khaki': '#F0E68C','maroon': '#800000','teal': '#008080','mint': '#98FB98','coral': '#FF7F50','lavender': '#E6E6FA'
      };
    }

    bindEvents() {
      this.root.addEventListener('click', (e) => {
        const swatch = e.target.closest('.color-swatch');
        if (swatch) this.handleColorSwatchClick(e, swatch);
      });

      this.root.addEventListener('submit', (e) => {
        if (e.target.closest('.footwear-form')) {
          this.handleAddToCart(e);
        }
      });

      this.root.addEventListener('keydown', (e) => {
        const swatch = e.target.closest('.color-swatch');
        if (swatch) this.handleKeyboardNavigation(e, swatch);
      });
    }

    initializeColorSwatches() {
      const cards = this.root.querySelectorAll('.footwear-card');
      cards.forEach(card => {
        const swatches = card.querySelectorAll('.color-swatch');
        const mainImage = card.querySelector('.footwear-main-image');
        if (!swatches.length || !mainImage) return;
        swatches.forEach((swatch, index) => {
          swatch.style.setProperty('--index', index);
          // If not image-backed, apply color map
          if (!swatch.classList.contains('image-swatch')) {
            const colorName = this.getColorName(swatch);
            const colorValue = this.getColorValue(colorName);
            swatch.style.setProperty('--swatch-color', colorValue);
            swatch.style.backgroundColor = colorValue;
          }
        });
        this.setActiveSwatch(swatches[0]);
      });
    }

    getColorValue(name) {
      if (!name) return '#CDAA7D';
      const key = name.toLowerCase().trim().replace(/[^a-z]/g, '');
      return this.colorMap[key] || '#CDAA7D';
    }

    handleColorSwatchClick(e, swatch) {
      e.preventDefault();
      const card = swatch.closest('.footwear-card');
      if (!card) return;
      const imageUrl = swatch.getAttribute('data-image-url');
      const variantId = swatch.getAttribute('data-variant-id');

      this.setActiveSwatch(swatch);
      if (imageUrl) this.updateProductImage(card, imageUrl, swatch);
      if (variantId) this.updateVariant(card, variantId);
      if (variantId) this.updateProductUrl(card, variantId);
      this.addClickFeedback(swatch);
    }

    setActiveSwatch(active) {
      const card = active.closest('.footwear-card');
      card.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
      active.classList.add('active');
    }

    updateProductImage(card, imageUrl, activeSwatch) {
      const mainImage = card.querySelector('.footwear-main-image');
      const container = card.querySelector('.footwear-image-container');
      if (!mainImage || !imageUrl) return;
      if (mainImage.src === imageUrl) return;

      const overlay = this.createLoadingOverlay();
      container.appendChild(overlay);

      const preload = new Image();
      preload.onload = () => {
        mainImage.style.opacity = '0';
        mainImage.style.transform = 'scale(1.05)';
        setTimeout(() => {
          // Ensure we're setting the full URL to the image
          // If imageUrl is a relative path, convert it to absolute
          if (imageUrl.startsWith('/')) {
            mainImage.src = window.location.origin + imageUrl;
          } else {
            mainImage.src = imageUrl;
          }
          const colorName = this.getColorName(activeSwatch);
          if (colorName) mainImage.alt = `${mainImage.alt.replace(/\s+in\s+.+$/i, '')} in ${colorName}`;
          mainImage.style.opacity = '1';
          mainImage.style.transform = 'scale(1)';
          overlay.remove();
        }, 150);
      };
      preload.onerror = () => overlay.remove();
      // Ensure we're preloading with the full URL
      if (imageUrl.startsWith('/')) {
        preload.src = window.location.origin + imageUrl;
      } else {
        preload.src = imageUrl;
      }
    }

    createLoadingOverlay() {
      const el = document.createElement('div');
      el.className = 'image-loading-overlay';
      el.style.cssText = 'position:absolute;inset:0;background:rgba(255,255,255,.85);display:flex;align-items:center;justify-content:center;border-radius:1rem;z-index:2;';
      el.innerHTML = '<div class="loading-spinner"><div class="spinner"></div></div>';
      if (!document.querySelector('#spinner-styles')) {
        const style = document.createElement('style');
        style.id = 'spinner-styles';
        style.textContent = '.loading-spinner .spinner{width:28px;height:28px;border:3px solid #eee;border-top-color:#CDAA7D;border-radius:50%;animation:spin 1s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}';
        document.head.appendChild(style);
      }
      return el;
    }

    updateVariant(card, id) {
      const input = card.querySelector('.footwear-form input[name="id"]');
      if (input) input.value = id;
    }

    updateProductUrl(card, variantId) {
      const linkEls = [card.querySelector('.footwear-image-link'), card.querySelector('.footwear-title a')].filter(Boolean);
      linkEls.forEach(a => {
        try {
          const url = new URL(a.href, window.location.origin);
          url.searchParams.set('variant', variantId);
          a.href = url.pathname + url.search;
        } catch(e) {}
      });
    }

    addClickFeedback(swatch) {
      const ripple = document.createElement('div');
      ripple.className = 'color-swatch-ripple';
      ripple.style.cssText = 'position:absolute;inset:auto;top:50%;left:50%;width:0;height:0;background:rgba(255,255,255,.6);border-radius:50%;transform:translate(-50%,-50%);animation:ripple .6s ease-out;pointer-events:none;';
      swatch.style.position = 'relative';
      swatch.appendChild(ripple);
      if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = '@keyframes ripple{to{width:100px;height:100px;opacity:0}}';
        document.head.appendChild(style);
      }
      setTimeout(() => ripple.remove(), 650);
    }

    handleAddToCart(e) {
      e.preventDefault();
      const form = e.target.closest('form');
      const btn = form.querySelector('.footwear-add-to-cart');
      const original = btn.textContent;
      btn.disabled = true; btn.textContent = 'Adding...'; btn.style.opacity = '0.7';

      const formData = new FormData(form);
      fetch('/cart/add.js', { method: 'POST', body: formData })
        .then(r => r.ok ? r.json() : r.json().then(Promise.reject))
        .then(() => { this.showAddSuccess(btn, original); this.updateCartCount(); })
        .catch(err => { this.showAddError(btn, err?.description || 'Failed to add'); })
        .finally(() => setTimeout(() => { btn.disabled = false; btn.style.opacity = '1'; btn.textContent = original; }, 1500));
    }

    showAddSuccess(btn, original) {
      btn.textContent = 'Added! ✓';
      btn.style.background = 'linear-gradient(135deg,#28a745 0%,#20c997 100%)';
      btn.style.animation = 'pulse .6s ease';
      setTimeout(() => { btn.textContent = original; btn.style.background = ''; btn.style.animation = ''; }, 1500);
    }

    showAddError(btn, msg) {
      btn.textContent = 'Error';
      btn.style.background = 'linear-gradient(135deg,#dc3545 0%,#c82333 100%)';
      this.showTooltip(btn, msg, 'error');
    }

    showTooltip(el, msg, type='info') {
      const tip = document.createElement('div');
      tip.className = 'tooltip tooltip-' + type;
      tip.textContent = msg;
      tip.style.cssText = 'position:absolute;top:-40px;left:50%;transform:translateX(-50%);background:'+(type==='error'?'#dc3545':'#333')+';color:#fff;padding:.5rem 1rem;border-radius:.25rem;font-size:.875rem;z-index:3;';
      el.style.position = 'relative';
      el.appendChild(tip);
      setTimeout(() => tip.remove(), 2500);
    }

    updateCartCount() {
      fetch('/cart.js').then(r=>r.json()).then(cart => {
        document.querySelectorAll('.cart-count, .cart-count-badge, [data-cart-count]').forEach(el => { el.textContent = cart.item_count; el.style.animation = 'bounce .6s ease'; setTimeout(()=>{ el.style.animation = ''; }, 600); });
      }).catch(()=>{});
    }

    handleKeyboardNavigation(e, swatch) {
      const card = swatch.closest('.footwear-card');
      const all = Array.from(card.querySelectorAll('.color-swatch'));
      const i = all.indexOf(swatch);
      let j = i;
      switch(e.key){
        case 'ArrowLeft': case 'ArrowUp': e.preventDefault(); j = i>0?i-1:all.length-1; break;
        case 'ArrowRight': case 'ArrowDown': e.preventDefault(); j = i<all.length-1?i+1:0; break;
        case 'Enter': case ' ': e.preventDefault(); this.handleColorSwatchClick(e, swatch); return;
        default: return;
      }
      all[j]?.focus(); this.setActiveSwatch(all[j]);
    }

    getColorName(swatch) {
      const el = swatch.querySelector('.color-name');
      return el ? el.textContent.trim() : '';
    }
  }

  function initAll(root=document){
    root.querySelectorAll('[id^="featured-footwear-"]').forEach(sec => new FeaturedFootwear(sec));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll());
  } else { initAll(); }

  document.addEventListener('shopify:section:load', (e) => initAll(e.target));
})();