<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> <%--
#################### NAVBAR WRAPPER START #################### --%>
<div class="flex flex-col border-b-stone-100 transition-all duration-300">
  <%-- #################### NAVAR START #################### --%>
  <nav
    class="flex items-center justify-between px-2 sm:px-4 md:px-6 lg:px-8 py-2 md:py-3"
  >
    <a href="/bts">
      <c:import url="logo.jsp" />
    </a>
    <div class="md:flex items-center gap-4 hidden">
      <a
        href="#"
        class="hover:text-blue-700 transition-all duration-300 focus:outline-none focus:text-blue-700 font-medium"
        >Home</a
      >
      <a
        href="#"
        class="hover:text-blue-700 transition-all duration-300 focus:outline-none focus:text-blue-700 font-medium"
        >Services</a
      >
      <a
        href="#"
        class="hover:text-blue-700 transition-all duration-300 focus:outline-none focus:text-blue-700 font-medium"
        >About</a
      >
      <a
        href="#"
        class="hover:text-blue-700 transition-all duration-300 focus:outline-none focus:text-blue-700 font-medium"
        >Contact</a
      >
    </div>
    <div class="flex items-center gap-4">
      <a
        href="login.do"
        class="capitalize bg-blue-600 text-stone-100 font-medium px-5 py-1 md:px-6 md:py-2 focus:outline-none focus:ring-2 focus:ring-2-blue-500 border-none rounded-lg hover:bg-blue-700 transition-all duration-300 cursor-pointer"
      >
        Login
      </a>

      <button
        data-collapse-toggle="navbar-hamburger"
        type="button"
        class="menu md:hidden inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400"
        aria-controls="navbar-hamburger"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
    </div>
  </nav>
  <%-- #################### NAVAR END #################### --%> <%--
  #################### MENU LINKS START #################### --%>
  <div
    class="flex flex-col border-b border-stone-300 transition-all duration-300 relative"
  >
    <nav class="flex items-center justify-between ...">
      <!-- navbar items -->
    </nav>

    <div
      id="navbar-hamburger"
      class="absolute top-full left-0 right-0 max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out w-full z-50"
    >
      <ul class="flex flex-col font-medium rounded-lg bg-gray-50 shadow-md">
        <li>
          <a href="#" class="menu-nav-link block py-2 px-3 hover:bg-gray-100"
            >Home</a
          >
        </li>
        <li>
          <a href="#" class="menu-nav-link block py-2 px-3 hover:bg-gray-100"
            >Services</a
          >
        </li>
        <li>
          <a href="#" class="menu-nav-link block py-2 px-3 hover:bg-gray-100"
            >About</a
          >
        </li>
        <li>
          <a href="#" class="menu-nav-link block py-2 px-3 hover:bg-gray-100"
            >Contact</a
          >
        </li>
      </ul>
    </div>
  </div>
  <%-- #################### MENU LINKS END #################### --%>
</div>
<%-- #################### NAVBAR WRAPPER END #################### --%>
