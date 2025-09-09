/**
 * author - pranav jha
 */

package tlds;

import java.io.IOException;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.JspFragment;
import javax.servlet.jsp.tagext.SimpleTagSupport;
import javax.servlet.jsp.JspWriter;

public class OperatorDashboardLayoutTagHandler extends SimpleTagSupport {
    @Override
    public void doTag() throws JspException, IOException {
        JspWriter out = getJspContext().getOut();

        // Sidebar layout
        out.println("<aside class=\"sidebar bg-white border-end p-5 px-0 d-flex flex-column justify-content-between align-items-center\">");
        out.println("  <div class=\"mb-4\">");
        out.println("    <div style=\"transform: scale(1.35)\">LOGO_PLACEHOLDER</div>");
        out.println("  </div>");
        out.println("  <ul class=\"nav flex-column w-100 p-0 justify-content-center align-items-center\">");

        out.println("    <li class=\"w-100 border-bottom\">");
        out.println("      <a href=\"/bts\" class=\"d-flex justify-content-center text-decoration-none align-items-center gap-2 side-bar-link w-100 py-3 px-2\">");
        out.println("        <img src=\"static/media/images/home.svg\" alt=\"home\" class=\"p-0\" />");
        out.println("        <span class=\"fs-3 fw-medium\" style=\"color: oklch(26.8% 0.007 34.298)\">Home</span>");
        out.println("      </a>");
        out.println("    </li>");

        out.println("    <li class=\"w-100 border-bottom\">");
        out.println("      <a href=\"operator_buses.do\" class=\"d-flex justify-content-center text-decoration-none align-items-center gap-2 side-bar-link w-100 py-3 px-2\">");
        out.println("        <img src=\"static/media/images/bus.svg\" alt=\"bus\" class=\"p-0\" />");
        out.println("        <span class=\"fs-3 fw-medium\" style=\"color: oklch(26.8% 0.007 34.298)\">Buses</span>");
        out.println("      </a>");
        out.println("    </li>");

        out.println("    <li class=\"w-100 border-bottom\">");
        out.println("      <a href=\"#\" class=\"d-flex justify-content-center text-decoration-none align-items-center gap-2 side-bar-link w-100 py-3 px-2\">");
        out.println("        <img src=\"static/media/images/route.svg\" alt=\"route\" class=\"p-0\" />");
        out.println("        <span class=\"fs-3 fw-medium\" style=\"color: oklch(26.8% 0.007 34.298)\">Routes</span>");
        out.println("      </a>");
        out.println("    </li>");

        out.println("    <li class=\"w-100 border-bottom\">");
        out.println("      <a href=\"#\" class=\"d-flex justify-content-center text-decoration-none align-items-center gap-2 side-bar-link w-100 py-3 px-2\">");
        out.println("        <img src=\"static/media/images/account.svg\" alt=\"driver\" class=\"p-0\" />");
        out.println("        <span class=\"fs-3 fw-medium\" style=\"color: oklch(26.8% 0.007 34.298)\">Drivers</span>");
        out.println("      </a>");
        out.println("    </li>");

        out.println("    <li class=\"w-100 border-bottom\">");
        out.println("      <a href=\"#\" class=\"d-flex justify-content-center text-decoration-none align-items-center gap-2 side-bar-link w-100 py-3 px-2\">");
        out.println("        <img src=\"static/media/images/settings.svg\" alt=\"setting\" class=\"p-0\" />");
        out.println("        <span class=\"fs-3 fw-medium\" style=\"color: oklch(26.8% 0.007 34.298)\">Settings</span>");
        out.println("      </a>");
        out.println("    </li>");

        out.println("  </ul>");
        out.println("  <div></div>");
        out.println("</aside>");

        // Render the body content
        JspFragment frag = getJspBody();
        if (frag != null) {
            frag.invoke(out);
        }
    }
}
