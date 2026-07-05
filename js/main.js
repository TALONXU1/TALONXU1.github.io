/* ============================================================
   Portfolio — Main Script
   GSAP 3 + ScrollTrigger + Lenis
   ============================================================ */

(function () {
  'use strict';

  /* ---- Detect reduced motion ---- */
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  /* ---- Register plugins ---- */
  gsap.registerPlugin(ScrollTrigger);

  /* ============================================================
     Lenis — Smooth Scroll
     ============================================================ */
  const lenis = new Lenis({
    duration: 1.4,
    easing: function (t) {
      return Math.min(1, 1.001 - Math.pow(2, -10 * t));
    },
    smoothWheel: !prefersReducedMotion,
    lerp: prefersReducedMotion ? 1 : 0.08,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  if (!prefersReducedMotion) {
    requestAnimationFrame(raf);
  }

  /* Connect GSAP ScrollTrigger to Lenis */
  if (!prefersReducedMotion) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  /* ============================================================
     Hero Text Reveal — On Load
     ============================================================ */
  function heroReveal() {
    if (prefersReducedMotion) return;

    var heroLines = document.querySelectorAll('.hero-line');
    var heroSub = document.querySelector('.hero-sub');
    var heroCta = document.querySelector('.hero-cta');
    var heroShape = document.querySelector('.hero-shape');
    var nav = document.getElementById('nav');

    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      nav,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.3 }
    );

    tl.fromTo(
      heroLines,
      { y: '110%', rotate: 4 },
      {
        y: '0%',
        rotate: 0,
        duration: 1.1,
        stagger: 0.14,
        ease: 'expo.out',
      },
      '-=0.4'
    );

    tl.fromTo(
      heroSub,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.5'
    );

    tl.fromTo(
      heroCta,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.7 },
      '-=0.4'
    );

    tl.fromTo(
      heroShape,
      { opacity: 0, scale: 0.88 },
      { opacity: 1, scale: 1, duration: 1.2 },
      '-=0.8'
    );
  }

  /* ============================================================
     Scroll Reveal — data-reveal elements
     ============================================================ */
  function scrollReveal() {
    if (prefersReducedMotion) {
      var revealEls = document.querySelectorAll('[data-reveal]');
      revealEls.forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    var reveals = document.querySelectorAll('[data-reveal]');
    reveals.forEach(function (el) {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });
  }

  /* ============================================================
     Bento Cards — Staggered reveal on scroll
     ============================================================ */
  function bentoReveal() {
    if (prefersReducedMotion) return;

    var cards = document.querySelectorAll('.bento-card');
    if (!cards.length) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 48, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.bento',
          start: 'top 82%',
          once: true,
        },
      }
    );
  }

  /* ============================================================
     About image — Parallax on scroll
     ============================================================ */
  function aboutParallax() {
    if (prefersReducedMotion) return;

    var aboutMedia = document.querySelector('.about-media');
    if (!aboutMedia) return;

    gsap.fromTo(
      aboutMedia,
      { y: 40 },
      {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      }
    );
  }

  /* ============================================================
     Nav — Background opacity on scroll
     ============================================================ */
  function navScroll() {
    if (prefersReducedMotion) return;

    var navInner = document.querySelector('.nav-inner');
    if (!navInner) return;

    ScrollTrigger.create({
      trigger: document.body,
      start: 'top -80px',
      end: 'bottom top',
      onUpdate: function (self) {
        if (self.scroll() > 60) {
          navInner.style.background = 'rgba(10, 10, 10, 0.92)';
          navInner.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        } else {
          navInner.style.background = 'rgba(10, 10, 10, 0.75)';
          navInner.style.borderColor = 'rgba(255, 255, 255, 0.06)';
        }
      },
    });
  }

  /* ============================================================
     Hero shape — Parallax on scroll
     ============================================================ */
  function heroShapeParallax() {
    if (prefersReducedMotion) return;

    var shape = document.querySelector('.hero-shape');
    if (!shape) return;

    gsap.to(shape, {
      y: -80,
      scale: 0.92,
      opacity: 0.3,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }

  /* ============================================================
     Scroll hint — Fade out on scroll
     ============================================================ */
  function scrollHint() {
    if (prefersReducedMotion) return;

    var hint = document.querySelector('.scroll-hint');
    if (!hint) return;

    gsap.to(hint, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
      },
    });
  }

  /* ============================================================
     Anchor links — Smooth scroll via Lenis
     ============================================================ */
  function anchorLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
          if (lenis && !prefersReducedMotion) {
            lenis.scrollTo(target, {
              offset: -80,
              duration: 1.6,
            });
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  /* ============================================================
     Gallery image hover
     ============================================================ */
  function galleryHover() {
    if (prefersReducedMotion) return;

    document.querySelectorAll('.bento-gallery img').forEach(function (img) {
      img.addEventListener('mouseenter', function () {
        gsap.to(img, { scale: 1.04, duration: 0.5, ease: 'power2.out' });
      });
      img.addEventListener('mouseleave', function () {
        gsap.to(img, { scale: 1, duration: 0.5, ease: 'power2.out' });
      });
    });
  }

  /* ============================================================
     Init
     ============================================================ */
  function init() {
    anchorLinks();
    galleryHover();

    if (prefersReducedMotion) {
      /* Show everything immediately */
      var hiddenEls = document.querySelectorAll('[data-reveal]');
      hiddenEls.forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    } else {
      heroReveal();
      scrollReveal();
      bentoReveal();
      aboutParallax();
      navScroll();
      heroShapeParallax();
      scrollHint();
    }
  }

  /* ---- Start on DOM ready ---- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ---- Refresh ScrollTrigger on resize ---- */
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      ScrollTrigger.refresh();
    }, 250);
  });
})();
