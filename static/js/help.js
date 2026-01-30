import { toast } from "./toast.js";
import { createURLParams } from "./util.js";

const subject = document.querySelector("#subject");
const message = document.querySelector("#message");
const form = document.querySelector("#contact_form");

const MIN_SUBJECT_LENGTH = 10;
const MIN_MESSAGE_LENGTH = 10;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!subject) {
    subject.focus();
    toast.error("Subject cannot be empty");
    return;
  }
  if (!message) {
    message.focus();
    toast.error("Message cannot be empty");
    return;
  }

  if (subject.length < MIN_SUBJECT_LENGTH) {
    toast.error(`Subject should be atleast of ${MIN_SUBJECT_LENGTH}`);
    return;
  }
  if (message.length < MIN_MESSAGE_LENGTH) {
    toast.error(`Message should be atleast of ${MIN_MESSAGE_LENGTH}`);
    return;
  }

  try {
    const queryParams = createURLParams({
      message: message.value,
      subject: subject.value,
    });
    const res = await fetch(`send_help_query.do?${queryParams.toString()}`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Internal Server Error");
    const data = await res.text();
    const serverRep = data.trim();

    switch (serverRep) {
      case "ok": {
        toast.success("Your message sent successfully");
        subject.value = "";
        message.value = "";
        break;
      }
      case "no": {
        throw new Error("Invalid Request");
      }
      default: {
        throw new Error("Invalid Request");
      }
    }
  } catch (err) {
    toast.error(err.message);
  }
});
