import { toast } from "./toast.js";
const verifyEmailBtn = document.querySelector("#verify_email_btn");
const sendVerificationEmailRequest = async () => {
  const res = await fetch(`send_verification_email.do`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Internal Server Error");
  const data = await res.text();
  return data.trim();
};

const sendVerifiyEmailRequestHandler = async () => {
  try {
    verifyEmailBtn.disabled = true;
    const response = await sendVerificationEmailRequest();
    if (response === "internal") {
      throw new Error("Internal Server Error");
    } else if (response === "invalid") {
      throw new Error("Invalid Request");
    } else if (response.startsWith("Verification")) {
      toast.success(response);
      verifyEmailBtn.disabled = false;
    }
  } catch (err) {
    verifyEmailBtn.disabled = false;
    toast.error(err.message);
  }
};

verifyEmailBtn.addEventListener("click", () => {
  sendVerifiyEmailRequestHandler();
});
