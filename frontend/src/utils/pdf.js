import {jsPDF} from "jspdf"

export const generateComplaintsPDF = async (complaints) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");

    // Add Title
    doc.setFontSize(18);
    doc.text("Pending Complaints Report", 105, 20, { align: "center" });
    doc.setFontSize(12);
    //doc.text("Sorted by Block and Room", 105, 30, { align: "center" });

    // Table Headers
    doc.setFontSize(10);
    doc.text("Block", 10, 50);
    doc.text("Room", 40, 50);
    doc.text("Student", 70, 50);
    doc.text("Description", 110, 50);
    doc.text("Created At", 160, 50);

    let y = 60; // Start position for first complaint

    complaints
      .filter((complaint) => !complaint.is_completed) // Ensure only pending ones are added
      .forEach((complaint, index) => {
        //console.log(`Writing complaint ${index + 1}:`, complaint);

        doc.text(String(complaint.block_id), 10, y);
        doc.text(String(complaint.room), 40, y);
        doc.text(complaint.student_name || "N/A", 70, y);
        
        // Handle description properly
        doc.text(complaint.description || "No description", 110, y, { maxWidth: 60 });

        doc.text(new Date(complaint.created_at).toLocaleString(), 160, y);

        y += 10; // Move to next line
    });

    console.log(" Finalizing PDF...");
    
    doc.save("pending_complaints_report.pdf");
    console.log("PDF Downloaded Successfully");
};
