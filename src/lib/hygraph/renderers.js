function formatCurrency(value, suffix) {
  if (value === null || value === undefined || value === '') {
    return '';
  }

  var amount = Number(value);

  if (Number.isNaN(amount)) {
    return value;
  }

  var formatted = amount.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return 'R$' + formatted + (suffix ? ' ' + suffix : '');
}

function categoryLabel(value) {
  return {
    temporada: 'Temporada',
    aluguel: 'Aluguel',
    venda: 'Venda',
  }[value] || value;
}

function propertyCategoryRoute(value) {
  return {
    venda: '/imoveis/comprar',
    aluguel: '/imoveis/alugar',
    temporada: '/imoveis/temporada',
  }[value] || '';
}

function phaseLabel(value) {
  return {
    lancamento: 'Lançamento',
    emObra: 'Em obras',
    pronto: 'Pronto',
  }[value] || value;
}

function listingCategoryFromRoute(routeValue) {
  return {
    comprar: 'venda',
    alugar: 'aluguel',
    temporada: 'temporada',
  }[routeValue] || null;
}

function slugify(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function pluralize(value, singular, plural) {
  var amount = Number(value) || 0;

  return amount + ' ' + (amount === 1 ? singular : plural);
}

function buildTags(imovel) {
  var tags = [];

  if (imovel.categoria) {
    tags.push(
      '<span class="tag-' + imovel.categoria + '">' + categoryLabel(imovel.categoria) + '</span>',
    );
  }

  if (imovel.fase === 'lancamento') {
    tags.push('<span class="tag-lancamento">Lançamento</span>');
  }

  return tags.join('');
}

function buildListingCard(imovel) {
  var image = (imovel.galeriaDeImagens || [])[0];
  var imageUrl = image ? image.url : '/assets/img/_temp/1.png';
  var imageAlt = image && image.fileName ? image.fileName : imovel.nome;
  var code = imovel.id ? imovel.id.slice(0, 6).toUpperCase() : '000000';
  var pathSlug = slugify(imovel.nome);
  var propertyUrl = '/imovel/' + pathSlug + '/';

  return `
    <li class="${document.body.dataset.page === 'home' ? 'splide__slide' : ''}">
      <a href="${propertyUrl}" title="Acessar imóvel">
        <article>
          <figure>
            <div class="tags">${buildTags(imovel)}</div>
            ${imovel.destaque && document.body.dataset.page !== 'home' ? '<div class="star-badge"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFD14E" stroke="#FFD14E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>' : ''}
            <img src="${imageUrl}" alt="${imageAlt || 'Foto do imóvel'}" loading="lazy" decoding="async" data-reveal />
          </figure>
          <span class="locality">${imovel.cidade || ''}${imovel.bairro ? ' - ' + imovel.bairro : ''}</span>
          <div class="top flex align-center justify-between">
            <span class="type">Imóvel</span>
            <span class="code">COD. ${code}</span>
          </div>
          <h3>${imovel.nome || ''}</h3>
          <div class="info flex align-center">
            <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3V21M3 12H21M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z" stroke="#FFD14E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> ${imovel.metragem || 0}m2</span>
            <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4L6.5 6.5M13.5 6.5C12.5686 5.58718 11.3145 5.07883 10.0104 5.08542C8.70621 5.09201 7.45736 5.613 6.53518 6.53518C5.613 7.45736 5.09201 8.70621 5.08542 10.0104C5.07883 11.3145 5.58718 12.5686 6.5 13.5M15 5L5 15M14 17V17.01M10 16V16.01M13 13V13.01M16 10V10.01M11 20V20.01M17 14V14.01M20 11V11.01" stroke="#FFD14E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> ${imovel.banheiro || 0}</span>
            <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 20V12C3 11.4696 3.21071 10.9609 3.58579 10.5858C3.96086 10.2107 4.46957 10 5 10M5 10H19M5 10V6C5 5.46957 5.21071 4.96086 5.58579 4.58579C5.96086 4.21071 6.46957 4 7 4H17C17.5304 4 18.0391 4.21071 18.4142 4.58579C18.7893 4.96086 19 5.46957 19 6V10M19 10C19.5304 10 20.0391 10.2107 20.4142 10.5858C20.7893 10.9609 21 11.4696 21 12V20M3 18H21" stroke="#FFD14E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> ${imovel.quarto || 0}</span>
            <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 8.00004L19 10M19 10L17.5 6.30004C17.3585 5.92138 17.1057 5.59446 16.7747 5.36239C16.4437 5.13032 16.0502 5.00399 15.646 5.00004H8.4C7.9925 4.99068 7.59188 5.10605 7.25177 5.3307C6.91166 5.55536 6.64832 5.87856 6.497 6.25704L5 10M19 10H5M19 10C20.1046 10 21 10.8955 21 12V16C21 17.1046 20.1046 18 19 18M5 10L3 8.00004M5 10C3.89543 10 3 10.8955 3 12V16C3 17.1046 3.89543 18 5 18M7 14H7.01M17 14H17.01M19 18H5M19 18V20M5 18V20" stroke="#FFD14E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> ${imovel.vaga || 0}</span>
          </div>
        </article>
      </a>
    </li>
  `;
}

function buildListingSkeletons(count) {
  return Array.from({ length: count }).map(function () {
    return `
      <li class="estate-skeleton" aria-hidden="true">
        <article>
          <figure></figure>
          <span class="locality"></span>
          <div class="top flex align-center justify-between">
            <span class="type"></span>
            <span class="code"></span>
          </div>
          <h3></h3>
          <div class="info flex align-center">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </article>
      </li>
    `;
  }).join('');
}

function populateFooterCollections(imovels) {
  var cities = Array.from(
    new Set(
      imovels
        .map(function (item) {
          return item.cidade;
        })
        .filter(Boolean),
    ),
  ).slice(0, 8);
  var neighborhoods = Array.from(
    new Set(
      imovels
        .map(function (item) {
          return item.bairro;
        })
        .filter(Boolean),
    ),
  ).slice(0, 8);
  var columns = document.querySelectorAll('#footer .column nav ul');

  if (columns[0] && cities.length) {
    columns[0].innerHTML = cities
      .map(function (city) {
        return (
          '<li><a href="/imoveis/?cidade=' +
          encodeURIComponent(city) +
          '" title="' +
          city +
          '">' +
          city +
          '</a></li>'
        );
      })
      .join('');
  }

  if (columns[1] && neighborhoods.length) {
    columns[1].innerHTML = neighborhoods
      .map(function (neighborhood) {
        return (
          '<li><a href="/imoveis/?bairro=' +
          encodeURIComponent(neighborhood) +
          '" title="' +
          neighborhood +
          '">' +
          neighborhood +
          '</a></li>'
        );
      })
      .join('');
  }
}

function renderHome(data) {
  var list = document.querySelector('#carousel .splide__list');
  var imovels = data && data.imovels ? data.imovels : [];
  var footerImovels = data && data.footerImovels ? data.footerImovels : imovels;

  if (!list || !imovels.length) {
    return;
  }

  list.innerHTML = imovels.map(buildListingCard).join('');
  populateFooterCollections(footerImovels);
}

function renderProperties(data) {
  var allImovels = data && data.imovels ? data.imovels : [];
  var grid = document.querySelector('#estate .grid');
  var pagination = document.querySelector('#estate .pagination');
  var categoryRoute = listingCategoryFromRoute(document.body.dataset.listingCategory);
  var phaseSpans = Array.from(document.querySelectorAll('#filter .item:nth-child(2) .list span'));
  var citySelect = document.querySelector('#filter .item-right .item-2:nth-child(1) select');
  var bairroSelect = document.querySelector('#filter .item-right .item-2:nth-child(2) select');
  var searchParams = new URLSearchParams(window.location.search);
  var currentPage = Math.max(1, Number(searchParams.get('page') || 1));
  var initialCity = searchParams.get('cidade') || '';
  var initialBairro = searchParams.get('bairro') || '';
  var currentSearchTerm = searchParams.get('q') || '';
  var currentSortValue = searchParams.get('sort') || 'relevance';
  var catalogSearchInput = document.querySelector('#catalog-search .search-box input');
  var catalogSearchBtn = document.querySelector('#catalog-search .search-btn');
  var currentQuartoMin = 0;
  var currentBanheiroMin = 0;
  var currentVagaMin = 0;

  if (catalogSearchInput && currentSearchTerm) {
    catalogSearchInput.value = currentSearchTerm;
  }
  var itemsPerPage = 12;
  var gridRevealTimer = null;
  var lastGridSignature = '';
  var gridSwapTimer = null;

  if (!grid || !allImovels.length) {
    return;
  }

  populateFooterCollections(data && data.footerImovels ? data.footerImovels : allImovels);

  var visibleImovels = allImovels.filter(function (item) {
    return categoryRoute ? item.categoria === categoryRoute : true;
  });

  Array.from(document.querySelectorAll('#filter .item:first-child .list span')).forEach(function (span) {
    span.classList.toggle(
      'on',
      (categoryRoute === null && span.textContent.trim() === 'Todos') ||
        (categoryRoute === 'venda' && span.textContent.trim() === 'Comprar') ||
        (categoryRoute === 'aluguel' && span.textContent.trim() === 'Alugar') ||
        (categoryRoute === 'temporada' && span.textContent.trim() === 'Por temporada'),
    );
  });

  if (phaseSpans.length && !phaseSpans.some(function (span) { return span.classList.contains('on'); })) {
    phaseSpans[0].classList.add('on');
  }

  function populateSelect(select, values, emptyLabel) {
    if (!select) {
      return;
    }

    select.innerHTML =
      '<option value="">' +
      emptyLabel +
      '</option>' +
      values
        .map(function (value) {
          return '<option value="' + value + '">' + value + '</option>';
        })
        .join('');
  }

  function refreshNeighborhoods(selectedCity) {
    var neighborhoods = Array.from(
      new Set(
        visibleImovels
          .filter(function (item) {
            return selectedCity ? item.cidade === selectedCity : true;
          })
          .map(function (item) {
            return item.bairro;
          })
          .filter(Boolean),
      ),
    );

    populateSelect(bairroSelect, neighborhoods, 'Todos');
  }

  function updatePageQuery(page, cityValue, bairroValue) {
    var url = new URL(window.location.href);

    if (page > 1) {
      url.searchParams.set('page', String(page));
    } else {
      url.searchParams.delete('page');
    }

    if (cityValue) {
      url.searchParams.set('cidade', cityValue);
    } else {
      url.searchParams.delete('cidade');
    }

    if (bairroValue) {
      url.searchParams.set('bairro', bairroValue);
    } else {
      url.searchParams.delete('bairro');
    }

    if (currentSortValue && currentSortValue !== 'relevance') {
      url.searchParams.set('sort', currentSortValue);
    } else {
      url.searchParams.delete('sort');
    }

    window.history.replaceState({}, '', url);
  }

  function renderPagination(totalItems) {
    if (!pagination) {
      return;
    }

    var totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

    if (totalPages <= 1) {
      pagination.innerHTML = '';
      return;
    }

    var items = [];

    items.push(
      '<li class="' +
        (currentPage === 1 ? 'is-disabled' : '') +
        '"><a href="#" data-page="' +
        (currentPage - 1) +
        '" aria-label="Página anterior">‹</a></li>',
    );

    for (var page = 1; page <= totalPages; page += 1) {
      items.push(
        '<li class="' +
          (page === currentPage ? 'on' : '') +
          '"><a href="#" data-page="' +
          page +
          '" aria-label="Ir para página ' +
          page +
          '">' +
          page +
          '</a></li>',
      );
    }

    items.push(
      '<li class="' +
        (currentPage === totalPages ? 'is-disabled' : '') +
        '"><a href="#" data-page="' +
        (currentPage + 1) +
        '" aria-label="Próxima página">›</a></li>',
    );

    pagination.innerHTML = '<ul class="flex align-center">' + items.join('') + '</ul>';

    Array.from(pagination.querySelectorAll('a[data-page]')).forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();

        var nextPage = Number(link.dataset.page);

        if (
          link.parentElement.classList.contains('is-disabled') ||
          nextPage < 1 ||
          nextPage > totalPages ||
          nextPage === currentPage
        ) {
          return;
        }

        currentPage = nextPage;
        updatePageQuery(currentPage, citySelect ? citySelect.value : '', bairroSelect ? bairroSelect.value : '');
        renderGrid();
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function renderGrid() {
    var selectedPhase = document.querySelector('#filter .item:nth-child(2) .list span.on');
    var phaseValue = selectedPhase ? selectedPhase.dataset.value || '' : '';
    var cityValue = citySelect ? citySelect.value : '';
    var bairroValue = bairroSelect ? bairroSelect.value : '';

    var searchTerm = currentSearchTerm.toLowerCase().trim();
    var items = visibleImovels.filter(function (item) {
      if (phaseValue && item.fase !== phaseValue) {
        return false;
      }

      if (cityValue && item.cidade !== cityValue) {
        return false;
      }

      if (bairroValue && item.bairro !== bairroValue) {
        return false;
      }

      if (searchTerm) {
        var code = item.id ? item.id.slice(0, 6).toUpperCase() : '';
        var name = (item.nome || '').toLowerCase();
        if (!name.includes(searchTerm) && !code.toLowerCase().includes(searchTerm)) {
          return false;
        }
      }

      if (currentQuartoMin > 0 && (item.quarto || 0) < currentQuartoMin) {
        return false;
      }

      if (currentBanheiroMin > 0 && (item.banheiro || 0) < currentBanheiroMin) {
        return false;
      }

      if (currentVagaMin > 0 && (item.vaga || 0) < currentVagaMin) {
        return false;
      }

      return true;
    });

    // Helper function to get price based on category
    function getItemPrice(item) {
      var price = 0;

      if (categoryRoute === 'venda') {
        price = item.precoVenda;
      } else if (categoryRoute === 'aluguel') {
        price = item.precoAluguel;
      } else if (categoryRoute === 'temporada') {
        price = item.precoTemporada;
      } else {
        // Default: return the first available price
        price = item.precoVenda || item.precoAluguel || item.precoTemporada;
      }

      var parsed = parseFloat(price);
      return isNaN(parsed) ? 0 : parsed;
    }

    // Apply sorting
    if (currentSortValue === 'relevance') {
      items.sort(function (a, b) {
        // Prioritize featured properties
        if (a.destaque && !b.destaque) return -1;
        if (!a.destaque && b.destaque) return 1;
        return 0;
      });
    } else if (currentSortValue === 'newest') {
      items.sort(function (a, b) {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      });
    } else if (currentSortValue === 'price-low') {
      items.sort(function (a, b) {
        return getItemPrice(a) - getItemPrice(b);
      });
    } else if (currentSortValue === 'price-high') {
      items.sort(function (a, b) {
        return getItemPrice(b) - getItemPrice(a);
      });
    }

    var totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

    if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    var startIndex = (currentPage - 1) * itemsPerPage;
    var paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);
    var gridSignature =
      [
        categoryRoute || 'todos',
        phaseValue || 'todos',
        cityValue || 'todas',
        bairroValue || 'todos',
        currentPage,
        items.length,
        paginatedItems
          .map(function (item) {
            return item.id;
          })
          .join(','),
      ].join('|');

    renderPagination(items.length);

    var resultsCount = document.querySelector('#results-count');
    if (resultsCount) {
      var count = items.length;
      resultsCount.textContent = count + (count === 1 ? ' imóvel encontrado' : ' imóveis encontrados');
    }

    if (gridSignature === lastGridSignature) {
      return;
    }

    lastGridSignature = gridSignature;

    if (gridRevealTimer) {
      window.clearTimeout(gridRevealTimer);
    }

    if (gridSwapTimer) {
      window.clearTimeout(gridSwapTimer);
    }

    grid.classList.add('is-loading');
    grid.innerHTML = buildListingSkeletons(Math.max(3, Math.min(itemsPerPage, paginatedItems.length || 6)));

    gridSwapTimer = window.setTimeout(function () {
      grid.innerHTML = paginatedItems.map(buildListingCard).join('');
      grid.classList.remove('is-loading');
      document.dispatchEvent(new CustomEvent('megli:content-updated'));
    }, 180);
  }

  Array.from(document.querySelectorAll('#filter .item:first-child .list span')).forEach(function (span) {
    var map = {
      Todos: '/imoveis/',
      Comprar: '/imoveis/comprar/',
      Alugar: '/imoveis/alugar/',
      'Por temporada': '/imoveis/temporada/',
    };

    span.addEventListener('click', function () {
      Array.from(document.querySelectorAll('#filter .item:first-child .list span')).forEach(function (item) {
        item.classList.remove('on');
      });
      span.classList.add('on');

      var target = map[span.textContent.trim()];

      if (target) {
        document.dispatchEvent(
          new CustomEvent('megli:properties-route-change', {
            detail: {
              path: target,
            },
          }),
        );
      }
    });
  });

  phaseSpans.forEach(function (span) {
    var phaseMap = {
      Todos: '',
      Lançamento: 'lancamento',
      'Em obras': 'emObra',
      Prontos: 'pronto',
    };

    span.dataset.value = phaseMap[span.textContent.trim()] || '';
    span.addEventListener('click', function () {
      if (span.classList.contains('on')) {
        return;
      }

      phaseSpans.forEach(function (item) {
        item.classList.remove('on');
      });
      span.classList.add('on');
      currentPage = 1;
      updatePageQuery(currentPage);
      renderGrid();
    });
  });

  if (citySelect) {
    populateSelect(
      citySelect,
      Array.from(
        new Set(
          visibleImovels
            .map(function (item) {
              return item.cidade;
            })
            .filter(Boolean),
        ),
      ),
      'Todas',
    );

    if (initialCity) {
      citySelect.value = initialCity;
    }

    citySelect.addEventListener('change', function () {
      currentPage = 1;
      refreshNeighborhoods(citySelect.value);
      if (bairroSelect && !Array.from(bairroSelect.options).some(function (option) { return option.value === bairroSelect.value; })) {
        bairroSelect.value = '';
      }
      updatePageQuery(currentPage, citySelect.value, bairroSelect ? bairroSelect.value : '');
      renderGrid();
    });
  }

  if (bairroSelect) {
    refreshNeighborhoods(initialCity);

    if (initialBairro) {
      bairroSelect.value = initialBairro;
    }

    bairroSelect.addEventListener('change', function () {
      currentPage = 1;
      updatePageQuery(currentPage, citySelect ? citySelect.value : '', bairroSelect.value);
      renderGrid();
    });
  }

  if (!bairroSelect) {
    refreshNeighborhoods(initialCity);
  }

  if (catalogSearchInput) {
    catalogSearchInput.addEventListener('input', function () {
      currentSearchTerm = catalogSearchInput.value.trim();
      currentPage = 1;
      renderGrid();
    });
  }

  if (catalogSearchBtn) {
    catalogSearchBtn.addEventListener('click', function () {
      currentSearchTerm = catalogSearchInput ? catalogSearchInput.value.trim() : '';
      currentPage = 1;
      renderGrid();
    });
  }

  Array.from(document.querySelectorAll('.filter-btn')).forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filterType = btn.dataset.filter;
      var filterValue = parseInt(btn.dataset.value, 10);

      Array.from(document.querySelectorAll('.filter-btn[data-filter="' + filterType + '"]')).forEach(function (b) {
        b.classList.remove('active');
      });

      if (filterValue > 0) {
        btn.classList.add('active');
      }

      if (filterType === 'quarto') {
        currentQuartoMin = filterValue;
      } else if (filterType === 'banheiro') {
        currentBanheiroMin = filterValue;
      } else if (filterType === 'vaga') {
        currentVagaMin = filterValue;
      }

      currentPage = 1;
      renderGrid();
    });
  });

  var sortSelect = document.querySelector('#sort-select');
  if (sortSelect) {
    // Sync select with URL value
    sortSelect.value = currentSortValue;

    sortSelect.addEventListener('change', function () {
      currentSortValue = sortSelect.value;
      currentPage = 1;
      updatePageQuery(currentPage, citySelect ? citySelect.value : '', bairroSelect ? bairroSelect.value : '');
      renderGrid();
    });
  }

  renderGrid();
}

function youtubeEmbed(url) {
  if (!url) {
    return '';
  }

  var match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/,
  );

  if (!match) {
    return '';
  }

  return 'https://www.youtube.com/embed/' + match[1];
}

function buildMapContent(value) {
  if (!value || typeof value !== 'object') {
    return '';
  }

  if (value.latitude === null || value.latitude === undefined) {
    return '';
  }

  var latitude = value.latitude;
  var longitude = value.longitude;
  var query = encodeURIComponent(latitude + ',' + longitude);

  return (
    '<iframe src="https://www.google.com/maps?q=' +
    query +
    '&z=15&output=embed' +
    '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>'
  );
}

function mapButtonLabel(isOpen) {
  return (
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 10C20 14.993 14.461 20.193 12.601 21.799C12.4277 21.9293 12.2168 21.9998 12 21.9998C11.7832 21.9998 11.5723 21.9293 11.399 21.799C9.539 20.193 4 14.993 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10Z" stroke="#464646" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#464646" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> ' +
    (isOpen ? 'Fechar mapa' : 'Ver mapa')
  );
}

function buildWhatsAppLink(imovel) {
  var phone = '5511996529796';
  var productName = imovel && imovel.nome ? imovel.nome : 'este imóvel';
  var pageUrl = window.location.href;
  var message =
    'Olá! Tenho interesse no imóvel "' +
    productName +
    '". Pode me passar mais informações? Link: ' +
    pageUrl;

  return 'https://wa.me/' + phone + '?text=' + encodeURIComponent(message);
}

function renderProperty(data) {
  var imovel = data && data.imovel;

  if (!imovel) {
    return;
  }

  populateFooterCollections(data && data.footerImovels ? data.footerImovels : [imovel]);

  if (imovel.nome) {
    document.title = imovel.nome + ' | Megli Negócios Imobiliários';
  }

  if (imovel.categoria) {
    document.body.dataset.propertyCategoryRoute = propertyCategoryRoute(imovel.categoria);
  } else {
    delete document.body.dataset.propertyCategoryRoute;
  }

  var topCategory = document.querySelector('#single article .top > span');
  var heading = document.querySelector('#single article h1');
  var address = document.querySelector('#single article address');
  var proximity = document.querySelector('#single article .proximity');
  var info = document.querySelector('#single article .info');
  var about = document.querySelector('#single article .about');
  var featured = document.querySelector('#single article .featured');
  var featuredList = document.querySelector('#single article .featured .list');
  var videoContainer = document.querySelector('#single article .video');
  var galleryList = document.querySelector('#gallery .splide__list');
  var singleAside = document.querySelector('#single aside');

  topCategory.textContent = categoryLabel(imovel.categoria);
  heading.textContent = imovel.nome || '';
  address.innerHTML =
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 10C20 14.993 14.461 20.193 12.601 21.799C12.4277 21.9293 12.2168 21.9998 12 21.9998C11.7832 21.9998 11.5723 21.9293 11.399 21.799C9.539 20.193 4 14.993 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10Z" stroke="#FFD14E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#FFD14E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> ' +
    [imovel.endereco, imovel.bairro, imovel.cidade].filter(Boolean).join(' - ');
  proximity.innerHTML =
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#FFD14E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> ' +
    (imovel.referenciaDoLocal || '');
  info.innerHTML =
    '<span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3V21M3 12H21M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z" stroke="#FFD14E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> ' +
    (imovel.metragem || 0) +
    'm2</span>' +
    '<span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4L6.5 6.5M13.5 6.5C12.5686 5.58718 11.3145 5.07883 10.0104 5.08542C8.70621 5.09201 7.45736 5.613 6.53518 6.53518C5.613 7.45736 5.09201 8.70621 5.08542 10.0104C5.07883 11.3145 5.58718 12.5686 6.5 13.5M15 5L5 15M14 17V17.01M10 16V16.01M13 13V13.01M16 10V10.01M11 20V20.01M17 14V14.01M20 11V11.01" stroke="#FFD14E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> ' +
    (imovel.banheiro || 0) +
    '</span>' +
    '<span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 20V12C3 11.4696 3.21071 10.9609 3.58579 10.5858C3.96086 10.2107 4.46957 10 5 10M5 10H19M5 10V6C5 5.46957 5.21071 4.96086 5.58579 4.58579C5.96086 4.21071 6.46957 4 7 4H17C17.5304 4 18.0391 4.21071 18.4142 4.58579C18.7893 4.96086 19 5.46957 19 6V10M19 10C19.5304 10 20.0391 10.2107 20.4142 10.5858C20.7893 10.9609 21 11.4696 21 12V20M3 18H21" stroke="#FFD14E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> ' +
    (imovel.quarto || 0) +
    '</span>' +
    '<span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 7.99998L19 9.99998M19 9.99998L17.5 6.29998C17.3585 5.92131 17.1057 5.5944 16.7747 5.36233C16.4437 5.13026 16.0502 5.00393 15.646 4.99998H8.4C7.9925 4.99062 7.59188 5.10599 7.25177 5.33064C6.91166 5.5553 6.64832 5.8785 6.497 6.25698L5 9.99998M19 9.99998H5M19 9.99998C20.1046 9.99998 21 10.8954 21 12V16C21 17.1045 20.1046 18 19 18M5 9.99998L3 7.99998M5 9.99998C3.89543 9.99998 3 10.8954 3 12V16C3 17.1045 3.89543 18 5 18M7 14H7.01M17 14H17.01M19 18H5M19 18V20M5 18V20" stroke="#FFD14E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> ' +
    (imovel.vaga || 0) +
    '</span>';

  var paragraphs = (imovel.descricao || '').split(/\n+/).filter(Boolean);

  about.innerHTML =
    '<h2>Sobre o imóvel</h2>' +
    (paragraphs.length
      ? paragraphs
          .map(function (paragraph) {
            return '<p>' + paragraph + '</p>';
          })
          .join('')
      : '<p></p>');

  function getIconForCharacteristic(characteristic) {
    var iconMap = {
      arCondicionado: '❄️',
      banheiro: '🚿',
      piscina: '🏊',
      churrasqueira: '🔥',
      garagem: '🚗',
      academia: '💪',
      varanda: '🪟',
      jardim: '🌿',
      elevador: '🛗',
      wifi: '📶',
      cozinha: '🍳',
      sala: '🛋️',
    };
    return iconMap[characteristic] || '✓';
  }

  featuredList.innerHTML = (imovel.caracteristicas || [])
    .map(function (item) {
      var label = item.replace(/([A-Z])/g, ' $1').replace(/^./, function (c) { return c.toUpperCase(); });
      var icon = getIconForCharacteristic(item);
      return '<span>' + icon + label + '</span>';
    })
    .join('');

  var videoEmbed = youtubeEmbed(imovel.video);

  videoContainer.innerHTML = videoEmbed
    ? '<iframe src="' +
      videoEmbed +
      '" title="Vídeo do imóvel" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    : '';

  var images = imovel.galeriaDeImagens || [];

  galleryList.innerHTML = images
    .map(function (image) {
      var alt = image.fileName || imovel.nome || 'Foto do imóvel';

      return '<li class="splide__slide"><a href="' + image.url + '"><img src="' + image.url + '" alt="' + alt + '" loading="lazy" decoding="async" data-reveal /></a></li>';
    })
    .join('');

  var singleTags = document.querySelector('#single aside .tags');
  singleTags.innerHTML = buildTags(imovel);

  var pricesMarkup = '';
  var whatsAppLink = buildWhatsAppLink(imovel);

  if (imovel.precoTemporada) {
    pricesMarkup +=
      '<div class="price"><strong>Temporada</strong><span class="price-view"><small>R$</small>' +
      Number(imovel.precoTemporada).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) +
      ' <b>/noite</b></span></div>';
  }

  if (imovel.precoAluguel) {
    pricesMarkup +=
      '<div class="price"><strong>Aluguel</strong><span class="price-view"><small>R$</small>' +
      Number(imovel.precoAluguel).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) +
      '</span></div>';
  }

  if (imovel.precoVenda) {
    pricesMarkup +=
      '<div class="price"><strong>Venda</strong><span class="price-view"><small>R$</small>' +
      Number(imovel.precoVenda).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) +
      '</span></div>';
  }

  singleAside.innerHTML =
    '<div class="tags flex align-center">' +
    buildTags(imovel) +
    '</div>' +
    pricesMarkup +
    '<div class="others"><span class="flex align-center justify-between"><b>Condomínio</b> <strong>' +
    formatCurrency(imovel.precoCondominio) +
    '</strong></span><span class="flex align-center justify-between"><b>IPTU</b> <strong>' +
    formatCurrency(imovel.precoIptu) +
    '</strong></span></div>' +
    '<div class="bts">' +
    '<span class="whatsapp"><a href="' +
    whatsAppLink +
    '" title="Falar no WhatsApp" target="_blank" rel="noopener noreferrer"><svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.2 0C5.0148 0 0 5.0148 0 11.2C0 13.3011 0.590185 15.2601 1.59688 16.9404L0.10026 22.4L5.67656 20.9362C7.3074 21.8634 9.19006 22.4 11.2 22.4C17.3852 22.4 22.4 17.3852 22.4 11.2C22.4 5.0148 17.3852 0 11.2 0ZM7.36641 5.97552C7.54841 5.97552 7.73541 5.97441 7.89688 5.98281C8.09661 5.98748 8.314 6.00211 8.52214 6.46224C8.76947 7.00917 9.30802 8.38125 9.37708 8.52031C9.44615 8.65938 9.49509 8.82321 9.39896 9.00521C9.30749 9.19188 9.25992 9.30485 9.12552 9.47005C8.98645 9.63059 8.83407 9.82997 8.70807 9.9513C8.56901 10.0904 8.4254 10.2429 8.58594 10.5201C8.74647 10.7973 9.30399 11.706 10.1281 12.4396C11.1875 13.386 12.0812 13.6768 12.3594 13.8159C12.6375 13.955 12.7986 13.9333 12.9591 13.7466C13.1243 13.5646 13.6529 12.9401 13.8396 12.662C14.0216 12.3838 14.2074 12.432 14.4594 12.5234C14.7151 12.6149 16.0789 13.2867 16.357 13.4258C16.6352 13.5648 16.8175 13.6337 16.8875 13.7466C16.9594 13.8633 16.9594 14.4187 16.7289 15.0664C16.4984 15.7132 15.3663 16.3387 14.8586 16.3826C14.3462 16.4302 13.868 16.6129 11.5281 15.6917C8.70573 14.5801 6.92579 11.6893 6.78672 11.5026C6.64765 11.3206 5.65651 9.99965 5.65651 8.63698C5.65651 7.26965 6.37341 6.60001 6.62448 6.32188C6.88021 6.04374 7.17974 5.97552 7.36641 5.97552Z" fill="#ECFBD5"/></svg> WhatsApp</a></span>' +
    '<span class="airbnb"><a href="' +
    (imovel.airBnbLink || '#') +
    '" title="Reservar no AirBnb" target="_blank" rel="noopener noreferrer"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_35_1272)"><path fill-rule="evenodd" clip-rule="evenodd" d="M24.7404 18.4791L24.348 17.5427L23.7488 16.2143L23.7236 16.1891C21.9032 12.2217 19.9865 8.29932 17.9751 4.4253L17.8947 4.2693L17.2756 3.0209C17.0191 2.50999 16.7049 2.03019 16.3392 1.5909C15.9418 1.09016 15.4355 0.686611 14.8587 0.410942C14.282 0.135273 13.65 -0.00526241 13.0108 2.15999e-05C12.3753 0.00218695 11.7479 0.142882 11.1724 0.412303C10.5968 0.681724 10.087 1.07339 9.67828 1.56002C9.32138 2.00582 9.00782 2.48466 8.74188 2.99002L8.03703 4.36924C6.02366 8.27533 4.08016 12.2269 2.28331 16.133L2.25813 16.1834C2.10213 16.6112 1.89575 17.0487 1.6841 17.5175C1.55328 17.8027 1.42247 18.1147 1.29166 18.4539C0.95967 19.3506 0.852545 20.315 0.979659 21.2627C1.11979 22.2145 1.50544 23.1132 2.09863 23.8705C2.69181 24.6279 3.47206 25.2176 4.3625 25.5816C5.03005 25.8622 5.74764 26.0043 6.47175 25.9992C6.69732 25.9953 6.92248 25.9785 7.14613 25.9488C8.06436 25.8318 8.94952 25.5305 9.74856 25.0632C10.9624 24.3394 12.052 23.425 12.9754 22.3551C13.9045 23.4193 14.9931 24.3328 16.2023 25.0632C17.0012 25.5306 17.8864 25.8319 18.8047 25.9488C19.0281 25.9785 19.2536 25.9951 19.4791 25.9992C20.2034 26.0065 20.9213 25.8643 21.5883 25.5816C22.4788 25.2176 23.259 24.6279 23.8522 23.8705C24.4454 23.1132 24.831 22.2145 24.9712 21.2627C25.163 20.3315 25.0809 19.3647 24.7347 18.4791H24.7404ZM13.0103 19.8331C11.6059 18.0611 10.6947 16.4003 10.3827 14.9906C10.2552 14.4719 10.2283 13.9344 10.3023 13.4051C10.3539 13.013 10.4973 12.6389 10.7199 12.3082C10.9804 11.9459 11.3249 11.6522 11.7238 11.4523C12.1227 11.2524 12.5642 11.1523 13.0103 11.1605C13.9187 11.1256 14.7824 11.5562 15.3008 12.3033C15.5242 12.6295 15.6673 13.004 15.7184 13.3961C15.793 13.9249 15.7657 14.4632 15.638 14.9817C15.326 16.3609 14.4192 18.0022 13.0103 19.8242V19.8331ZM23.3949 21.0519C23.1918 22.4076 22.298 23.5568 21.024 24.0724C20.4018 24.3355 19.7223 24.4343 19.0509 24.3592C18.352 24.2729 17.6785 24.0433 17.0724 23.6848C15.9555 23.0105 14.9544 22.1607 14.1076 21.1681C15.824 19.0588 16.8701 17.1409 17.2589 15.4144C17.4283 14.6889 17.4725 13.9398 17.3897 13.1995C17.293 12.5629 17.0517 11.9564 16.6849 11.4274C15.8472 10.2322 14.4696 9.53187 13.0103 9.5599C11.5592 9.54121 10.1902 10.2302 9.34069 11.4071C8.97385 11.9365 8.73253 12.5422 8.63585 13.1792C8.52588 13.9186 8.57042 14.6727 8.76666 15.3941C9.1591 17.1105 10.2263 19.0637 11.9179 21.173C11.077 22.1714 10.0749 23.0221 8.95313 23.6897C8.34718 24.0559 7.67185 24.2925 6.96981 24.3844C6.29888 24.4586 5.61994 24.3689 4.99138 24.1227C3.72103 23.6113 2.81916 22.4624 2.6201 21.1063C2.53772 20.426 2.61878 19.7357 2.85653 19.093C2.93697 18.8313 3.06291 18.5892 3.19372 18.2626C3.37491 17.845 3.58616 17.4013 3.79294 16.9626L3.81813 16.9122C5.61538 13.0366 7.53816 9.07971 9.54625 5.22358L9.62181 5.03752L10.2458 3.83908C10.4484 3.42595 10.7002 3.03883 10.9958 2.68615C11.2524 2.38479 11.5715 2.14277 11.9308 1.9768C12.2902 1.81083 12.6813 1.72487 13.0772 1.72487C13.473 1.72487 13.8641 1.81083 14.2235 1.9768C14.5829 2.14277 14.9019 2.38479 15.1586 2.68615C15.44 3.03737 15.6782 3.42103 15.8683 3.82893L16.4923 5.02737L16.5679 5.18337C18.5463 9.06427 20.4793 13.0159 22.2716 16.8972V16.9224C22.478 17.34 22.6641 17.808 22.8708 18.2224C23.0017 18.5344 23.1325 18.7964 23.208 19.0527C23.4242 19.7006 23.4862 20.39 23.3892 21.0661L23.3949 21.0519Z" fill="white"/></g><defs><clipPath id="clip0_35_1272"><rect width="26" height="26" fill="white"/></clipPath></defs></svg> Reservar no AirBnb</a></span>' +
    '<span class="booking"><a href="' +
    (imovel.bookingLink || '#') +
    '" title="Reservar no Booking" target="_blank" rel="noopener noreferrer"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_35_1282)"><path d="M9.53259 21.6082H5.16644V16.3859C5.16644 15.273 5.59449 14.6737 6.55333 14.5539H9.54971C10.0213 14.5148 10.4957 14.5791 10.9399 14.7422C11.3841 14.9053 11.7873 15.1634 12.1215 15.4984C12.4557 15.8334 12.7127 16.2373 12.8748 16.6819C13.0369 17.1264 13.1 17.601 13.0598 18.0725C13.0598 20.2984 11.7157 21.6253 9.54971 21.6253L9.53259 21.6082ZM5.15787 7.49098V6.1212C5.15787 4.92265 5.67154 4.3405 6.78448 4.27201H9.02748C10.9452 4.27201 12.1095 5.4192 12.1095 7.354C12.1095 8.80938 11.3219 10.5216 9.11309 10.5216H5.175L5.15787 7.49098ZM15.123 12.7132L14.3354 12.2681L15.0202 11.6688C15.825 10.9839 17.1605 9.42578 17.1605 6.74616C17.1605 2.63684 13.9758 -0.0170898 9.05317 -0.0170898H2.80358C2.09787 0.00715589 1.42878 0.302957 0.935896 0.808601C0.443013 1.31425 0.164407 1.99068 0.158203 2.69677V25.9829H9.16446C14.6436 25.9829 18.1707 23.0037 18.1707 18.3807C18.1707 15.898 17.0321 13.7577 15.1059 12.6876" fill="white"/><path d="M19.5918 22.8581C19.5918 21.1202 20.9873 19.7162 22.7166 19.7162C24.4459 19.7162 25.8585 21.1202 25.8585 22.8581C25.8585 24.596 24.4545 26 22.7166 26C20.9787 26 19.5918 24.596 19.5918 22.8581Z" fill="#499FDD"/></g><defs><clipPath id="clip0_35_1282"><rect width="26" height="26" fill="white"/></clipPath></defs></svg> Reservar no Booking</a></span>' +
    '<p>Você será apenas redirecionado</p>' +
    '</div>';

  topCategory.parentElement.style.display = imovel.categoria ? '' : 'none';
  heading.style.display = imovel.nome ? '' : 'none';
  address.style.display = [imovel.endereco, imovel.bairro, imovel.cidade].some(Boolean) ? '' : 'none';
  proximity.style.display = imovel.referenciaDoLocal ? '' : 'none';
  info.style.display = [imovel.metragem, imovel.banheiro, imovel.quarto, imovel.vaga].some(Boolean) ? '' : 'none';
  about.style.display = paragraphs.length ? '' : 'none';
  featured.style.display = (imovel.caracteristicas || []).length ? '' : 'none';
  videoContainer.style.display = videoEmbed ? '' : 'none';
  singleAside.style.display =
    buildTags(imovel) ||
    pricesMarkup ||
    whatsAppLink ||
    imovel.precoCondominio ||
    imovel.precoIptu ||
    imovel.airBnbLink ||
    imovel.bookingLink
      ? ''
      : 'none';

  var airbnbButton = singleAside.querySelector('.airbnb');
  var bookingButton = singleAside.querySelector('.booking');
  var redirectNotice = singleAside.querySelector('.bts p');
  var othersBlock = singleAside.querySelector('.others');

  if (airbnbButton) {
    airbnbButton.style.display = imovel.airBnbLink ? '' : 'none';
  }

  if (bookingButton) {
    bookingButton.style.display = imovel.bookingLink ? '' : 'none';
  }

  if (redirectNotice) {
    redirectNotice.style.display = imovel.airBnbLink || imovel.bookingLink ? '' : 'none';
  }

  if (othersBlock) {
    othersBlock.style.display = imovel.precoCondominio || imovel.precoIptu ? '' : 'none';
  }

  var mapButton = document.querySelector('a[title="Ver mapa"]');
  var photosButton = document.querySelector('[data-open-gallery]');
  var gallery = document.querySelector('#gallery');
  var mapMarkup = buildMapContent(imovel.mapa);

  if (gallery && mapMarkup && !gallery.querySelector('.gallery-map')) {
    gallery.insertAdjacentHTML(
      'beforeend',
      '<div class="gallery-map"><button type="button" class="gallery-map__close" aria-label="Fechar mapa"><span class="hidden">Fechar mapa</span></button>' +
        mapMarkup +
        '</div>',
    );
  }

  if (mapButton && gallery) {
    mapButton.href = '#gallery';
    mapButton.innerHTML = mapButtonLabel(false);

    function setMapState(isOpen) {
      gallery.classList.toggle('is-map-view', isOpen);
      mapButton.innerHTML = mapButtonLabel(isOpen);
    }

    mapButton.addEventListener('click', function (event) {
      event.preventDefault();

      if (!mapMarkup) {
        return;
      }

      setMapState(!gallery.classList.contains('is-map-view'));
    });

    var closeMapButton = gallery.querySelector('.gallery-map__close');

    if (closeMapButton) {
      closeMapButton.addEventListener('click', function () {
        setMapState(false);
      });
    }

    setMapState(false);
  }

  if (photosButton && gallery) {
    photosButton.addEventListener('click', function () {
      gallery.classList.remove('is-map-view');
      if (mapButton) {
        mapButton.innerHTML = mapButtonLabel(false);
      }
    });
  }

  var moreLink = document.querySelector('#single article .more .left a');

  if (moreLink) {
    moreLink.href = '/contato/';
  }
}

var PAGE_RENDERERS = {
  home: renderHome,
  properties: renderProperties,
  property: renderProperty,
  about: function (data) {
    populateFooterCollections(data && data.footerImovels ? data.footerImovels : []);
  },
  consulting: function (data) {
    populateFooterCollections(data && data.footerImovels ? data.footerImovels : []);
  },
  contact: function (data) {
    populateFooterCollections(data && data.footerImovels ? data.footerImovels : []);
  },
};

export function renderPage(pageName, payload) {
  var renderer = PAGE_RENDERERS[pageName];

  if (renderer) {
    renderer(payload);
    document.dispatchEvent(new CustomEvent('megli:content-updated'));
  }
}
