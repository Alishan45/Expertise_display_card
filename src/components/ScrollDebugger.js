'use client';
import { useEffect } from 'react';

export default function ScrollDebugger() {
  useEffect(() => {
    const logScroll = (source, details) => {
      console.warn(`[ScrollDebugger] Scroll triggered by ${source}`, details);
      console.trace();
    };

    // Override window.scrollTo
    const origScrollTo = window.scrollTo;
    window.scrollTo = function(...args) {
      logScroll('window.scrollTo', args);
      origScrollTo.apply(this, args);
    };

    // Override window.scrollBy
    const origScrollBy = window.scrollBy;
    window.scrollBy = function(...args) {
      logScroll('window.scrollBy', args);
      origScrollBy.apply(this, args);
    };

    // Override Element.prototype.scrollIntoView
    const origScrollIntoView = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = function(...args) {
      logScroll('Element.scrollIntoView', { element: this, args });
      origScrollIntoView.apply(this, args);
    };

    // Track scrollTop assignment on documentElement or body
    const origSetScrollTop = Object.getOwnPropertyDescriptor(Element.prototype, 'scrollTop').set;
    Object.defineProperty(Element.prototype, 'scrollTop', {
      set(val) {
        if (this === document.documentElement || this === document.body) {
          logScroll('document.scrollTop assignment', val);
        }
        origSetScrollTop.call(this, val);
      }
    });

    // Focus events
    const onFocus = (e) => {
      console.log('[ScrollDebugger] Focus changed to', e.target);
    };
    window.addEventListener('focus', onFocus, true);
    
    // Hash change
    const onHashChange = (e) => {
      console.log('[ScrollDebugger] Hash changed to', window.location.hash);
    };
    window.addEventListener('hashchange', onHashChange);

    // Detect generic scroll
    let lastScrollY = window.scrollY;
    const onScroll = () => {
      if (Math.abs(window.scrollY - lastScrollY) > 50) {
        console.log(`[ScrollDebugger] Scroll moved from ${lastScrollY} to ${window.scrollY}`);
      }
      lastScrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.scrollTo = origScrollTo;
      window.scrollBy = origScrollBy;
      Element.prototype.scrollIntoView = origScrollIntoView;
      window.removeEventListener('focus', onFocus, true);
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return null;
}
