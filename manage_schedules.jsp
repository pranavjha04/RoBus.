<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:if
  test="${empty sessionScope.user or sessionScope.user.userType.userTypeId ne 3}"
>
  <c:redirect url="/" />
</c:if>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Manage Schedules</title>
  </head>
  <body class="bg-light min-vh-100 overflow-y-scroll">
    
  </body>
</html>
