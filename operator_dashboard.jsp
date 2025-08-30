<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!--Protect kro page kro agr operator ka session nahi hai or agr koi user isko access krne ki koshish kre-->
<c:choose>
  <c:when test="${empty sessionScope.operator
                  or not empty sessionScope.user}">
    <c:redirect url="/" />
  </c:when>  
</c:choose>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>Hello</h1>
  </body>
</html>
