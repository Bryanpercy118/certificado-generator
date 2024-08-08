import { Component } from '@angular/core';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css']
})
export class CertificadoComponent {
  studentName: string = '';
  studentId: string = '';

  async generateCertificate() {
    const existingPdfBytes = await fetch('/assets/Copia de DIPLOMA Tecnico laboral.docx-1.pdf').then(res =>
      res.arrayBuffer()
    );

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const { width, height } = firstPage.getSize();
    const fontSize = 24;

    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    // Ajustar las coordenadas x e y según sea necesario
    firstPage.drawText(this.studentName, {
      x: 300, // Coordenada x ajustada
      y: height - 250, // Coordenada y ajustada
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(this.studentId, {
      x: 300, // Coordenada x ajustada
      y: height - 300, // Coordenada y ajustada
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'certificado.pdf');
  }
}
