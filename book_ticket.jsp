<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:if test="${empty sessionScope.user}">
  <c:redirect
    url="/login.do?from=${param.from}&to=${param.to}&journey_date=${param.journey_date}&source=${param.source}&destination=${destination}"
  />
</c:if>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
</html>
