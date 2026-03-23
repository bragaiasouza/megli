import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import { SiteFooter, SiteHeader, SiteSidebar } from './components/SiteShell.jsx';
import { initDomApp } from './main.js';

import HomePage from './pages/HomePage.jsx';
import PropertiesPage from './pages/PropertiesPage.jsx';
import PropertiesBuyPage from './pages/PropertiesBuyPage.jsx';
import PropertiesRentPage from './pages/PropertiesRentPage.jsx';
import PropertiesSeasonPage from './pages/PropertiesSeasonPage.jsx';
import PropertyPage from './pages/PropertyPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ConsultingPage from './pages/ConsultingPage.jsx';
import ContactPage from './pages/ContactPage.jsx';

var PAGE_COMPONENTS = {
  home: HomePage,
  properties: PropertiesPage,
  propertiesComprar: PropertiesBuyPage,
  propertiesAlugar: PropertiesRentPage,
  propertiesTemporada: PropertiesSeasonPage,
  property: PropertyPage,
  about: AboutPage,
  consulting: ConsultingPage,
  contact: ContactPage,
};

var PAGE_TITLES = {
  home: 'Megli Negócios Imobiliários | Compra, Aluguel e Short Stay',
  properties: 'Imóveis | Megli Negócios Imobiliários',
  propertiesComprar: 'Imóveis para Comprar | Megli Negócios Imobiliários',
  propertiesAlugar: 'Imóveis para Alugar | Megli Negócios Imobiliários',
  propertiesTemporada: 'Locação por Temporada | Megli Negócios Imobiliários',
  property: 'Imóvel | Megli Negócios Imobiliários',
  about: 'Sobre a Megli | Megli Negócios Imobiliários',
  consulting: 'Consultoria Imobiliária | Megli Negócios Imobiliários',
  contact: 'Contato | Megli Negócios Imobiliários',
};

function PageContent() {
  var appPage = document.body.dataset.appPage || document.body.dataset.page || 'home';
  var Component = PAGE_COMPONENTS[appPage] || HomePage;

  useEffect(function () {
    document.title = PAGE_TITLES[appPage] || 'Megli Negócios Imobiliários';
  }, [appPage]);

  return (
    <div id="page-content">
      <Component />
    </div>
  );
}

function App() {
  useEffect(function () {
    initDomApp();
  }, []);

  return (
    <>
      <SiteHeader />
      <PageContent />
      <SiteFooter />
      <SiteSidebar />
    </>
  );
}

var container = document.getElementById('root');

if (container) {
  createRoot(container).render(<App />);
}
