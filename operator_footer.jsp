<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="e" uri="bts" %>

<footer class="footer py-5"
  style="background: linear-gradient(135deg, #0f0f0f, #1e1e1e);">
  
  <div class="container text-white">
    <div class="row">

      <!-- Brand -->
      <div class="col-md-4 mb-4">
        <h5 class="fw-bold text-white">RoBus Operator</h5>
        <p class="small text-secondary">
          Operator dashboard to manage buses, drivers, routes,
          schedules and ticket fares efficiently.
        </p>
      </div>

      <!-- Operator Links -->
      <div class="col-md-3 mb-4">
        <h6 class="fw-semibold text-white">Operator Panel</h6>
        <ul class="list-unstyled">
          <li>
            <a href="/robus/"
               class="text-white-50 text-decoration-none">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/robus/operator_buses.do"
               class="text-white-50 text-decoration-none">
              Manage Buses
            </a>
          </li>
          <li>
            <a href="/robus/operator_drivers.do"
               class="text-white-50 text-decoration-none">
              Manage Drivers
            </a>
          </li>
          <li>
            <a href="/robus/operator_schedules.do"
               class="text-white-50 text-decoration-none">
              Manage Schedules
            </a>
          </li>
          <li>
            <a href="/robus/operator_fare_factor.do"
               class="text-white-50 text-decoration-none">
              Manage Ticket Fare
            </a>
          </li>
        </ul>
      </div>

      <!-- Services -->
      <div class="col-md-2 mb-4">
        <h6 class="fw-semibold text-white">Features</h6>
        <ul class="list-unstyled text-white-50">
          <li>Driver Allocation</li>
          <li>Fare Management</li>
          <li>Route Optimization</li>
        </ul>
      </div>

      <!-- Support -->
      <div class="col-md-3 mb-4">
        <h6 class="fw-semibold text-white">Support</h6>
        <p class="small text-white-50 mb-1">Need help?</p>
        <a href="mailto:${initParam.admin_mail}"
           class="text-decoration-none text-white">
          ${initParam.admin_mail}
        </a>
      </div>

    </div>

    <hr style="border-color: #2f2f2f;">

    <!-- Bottom Bar -->
    <div class="row align-items-center">
      <div class="col-md-6 small text-white-50">
        &copy; ${e:currentDate().substring(0, 4)} RoBus Operator.
        All rights reserved.
      </div>

      <div class="col-md-6 text-md-end small">
        <span class="text-white-50">
          Built by 
          <a href="https://github.com/pranavjha04"
             target="_blank"
             class="text-white text-decoration-none fw-semibold">
            Pranav
          </a>
        </span>
      </div>
    </div>

  </div>
</footer>
