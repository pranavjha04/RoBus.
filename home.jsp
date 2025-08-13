<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

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
    <link href="static/css/output.css" rel="stylesheet" />
    <script type="module" src="static/js/main.js"></script>
    <title>Document</title>
  </head>
  <body class="bggray-50 text-stone-800 min-h-screen bg-gradient-subtle">
    <%-- #################### NAVBAR WRAPPER START #################### --%>
    <c:import url="welcome_navbar.jsp" />
    <%-- #################### NAVBAR WRAPPER END #################### --%> <%--
    #################### SEARCH BUSFORM START #################### --%>
    <section
      class="relative h-screen w-full bg-cover bg-center bg-no-repeat"
      style="
        background-image: url('https://www.shutterstock.com/image-photo/tourist-bus-on-mountain-road-600nw-2444707101.jpg');
      "
    >
      <!-- Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-800/40 to-gray-700/60"
      ></div>

      <!-- Content -->
      <div
        class="relative z-10 flex flex-col items-center justify-center h-full px-4 gap-8"
      >
        <!-- Title & Subtitle -->
        <div class="mb-4 mt-20 text-center">
          <h1 class="text-3xl md:text-6xl font-bold drop-shadow-lg text-white">
            Your Journey Begins with <span class="text-blue-400">RoBus</span>
          </h1>
          <p
            class="mt-4 text-lg md:text-2xl font-medium text-gray-200 drop-shadow-md"
          >
            Smooth & Easy Booking
          </p>
        </div>
        <div
          class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-3 md:p-5 w-full max-w-4xl mx-auto"
        >
          <form
            id="bus-search-form"
            class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-3"
          >
            <!--FROM INPUT -->
            <div
              class="relative flex items-center bg-gray-50 border-2 border-gray-200 rounded-lg focus-within:border-blue-500 focus-within:bg-white transition-all duration-300"
            >
              <div
                class="p-3 text-stone-800 flex-shrink-0 flex flex-col items-center justify-center leading-none"
              >
                <img
                  src="static/media/images/bus_walk.svg"
                  alt="icon"
                  class="w-6 h-6"
                />
              </div>
              <div class="relative w-full">
                <input
                  type="text"
                  id="from"
                  name="from"
                  autofocus
                  class="flex-1 min-w-0 p-3 bg-transparent border-none outline-none text-stone-800 placeholder-stone-800/60 text-lg w-full"
                  placeholder="From (Departure City)"
                  required
                  aria-label="Departure city"
                  aria-invalid="false"
                />
                <!-- <ul
                  class="flex flex-col absolute font-medium rounded-lg bg-gray-50 shadow-md w-full z-10"
                  style="max-height: 12rem; overflow-y: auto"
                >
                  <li>
                    <p
                      href="#"
                      class="menu-nav-link block py-2 px-3 hover:bg-gray-100  cursor-pointer "
                    >
                      San Francisco
                    </p>
                  </li>
                  <li>
                    <p
                      href="#"
                      class="menu-nav-link block py-2 px-3 hover:bg-gray-100  cursor-pointer "
                    >
                      Los Angeles
                    </p>
                  </li>
                  <li>
                    <p
                      href="#"
                      class="menu-nav-link block py-2 px-3 hover:bg-gray-100  cursor-pointer "
                    >
                      New York
                    </p>
                  </li>
                  <li>
                    <p
                      href="#"
                      class="menu-nav-link block py-2 px-3 hover:bg-gray-100  cursor-pointer "
                    >
                      Chicago
                    </p>
                  </li>
                  <li>
                    <p
                      href="#"
                      class="menu-nav-link block py-2 px-3 hover:bg-gray-100  cursor-pointer "
                    >
                      Miami
                    </p>
                  </li>
                  <li>
                    <p
                      href="#"
                      class="menu-nav-link block py-2 px-3 hover:bg-gray-100 cursor-pointer"
                    >
                      Dallas
                    </p>
                  </li>
                </ul> -->
              </div>
            </div>
            <!--TO INPUT -->
            <div
              class="relative flex items-center bg-gray-50 border-2 border-gray-200 rounded-lg focus-within:border-blue-500 focus-within:bg-white transition-all duration-300"
            >
              <div
                class="p-3 text-stone-800 flex-shrink-0 flex flex-col items-center justify-center leading-none"
              >
                <img
                  src="static/media/images/bus_walk.svg"
                  alt="icon"
                  class="w-6 h-6"
                />
              </div>
              <div class="relative w-full">
                <input
                  type="text"
                  id="to"
                  name="To"
                  autofocus
                  class="flex-1 min-w-0 p-3 bg-transparent border-none outline-none text-stone-800 placeholder-stone-800/60 text-lg w-full"
                  placeholder="To (Destination City)"
                  required
                  aria-label="Destination city"
                  aria-invalid="false"
                />
                <!-- <ul
                  class="flex flex-col absolute font-medium rounded-lg bg-gray-50 shadow-md w-full z-10"
                  style="max-height: 12rem; overflow-y: auto"
                >
                  <li>
                    <p
                      href="#"
                      class="menu-nav-link block py-2 px-3 hover:bg-gray-100  cursor-pointer "
                    >
                      San Francisco
                    </p>
                  </li>
                  <li>
                    <p
                      href="#"
                      class="menu-nav-link block py-2 px-3 hover:bg-gray-100  cursor-pointer "
                    >
                      Los Angeles
                    </p>
                  </li>
                  <li>
                    <p
                      href="#"
                      class="menu-nav-link block py-2 px-3 hover:bg-gray-100  cursor-pointer "
                    >
                      New York
                    </p>
                  </li>
                  <li>
                    <p
                      href="#"
                      class="menu-nav-link block py-2 px-3 hover:bg-gray-100  cursor-pointer "
                    >
                      Chicago
                    </p>
                  </li>
                  <li>
                    <p
                      href="#"
                      class="menu-nav-link block py-2 px-3 hover:bg-gray-100  cursor-pointer "
                    >
                      Miami
                    </p>
                  </li>
                  <li>
                    <p
                      href="#"
                      class="menu-nav-link block py-2 px-3 hover:bg-gray-100 cursor-pointer"
                    >
                      Dallas
                    </p>
                  </li>
                </ul> -->
              </div>
            </div>

            <!-- Date Picker -->
            <div class="flex flex-col">
              <div
                class="group flex items-center bg-gray-50 border-2 border-gray-200 rounded-lg focus-within:border-blue-500 focus-within:bg-white transition-all duration-300 cursor-pointer"
                id="date-wrapper"
              >
                <div class="p-3 text-stone-800 flex-shrink-0">
                  <svg
                    class="w-5 h-5 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 
          00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="date"
                  id="date"
                  name="date"
                  class="flex-1 min-w-0 p-3 bg-transparent border-none outline-none text-stone-800 text-lg w-full appearance-none"
                  required
                />
              </div>
              <span class="text-red-500 text-sm mt-1 hidden error-message">
                Please select a valid date
              </span>
            </div>

            <!-- Search Button -->
            <div class="flex items-end md:col-span-1 lg:col-span-3">
              <input
                type="submit"
                value="Search Buses"
                class="bg-blue-600 w-full p-4 font-medium rounded-lg cursor-pointer text-white hover:bg-blue-700 transition-all duration-300 text-lg"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
    <%-- #################### SEARCH BUS #################### --%>
  </body>
</html>
