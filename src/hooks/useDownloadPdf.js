import html2canvas from 'html2canvas';
import { jsPDF as JsPDF } from 'jspdf';
import { useCallback, useEffect } from 'react';

export const DownloadPdf = (name, isReady,element) => {
    if (isReady) {
        const fileName = `${name}.pdf`;
        const pdf = new JsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts: true,
        });
        Promise.all(
           async()=>
           {
            const canvas = await html2canvas(element);
            element.replaceWith(canvas);
           },
          ).then(() => {
            console.log({element})
            pdf.html(element, {
              callback: (generatedPdf) => {
                generatedPdf.save(fileName)
              },
            });
          });
      }
}
