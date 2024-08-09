import { Component, OnInit } from '@angular/core';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css']
})
export class CertificadoComponent implements OnInit {
  studentName: string = '';
  studentId: string = '';
  currentDate: string = '';

  constructor() {
    this.currentDate = this.getCurrentDate();
  }

  ngOnInit(): void {
    this.setStudentNameFromUrl();
  }

  // Función para extraer y asignar el nombre del estudiante desde la URL
  setStudentNameFromUrl(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const nameFromUrl = urlParams.get('nombre');
    if (nameFromUrl) {
      this.studentName = decodeURIComponent(nameFromUrl).toUpperCase();  // Asegura que el nombre esté en mayúsculas
    }
  }

  getCurrentDate(): string {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = today.toLocaleString('default', { month: 'long' });
    const year = today.getFullYear();
    return `${day} de ${month} de ${year}`;
  }

  async generateCertificate() {
    const existingPdfBytes = await fetch('/assets/DTL.pdf').then(res =>
      res.arrayBuffer()
    );

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const { width, height } = firstPage.getSize();
    const fontSize = 17;
    const fontTI = 14;
    const fontDate = 10;

    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    // Ajustar las coordenadas x e y según sea necesario
    firstPage.drawText(this.studentName, {
      x: 167, // Coordenada x ajustada
      y: height - 460, // Coordenada y ajustada
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(this.studentId, {
      x: 216, // Coordenada x ajustada
      y: height - 483, // Coordenada y ajustada
      size: fontTI,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    // Añadir la fecha actual
    firstPage.drawText(this.currentDate, {
      x: 333, // Coordenada x ajustada
      y: height - 574, // Coordenada y ajustada
      size: fontDate,
      font: timesRomanFont,
      color: rgb(0, 0, 0.2), // Color actualizado
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'certificado.pdf');
  }
}
