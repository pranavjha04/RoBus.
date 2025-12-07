<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<nav class="navbar">
  <div class="container nav-container">
    <!-- Improved Logo with Dynamic Routing -->
    <a class="navbar-brand logo" 
      <c:choose>
        <c:when test="${not empty sessionScope.user}">
          href="/bts"
        </c:when>
        <c:when test="${not empty sessionScope.operator}">
          href="operator_dashboard.do"
        </c:when>
        <c:otherwise>
          href="/bts"
        </c:otherwise>
      </c:choose>
    >
      <img
        src="static/media/images/logo.png"
        alt="Bus Ticket System Logo"
        class="logo-img"
        onerror="this.src='static/media/images/logo-fallback.png'"
      />
    </a>

    <!-- Mobile Menu Button -->
    <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle navigation menu">
      <span class="hamburger-icon"></span>
    </button>

    <!-- Navigation Links -->
    <div class="nav-links" id="navLinks">
      <a href="#home" class="nav-link">Home</a>
      <a href="#search" class="nav-link">Search Buses</a>
      <a href="#offers" class="nav-link">Offers</a>
      <a href="#help" class="nav-link">Help</a>
      <a href="#contact" class="nav-link">Contact</a>
      
      <!-- User/Operator Specific Links -->
      <c:if test="${not empty sessionScope.user}">
        <a href="user_profile.do" class="nav-link user-nav">My Profile</a>
        <a href="my_bookings.do" class="nav-link user-nav">My Bookings</a>
      </c:if>
      
      <c:if test="${not empty sessionScope.operator}">
        <a href="operator_routes.do" class="nav-link operator-nav">Manage Routes</a>
        <a href="operator_bookings.do" class="nav-link operator-nav">View Bookings</a>
      </c:if>
    </div>

    <!-- Dynamic Login/Signup Button -->
    <c:choose>
      <c:when test="${not empty sessionScope.user}">
        <div class="user-dropdown">
          <button class="btn btn-primary rounded-2 user-menu-btn">
            <i class="fas fa-user-circle"></i>
            ${sessionScope.user.firstName}
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="dropdown-menu">
            <a href="user_profile.do" class="dropdown-item">
              <i class="fas fa-user"></i> Profile
            </a>
            <a href="my_bookings.do" class="dropdown-item">
              <i class="fas fa-ticket-alt"></i> My Bookings
            </a>
            <div class="dropdown-divider"></div>
            <a href="logout.do" class="dropdown-item logout">
              <i class="fas fa-sign-out-alt"></i> Logout
            </a>
          </div>
        </div>
      </c:when>
      <c:when test="${not empty sessionScope.operator}">
        <div class="operator-dropdown">
          <button class="btn btn-secondary rounded-2 operator-menu-btn">
            <i class="fas fa-building"></i>
            Operator
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="dropdown-menu">
            <a href="operator_dashboard.do" class="dropdown-item">
              <i class="fas fa-tachometer-alt"></i> Dashboard
            </a>
            <a href="operator_routes.do" class="dropdown-item">
              <i class="fas fa-route"></i> Manage Routes
            </a>
            <div class="dropdown-divider"></div>
            <a href="logout.do" class="dropdown-item logout">
              <i class="fas fa-sign-out-alt"></i> Logout
            </a>
          </div>
        </div>
      </c:when>
      <c:otherwise>
        <button class="btn btn-primary rounded-2" onclick="window.location.href='login.jsp'">
          Login / Sign Up
        </button>
      </c:otherwise>
    </c:choose>
  </div>
</nav>

<style>
  /* ===== VARIABLES ===== */
  :root {
    --nav-height: 70px;
    --logo-height: 36px;
    --mobile-breakpoint: 992px;
    --shadow: rgba(0, 0, 0, 0.1);
    --transition: all 0.3s ease;
  }

  /* ===== NAVBAR BASE STYLES ===== */
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--nav-height);
    background-color: rgba(255, 255, 255, 0.98);
    box-shadow: 0 4px 20px var(--shadow);
    z-index: 1000;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }

  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 20px;
    max-width: 1400px;
    margin: 0 auto;
  }

  /* ===== LOGO STYLES ===== */
  .navbar-brand.logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    height: 100%;
    padding: 10px 0;
  }

  .logo-img {
    height: var(--logo-height);
    width: auto;
    max-width: 200px;
    object-fit: contain;
    display: block;
    transition: var(--transition);
  }

  .navbar-brand.logo:hover .logo-img {
    transform: scale(1.05);
  }

  /* ===== NAVIGATION LINKS ===== */
  .nav-links {
    display: flex;
    gap: 30px;
    align-items: center;
    flex: 1;
    justify-content: center;
  }

  .nav-link {
    color: var(--dark);
    text-decoration: none;
    font-weight: 500;
    font-size: 15px;
    transition: var(--transition);
    position: relative;
    padding: 5px 0;
    white-space: nowrap;
  }

  .nav-link:hover {
    color: var(--primary);
  }

  .nav-link:after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--primary), var(--secondary));
    bottom: 0;
    left: 0;
    transition: var(--transition);
    border-radius: 1px;
  }

  .nav-link:hover:after {
    width: 100%;
  }

  /* User/Operator specific links */
  .user-nav {
    color: var(--primary);
    font-weight: 600;
  }

  .operator-nav {
    color: var(--secondary);
    font-weight: 600;
  }

  /* ===== BUTTON STYLES ===== */
  .btn-primary.rounded-2 {
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: white;
    border: none;
    padding: 10px 24px;
    border-radius: 30px;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    box-shadow: 0 4px 12px rgba(67, 97, 238, 0.25);
    font-size: 14px;
    min-width: 140px;
  }

  .btn-primary.rounded-2:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(67, 97, 238, 0.4);
  }

  .btn-secondary.rounded-2 {
    background: linear-gradient(135deg, var(--secondary), var(--primary));
  }

  /* ===== DROPDOWN MENUS ===== */
  .user-dropdown,
  .operator-dropdown {
    position: relative;
    display: inline-block;
  }

  .user-menu-btn,
  .operator-menu-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    min-width: 160px;
    justify-content: space-between;
  }

  .dropdown-menu {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    background: white;
    min-width: 200px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
    padding: 10px 0;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    z-index: 1001;
    border: 1px solid rgba(0, 0, 0, 0.08);
  }

  .user-dropdown:hover .dropdown-menu,
  .operator-dropdown:hover .dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    color: var(--dark);
    text-decoration: none;
    transition: var(--transition);
    font-size: 14px;
  }

  .dropdown-item:hover {
    background: rgba(67, 97, 238, 0.05);
    color: var(--primary);
  }

  .dropdown-item.logout {
    color: #e74c3c;
  }

  .dropdown-item.logout:hover {
    background: rgba(231, 76, 60, 0.05);
  }

  .dropdown-divider {
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
    margin: 8px 0;
  }

  /* ===== MOBILE MENU BUTTON ===== */
  .mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    width: 40px;
    height: 40px;
    position: relative;
    z-index: 1002;
  }

  .hamburger-icon {
    position: relative;
    width: 24px;
    height: 2px;
    background: var(--dark);
    display: block;
    margin: 0 auto;
    transition: var(--transition);
  }

  .hamburger-icon:before,
  .hamburger-icon:after {
    content: "";
    position: absolute;
    width: 24px;
    height: 2px;
    background: var(--dark);
    left: 0;
    transition: var(--transition);
  }

  .hamburger-icon:before {
    top: -8px;
  }

  .hamburger-icon:after {
    bottom: -8px;
  }

  .mobile-menu-btn.active .hamburger-icon {
    background: transparent;
  }

  .mobile-menu-btn.active .hamburger-icon:before {
    transform: rotate(45deg);
    top: 0;
  }

  .mobile-menu-btn.active .hamburger-icon:after {
    transform: rotate(-45deg);
    bottom: 0;
  }

  /* ===== RESPONSIVE DESIGN ===== */
  @media (max-width: 1200px) {
    .nav-links {
      gap: 20px;
    }
  }

  @media (max-width: 992px) {
    .mobile-menu-btn {
      display: block;
    }

    .nav-links {
      position: fixed;
      top: var(--nav-height);
      left: 0;
      width: 100%;
      background: white;
      flex-direction: column;
      padding: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 999;
      gap: 0;
      max-height: calc(100vh - var(--nav-height));
      overflow-y: auto;
    }

    .nav-links.active {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }

    .nav-link {
      width: 100%;
      padding: 15px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      text-align: center;
      font-size: 16px;
    }

    .nav-link:last-child {
      border-bottom: none;
    }

    .nav-link:after {
      display: none;
    }

    .user-dropdown,
    .operator-dropdown {
      width: 100%;
      display: block;
      margin-top: 10px;
    }

    .dropdown-menu {
      position: static;
      opacity: 1;
      visibility: visible;
      transform: none;
      box-shadow: none;
      border: none;
      padding: 10px 0 0 20px;
      display: none;
    }

    .user-dropdown:hover .dropdown-menu,
    .operator-dropdown:hover .dropdown-menu {
      display: block;
    }

    .dropdown-item {
      padding: 10px 0;
    }

    .btn-primary.rounded-2 {
      width: 100%;
      margin-top: 15px;
    }
  }

  @media (max-width: 576px) {
    .nav-container {
      padding: 0 15px;
    }

    .logo-img {
      max-width: 150px;
    }

    .btn-primary.rounded-2 {
      padding: 10px 16px;
      font-size: 13px;
      min-width: auto;
    }
  }
</style>

<script>
  // Mobile Menu Toggle
  document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinks) {
      mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Toggle body scroll
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
      });

      // Close menu when clicking on a link
      navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenuBtn.classList.remove('active');
          navLinks.classList.remove('active');
          document.body.style.overflow = '';
        });
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
          mobileMenuBtn.classList.remove('active');
          navLinks.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }

    // Handle responsive behavior on window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 992) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
</script>