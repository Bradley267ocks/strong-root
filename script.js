// script.js - StrongRoot Website Functionality

(function() {
  // 1) mobile menu toggle
  const toggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (toggle) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });

  // 2) service cards with image sliders (multiple sliding images)
  const servicesData = [
    { 
      title: 'Tree felling', 
      tags: '🌲 crane · rigging', 
      images: [
        'WhatsApp Image 2026-02-16 at 15.00.11.jpeg', 
        'WhatsApp Image 2026-02-16 at 15.00.13 (1).jpeg', 
        'WhatsApp Image 2026-02-16 at 15.00.13.jpeg'
      ] 
    },
    { 
      title: 'Tree cutting', 
      tags: '✂️ precision trim', 
      images: [
        'cape-town-tree-cutting-13-1000x800.webp', 
        'champagne-castle-hotel-tree-cutting-1080x675.jpg', 
        'The-Importance-of-Professional-Tree-cutting.jpg'
      ] 
    },
    { 
      title: 'Stump removal', 
      tags: '🪚 grind & clear', 
      images: [
        'stump-tree-removal-services.jpg', 
        'homeguide-contractor-digging-up-tree-stump removals.jpg', 
        '1452646574622 stump exit.jpeg'
      ] 
    },
    { 
      title: 'Palm pruning', 
      tags: '🌴 date palms', 
      images: [
        'Palm-Tree-Skinning-Randburg-Palm-Tree-Prunning-Randburg-Palm-Tree-Cleanin-Randburg.jpg', 
        'palm-pruning-canary.webp', 
        'WhatsApp Image 2026-02-16 at 15.00.12.jpeg'
      ] 
    },
    { 
      title: 'Site clearing', 
      tags: '🚜 bush · level', 
      images: [
        '2_7a3d169b-cef0-4e19-8907-b1e2ddd8972d_480x480.webp', 
        'Site-Clearance-main-1000x453.jpg.webp', 
        'site-clearing-featured.png'
      ] 
    },
    { 
      title: 'Rubble removal', 
      tags: '🧱 debris · dump', 
      images: [
        'WhatsApp Image 2026-02-16 at 15.00.14.jpeg', 
        'Rubble-Removal.jpeg', 
        'BP-Rubble-Removal-June-FI.jpg'
      ] 
    }
  ];

  const grid = document.getElementById('servicesGrid');
  
  if (grid) {
    // Clear any existing content
    grid.innerHTML = '';
    
    servicesData.forEach(service => {
      const card = document.createElement('div');
      card.className = 'service-card';
      
      let slidesHTML = '';
      service.images.forEach((img, idx) => {
        slidesHTML += `<img src="${img}" alt="${service.title}" loading="lazy">`;
      });
      
      // Generate unique ID for slider
      const sliderId = 'slider-' + Math.random().toString(36).substr(2, 9);
      
      card.innerHTML = `
        <div class="slider-container">
          <div class="slider-images" id="${sliderId}">${slidesHTML}</div>
        </div>
        <div class="card-title">${service.title}</div>
        <div class="service-tag">${service.tags}</div>
      `;
      
      grid.appendChild(card);
    });

    // automatic sliding for each card (every 3 seconds)
    setTimeout(() => {
      document.querySelectorAll('.service-card').forEach((card, index) => {
        const slider = card.querySelector('.slider-images');
        if (!slider) return;
        
        const totalImgs = slider.children.length;
        if (totalImgs < 2) return;
        
        let counter = 0;
        setInterval(() => {
          counter = (counter + 1) % totalImgs;
          slider.style.transform = `translateX(-${counter * 100}%)`;
        }, 3000 + (index * 200)); // staggered start
      });
    }, 500);
  }

  // 3) Reviews from google (simulated with actual Google-style reviews)
  const reviews = [
    { 
      name: 'Linda van der Merwe', 
      text: 'Best tree felling in Cape Town! Quick, safe and left the yard spotless. StrongRoot is reliable!', 
      stars: 5,
      date: '2 weeks ago'
    },
    { 
      name: 'Themba Ndlovu', 
      text: 'They removed two massive palm trees and stumps. Fair price and professional. Thanks!', 
      stars: 5,
      date: '1 month ago'
    },
    { 
      name: 'Chloe Martins', 
      text: 'Site clearing for our new build – rubble removal was same day. Highly recommend their team.', 
      stars: 5,
      date: '3 weeks ago'
    },
  ];
  
  const reviewsContainer = document.getElementById('reviewsContainer');
  
  if (reviewsContainer) {
    // Clear any existing content
    reviewsContainer.innerHTML = '';
    
    reviews.forEach(r => {
      const div = document.createElement('div');
      div.className = 'review-item';
      
      // Create star rating
      let starsHTML = '';
      for (let i = 0; i < 5; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
      }
      
      div.innerHTML = `
        <div class="review-stars">${starsHTML}</div>
        <p>"${r.text}"</p>
        <span class="review-author">- ${r.name}</span>
        <span style="display:block; font-size:0.8rem; color:#888; margin-top:5px;">${r.date}</span>
      `;
      
      reviewsContainer.appendChild(div);
    });
  }

  // 4) WhatsApp form submission
  const waForm = document.getElementById('whatsappForm');
  
  if (waForm) {
    waForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const msg = document.getElementById('message').value.trim();
      
      // Format phone number (remove any non-numeric except +)
      const cleanPhone = phone.replace(/[^0-9+]/g, '');
      
      // Create WhatsApp message
      const text = `Hello StrongRoot!%0A%0A*Name:* ${name}%0A*Phone:* ${cleanPhone}%0A*Message:* ${msg}`;
      
      // Open WhatsApp
      window.open(`https://wa.me/27754945486?text=${text}`, '_blank');
    });
  }

  // 5) fade-in scroll animation
  const fadeElements = document.querySelectorAll('.fadein');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  fadeElements.forEach(el => observer.observe(el));

  // 6) Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        const headerOffset = 90;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 7) Handle logo fallback (if image fails to load)
  const logoImg = document.querySelector('.logo-img');
  const logoFallback = document.querySelector('.logo-img-fallback');
  
  if (logoImg && logoFallback) {
    logoImg.onerror = function() {
      this.style.display = 'none';
      logoFallback.style.display = 'flex';
    };
  }

  // 8) Add active class to nav links on scroll
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').substring(1);
      if (href === current) {
        link.style.borderBottomColor = 'var(--yellow-accent)';
        link.style.color = 'var(--yellow-accent)';
      } else {
        link.style.borderBottomColor = 'transparent';
        link.style.color = '#fefae0';
      }
    });
  });
})();