import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function generatePDF(notes?: string) {
  try {
    // Capture canvas screenshot
    const canvas = document.querySelector("canvas");
    if (!canvas) throw new Error("Canvas not found");

    const screenshot = await html2canvas(canvas);
    const imgData = screenshot.toDataURL("image/png");

    // Create PDF
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    // Add title
    pdf.setFontSize(20);
    pdf.text("SIMVEX 학습 리포트", 15, 15);

    // Add screenshot
    pdf.addImage(imgData, "PNG", 15, 25, 270, 150);

    // Add notes if provided
    if (notes) {
      pdf.addPage();
      pdf.setFontSize(16);
      pdf.text("학습 노트:", 15, 15);
      pdf.setFontSize(12);

      const lines = pdf.splitTextToSize(notes, 270);
      pdf.text(lines, 15, 25);
    }

    // Save file
    const filename = `simvex-report-${new Date().toISOString().split("T")[0]}.pdf`;
    pdf.save(filename);

    return filename;
  } catch (error) {
    console.error("PDF generation failed:", error);
    throw error;
  }
}
