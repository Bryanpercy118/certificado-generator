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
  currentDate: string = '';

  constructor() {
    this.currentDate = this.getCurrentDate();
  }

  getCurrentDate(): string {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = today.toLocaleString('default', { month: 'long' });
    const year = today.getFullYear();
    return `${day} de ${month} de ${year}`;
  }

  async generateCertificate() {
    const existingPdfBytes = await fetch('/assets/Copia de DIPLOMA Tecnico laboral.docx-1.pdf').then(res =>
      res.arrayBuffer()
    );

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const { width, height } = firstPage.getSize();
    const fontSize = 20;
    const fontDate = 10;

    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    // Ajustar las coordenadas x e y según sea necesario
    firstPage.drawText(this.studentName, {
      x: 170, // Coordenada x ajustada
      y: height - 470, // Coordenada y ajustada
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(this.studentId, {
      x: 236, // Coordenada x ajustada
      y: height - 492, // Coordenada y ajustada
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    // Añadir la fecha actual
    firstPage.drawText(this.currentDate, {
      x: 380, // Coordenada x ajustada
      y: height - 583, // Coordenada y ajustada
      size: fontDate,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'certificado.pdf');
  }
}
