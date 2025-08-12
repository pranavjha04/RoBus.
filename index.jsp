<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
      rel="stylesheet"
    />
    <link href="static/css/style.css" rel="stylesheet" />
    <script type="module" src="static/js/script.js"></script>
    <title>Document</title>
  </head>
  <body
    class="bggray-50 text-stone-800 grid grid-rows-[auto_1fr_auto] h-screen"
  >
    <%-- #################### NAVBAR WRAPPER START #################### --%>
    <div class="flex flex-col border-b-stone-100 transition-all duration-300">
      <%-- #################### NAVAR START #################### --%>
      <nav
        class="flex items-center justify-between px-2 sm:px-4 md:px-6 lg:px-8 py-2 md:py-3"
      >
        <a href="#">
          <img
            src="static/media/images/logo.png"
            alt="logo"
            class="h-7.5 md:h-10"
          />
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
            href="#"
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
              <a
                href="#"
                class="menu-nav-link block py-2 px-3 hover:bg-gray-100"
                >Home</a
              >
            </li>
            <li>
              <a
                href="#"
                class="menu-nav-link block py-2 px-3 hover:bg-gray-100"
                >Services</a
              >
            </li>
            <li>
              <a
                href="#"
                class="menu-nav-link block py-2 px-3 hover:bg-gray-100"
                >About</a
              >
            </li>
            <li>
              <a
                href="#"
                class="menu-nav-link block py-2 px-3 hover:bg-gray-100"
                >Contact</a
              >
            </li>
          </ul>
        </div>
      </div>
      <%-- #################### MENU LINKS END #################### --%>
    </div>
    <%-- #################### NAVBAR WRAPPER END #################### --%>

    <section
      class="relative h-screen w-full bg-cover bg-center bg-[url('https://www.shutterstock.com/image-photo/tourist-bus-on-mountain-road-600nw-2444707101.jpg')]"
    >
      <!-- Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-800/40 to-gray-700/60"
      ></div>

      <!-- Content -->
      <div
        class="relative z-10 flex flex-col items-center justify-center h-95 text-center text-white px-4 gap-10"
      >
        <!-- Title & Subtitle -->
        <div>
          <h1 class="text-4xl md:text-6xl font-bold drop-shadow-lg">
            Your Journey Begins with <span class="text-blue-400">RoBus</span>
          </h1>
          <p
            class="mt-4 text-lg md:text-2xl font-medium text-gray-200 drop-shadow-md"
          >
            Smooth & Easy Booking
          </p>
        </div>

        <!-- Form -->
        <form
          class="flex flex-col md:flex-row items-center gap-4 md:gap-6 bg-white/95 p-4 md:p-6 rounded-2xl shadow-2xl w-full max-w-6xl backdrop-blur-md"
        >
          <!-- From -->
          <div
            class="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-lg flex-1 focus-within:ring-2 focus-within:ring-blue-500 transition"
          >
            <img
              src="static/media/images/bus_walk.svg"
              alt="walk"
              class="w-7 h-7"
            />
            <input
              type="text"
              name="from"
              id="from"
              placeholder="From"
              class="bg-transparent border-none outline-none text-lg w-full text-gray-700 placeholder-gray-500"
            />
          </div>

          <!-- To -->
          <div
            class="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-lg flex-1 focus-within:ring-2 focus-within:ring-blue-500 transition"
          >
            <img
              src="static/media/images/bus_walk.svg"
              alt="walk"
              class="w-7 h-7 transform -scale-x-100"
            />
            <input
              type="text"
              name="to"
              id="to"
              placeholder="To"
              class="bg-transparent border-none outline-none text-lg w-full text-gray-700 placeholder-gray-500"
            />
          </div>

          <!-- Date -->
          <div
            class="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-lg flex-1 focus-within:ring-2 focus-within:ring-blue-500 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-7 h-7 text-gray-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10m-12 9h14a2 2 0 
          002-2V7a2 2 0 00-2-2H5a2 2 0 
          00-2 2v11a2 2 0 002 2z"
              />
            </svg>
            <input
              type="date"
              name="date"
              id="date"
              class="bg-transparent border-none outline-none text-lg w-full text-gray-700"
            />
          </div>

          <!-- Search Button -->
          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-10 py-5 rounded-xl shadow-lg transition-all duration-300 focus:ring-4 focus:ring-blue-400"
          >
            Search Buses
          </button>
        </form>
      </div>
    </section>
  </body>
</html>
