import { jsPDF } from "jspdf";

export default function generateTicket(data) {
  const doc = new jsPDF({
    orientation: "l",
    format: "a5"
  });

  const pageConfig = {
    margin: 20,
    currentYpos: 0,
    currentXpos: 0,
    infoXpos: 55,
    infoWidth: 100
  };

  // Left sidebar
  pageConfig.currentYpos += pageConfig.margin;

  doc.setFont("helvetica");
  doc.setFontSize(16);

  doc.text("Ticket", pageConfig.margin, pageConfig.currentYpos);

  pageConfig.currentYpos += 30;

  doc.addImage(
    data.barcode,
    "PNG",
    pageConfig.margin,
    pageConfig.currentYpos,
    15,
    50
  );

  // Main info section
  pageConfig.currentYpos = pageConfig.margin;
  pageConfig.currentXpos = pageConfig.infoXpos;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(
    data.title.toUpperCase(),
    pageConfig.currentXpos,
    pageConfig.currentYpos
  );

  pageConfig.currentYpos += 15;

  this.infoText(doc, pageConfig, "Date:", data.date);
  pageConfig.currentYpos += 10;
  this.infoText(doc, pageConfig, "Session:", data.time);
  pageConfig.currentYpos += 10;
  this.infoText(doc, pageConfig, "Venue:", data.venue);
  pageConfig.currentYpos += 10;
  this.infoText(doc, pageConfig, "Section:", data.section);
  pageConfig.currentYpos += 20;
  this.infoText(doc, pageConfig, "Adults -", data.adults);
  pageConfig.currentYpos += 10;
  this.infoText(doc, pageConfig, "Concession -", data.concession);
  pageConfig.currentYpos += 10;
  this.infoText(doc, pageConfig, "Child/VCCA Member -", data.childOrVCCA);
  pageConfig.currentYpos += 10;

  doc.setFontSize(12);
  doc.text(
    data.admissionType.toUpperCase(),
    pageConfig.infoXpos + pageConfig.infoWidth / 2,
    pageConfig.currentYpos,
    { align: "center" }
  );

  // Competition pro logo
  doc.addImage(
    data.logo,
    "PNG",
    pageConfig.infoXpos + pageConfig.infoWidth + 20,
    pageConfig.margin,
    20,
    20
  );
  doc.setFontSize(5);

  doc.text(
    "COMPETITIONPRO",
    pageConfig.infoXpos + pageConfig.infoWidth + 30,
    pageConfig.margin + 22,
    { align: "center" }
  );

  doc.save("ticket.pdf");
}

function infoText(doc, pageConfig, key, value) {
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(key, pageConfig.currentXpos, pageConfig.currentYpos);
  doc.setFont("helvetica", "normal");
  doc.text(
    value,
    pageConfig.currentXpos + pageConfig.infoWidth,
    pageConfig.currentYpos,
    {
      align: "right"
    }
  );
}
