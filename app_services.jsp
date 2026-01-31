<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>BlueStream Mobility | Bus Services</title>
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      rel="stylesheet"
    />
    <style>
      :root {
        --primary: #0062ff;
        --secondary: #001d4a;
        --accent: #00d4ff;
        --light: #f4f7fe;
        --white: #ffffff;
        --text: #333;
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      }

      body {
        background-color: var(--light);
        color: var(--text);
        line-height: 1.6;
      }

      header {
        background: var(--white);
        padding: 1rem 5%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        position: sticky;
        top: 0;
        z-index: 1000;
      }

      .logo {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--primary);
      }

      /* Hero Section */
      .hero {
        background: linear-gradient(
          135deg,
          var(--secondary) 0%,
          var(--primary) 100%
        );
        color: var(--white);
        padding: 60px 5%;
        text-align: center;
      }

      /* Services Grid */
      .container {
        max-width: 1200px;
        margin: -50px auto 50px;
        padding: 0 20px;
      }

      .services-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 25px;
      }

      .card {
        background: var(--white);
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        transition: transform 0.3s ease;
        text-align: center;
      }

      .card:hover {
        transform: translateY(-10px);
      }

      .icon-box {
        font-size: 2.5rem;
        color: var(--primary);
        margin-bottom: 20px;
      }

      .btn {
        display: inline-block;
        padding: 12px 25px;
        background: var(--primary);
        color: white;
        text-decoration: none;
        border-radius: 8px;
        margin-top: 20px;
        font-weight: 600;
        transition: 0.3s;
      }

      .btn:hover {
        background: var(--secondary);
        box-shadow: 0 5px 15px rgba(0, 98, 255, 0.4);
      }

      /* Operator Section */
      .operator-join {
        background: var(--white);
        margin-top: 80px;
        padding: 60px 5%;
        border-radius: 20px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 40px;
      }

      .operator-text {
        flex: 1;
        min-width: 300px;
      }

      .operator-form {
        flex: 1;
        min-width: 300px;
        background: var(--light);
        padding: 30px;
        border-radius: 15px;
      }

      input {
        width: 100%;
        padding: 12px;
        margin: 10px 0;
        border: 1px solid #ddd;
        border-radius: 5px;
      }

      footer {
        text-align: center;
        padding: 40px;
        color: #666;
      }
    </style>
  </head>
  <body>
    <header>
      <div class="logo"><i class="fas fa-bus-alt"></i> BlueStream</div>
      <nav>
        <a
          href="#"
          style="
            text-decoration: none;
            color: var(--secondary);
            font-weight: 600;
          "
          >Support</a
        >
      </nav>
    </header>

    <section class="hero">
      <h1>Your Journey, Our Priority</h1>
      <p>Modern bus services with digital ticketing and real-time updates.</p>
    </section>

    <div class="container">
      <div class="services-grid">
        <div class="card">
          <div class="icon-box"><i class="fas fa-ticket-alt"></i></div>
          <h3>Instant Booking</h3>
          <p>
            Select your seat, pay securely, and get your ticket in seconds. No
            queues, no hassle.
          </p>
          <a href="#" class="btn">Book Now</a>
        </div>

        <div class="card">
          <div class="icon-box"><i class="fas fa-envelope-open-text"></i></div>
          <h3>Digital Wallet & Mail</h3>
          <p>
            Tickets are automatically sent to your email. Save paper and access
            them offline anytime.
          </p>
          <a href="#" class="btn" style="background: var(--secondary)"
            >Setup Mail</a
          >
        </div>

        <div class="card">
          <div class="icon-box"><i class="fas fa-route"></i></div>
          <h3>Live Tracking</h3>
          <p>
            Track your bus in real-time. Know exactly when your ride will arrive
            at the station.
          </p>
          <a href="#" class="btn">View Routes</a>
        </div>
      </div>

      <div class="operator-join">
        <div class="operator-text">
          <h2
            style="
              color: var(--secondary);
              font-size: 2rem;
              margin-bottom: 15px;
            "
          >
            Are you a Fleet Owner?
          </h2>
          <p>
            Join the BlueStream network to increase your reach, manage schedules
            effortlessly, and grow your business with our easy-to-use operator
            dashboard.
          </p>
          <ul style="margin-top: 20px; list-style: none">
            <li>
              <i class="fas fa-check-circle" style="color: var(--primary)"></i>
              Real-time Revenue Tracking
            </li>
            <li>
              <i class="fas fa-check-circle" style="color: var(--primary)"></i>
              Automated Passenger Lists
            </li>
          </ul>
        </div>
        <div class="operator-form">
          <h3>Operator Partnership</h3>
          <form>
            <input type="text" placeholder="Company Name" required />
            <input type="email" placeholder="Business Email" required />
            <input type="number" placeholder="Number of Buses" required />
            <button
              type="submit"
              class="btn"
              style="width: 100%; border: none; cursor: pointer"
            >
              Register as Operator
            </button>
          </form>
        </div>
      </div>
    </div>

    <footer>
      <p>&copy; 2026 BlueStream Mobility. All rights reserved.</p>
    </footer>
  </body>
</html>
