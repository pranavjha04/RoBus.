<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<a class="navbar-brand" 
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
      alt="logo"
      style="height: 36px"
      class="object-fit-cover"
   />
</a>
