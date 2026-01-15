/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Smooth Scroll to Section
   */
  function scrollToSection(event, sectionId) {
    event.preventDefault();
    const target = document.getElementById(sectionId);
    if (target) {
      const headerOffset = 70;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Update active state for hero buttons
      document.querySelectorAll('.hero-btn').forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
    }
  }

  // Make scrollToSection globally available
  window.scrollToSection = scrollToSection;

  /**
   * Contact Popup Functions
   */
  function openContactPopup() {
    const popup = document.getElementById('contactPopup');
    if (popup) {
      popup.style.display = 'flex';
      popup.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeContactPopup() {
    const popup = document.getElementById('contactPopup');
    if (popup) {
      popup.style.display = 'none';
      popup.classList.remove('show');
      document.body.style.overflow = 'auto';
    }
  }

  function sendEmail(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    // Get form values
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Create mailto link
    const mailtoLink = `mailto:mohitdevang.md@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Close popup after a delay
    setTimeout(() => {
      closeContactPopup();
      form.reset();
    }, 500);
  }

  /**
   * Demo Modal Functions
   */
  function openDemoModal(productName) {
    const modal = document.getElementById('demoModal');
    const productField = document.getElementById('demo-product-field');
    const productNameSpan = document.getElementById('demo-product-name');
    const subjectField = document.getElementById('demo-subject');
    
    if (modal && productField && productNameSpan && subjectField) {
      productField.value = productName;
      productNameSpan.textContent = productName;
      
      const prefix = `REQUEST FOR DEMO – ${productName} – `;
      subjectField.value = prefix;
      subjectField.setAttribute('data-prefix', prefix);
      
      // Check if already submitted this month
      const submitKey = `demoSubmitted_${productName}`;
      const submitted = localStorage.getItem(submitKey);
      if (submitted) {
        const submitDate = new Date(submitted);
        const now = new Date();
        const daysDiff = Math.floor((now - submitDate) / (1000 * 60 * 60 * 24));
        
        if (daysDiff < 30) {
          const submitBtn = document.getElementById('demo-submit-btn');
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Already Submitted (Once per month)';
            submitBtn.style.opacity = '0.6';
            submitBtn.style.cursor = 'not-allowed';
          }
          
          const successMsg = document.getElementById('demo-success');
          if (successMsg) {
            successMsg.textContent = `You already requested a demo for ${productName} this month. Thank you!`;
            successMsg.style.display = 'block';
          }
        } else {
          localStorage.removeItem(submitKey);
          const submitBtn = document.getElementById('demo-submit-btn');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Request';
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
          }
          const successMsg = document.getElementById('demo-success');
          if (successMsg) {
            successMsg.style.display = 'none';
          }
        }
      } else {
        const submitBtn = document.getElementById('demo-submit-btn');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Request';
          submitBtn.style.opacity = '1';
          submitBtn.style.cursor = 'pointer';
        }
        const successMsg = document.getElementById('demo-success');
        if (successMsg) {
          successMsg.style.display = 'none';
        }
      }
      
      const form = document.getElementById('demo-form');
      if (form) {
        form.reset();
        subjectField.value = prefix;
        subjectField.setAttribute('data-prefix', prefix);
        
        form.querySelectorAll('.error-text').forEach(err => {
          err.textContent = '';
          err.style.display = 'none';
        });
        form.querySelectorAll('input, textarea').forEach(el => {
          el.style.borderColor = '';
        });
      }
      
      modal.style.display = 'flex';
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
      
      setTimeout(() => {
        const nameField = document.getElementById('demo-name');
        if (nameField) {
          nameField.focus();
        }
      }, 100);
    }
  }

  function closeDemoModal() {
    const modal = document.getElementById('demoModal');
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  }

  // Make functions globally available
  window.openContactPopup = openContactPopup;
  window.closeContactPopup = closeContactPopup;
  window.sendEmail = sendEmail;
  window.openDemoModal = openDemoModal;
  window.closeDemoModal = closeDemoModal;

  // Close popup when clicking outside
  document.addEventListener('click', function(event) {
    const popup = document.getElementById('contactPopup');
    const popupContent = popup ? popup.querySelector('.contact-popup-content') : null;
    if (popup && popupContent && event.target === popup) {
      closeContactPopup();
    }
  });

  // Close popup on ESC key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeContactPopup();
    }
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
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
   * Animated Loader with Constellation Effect
   */
  function initAnimatedLoader() {
    const loader = document.getElementById('animated-loader');
    const canvas = document.getElementById('loader-canvas');
    
    if (!loader || !canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 200;
    
    const particles = [];
    const particleCount = 30;
    const connectionDistance = 80;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1
      });
    }
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 212, 255, 0.8)';
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(0, 212, 255, 1)';
        
        // Draw connections
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.3 * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();
    
    // Hide loader after page loads
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
          loader.style.display = 'none';
        }, 800);
      }, 1500);
    });
  }
  
  initAnimatedLoader();

  /**
   * Initialize Particles.js for Background
   */
  function initParticles() {
    if (typeof particlesJS !== 'undefined') {
      particlesJS('particles-js', {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: '#00d4ff'
          },
          shape: {
            type: 'circle',
            stroke: {
              width: 0,
              color: '#000000'
            }
          },
          opacity: {
            value: 0.5,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#00d4ff',
            opacity: 0.2,
            width: 1
          },
          move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'grab'
            },
            onclick: {
              enable: true,
              mode: 'push'
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 0.4
              }
            },
            push: {
              particles_nb: 4
            }
          }
        },
        retina_detect: true
      });
    }
  }
  
  // Initialize particles after page loads
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (typeof particlesJS !== 'undefined') {
        initParticles();
      } else {
        // Retry if particles.js hasn't loaded yet
        setTimeout(initParticles, 500);
      }
    }, 500);
  });
  
  // Also try to init if DOM is ready
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => {
      if (typeof particlesJS !== 'undefined') {
        initParticles();
      }
    }, 1000);
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  // Keep scroll-top button always visible
  if (scrollTop) {
    scrollTop.classList.add('active');
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: false,
        mirror: true,
        offset: 100,
        delay: 0,
        anchorPlacement: 'top-bottom',
        disable: false
      });
      
      // Refresh AOS on scroll
      let scrollTimeout;
      window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
          AOS.refresh();
        }, 100);
      });
    }
  }
  
  // Initialize AOS after page loads
  window.addEventListener('load', function() {
    setTimeout(aosInit, 300);
  });
  
  // Also try to init immediately if DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(aosInit, 300);
    });
  } else {
    setTimeout(aosInit, 300);
  }

  // Force refresh AOS when sections come into view
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && typeof AOS !== 'undefined') {
        AOS.refresh();
        entry.target.classList.add('aos-animate');
      }
    });
  }, observerOptions);

  // Observe all sections
  setTimeout(() => {
    document.querySelectorAll('section, [data-aos]').forEach(section => {
      sectionObserver.observe(section);
    });
  }, 500);

  /**
   * Enhanced Scroll Animations for Cards
   */
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
          
          // Add glow effect on scroll in
          if (entry.target.classList.contains('portfolio-item') || 
              entry.target.classList.contains('service-item')) {
            entry.target.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.4)';
            setTimeout(() => {
              entry.target.style.boxShadow = '';
            }, 1000);
          }
        } else {
          // Reset animation when out of view (for mirror mode)
          if (entry.target.classList.contains('aos-animate')) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px) scale(0.95)';
          }
        }
      });
    }, observerOptions);

    // Observe all cards and sections with data-aos
    setTimeout(() => {
      document.querySelectorAll('.portfolio-item, .service-item, .stats-item, [data-aos]').forEach(el => {
        if (!el.classList.contains('animate-in') && !el.classList.contains('aos-animate')) {
          // Only set initial state if element has data-aos
          if (el.hasAttribute('data-aos')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px) scale(0.95)';
            el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
          }
          observer.observe(el);
        }
      });
    }, 500);
  }

  window.addEventListener('load', function() {
    setTimeout(initScrollAnimations, 500);
  });

  /**
   * Parallax Effect for Project Images
   */
  function initParallaxEffect() {
    document.querySelectorAll('.portfolio-item img').forEach(img => {
      img.addEventListener('mousemove', (e) => {
        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const moveX = (x - centerX) / 20;
        const moveY = (y - centerY) / 20;
        
        img.style.transform = `scale(1.05) translate(${moveX}px, ${moveY}px)`;
      });
      
      img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1) translate(0, 0)';
      });
    });
  }

  window.addEventListener('load', initParallaxEffect);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

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
      handler: function(direction) {
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
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
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
  window.addEventListener('load', function(e) {
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

})();