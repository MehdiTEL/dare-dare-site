/* ============================================
   AGENCE DARE-DARE · Script JS v4
   Contenu enrichi + identité marocaine
   ============================================ */

// ---------- Event Data ----------
// Exposed on window for i18n access
const eventData = window.eventData = {
  soiree: {
    heroTitle: "On ne fait pas des soirées. On crée des souvenirs.",
    heroSubtitle: "Du brief au dernier verre. On orchestre chaque détail pour que vous n'ayez qu'à profiter.",
    heroImage: "photos/moet-chandon.webp",
    services: [
      { icon: "palette", title: "Pilotage & coordination", desc: "Un seul chef de projet, un seul interlocuteur, de la première idée au dernier applaudissement.", features: ["Brief, cadrage, budget : tout est posé dès le départ", "Rétro-planning serré, suivi sans relâche", "Coordination de chaque prestataire", "Pilotage du jour J, minute par minute", "Débriefing & recommandations post-event"] },
      { icon: "settings", title: "Production & logistique", desc: "Lieu, traiteur, technique, mobilier : on verrouille chaque maillon pour que rien ne bouge.", features: ["Sourcing & négociation des lieux", "Régie son, lumière & vidéo", "Traiteur, bar & expérience F&B", "Mobilier, habillage & signalétique", "Sécurité, assurances & conformité"] },
      { icon: "music", title: "Scénographie & temps forts", desc: "DJ, artistes, scénographie : on crée les instants dont vos invités parleront encore dans six mois.", features: ["Booking artistes, DJ & performers", "Scénarisation des temps forts", "Photobooth & dispositif contenu", "Accueil VIP & gestion des flux", "Maître de cérémonie & ambiance sur-mesure"] }
    ],
    recommendedDest: "paris",
    testimonialIndex: 0,
    bio: "Du Fnac Live à la soirée privée Longchamp, en passant par le Moulin Rouge, Dare-Dare orchestre des soirées où l'exigence se fait oublier et l'expérience reste. Grand public ou ultra-VIP, chaque format est maîtrisé."
  },
  seminaire: {
    heroTitle: "Vos équipes méritent mieux qu'une salle de réunion.",
    heroSubtitle: "On conçoit des séminaires qui rassemblent, transforment et marquent les esprits, dare-dare.",
    heroImage: "photos/bnp-reims-champagne-1.webp",
    services: [
      { icon: "clipboard", title: "Conception & programme", desc: "On ne remplit pas un agenda : on construit une expérience collective qui a du sens.", features: ["Cadrage des objectifs & brief stratégique", "Programme sur-mesure : plénières, ateliers, off", "Sélection de speakers & intervenants", "Scénarisation des temps forts", "Équilibre entre contenu et convivialité"] },
      { icon: "building", title: "Logistique & coordination", desc: "Hôtel, transferts, restauration, rooming : on gère tout, vous ne gérez rien.", features: ["Sourcing hôtels & domaines privatisés", "Transferts groupe & logistique terrain", "Restauration & expériences culinaires", "Rooming list & gestion des chambres", "Coordination multi-sites & multi-jours"] },
      { icon: "trophy", title: "Team building & incentive", desc: "Rallye, ateliers, outdoor : des moments partagés qui marquent plus qu'un PowerPoint.", features: ["Team building sportif & outdoor", "Rallye, défis d'équipe & chasses au trésor", "Ateliers créatifs & gastronomiques", "Soirée de gala & remise de prix", "Expériences bien-être & déconnexion"] }
    ],
    recommendedDest: "maroc",
    testimonialIndex: 1,
    bio: "De 150 à 900 personnes, en France comme au Maroc, Dare-Dare conçoit des séminaires où logistique, programmation et cohésion d'équipe s'articulent sans faille. Chaque brief devient une expérience collective mémorable."
  },
  influence: {
    heroTitle: "On crée des moments que vos créateurs voudront poster.",
    heroSubtitle: "Des événements pensés pour le contenu : photogéniques, immersifs, parfaitement orchestrés.",
    heroImage: "photos/samsung-influences-molitor-5.webp",
    services: [
      { icon: "camera", title: "Concept & set-up", desc: "Chaque angle est pensé pour la photo, chaque espace raconte votre marque.", features: ["Concept créatif & direction visuelle", "Photocalls & corners instagrammables", "Éclairage pensé pour le contenu", "Parcours invité scénographié", "Brand experience & storytelling spatial"] },
      { icon: "users", title: "Gestion de projet & guests", desc: "Guest list, accueil, gifting, flux : chaque créateur est un VIP, pas un numéro.", features: ["Stratégie d'invitation & guest list ciblée", "Accueil VIP personnalisé", "Gifting & kits créateurs sur-mesure", "Gestion des flux & espaces privés", "Brief créateurs & guidelines contenu"] },
      { icon: "sparkles", title: "Contenu & retombées", desc: "On crée les conditions pour que le contenu se fasse tout seul, et qu'il performe.", features: ["Activités exclusives & instants partageables", "Masterclass & ateliers de marque", "Expériences sensorielles & immersives", "Live content & stories real-time", "Suivi retombées & reporting social media"] }
    ],
    recommendedDest: "cannes",
    testimonialIndex: 0,
    bio: "Chanel, Dior, Mugler, Longchamp : Dare-Dare évolue dans l'univers des marques qui font rêver les créateurs de contenu. Chaque angle est pensé, chaque moment est partageable, avec une exécution irréprochable en coulisses."
  },
  presse: {
    heroTitle: "Un voyage presse, c'est une histoire qu'on écrit ensemble.",
    heroSubtitle: "On orchestre des expériences éditoriales où votre marque prend vie, jour après jour.",
    heroImage: "photos/dior-2.webp",
    services: [
      { icon: "map", title: "Itinéraire & storytelling", desc: "On ne planifie pas un voyage : on écrit un scénario éditorial jour par jour.", features: ["Itinéraire éditorial sur-mesure", "Immersions culturelles & accès exclusifs", "Temps forts calibrés pour les retombées", "Storytelling de marque intégré au parcours", "Programmation multi-jours cohérente"] },
      { icon: "plane", title: "Logistique multi-destinations", desc: "Vols, transferts, hôtels, restaurants : on gère la logistique pour que vos invités ne pensent qu'à écrire.", features: ["Réservation vols & billets", "Transferts privés & logistique terrain", "Hébergement premium & rooming", "Restauration & expériences culinaires", "Coordination inter-destinations fluide"] },
      { icon: "mail", title: "Suivi médias & retombées", desc: "Chaque journaliste est un projet, de l'invitation au follow-up post-trip.", features: ["Accueil personnalisé de chaque invité", "Dossiers de presse & kits médias", "Gestion des demandes spéciales", "Relances rédactionnelles ciblées", "Reporting complet des retombées"] }
    ],
    recommendedDest: "maroc",
    testimonialIndex: 1,
    bio: "De Venise pour Bottega Veneta à des activations multi-sites pour Samsung, Dare-Dare excelle dans la coordination complexe. Multi-jours, multi-lieux : chaque participant vit une expérience éditoriale forte."
  },
  lancement: {
    heroTitle: "Votre produit mérite mieux qu'un communiqué de presse.",
    heroSubtitle: "On crée l'événement qui fera parler de votre marque, dare-dare.",
    heroImage: "photos/samsung-showcase-theodort-1.webp",
    services: [
      { icon: "eye", title: "Concept & mise en scène", desc: "Votre produit mérite un moment : on crée le décor, le parcours et le reveal qui vont avec.", features: ["Concept créatif & direction de projet", "Parcours scénographique immersif", "Mise en lumière produit & reveal", "Décor sur-mesure & habillage spatial", "Vidéo projection & mapping"] },
      { icon: "zap", title: "Production & régie technique", desc: "Son, lumière, vidéo : une machine de guerre technique invisible, au service de l'émotion.", features: ["Régie son & lumière professionnelle", "Captation vidéo multi-caméras", "Effets spéciaux & pyrotechnie", "Streaming & diffusion en direct", "Coordination technique minute par minute"] },
      { icon: "star", title: "Accueil & guest management", desc: "Guest list, accueil VIP, parcours invité : chaque personne qui entre doit sentir qu'on l'attendait.", features: ["Guest list & stratégie d'invitation", "Accueil premium & parcours VIP", "Signalétique & branding sur site", "Vestiaire, badges & accréditations", "Conciergerie événementielle sur-mesure"] }
    ],
    recommendedDest: "paris",
    testimonialIndex: 0,
    bio: "Samsung aux Forum des Halles devant 1 500 personnes, deux activations aux 20 km de Paris, Paris Blockchain Week au Carrousel du Louvre : Dare-Dare crée des lancements spectaculaires dans des lieux emblématiques."
  }
};

const testimonials = window.testimonials = [
  {
    text: "L'équipe Dare-Dare allie rigueur et créativité avec une aisance rare. Sur chacun de nos événements grand public, leur maîtrise logistique nous a permis d'avancer en toute sérénité. C'est naturellement que nous leur confions nos prochains projets.",
    author: "Luminart"
  },
  {
    text: "Depuis plus d'un an, Dare-Dare gère l'intégralité de notre logistique événementielle. Réactivité, professionnalisme, fiabilité : un partenaire sur lequel on peut compter les yeux fermés.",
    author: "Tgod Events"
  },
  {
    text: "On leur a confié un événement à Marrakech avec 3 semaines de délai. Tout était parfait, du transfert aéroport au dîner sous les étoiles. L'agilité de cette équipe est impressionnante.",
    author: "Directrice communication · Secteur luxe"
  },
  {
    text: "Dare-Dare a produit notre activation en marge des 20 km de Paris : deux sites en simultané, coordination sans faille, espace VIP impeccable. On repart avec eux l'année prochaine.",
    author: "Chef de projet · Secteur tech"
  },
  {
    text: "Ce qui les distingue, c'est leur capacité à comprendre l'ADN d'une marque et à le traduire dans chaque détail de l'événement. Pas un prestataire : un vrai partenaire créatif.",
    author: "Responsable événementiel · Maison de mode"
  }
];

// SVG Icons
const icons = {
  palette: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="0.5" fill="currentColor"/><circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"/><circle cx="8.5" cy="7.5" r="0.5" fill="currentColor"/><circle cx="6.5" cy="12.5" r="0.5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  music: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
  clipboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>`,
  building: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>`,
  trophy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`,
  camera: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  sparkles: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`,
  map: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>`,
  plane: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  eye: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  zap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
};

// 8-branch star SVG
const star8SVG = `<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12,0 14,8.5 10,8.5"/><polygon points="12,24 14,15.5 10,15.5"/><polygon points="0,12 8.5,10 8.5,14"/><polygon points="24,12 15.5,10 15.5,14"/><polygon points="3.5,3.5 9.5,9 10.5,8"/><polygon points="20.5,20.5 14.5,15 13.5,16"/><polygon points="20.5,3.5 15,9.5 16,10.5"/><polygon points="3.5,20.5 9,14.5 8,13.5"/></svg>`;

// ---------- DOM Ready ----------
document.addEventListener('DOMContentLoaded', () => {
  let currentType = 'soiree';
  window.currentType = currentType;
  let currentTestimonialIndex = 0;

  const nav = document.querySelector('.nav');
  const heroTabs = document.querySelectorAll('.hero__tab');
  const heroStarsContainer = document.querySelector('.hero__stars');
  const heroTitle = document.getElementById('hero-title');
  const heroSubtitle = document.getElementById('hero-subtitle');
  const servicesGrid = document.getElementById('services-grid');
  const destBadges = document.querySelectorAll('.dest-card__badge');
  const testimonialSlides = document.querySelectorAll('.temoignage-slide');
  const testimonialDots = document.querySelectorAll('.temoignages__dot');
  const bioDynamic = document.getElementById('bio-dynamic');
  const eventTypeSelect = document.getElementById('event-type-select');
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const faqItems = document.querySelectorAll('.faq-item');
  const contactForm = document.getElementById('contact-form');
  /* FIX: supprimé formSuccess, sélecteur mort, le vrai élément est successEl */

  // Generate floating stars in hero
  function createFloatingStars() {
    if (!heroStarsContainer) return;
    const starSVG = '<svg viewBox="0 0 32 32" fill="currentColor"><polygon points="16,1 18,11 14,11"/><polygon points="16,31 18,21 14,21"/><polygon points="1,16 11,14 11,18"/><polygon points="31,16 21,14 21,18"/><polygon points="4.5,4.5 12,12 13.5,10.5"/><polygon points="27.5,27.5 20,20 18.5,21.5"/><polygon points="27.5,4.5 20,12 21.5,10.5"/><polygon points="4.5,27.5 12,20 10.5,21.5"/></svg>';
    for (let i = 0; i < 15; i++) {
      const star = document.createElement('div');
      star.className = 'hero__star-float';
      star.innerHTML = starSVG;
      const size = 16 + Math.random() * 40;
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      star.style.left = (Math.random() * 100) + '%';
      star.style.top = (Math.random() * 100) + '%';
      star.style.animationDelay = (Math.random() * 8) + 's';
      star.style.animationDuration = (6 + Math.random() * 6) + 's';
      heroStarsContainer.appendChild(star);
    }
  }
  createFloatingStars();

  // Navigation scroll
  function updateNav() {
    if (window.scrollY > 80) {
      nav.classList.remove('nav--transparent');
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
      nav.classList.add('nav--transparent');
    }
  }
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  // Switch Event Type
  function switchEventType(type) {
    if (!eventData[type]) return;
    const data = eventData[type];
    currentType = type;
    window.currentType = type;

    heroTabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.type === type);
      tab.setAttribute('aria-selected', tab.dataset.type === type ? 'true' : 'false');
    });

    heroTitle.style.opacity = '0';
    heroSubtitle.style.opacity = '0';
    setTimeout(() => {
      heroTitle.textContent = data.heroTitle;
      heroSubtitle.textContent = data.heroSubtitle;
      heroTitle.style.opacity = '1';
      heroSubtitle.style.opacity = '1';
    }, 300);

    updateServices(data.services);

    /* FIX: destBadges référence .dest-card__badge qui n'existe plus dans le HTML */
    if (destBadges.length) {
      destBadges.forEach(badge => {
        badge.classList.toggle('visible', badge.dataset.dest === data.recommendedDest);
      });
    }

    showTestimonial(data.testimonialIndex);

    bioDynamic.style.opacity = '0';
    setTimeout(() => {
      bioDynamic.textContent = data.bio;
      bioDynamic.style.opacity = '1';
    }, 300);

    if (eventTypeSelect) {
      const typeLabels = {
        soiree: "Soirée d'entreprise",
        seminaire: "Séminaire & incentive",
        influence: "Événement influence",
        presse: "Voyage presse",
        lancement: "Lancement produit"
      };
      eventTypeSelect.value = typeLabels[type] || '';
    }
  }

  function updateServices(services) {
    const cards = servicesGrid.querySelectorAll('.service-card');
    cards.forEach((card, i) => {
      if (!services[i]) return;
      card.style.opacity = '0';
      card.style.transform = 'translateY(8px)';
      card.classList.remove('expanded');
      const toggle = card.querySelector('.service-card__toggle');
      if (toggle) { toggle.setAttribute('aria-expanded', 'false'); toggle.querySelector('.service-card__toggle-icon').textContent = '+'; }
      setTimeout(() => {
        card.querySelector('.service-card__icon').innerHTML = icons[services[i].icon] || '';
        card.querySelector('.service-card__title').textContent = services[i].title;
        card.querySelector('.service-card__desc').textContent = services[i].desc;
        const featuresList = card.querySelector('.service-card__features');
        if (featuresList && services[i].features) {
          featuresList.innerHTML = services[i].features.map(f => `<li>${f}</li>`).join('');
        }
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 200 + i * 100);
    });
  }

  // Service card toggle
  servicesGrid.addEventListener('click', (e) => {
    const toggle = e.target.closest('.service-card__toggle');
    if (!toggle) return;
    const card = toggle.closest('.service-card');
    const isExpanded = card.classList.contains('expanded');
    // Close all others
    servicesGrid.querySelectorAll('.service-card.expanded').forEach(c => {
      c.classList.remove('expanded');
      c.querySelector('.service-card__toggle').setAttribute('aria-expanded', 'false');
      c.querySelector('.service-card__toggle-icon').textContent = '+';
    });
    if (!isExpanded) {
      card.classList.add('expanded');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.querySelector('.service-card__toggle-icon').textContent = '−';
    }
  });

  /* FIX: références mortes, éléments supprimés du HTML, bloc conservé par sécurité */
  const marocCard = document.querySelector('.dest-card--maroc');
  const marocPanel = document.getElementById('maroc-panel');
  if (marocCard && marocPanel) {
    marocCard.style.cursor = 'pointer';
    marocCard.addEventListener('click', () => marocPanel.classList.add('active'));
    marocPanel.querySelector('.maroc-panel__close').addEventListener('click', () => marocPanel.classList.remove('active'));
  }

  function showTestimonial(index) {
    currentTestimonialIndex = index;
    testimonialSlides.forEach((slide, i) => slide.classList.toggle('active', i === index));
    testimonialDots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  }

  window.switchEventType = switchEventType;
  heroTabs.forEach(tab => tab.addEventListener('click', () => switchEventType(tab.dataset.type)));

  document.querySelector('.temoignages__nav-btn--prev')?.addEventListener('click', () => {
    showTestimonial((currentTestimonialIndex - 1 + testimonials.length) % testimonials.length);
  });
  document.querySelector('.temoignages__nav-btn--next')?.addEventListener('click', () => {
    showTestimonial((currentTestimonialIndex + 1) % testimonials.length);
  });
  testimonialDots.forEach((dot, i) => dot.addEventListener('click', () => showTestimonial(i)));

  /* UX: auto-rotation des témoignages, 6 secondes, pause au hover */
  let autoPlayInterval = null;
  const sliderEl = document.querySelector('.temoignages__slider');

  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      showTestimonial((currentTestimonialIndex + 1) % testimonials.length);
    }, 6000);
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }

  startAutoPlay();

  if (sliderEl) {
    sliderEl.addEventListener('mouseenter', stopAutoPlay);
    sliderEl.addEventListener('mouseleave', startAutoPlay);
  }

  // Réinitialiser le timer après un clic manuel (prev/next/dot)
  const resetAutoPlay = () => { stopAutoPlay(); startAutoPlay(); };
  document.querySelector('.temoignages__nav-btn--prev')?.addEventListener('click', resetAutoPlay);
  document.querySelector('.temoignages__nav-btn--next')?.addEventListener('click', resetAutoPlay);
  document.querySelectorAll('.temoignages__dot').forEach(dot => dot.addEventListener('click', resetAutoPlay));

  // Hamburger Menu
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });
  document.querySelectorAll('.mobile-menu__link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // FAQ Accordion
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-item__question');
    const answer = item.querySelector('.faq-item__answer');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      /* FIX: reset aria-expanded on all items */
      faqItems.forEach(fi => {
        fi.classList.remove('open');
        fi.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
        fi.querySelector('.faq-item__answer').style.maxHeight = '0';
      });
      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Contact Form, handled by multi-step logic below

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 70;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
      }
    });
  });

  // Scroll Reveal
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* UX: mise en surbrillance du lien nav correspondant à la section visible */
  const navLinksAll = document.querySelectorAll('.nav__link');
  const allSections = document.querySelectorAll('section[id]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinksAll.forEach(link => {
          link.classList.remove('is-active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('is-active');
          }
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-70px 0px 0px 0px' });

  allSections.forEach(section => sectionObserver.observe(section));

  // Counter Animation
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animateCounter(entry.target); counterObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1500;
    const start = performance.now();
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // Init
  switchEventType('soiree');

  // ---------- Multi-step Contact Form ----------
  const formEl = document.getElementById('contact-form');
  const panels = document.querySelectorAll('.contact__step-panel');
  const dots = document.querySelectorAll('.contact__step-dot');
  const progressFill = document.getElementById('progress-fill');
  const prevBtn = document.getElementById('form-prev');
  const nextBtn = document.getElementById('form-next');
  const submitBtn = document.getElementById('form-submit');
  const successEl = document.getElementById('contact-success');
  const guestRange = document.getElementById('guest-count');
  const guestOutput = document.getElementById('guest-output');
  let currentStep = 1;
  const totalSteps = 4;

  function goToStep(step) {
    if (step < 1 || step > totalSteps) return;
    currentStep = step;
    panels.forEach(p => p.classList.remove('active'));
    const target = document.querySelector(`[data-panel="${step}"]`);
    if (target) target.classList.add('active');

    dots.forEach(d => {
      const s = parseInt(d.dataset.step);
      d.classList.remove('active', 'done');
      if (s === step) d.classList.add('active');
      else if (s < step) d.classList.add('done');
    });

    if (progressFill) progressFill.style.width = (step / totalSteps * 100) + '%';
    if (prevBtn) prevBtn.disabled = step === 1;
    if (nextBtn) nextBtn.style.display = step === totalSteps ? 'none' : '';
    if (submitBtn) submitBtn.style.display = step === totalSteps ? '' : 'none';
  }

  // Auto-advance on card selection (step 1)
  document.querySelectorAll('.contact__card input').forEach(input => {
    input.addEventListener('change', () => {
      setTimeout(() => goToStep(2), 400);
    });
  });

  if (prevBtn) prevBtn.addEventListener('click', () => goToStep(currentStep - 1));
  /* UX: validation avant transition d'étape */
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      let canProceed = true;

      if (currentStep === 1) {
        const selected = document.querySelector('.contact__card input:checked');
        if (!selected) {
          canProceed = false;
          const cards = document.querySelector('.contact__cards');
          if (cards) {
            cards.classList.add('contact__shake');
            setTimeout(() => cards.classList.remove('contact__shake'), 500);
          }
        }
      }

      if (canProceed) goToStep(currentStep + 1);
    });
  }

  // Step dot navigation
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const s = parseInt(dot.dataset.step);
      if (s <= currentStep) goToStep(s);
    });
  });

  // Guest range slider with dynamic mood
  const guestMood = document.getElementById('guest-mood');
  function updateGuestMood(val) {
    const v = parseInt(val);
    let text, display;
    if (v <= 30) { display = v; text = 'Un écrin intime : chaque détail compte.'; }
    else if (v <= 80) { display = v; text = 'L\'élégance d\'un événement à taille humaine.'; }
    else if (v <= 150) { display = v; text = 'Assez pour impressionner, assez pour se souvenir de chacun.'; }
    else if (v <= 300) { display = v; text = 'On passe en mode production, et on adore ça.'; }
    else if (v <= 500) { display = v; text = 'Du grand spectacle. On sort l\'artillerie.'; }
    else if (v <= 800) { display = v; text = 'Un festival à votre nom. On gère.'; }
    else { display = v + '+'; text = 'Vous voyez en grand ? Nous aussi. Dare-dare.'; }
    if (guestOutput) guestOutput.textContent = display;
    if (guestMood) guestMood.textContent = text;
  }
  if (guestRange) {
    guestRange.addEventListener('input', () => updateGuestMood(guestRange.value));
    updateGuestMood(guestRange.value);
  }

  /* FIX: vrai envoi du formulaire via Formspree + validation */
  if (formEl) {
    formEl.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitButton = document.getElementById('form-submit');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Envoi en cours...';
      }

      /* UX: validation step 4 avant envoi */
      document.querySelectorAll('.contact__error').forEach(el => el.classList.remove('visible'));
      document.querySelectorAll('.has-error').forEach(el => el.classList.remove('has-error'));

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      let hasError = false;

      if (!nameInput || !nameInput.value.trim()) {
        if (nameInput) nameInput.classList.add('has-error');
        const errName = document.getElementById('error-name');
        if (errName) errName.classList.add('visible');
        hasError = true;
      }

      if (!emailInput || !emailInput.value.trim() || !emailInput.value.includes('@')) {
        if (emailInput) emailInput.classList.add('has-error');
        const errEmail = document.getElementById('error-email');
        if (errEmail) errEmail.classList.add('visible');
        hasError = true;
      }

      if (hasError) {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = 'Envoyer dare-dare';
        }
        return;
      }
      try {
        const response = await fetch(formEl.action, {
          method: 'POST',
          body: new FormData(formEl),
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          formEl.style.display = 'none';
          document.querySelector('.contact__progress').style.display = 'none';
          if (successEl) successEl.classList.add('visible');
        } else {
          throw new Error('Erreur serveur');
        }
      } catch (error) {
        alert('Une erreur est survenue. Contactez-nous directement à eva.dahan.production@gmail.com');
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = 'Envoyer dare-dare';
        }
      }
    });

    /* UX: effacer l'erreur quand l'utilisateur tape dans un champ */
    document.querySelectorAll('#contact-name, #contact-email').forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('has-error');
        const errorSpan = input.parentElement.querySelector('.contact__error');
        if (errorSpan) errorSpan.classList.remove('visible');
      });
    });
  }

  // ---------- PORTFOLIO · Filters, Show More, Mobile Tap ----------
  const portfolioCards = document.querySelectorAll('.portfolio__card');
  const filterBtns = document.querySelectorAll('.portfolio__filter');
  const showMoreBtn = document.getElementById('portfolioShowMore');

  // Filters
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const filter = btn.dataset.filter;

      portfolioCards.forEach(card => {
        const tags = card.dataset.tags || '';
        const isHidden = card.classList.contains('portfolio__card--hidden');
        // If card is in the "hidden" batch and not yet revealed, skip unless showMore was clicked
        if (filter === 'all') {
          if (!isHidden || card.dataset.visible === 'true') {
            card.style.display = '';
          }
        } else {
          if (tags.includes(filter)) {
            card.style.display = '';
            card.dataset.visible = 'true';
          } else {
            card.style.display = 'none';
          }
        }
      });

      // When filtering, show all matching cards (including hidden ones)
      if (filter !== 'all') {
        portfolioCards.forEach(card => {
          const tags = card.dataset.tags || '';
          if (tags.includes(filter)) {
            card.style.display = '';
            card.classList.add('portfolio__card--revealing');
            card.dataset.visible = 'true';
          }
        });
        if (showMoreBtn) showMoreBtn.classList.add('is-hidden');
      } else {
        // Reset to default visibility
        portfolioCards.forEach(card => {
          if (card.classList.contains('portfolio__card--hidden') && !card.classList.contains('portfolio__card--revealed')) {
            card.style.display = 'none';
            card.dataset.visible = 'false';
          } else {
            card.style.display = '';
          }
        });
        // Show the "more" button only if there are still hidden cards
        const hasHidden = document.querySelectorAll('.portfolio__card--hidden:not(.portfolio__card--revealed)');
        if (showMoreBtn) {
          showMoreBtn.classList.toggle('is-hidden', hasHidden.length === 0);
        }
      }
    });
  });

  // Show More
  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
      const hiddenCards = document.querySelectorAll('.portfolio__card--hidden:not(.portfolio__card--revealed)');
      hiddenCards.forEach((card, i) => {
        card.dataset.visible = 'true';
        card.classList.add('portfolio__card--revealed', 'portfolio__card--revealing');
        card.style.display = '';
        card.style.animationDelay = `${i * 0.1}s`;
      });
      showMoreBtn.classList.add('is-hidden');
    });
  }

  // Mobile tap toggle
  if ('ontouchstart' in window) {
    portfolioCards.forEach(card => {
      card.addEventListener('click', (e) => {
        const wasTapped = card.classList.contains('is-tapped');
        // Close all others
        portfolioCards.forEach(c => c.classList.remove('is-tapped'));
        if (!wasTapped) card.classList.add('is-tapped');
      });
    });

    /* UX: tap-to-reveal pour les destinations sur mobile */
    const destItems = document.querySelectorAll('.dest-showcase__item');
    destItems.forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        const wasTapped = item.classList.contains('is-tapped');
        destItems.forEach(d => d.classList.remove('is-tapped'));
        if (!wasTapped) item.classList.add('is-tapped');
      });
    });
  }

  /* UX: bouton retour en haut, apparaît après 600px de scroll */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* WHATSAPP: logique d'apparition du bouton flottant */
  const whatsappBtn = document.getElementById('whatsappFloat');
  const contactSection = document.getElementById('contact');

  if (whatsappBtn) {
    let whatsappVisible = false;
    let pulseDone = false;
    let pulseTimer = null;

    /* Apparition : après 3 secondes OU 300px de scroll (le premier des deux) */
    function showWhatsApp() {
      if (whatsappVisible) return;
      whatsappVisible = true;
      whatsappBtn.classList.add('visible');

      /* Pulse unique après 8 secondes pour attirer l'attention une seule fois */
      if (!pulseDone) {
        pulseTimer = setTimeout(() => {
          whatsappBtn.classList.add('pulse');
          pulseDone = true;
          /* Retirer la classe après l'animation pour ne pas la rejouer */
          whatsappBtn.addEventListener('animationend', () => {
            whatsappBtn.classList.remove('pulse');
          }, { once: true });
        }, 8000);
      }
    }

    /* Timer de 3 secondes */
    setTimeout(showWhatsApp, 3000);

    /* Scroll de 300px */
    function checkScrollWhatsApp() {
      if (window.scrollY > 300) {
        showWhatsApp();
      }
    }
    window.addEventListener('scroll', checkScrollWhatsApp, { passive: true });

    /* Masquer quand le visiteur est dans la section contact */
    if (contactSection) {
      const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            whatsappBtn.classList.add('hidden-in-contact');
          } else {
            whatsappBtn.classList.remove('hidden-in-contact');
          }
        });
      }, { threshold: 0.2 });
      contactObserver.observe(contactSection);
    }

    /* WHATSAPP: log du clic, remplacer par Google Analytics quand disponible */
    whatsappBtn.addEventListener('click', () => {
      console.log('[Dare-Dare] WhatsApp click, lead captured');
      /* TODO: remplacer par gtag('event', 'whatsapp_click', { event_category: 'contact', event_label: 'floating_button' }); */
    });
  }
});
