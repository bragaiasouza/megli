import Splide from '@splidejs/splide';

import { bootHygraph } from './lib/hygraph/bootstrap.js';
import { renderPage } from './lib/hygraph/renderers.js';

var propertiesPayload = null;
var hasInitialized = false;

function normalizePath(path) {
  return (path || '/').replace(/\/+$/, '') || '/';
}

function propertyListingRoute(path) {
  var normalized = normalizePath(path);
  var routes = {
    '/imoveis': '',
    '/imoveis/comprar': 'comprar',
    '/imoveis/alugar': 'alugar',
    '/imoveis/temporada': 'temporada',
  };

  return Object.prototype.hasOwnProperty.call(routes, normalized) ? routes[normalized] : null;
}

function syncListingCategoryFromPath(path) {
  var category = propertyListingRoute(path);

  if (category === null || document.body.dataset.page !== 'properties') {
    return false;
  }

  if (category) {
    document.body.dataset.listingCategory = category;
  } else {
    delete document.body.dataset.listingCategory;
  }

  return true;
}

function initPropertiesShell() {
  if (document.body.dataset.page !== 'properties') {
    return;
  }

  syncListingCategoryFromPath(window.location.pathname);
  var categoryRoute = document.body.dataset.listingCategory || '';
  var labels = {
    comprar: 'Comprar',
    alugar: 'Alugar',
    temporada: 'Por temporada',
  };
  var activeLabel = labels[categoryRoute] || 'Todos';
  var categorySpans = document.querySelectorAll('#filter .item:first-child .list span');
  var phaseSpans = document.querySelectorAll('#filter .item:nth-child(2) .list span');
  var grid = document.querySelector('#estate .grid');
  var pagination = document.querySelector('#estate .pagination');

  categorySpans.forEach(function (span) {
    span.classList.toggle('on', span.textContent.trim() === activeLabel);
  });

  phaseSpans.forEach(function (span, index) {
    span.classList.toggle('on', index === 0);
  });

  if (grid) {
    grid.innerHTML = '';
  }

  if (pagination) {
    pagination.innerHTML = '';
  }
}

function initImageReveal() {
  function revealImage(image) {
    image.classList.add('is-loaded');
    var frame = image.closest('a, figure');

    if (frame) {
      frame.classList.remove('is-loading');
      frame.classList.add('is-loaded');
    }
  }

  function bindImages(scope) {
    Array.prototype.forEach.call(
      (scope || document).querySelectorAll('img[loading="lazy"], img[data-reveal]'),
      function (image) {
        var frame = image.closest('a, figure');

        if (frame) {
          frame.classList.add('is-loading');
          frame.classList.remove('is-loaded');
        }

        if (image.complete) {
          revealImage(image);
          return;
        }

        image.addEventListener(
          'load',
          function () {
            revealImage(image);
          },
          { once: true },
        );
        image.addEventListener(
          'error',
          function () {
            if (frame) {
              frame.classList.remove('is-loading');
              frame.classList.add('is-loaded');
            }
          },
          { once: true },
        );
      },
    );
  }

  bindImages(document);
  document.addEventListener('megli:content-updated', function () {
    bindImages(document);
  });
}

function initActiveMenu() {
  function syncActiveMenu() {
    var currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
    var propertyCategoryRoute = document.body.dataset.propertyCategoryRoute || '';
    var activePath =
      document.body.dataset.page === 'property' && propertyCategoryRoute
        ? propertyCategoryRoute
        : currentPath;

    document.querySelectorAll('#header nav li, #sidebar nav li').forEach(function (item) {
      item.classList.remove('on');
    });

    document
      .querySelectorAll('#header nav a, #sidebar nav a')
      .forEach(function (link) {
        var linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/+$/, '') || '/';

        if (linkPath === activePath) {
          var item = link.closest('li');

          if (item) {
            item.classList.add('on');
          }
        }
      });
  }

  syncActiveMenu();
  document.addEventListener('megli:content-updated', syncActiveMenu);
}

function initSidebar() {
  var toggle = document.querySelector('span.toggle');
  var sidebar = document.querySelector('#sidebar');

  if (!toggle || !sidebar) {
    return;
  }

  toggle.addEventListener('click', function () {
    toggle.classList.toggle('on');
    sidebar.classList.toggle('on');
  });

  document.addEventListener('click', function (event) {
    var clickedInsideSidebar = sidebar.contains(event.target);
    var clickedToggle = toggle.contains(event.target);

    if (!clickedInsideSidebar && !clickedToggle) {
      toggle.classList.remove('on');
      sidebar.classList.remove('on');
    }
  });
}

function initBackToTop() {
  var backLink = document.querySelector('#footer .back a[href="#header"]');
  var header = document.querySelector('#header');

  if (!backLink || !header) {
    return;
  }

  backLink.addEventListener('click', function (event) {
    event.preventDefault();
    header.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function initHeroSearch() {
  var heroBox = document.querySelector('#hero .box');

  if (!heroBox) {
    return;
  }

  var options = Array.prototype.slice.call(heroBox.querySelectorAll('.list span'));
  var mainButton = heroBox.querySelector('button:not(.search-btn)');
  var searchBtn = heroBox.querySelector('.search-btn');
  var searchInput = heroBox.querySelector('.search-box input');
  var routes = {
    Comprar: '/imoveis/comprar/',
    Alugar: '/imoveis/alugar/',
    'Locação por temporada': '/imoveis/temporada/',
  };
  var selectedOption = null;

  options.forEach(function (option) {
    option.addEventListener('click', function () {
      options.forEach(function (item) {
        item.classList.remove('on');
      });

      option.classList.add('on');
      selectedOption = option.textContent.trim();

      var target = routes[selectedOption];
      if (target) {
        window.location.href = target;
      }
    });
  });

  function navigateWithSearch() {
    var term = searchInput ? searchInput.value.trim() : '';
    var base = routes[selectedOption] || '/imoveis/';
    window.location.href = term ? base + '?q=' + encodeURIComponent(term) : base;
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', navigateWithSearch);
  }

  if (searchInput) {
    searchInput.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        navigateWithSearch();
      }
    });
  }

  if (mainButton) {
    mainButton.addEventListener('click', function () {
      var target = routes[selectedOption] || '/imoveis/';
      window.location.href = target;
    });
  }
}

function initHeroRotator() {
  var rotator = document.querySelector('#hero .hero-rotator');

  if (!rotator) {
    return;
  }

  var current = rotator.querySelector('.hero-rotator__current');
  var next = document.createElement('span');
  var texts = (rotator.dataset.heroTexts || '')
    .split('|')
    .map(function (text) {
      return text.trim();
    })
    .filter(Boolean);

  if (!current || texts.length < 2) {
    return;
  }

  next.className = 'hero-rotator__next';
  next.setAttribute('aria-hidden', 'true');
  rotator.appendChild(next);

  var index = 0;
  var isAnimating = false;

  window.setInterval(function () {
    if (isAnimating) {
      return;
    }

    index = (index + 1) % texts.length;

    isAnimating = true;
    next.textContent = texts[index];
    rotator.classList.add('is-animating');

    window.setTimeout(function () {
      rotator.classList.add('is-resetting');
      current.textContent = texts[index];
      rotator.classList.remove('is-animating');

      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          rotator.classList.remove('is-resetting');
          isAnimating = false;
        });
      });
    }, 420);
  }, 2800);
}

function initPropertiesNavigation() {
  if (document.body.dataset.page !== 'properties') {
    return;
  }

  function renderPropertiesPath(target, shouldPushState) {
    var targetUrl = new URL(target, window.location.origin);

    if (!propertiesPayload || !syncListingCategoryFromPath(targetUrl.pathname)) {
      return false;
    }

    if (shouldPushState) {
      window.history.pushState({}, '', targetUrl);
    }

    renderPage('properties', propertiesPayload);
    initActiveMenu();
    window.scrollTo({ top: 0, behavior: 'auto' });
    return true;
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a');

    if (
      !link ||
      link.target === '_blank' ||
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    var url = new URL(link.href, window.location.origin);

    if (url.origin !== window.location.origin || propertyListingRoute(url.pathname) === null) {
      return;
    }

    event.preventDefault();
    renderPropertiesPath(url.pathname + url.search, true);
  });

  document.addEventListener('megli:properties-route-change', function (event) {
    if (!event.detail || !event.detail.path) {
      return;
    }

    renderPropertiesPath(event.detail.path, true);
  });

  window.addEventListener('popstate', function () {
    renderPropertiesPath(window.location.pathname + window.location.search, false);
  });
}

function initFilterToggle() {
  var filter = document.querySelector('#filter');
  var button = document.querySelector('.filter-toggle-button');

  if (!filter || !button) {
    return;
  }

  var mediaQuery = window.matchMedia('(max-width: 1280px)');

  function syncFilterState(isCompact) {
    if (isCompact) {
      filter.classList.add('is-collapsed');
      button.setAttribute('aria-expanded', 'false');
      button.textContent = 'Abrir filtro';
      return;
    }

    filter.classList.remove('is-collapsed');
    button.setAttribute('aria-expanded', 'true');
    button.textContent = 'Abrir filtro';
  }

  syncFilterState(mediaQuery.matches);

  button.addEventListener('click', function () {
    if (!mediaQuery.matches) {
      return;
    }

    var isCollapsed = filter.classList.toggle('is-collapsed');
    button.setAttribute('aria-expanded', String(!isCollapsed));
    button.textContent = isCollapsed ? 'Abrir filtro' : 'Fechar filtro';
  });

  mediaQuery.addEventListener('change', function (event) {
    syncFilterState(event.matches);
  });
}

function initLightbox() {
  var galleryLinks = document.querySelectorAll('#gallery .splide__slide a');
  var lightbox = document.querySelector('#gallery-lightbox');
  var openGalleryTrigger = document.querySelector('[data-open-gallery]');

  if (!lightbox || !galleryLinks.length) {
    return;
  }

  var lightboxImage = lightbox.querySelector('.lightbox__image');
  var lightboxCaption = lightbox.querySelector('.lightbox__caption');
  var lightboxClose = lightbox.querySelector('.lightbox__close');
  var lightboxPrev = lightbox.querySelector('.lightbox__nav--prev');
  var lightboxNext = lightbox.querySelector('.lightbox__nav--next');
  var currentLightboxIndex = 0;

  var lightboxItems = Array.prototype.map.call(galleryLinks, function (link) {
    var image = link.querySelector('img');

    return {
      src: link.getAttribute('href') || image.getAttribute('src'),
      alt: image ? image.getAttribute('alt') || 'Foto do imovel' : 'Foto do imovel',
    };
  });

  function renderLightbox(index) {
    var totalItems = lightboxItems.length;

    currentLightboxIndex = (index + totalItems) % totalItems;
    lightboxImage.setAttribute('src', lightboxItems[currentLightboxIndex].src);
    lightboxImage.setAttribute('alt', lightboxItems[currentLightboxIndex].alt);
    lightboxCaption.textContent = currentLightboxIndex + 1 + ' / ' + totalItems;
  }

  function openLightbox(index) {
    renderLightbox(index);
    lightbox.classList.add('on');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('on');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  Array.prototype.forEach.call(galleryLinks, function (link, index) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      openLightbox(index);
    });
  });

  if (openGalleryTrigger) {
    openGalleryTrigger.addEventListener('click', function (event) {
      event.preventDefault();
      openLightbox(0);
    });
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', function () {
    renderLightbox(currentLightboxIndex - 1);
  });
  lightboxNext.addEventListener('click', function () {
    renderLightbox(currentLightboxIndex + 1);
  });

  lightbox.addEventListener('click', function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (!lightbox.classList.contains('on')) {
      return;
    }

    if (event.key === 'Escape') {
      closeLightbox();
    }

    if (event.key === 'ArrowLeft') {
      renderLightbox(currentLightboxIndex - 1);
    }

    if (event.key === 'ArrowRight') {
      renderLightbox(currentLightboxIndex + 1);
    }
  });
}

function initHomeSplide() {
  var slide = document.querySelector('.slide.splide');

  if (!slide) {
    return;
  }

  var homeSlide = new Splide(slide, {
    type: 'slide',
    fixedWidth: 'calc((100% - 72px) / 3.5)',
    focus: 0,
    omitEnd: true,
    perMove: 1,
    gap: '24px',
    pagination: true,
    arrows: true,
    rewind: false,
    drag: true,
    breakpoints: {
      1024: {
        fixedWidth: 'calc((100% - 24px) / 2)',
        gap: '16px',
      },
      767: {
        fixedWidth: '100%',
        gap: '16px',
      },
    },
  });

  homeSlide.on('overflow', function (isOverflow) {
    homeSlide.options = {
      pagination: isOverflow,
    };
  });

  homeSlide.mount();
}

function initGallerySplide() {
  var gallery = document.querySelector('#gallery.splide');

  if (!gallery) {
    return;
  }

  new Splide(gallery, {
    type: 'slide',
    fixedWidth: 'calc((100% - 72px) / 3.5)',
    perMove: 1,
    pagination: false,
    arrows: true,
    rewind: true,
    drag: true,
    gap: '20px',
    breakpoints: {
      1024: {
        fixedWidth: 'calc((100% - 20px) / 2)',
        gap: '16px',
      },
      767: {
        fixedWidth: '100%',
        gap: '16px',
      },
    },
  }).mount();
}

export async function initDomApp() {
  if (hasInitialized) {
    return;
  }

  hasInitialized = true;
  initPropertiesShell();
  initImageReveal();
  initActiveMenu();
  initSidebar();
  initBackToTop();
  initHeroRotator();
  initHeroSearch();
  initFilterToggle();
  propertiesPayload = await bootHygraph(document.body.dataset.page);
  initPropertiesNavigation();
  initLightbox();
  initHomeSplide();
  initGallerySplide();
}
