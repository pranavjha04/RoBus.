<!-- EMAIL VERIFICATION ALERT -->
<c:if test="${not empty sessionScope.user}">
  <c:if test="${sessionScope.user.status.statusId eq 2}">
    <div class="bg-danger py-2 text-white text-center" style="z-index: 1000">
      <span class="text-white fw-medium fs-5">
        Complete your email verification to unlock everything
        <a
          href="send_verification_email.do"
          class="text-decoration-none link-light"
          >&rightarrow;</a
        >
      </span>
    </div>
  </c:if>
</c:if>
<script type="module" src="static/js/email_verification.js"></script>
