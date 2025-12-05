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
   <style>
    .logo-img {
        max-height: 36px;     
        width: auto;          
        object-fit: contain;  
        display: block;       
    }

   </style>
   <img
      src="static/media/images/logo.png"
      alt="logo"
      class="logo-img"
   />
</a>
