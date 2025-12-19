import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoice = (booking: any) => {
    const doc = new jsPDF();

    // Company Header
    doc.setFontSize(20);
    doc.text("Pferdetransporter-Vermietung Gelpe", 14, 22);

    doc.setFontSize(10);
    doc.text("Bergische Reitsport-Akademie Gelpe", 14, 30);
    doc.text("Dorner Weg 37, 42349 Wuppertal", 14, 35);
    doc.text("Tel: +49 123 456789", 14, 40);
    doc.text("Email: info@pferdetransporter-gelpe.de", 14, 45);

    // Invoice Details
    doc.text(`Rechnung Nr.: ${booking.id.slice(0, 8).toUpperCase()}`, 140, 30);
    doc.text(`Datum: ${new Date().toLocaleDateString("de-DE")}`, 140, 35);
    doc.text(`Kunde:`, 140, 45);
    doc.text(`${booking.customer_first_name} ${booking.customer_last_name}`, 140, 50);
    doc.text(`Buchung: ${new Date(booking.start_date).toLocaleDateString("de-DE")}`, 140, 55);

    // Table
    const tableData = [
        ["Beschreibung", "Betrag"],
        [`Miete (${booking.rental_type})`, `${booking.total_price.toFixed(2)} €`],
        ["MwSt. (19%)", `${(booking.total_price * 0.19).toFixed(2)} €`],
        ["Gesamtbetrag", `${booking.total_price.toFixed(2)} €`]
    ];

    autoTable(doc, {
        startY: 70,
        head: [['Position', 'Betrag']],
        body: [
            [`Pferdetransporter Miete (${booking.rental_type})`, `${(booking.total_price / 1.19).toFixed(2)} €`],
            [`MwSt. 19%`, `${(booking.total_price - (booking.total_price / 1.19)).toFixed(2)} €`],
            [{ content: 'Gesamtbetrag', styles: { fontStyle: 'bold' } }, { content: `${booking.total_price.toFixed(2)} €`, styles: { fontStyle: 'bold' } }]
        ],
        theme: 'grid',
        headStyles: { fillColor: [26, 93, 26] }
    });

    // Footer
    const finalY = (doc as any).lastAutoTable.finalY || 150;
    doc.text("Vielen Dank für Ihre Buchung!", 14, finalY + 20);
    doc.text("Bitte beachten Sie die AGB.", 14, finalY + 25);

    doc.save(`Rechnung_${booking.id.slice(0, 8)}.pdf`);
};
