<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Seat Selection</title>

    <!-- Bootstrap -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />

    <style>
      body {
        background: #f8f9fa;
      }

      .bus-card {
        border: 1px solid #dee2e6;
        border-radius: 10px;
        background: #fff;
      }

      .seat {
        width: 36px;
        height: 36px;
        border-radius: 6px;
        border: 1px solid #0d6efd;
        text-align: center;
        line-height: 36px;
        font-size: 13px;
        cursor: pointer;
        color: #0d6efd;
        user-select: none;
      }

      .seat.selected {
        background: #0d6efd;
        color: #fff;
      }

      .seat.booked {
        background: #ced4da;
        border-color: #ced4da;
        cursor: not-allowed;
        color: #fff;
      }

      .aisle {
        width: 25px;
      }

      .deck-title {
        font-weight: 600;
        color: #0d6efd;
      }

      .driver {
        width: 36px;
        height: 36px;
        border: 1px solid #dee2e6;
        border-radius: 6px;
        font-size: 10px;
        text-align: center;
        line-height: 36px;
        color: #6c757d;
      }
    </style>
  </head>

  <body>
    <div class="container mt-4">
      <h4 class="mb-3 text-primary">Select Your Seat</h4>

      <!-- CHANGE busType to SINGLE or DOUBLE -->
      <script>
        const busType = "DOUBLE"; // SINGLE or DOUBLE
      </script>

      <div id="busContainer" class="row g-3"></div>
    </div>

    <script type="module" src="static/js/bookTicket.js"></script>
  </body>
</html>
