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
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    <link href="static/css/output.css" rel="stylesheet" />
    <title>Signup</title>
  </head>

  <body class="h-dvh text-stone-800 bg-gray-100 grid grid-rows-[auto_1fr]">
    <c:import url="welcome_navbar.jsp" />

    <section class="flex items-center justify-center font-medium px-2">
      <form
        method="post"
        class="bg-white border-2 border-stone-200 shadow-lg rounded-xl p-8 w-full max-w-md flex flex-col gap-4"
      >
        <div class="flex flex-col items-center gap-2">
          <c:import url="logo.jsp" />
          <h3 class="text-center text-2xl font-bold tracking-tight">
            Create an account
          </h3>
        </div>
        <!-- 
        <div>
          <label for="full_name" class="block text-sm font-medium mb-1"
            >Full Name</label
          >
          <input
            id="full_name"
            type="full_name"
            name="full_name"
            required
            placeholder=""
            class="w-full border-2 border-stone-200 py-2 px-4 rounded-lg focus:outline-none focus:border-blue-600"
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium mb-1"
            >Email address</label
          >
          <input
            id="email"
            type="email"
            name="email"
            required
            placeholder="example@email.com"
            autocomplete="email"
            class="w-full border-2 border-stone-200 py-2 px-4 rounded-lg focus:outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium"
            >Password</label
          >
          <input type="password" name="password" id="password" required
          placeholder="<c:out value="********" />" class="w-full border-2
          border-stone-200 py-2 px-4 rounded-lg focus:outline-none
          focus:border-blue-600" />
        </div>

        <div class="flex items-center justify-between">
          <div>
            <div class="flex items-center justify-between mb-1">
              <label for="dob" class="block text-sm font-medium">
                Date of Birth
              </label>
            </div>
            <input
              type="date"
              name="dob"
              id="dob"
              required
              class="w-full border-2 border-stone-200 py-2 px-4 rounded-lg focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <div class="flex items-center justify-between mb-1">
              <label for="gender" class="block text-sm font-medium">
                Gender
              </label>
            </div>
            <select
              name="gender"
              id="gender"
              required
              class="w-full border-2 border-stone-200 py-2 px-4 rounded-lg focus:outline-none focus:border-blue-600"
            >
              <option value="" disabled selected>Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <button
          class="signup-next-btn w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer self-end"
        >
          Next
        </button> -->

        <div class="flex flex-col gap-2">
          <div>
            <div class="flex items-center justify-between mb-1">
              <label for="contact" class="block text-sm font-medium">
                Contact
              </label>
            </div>
            <input
              type="tel"
              name="contact"
              id="contact"
              required
              placeholder="<c:out value='Enter your contact number' />"
              class="w-full border-2 border-stone-200 py-2 px-4 rounded-lg focus:outline-none focus:border-blue-600"
            />
          </div>
          <button
            class="bg-blue-600 px-6 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer self-end"
          >
            Send OTP
          </button>
        </div>
        <div class="flex items-center w-full">
          <div>
            <div class="flex items-center justify-between mb-1">
              <label for="otp" class="block text-sm font-medium">
                Enter OTP
              </label>
            </div>
            <div class="flex items-center gap-4 w-full justify-between">
              <input
                type="text"
                maxlength="1"
                class="w-12 h-12 text-center text-lg border-2 border-stone-200 rounded-lg focus:outline-none focus:border-blue-600"
              />
              <input
                type="text"
                maxlength="1"
                class="w-12 h-12 text-center text-lg border-2 border-stone-200 rounded-lg focus:outline-none focus:border-blue-600"
              />
              <input
                type="text"
                maxlength="1"
                class="w-12 h-12 text-center text-lg border-2 border-stone-200 rounded-lg focus:outline-none focus:border-blue-600"
              />
              <input
                type="text"
                maxlength="1"
                class="w-12 h-12 text-center text-lg border-2 border-stone-200 rounded-lg focus:outline-none focus:border-blue-600"
              />
              <input
                type="text"
                maxlength="1"
                class="w-12 h-12 text-center text-lg border-2 border-stone-200 rounded-lg focus:outline-none focus:border-blue-600"
              />
              <input
                type="text"
                maxlength="1"
                class="w-12 h-12 text-center text-lg border-2 border-stone-200 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>
        </div>
        <div class="flex justify-center">
          <div
            class="g-recaptcha"
            data-sitekey="${initParam.captcha_site_key}"
          ></div>
        </div>
        <input
          type="submit"
          value="Create an account"
          class="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer"
        />

        <p class="text-center text-sm text-stone-600">
          Already have an account?
          <a href="login.do" class="text-blue-600 hover:underline">Login</a>
        </p>
      </form>
    </section>
  </body>
</html>
