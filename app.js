// ── Menu mobile ──────────────────────────────────────────
(function () {
  const btn   = document.getElementById('menuBtn');
  const menu  = document.getElementById('menuMobile');
  const links = Array.from(document.querySelectorAll('.nav-link'));

  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('hidden', open);
  });

  links.forEach((a) => a.addEventListener('click', () => {
    btn.setAttribute('aria-expanded', 'false');
    menu.classList.add('hidden');
  }));

  // Lien actif par section visible — scroll-position based
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const headerHeight = 80; // fixed header offset

  function updateActiveLink() {
    let current = null;
    for (let i = sections.length - 1; i >= 0; i--) {
      const rect = sections[i].getBoundingClientRect();
      if (rect.top <= headerHeight + 60) {
        current = sections[i];
        break;
      }
    }
    if (!current && sections.length) current = sections[0];
    if (!current) return;
    links.forEach((a) => {
      if ((a.getAttribute('href') || '') === `#${current.id}`) {
        a.setAttribute('aria-current', 'page');
      } else {
        a.removeAttribute('aria-current');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
})();

// ── Boîte à outils — tableau interactif ─────────────────
(function () {
  const tools = [
    {
      title: 'Grille d\u2019observation formative',
      when: 'Pendant l\u2019activit\u00e9',
      goal: 'Recueillir des indices en situation',
      desc: 'Outil rapide pour observer des comportements langagiers et des strat\u00e9gies (interaction, prononciation, compr\u00e9hension). Inspir\u00e9e du CFORP (2013) et utilis\u00e9e dans notre production P1.1 (Annexe C) pour observer les \u00e9l\u00e8ves lors de la d\u00e9marche d\u2019enqu\u00eate, des \u00e9changes collaboratifs et de la r\u00e9daction progressive. Permet d\u2019ajuster imm\u00e9diatement\u00a0: reformuler, mod\u00e9liser, regrouper, ou proposer une aide cibl\u00e9e.',
    },
    {
      title: 'Outil diagnostique (repr\u00e9sentations initiales)',
      when: 'Avant l\u2019unit\u00e9',
      goal: 'Conna\u00eetre les acquis d\u2019entr\u00e9e',
      desc: '\u00c9valuation diagnostique permettant de conna\u00eetre les repr\u00e9sentations et connaissances pr\u00e9alables des \u00e9l\u00e8ves avant de commencer l\u2019unit\u00e9. Inspir\u00e9 de Faire cro\u00eetre le succ\u00e8s (M\u00c9O, 2010), cet outil aide \u00e0 adapter l\u2019enseignement d\u00e8s le d\u00e9part. Utilis\u00e9 dans notre production P1.1 (Annexe B) pour les \u00e9tudes sociales.'
    },
    {
      title: 'Grille diagnostique du genre de texte',
      when: 'D\u00e9but d\u2019unit\u00e9',
      goal: 'V\u00e9rifier la compr\u00e9hension du genre',
      desc: 'Outil pour v\u00e9rifier si l\u2019\u00e9l\u00e8ve peut d\u00e9crire la structure et identifier les caract\u00e9ristiques d\u2019un genre de texte. La lecture de ce type de texte pr\u00e9c\u00e8de l\u2019unit\u00e9 d\u2019apprentissage et l\u2019\u00e9valuation diagnostique v\u00e9rifie les acquis. Utilis\u00e9 dans P1.1 (Annexe A) pour le texte informatif en fran\u00e7ais.',
    },
    {
      title: 'Auto\u00e9valuation m\u00e9tacognitive',
      when: 'Fin de production',
      goal: 'D\u00e9velopper la r\u00e9flexion sur soi',
      desc: 'L\u2019\u00e9l\u00e8ve analyse sa propre production \u00e0 l\u2019aide d\u2019\u00e9nonc\u00e9s r\u00e9flexifs avant la remise finale. Inspir\u00e9 du M\u00c9O (2010), cet outil favorise l\u2019autonomie et la m\u00e9tacognition. Il est essentiel d\u2019inclure un espace pour les commentaires, car on ne \u00ab\u00a0ma\u00eetrise\u00a0\u00bb pas ce que l\u2019on ne peut pas d\u00e9crire.',
    },
    {
      title: 'Triangulation des preuves d\u2019apprentissage',
      when: 'Tout au long de l\u2019unit\u00e9',
      goal: 'Obtenir un portrait plus juste',
      desc: 'D\u00e9marche consistant \u00e0 croiser trois types de preuves\u00a0: observations en classe, productions de l\u2019\u00e9l\u00e8ve et communications orales. Tir\u00e9e du CFORP Fascicule 3 \u2014 Preuves d\u2019apprentissage. Permet d\u2019avoir une vision plus compl\u00e8te et \u00e9quitable de l\u2019apprentissage, car un \u00e9l\u00e8ve peut mieux d\u00e9montrer ses comp\u00e9tences de diff\u00e9rentes fa\u00e7ons.',
    },
    {
      title: 'R\u00e9troaction descriptive 2+1',
      when: 'Apr\u00e8s une production',
      goal: 'Faire progresser avec clart\u00e9',
      desc: 'Deux forces + une action pr\u00e9cise pour progresser. Format court, motivant et actionnable. Inspir\u00e9 du CFORP Fascicule 4 \u2014 R\u00e9troaction et des travaux de Brookhart (2010). La r\u00e9troaction doit \u00eatre descriptive, situ\u00e9e et centr\u00e9e sur la t\u00e2che (pas sur la personne). On peut aussi int\u00e9grer le concept de feedforward\u00a0: orienter vers l\u2019am\u00e9lioration future.'
    },
    {
      title: 'Grille d\u2019\u00e9valuation adapt\u00e9e (4 comp\u00e9tences)',
      when: 'Avant/apr\u00e8s t\u00e2che sommative',
      goal: '\u00c9valuer avec coh\u00e9rence et \u00e9quit\u00e9',
      desc: 'Grille bas\u00e9e sur les 4 comp\u00e9tences du curriculum ontarien (CC, HP, CO, MA) avec des descripteurs adapt\u00e9s. Le descripteur principal est l\u2019efficacit\u00e9. L\u2019enseignant peut se servir d\u2019autres descripteurs (clart\u00e9, exactitude, logique, pertinence, profondeur) selon la comp\u00e9tence vis\u00e9e. Partag\u00e9e avec les \u00e9l\u00e8ves avant la t\u00e2che pour rendre les attentes claires.'
    },
    {
      title: 'Sources multiples de r\u00e9troaction',
      when: 'Tout au long de l\u2019apprentissage',
      goal: 'Diversifier les regards',
      desc: 'Quatre sources de r\u00e9troaction compl\u00e9mentaires\u00a0: 1) enseignant (grille, observation, entretien), 2) pairs (\u00e9valuation collaborative, r\u00e9p\u00e9tition), 3) auto\u00e9valuation (r\u00e9flexion personnelle, bilan des apprentissages), 4) parents (comparaison de travaux, portes ouvertes). Inspir\u00e9 de Marielle Simon, Wiggins et du document du cours sur les diverses sources de r\u00e9troaction.'
    },
    {
      title: 'Planification \u00e0 rebours',
      when: 'Avant l\u2019unit\u00e9',
      goal: 'Aligner objectifs, preuves et activit\u00e9s',
      desc: 'D\u00e9marche structur\u00e9e\u00a0: 1) d\u00e9finir les r\u00e9sultats d\u2019apprentissage, 2) choisir les preuves d\u2019apprentissage attendues, 3) concevoir les activit\u00e9s et l\u2019\u00e9valuation. Cette approche, utilis\u00e9e dans la production P2, rend chaque le\u00e7on intentionnelle et coh\u00e9rente. Les 4 questions cl\u00e9s\u00a0: que doivent apprendre les \u00e9l\u00e8ves? Comment saurai-je qu\u2019ils ont appris? Comment j\u2019organise l\u2019enseignement? Comment j\u2019aide ceux qui n\u2019apprennent pas encore?'
    },
    {
      title: '\u00c9valuation des habilet\u00e9s d\u2019apprentissage',
      when: 'Tout au long de l\u2019ann\u00e9e',
      goal: '\u00c9valuer au-del\u00e0 du contenu',
      desc: '\u00c9valuation continue des habilet\u00e9s d\u2019apprentissage et habitudes de travail (autonomie, collaboration, initiative, etc.). L\u2019observation est la strat\u00e9gie principale. Les \u00e9l\u00e8ves collaborent pour d\u00e9terminer les crit\u00e8res. Ces habilet\u00e9s doivent faire l\u2019objet d\u2019un enseignement explicite et d\u2019occasions multiples de d\u00e9monstration.'
    }
  ];

  const tableBody   = document.getElementById('toolTable');
  const toolTitle   = document.getElementById('toolTitle');
  const toolDesc    = document.getElementById('toolDesc');

  function render() {
    tableBody.innerHTML = '';
    tools.forEach((t, idx) => {
      const tr = document.createElement('tr');
      tr.className = 'cursor-pointer transition-colors hover:bg-sage-50 focus-within:bg-sage-50';
      tr.style.cssText = '--tw-bg-opacity:1;';
      tr.tabIndex = 0;
      tr.setAttribute('role', 'button');
      tr.setAttribute('aria-label', `Voir détails : ${t.title}`);
      tr.innerHTML = `
        <td class="px-5 py-3.5 font-medium leading-snug" style="color:#2E2E2E;">${t.title}</td>
        <td class="px-5 py-3.5" style="color:#888;">${t.when}</td>
        <td class="px-5 py-3.5" style="color:#888;">${t.goal}</td>
      `;

      const select = () => {
        tableBody.querySelectorAll('tr').forEach((r) => {
          r.classList.remove('tool-row-active');
          r.style.backgroundColor = '';
        });
        tr.classList.add('tool-row-active');
        toolTitle.textContent   = t.title;
        toolDesc.textContent    = t.desc;
      };

      tr.addEventListener('click', select);
      tr.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(); } });
      if (idx === 0) setTimeout(select, 0);
      tableBody.appendChild(tr);
    });
  }

  render();
})();

// ── Média auto-affichage ─────────────────────────────────
(function () {
  document.querySelectorAll('img[data-autoshow-media="true"]').forEach((img) => {
    img.hidden = !(img.getAttribute('src') || '').trim();
  });
})();

// ── Scroll Reveal Animations ─────────────────────────────
(function () {
  // Mark JS-loaded so CSS can gate animation styles
  document.documentElement.classList.add('js-loaded');

  // Elements to animate on scroll
  const selectors = [
    '.card-hover',
    '.section-heading',
    '.section-divider',
    '[id^="journal-s"]',
    '#journal .rounded-xl.bg-white',
    '#annexes .rounded-card',
    '#outils .lg\\:col-span-7',
    '#outils aside',
    '#activites .rounded-card.bg-white',
    '#philosophie .mt-10.grid > article',
    '.rounded-card.bg-white.shadow-sm',
    '.video-showcase',
  ];

  const elements = document.querySelectorAll(selectors.join(','));

  // Add reveal class and mark stagger parents
  elements.forEach((el) => {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
    }
  });

  // Mark grid parents for staggered children
  document.querySelectorAll(
    '#philosophie .mt-10.grid, #activites .mt-10.grid, #annexes .mt-5.grid'
  ).forEach((grid) => {
    grid.classList.add('reveal-stagger');
    Array.from(grid.children).forEach((child) => {
      if (!child.classList.contains('reveal')) {
        child.classList.add('reveal');
      }
    });
  });

  // Observer
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });

  // Also observe section-dividers
  document.querySelectorAll('.section-divider').forEach(function (el) {
    if (!el.classList.contains('reveal')) {
      observer.observe(el);
    }
  });
})();

// ── Header scroll effect ─────────────────────────────────
(function () {
  var header = document.querySelector('header');
  if (!header) return;
  var scrolled = false;

  function onScroll() {
    var shouldAdd = window.scrollY > 20;
    if (shouldAdd !== scrolled) {
      scrolled = shouldAdd;
      header.classList.toggle('scrolled', scrolled);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
