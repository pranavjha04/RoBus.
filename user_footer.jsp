 <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
 <%@ taglib
prefix="e" uri="bts" %>
 <footer class="footer py-5" style="background: linear-gradient(135deg, #0f0f0f, #1e1e1e);">
  <div class="container text-white">
    <div class="row">

      <!-- Brand -->
      <div class="col-md-4 mb-4">
        <h5 class="fw-bold text-white">RoBus</h5>
        <p class="small text-secondary">
          Smart bus management platform for operators and commuters.
          Manage routes, buses, and drivers effortlessly.
        </p>
      </div>

      <!-- Quick Links -->
      <div class="col-md-2 mb-4">
        <h6 class="fw-semibold text-white">Quick Links</h6>
        <ul class="list-unstyled">
          <li><a href="/robus/" class="text-white-50 text-decoration-none">Home</a></li>
          <li><a href="/robus/services.do" class="text-white-50 text-decoration-none">Services</a></li>
          <c:if test="${not empty sessionScope.user}">
            <li><a href="/robus/operator_signup.do" class="text-white-50 text-decoration-none">Join as Operator</a></li>
            <li><a href="/robus/help.do" class="text-white-50 text-decoration-none">Contact</a></li>
          </c:if>
          <c:if test="${empty sessionScope.user}">
            <li><a href="/robus/login.do" class="text-white-50 text-decoration-none">Join as Operator</a></li>
            <li><a href="/robus/login.do" class="text-white-50 text-decoration-none">Contact</a></li>
          </c:if>
        </ul>
      </div>

      <!-- Services -->
      <div class="col-md-3 mb-4">
        <h6 class="fw-semibold text-white">Services</h6>
        <ul class="list-unstyled text-white-50">
          <li>Bus Management</li>
          <li>Route Planning</li>
          <li>Scheduling</li>
        </ul>
      </div>

      <!-- Contact -->
      <div class="col-md-3 mb-4">
        <h6 class="fw-semibold text-white">Contact</h6>
        <p class="small text-white-50 mb-1">Email</p>
        <a href="mailto:${initParam.admin_mail}" class="text-decoration-none text-white">
          ${initParam.admin_mail}
        </a>
      </div>

    </div>

    <hr style="border-color: #2f2f2f;">

    <!-- Bottom Bar -->
    <div class="row align-items-center">
      <div class="col-md-6 small text-white-50">
        &copy; ${e:currentDate().substring(0, 4)} RoBus. All rights reserved.
      </div>

      <div class="col-md-6 text-md-end small">
        <span class="text-white-50">
          Made by 
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