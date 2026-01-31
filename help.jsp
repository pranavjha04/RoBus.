<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 

<c:if test="${empty sessionScope.operator and empty sessionScope.user}">
  <c:redirect url="/" />
</c:if>

<!DOCTYPE html>
<html lang="en">
  <head>
    <c:import url="essential_page_import.jsp" />
    <style>
      :root {
        --primary: #0d6efd;
        --bg-light: #f8f9fa;
        --border-color: #edf2f7;
      }

      .content-wrapper {
        background-color: var(--bg-light);
      }

    </style>

    <title>Help & Contact Support</title>
  </head>
  
  <body class="overflow-hidden">
    <div class="toast-container"></div>
    <c:if test="${not empty sessionScope.user}">
      <c:import url="logged_navbar.jsp" />
      <div class="row justify-content-center p-2">
         <div class="col-md-8 col-lg-6">
           <div class="card border-0 shadow-lg rounded-4">
             <div class="card-body p-5">
               
               <div class="text-center mb-4">
                 <div class="bg-primary bg-opacity-10 d-inline-block p-3 rounded-circle mb-3">
                   <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#0d6efd" class="bi bi-envelope" viewBox="0 0 16 16">
                     <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                   </svg>
                 </div>
                 <h2 class="fw-bold">Send your any queries here</h2>
               </div>
  
               <form id="contact_form">
                 
                 <div class="mb-3">
                   <label for="subject" class="form-label fw-semibold">Subject</label>
                   <input
                     type="text"
                     class="form-control bg-light border-0 shadow-none p-3"
                     id="subject"
                     name="subject"
                     placeholder="Enter the subject"
                     /* c:out prevents users from injecting ${pageContext} or scripts */
                     value="<c:out value='${param.subject}' default='' />"
                     required
                   />
                 </div>
  
                 <div class="mb-4">
                   <label for="message" class="form-label fw-semibold">Message</label>
                   <textarea
                     class="form-control bg-light border-0 shadow-none p-3"
                     id="message"
                     name="message"
                     placeholder="Write your message here..."
                     style="height: 150px"
                     required
                   ><c:out value='${param.message}' default='' /></textarea>
                 </div>
  
                 <button
                   type="submit"
                   class="btn btn-primary btn-lg w-100 rounded-3 shadow-sm py-3 fw-bold"
                 >
                   Send Message <i class="bi bi-send-fill ms-2"></i>
                 </button>
                 
               </form>
               
             </div>
           </div>
         </div>
       </div>
    </c:if>
     <c:if test="${not empty sessionScope.operator}">
      <div class="dashContainer">
          <c:import url="operator_navbar.jsp" />
          <div class="dashContainer">
            <main class="content-wrapper bg-light">
              <c:import url="operator_sidebar.jsp" />
              <div class="wrapper">
                <div
                  class="p-4 d-flex flex-column gap-4 overflow-auto"
                  id="pageWrapper"
                >
              <div class="row justify-content-center">
              <div class="col-md-8 col-lg-6">
                <div class="card border-0 shadow-lg rounded-4">
                  <div class="card-body p-5">
                    
                    <div class="text-center mb-4">
                      <div class="bg-primary bg-opacity-10 d-inline-block p-3 rounded-circle mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#0d6efd" class="bi bi-envelope" viewBox="0 0 16 16">
                          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                        </svg>
                      </div>
                      <h2 class="fw-bold">Send your any queries here</h2>
                    </div>
      
                    <form id="contact_form">
                      
                      <div class="mb-3">
                        <label for="subject" class="form-label fw-semibold">Subject</label>
                        <input
                          type="text"
                          class="form-control bg-light border-0 shadow-none p-3"
                          id="subject"
                          name="subject"
                          placeholder="Enter the subject"
                          /* c:out prevents users from injecting ${pageContext} or scripts */
                          value="<c:out value='${param.subject}' default='' />"
                          required
                        />
                      </div>
      
                      <div class="mb-4">
                        <label for="message" class="form-label fw-semibold">Message</label>
                        <textarea
                          class="form-control bg-light border-0 shadow-none p-3"
                          id="message"
                          name="message"
                          placeholder="Write your message here..."
                          style="height: 150px"
                          required
                        ><c:out value='${param.message}' default='' /></textarea>
                      </div>
      
                      <button
                        type="submit"
                        class="btn btn-primary btn-lg w-100 rounded-3 shadow-sm py-3 fw-bold"
                      >
                        Send Message <i class="bi bi-send-fill ms-2"></i>
                      </button>
                      
                    </form>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
              </div>
            </main>
      </div>
    </c:if>
    <script type="module" src="static/js/help.js"></script>
  </body>
</html>
