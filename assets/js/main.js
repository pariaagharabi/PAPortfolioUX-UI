/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  // const selectTyped = document.querySelector('.typed');
  // if (selectTyped) {
  //   let typed_strings = selectTyped.getAttribute('data-typed-items');
  //   typed_strings = typed_strings.split(',');
  //   new Typed('.typed', {
  //     strings: typed_strings,
  //     loop: true,
  //     typeSpeed: 100,
  //     backSpeed: 50,
  //     backDelay: 2000
  //   });
  // }


  /**
 * Init typed.js for all elements with .typed
 */
  document.querySelectorAll('.typed').forEach((el) => {
    let typed_strings = el.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',').map(item => item.trim());

    new Typed(el, { // target the actual element, not the selector string
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
      contentType: 'html' // allows <strong> and other HTML
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function (direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      // Initialize Isotope without any filter first (shows nothing temporarily)
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        sortBy: sort
      });

      // Find all filter buttons (excluding any potential "All" if still in HTML)
      const filterButtons = isotopeItem.querySelectorAll('.isotope-filters li[data-filter]:not([data-filter="*"])');

      if (filterButtons.length > 0) {
        // Take the FIRST filter (e.g., App, Card, or Web) as the new default
        const defaultFilterButton = filterButtons[0];
        const defaultFilterValue = defaultFilterButton.getAttribute('data-filter');

        // Set it as active
        isotopeItem.querySelectorAll('.isotope-filters li').forEach(li => {
          li.classList.remove('filter-active');
        });
        defaultFilterButton.classList.add('filter-active');

        // Apply the filter immediately
        initIsotope.arrange({
          filter: defaultFilterValue
        });
      }

      // Click handler for filter buttons
      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filterBtn) {
        filterBtn.addEventListener('click', function () {
          if (this.getAttribute('data-filter') === '*') return; // ignore "All" if it exists

          isotopeItem.querySelector('.isotope-filters .filter-active')?.classList.remove('filter-active');
          this.classList.add('filter-active');

          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });

          if (typeof aosInit === 'function') {
            aosInit();
          }
        });
      });

    });
  });


  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  window.addEventListener("load", beforeAfter);


  // Reusable before-after slider function
  function initBeforeAfter(containerId, sliderId, beforeImageUrl, afterImageUrl) {
    const container = document.getElementById(containerId);
    const slider = document.getElementById(sliderId);

    if (!container || !slider) return;

    // Set the BEFORE image as background of the container
    container.style.backgroundImage = `url('${beforeImageUrl}')`;
    container.style.backgroundSize = "cover";
    container.style.backgroundPosition = "center";
    container.style.position = "relative";
    container.style.overflow = "hidden";
    container.style.width = "100%";
    container.style.height = "500px"; // Adjust height if needed

    // Create the AFTER image layer
    const afterLayer = document.createElement("div");
    afterLayer.style.backgroundImage = `url('${afterImageUrl}')`;
    afterLayer.style.backgroundSize = "cover";
    afterLayer.style.backgroundPosition = "center";
    afterLayer.style.position = "absolute";
    afterLayer.style.top = "0";
    afterLayer.style.left = "0";
    afterLayer.style.width = "100%";
    afterLayer.style.height = "100%";
    afterLayer.style.transition = "all 0.3s ease";

    // Clip the after layer based on slider value
    function updateClip() {
      afterLayer.style.clipPath = `inset(0 ${100 - slider.value}% 0 0)`;
    }

    // Initial setup
    container.innerHTML = ""; // Clear any old content
    container.appendChild(afterLayer);
    updateClip();

    // Update on slider change
    slider.addEventListener("input", updateClip);
  }

  // Initialize sliders when page loads
  window.addEventListener("load", function () {
    // Only run the ones that exist on the current page

    // For Hema-Quebec page
    if (document.getElementById("compare") && document.getElementById("slider")) {
      initBeforeAfter(
        "compare",
        "slider",
        "assets/img/portfolio/hema-quebec-before.jpg",  
        "assets/img/portfolio/hema-quebec-after.jpg"    
      );
    }

    // For AGREE Redesigned App page
    if (document.getElementById("compare-app") && document.getElementById("slider-app")) {
      initBeforeAfter(
        "compare-app",
        "slider-app",
        "assets/img/agartee-redesigned-app/agartee-before-redesigned-app.png",  // BEFORE
        "assets/img/agartee-redesigned-app/agartee-after-redesigned-app.png"    // AFTER (redesigned)
      );
    }
  });
})();