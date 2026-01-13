package listeners;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import javax.servlet.http.HttpSession;
import javax.servlet.annotation.WebListener;

import java.util.Enumeration;

import models.User;
import models.Operator;

@WebListener
public class SessionListener extends HttpSessionListener {
    
    @Override
    public void sessionDestroyed(HttpSessionEvent se) {
        HttpSession session = se.getSession();

        if(session.getAttribute("user") != null) {
            User user = (User) session.getAttribute("user");
            if(user.getStatus().getStatusId().equals(2)) {
                User.updateVerificationCode(null, user.getUserId());
            }
        }
        else if(session.getAttribute("operator") != null) {
            Operator operator = (Operator) session.getAttribute("operator");
            if(operator.getStatus().getStatusId().equals(2)) {
                Operator.updateVerificationCode(null, operator.getOperatorId());
            }
        }

        Enumeration<String> attributes = session.getAttributeNames();

        while(attributes.hasMoreElements()) {
            session.removeAttribute(attributes.nextElement());
        }
    }
}