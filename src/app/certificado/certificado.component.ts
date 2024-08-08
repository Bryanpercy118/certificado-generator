import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css']
})
export class CertificadoComponent {
  studentName: string = '';
  studentId: string = '';
  showCertificate: boolean = false;

  generateCertificate() {
    this.showCertificate = true;
    setTimeout(() => {
      this.downloadPDF();
    }, 1000);
  }

  downloadPDF() {
    const certificate = document.getElementById('certificate');
    if (certificate) {
      html2canvas(certificate).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('certificado.pdf');
      });
    }
  }
}
