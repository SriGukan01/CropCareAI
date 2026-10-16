const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

/**
 * Generates an agricultural diagnostic PDF report using PDFKit.
 * Streams output directly into the writable stream (or response).
 */
const generatePredictionPdf = (prediction, disease, outputStream) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margin: 40,
        info: {
          Title: `Crop Disease Report - ${disease ? disease.name : prediction.finalLabel}`,
          Author: 'AI Crop Disease Diagnostic System',
          Subject: 'Preliminary Phytopathological Analysis'
        }
      });

      doc.pipe(outputStream);

      // Colors
      const primaryDarkGreen = '#1B4332';
      const secondaryGreen = '#2D6A4F';
      const oliveColor = '#6B7F4A';
      const charcoal = '#2D3748';
      const lightBg = '#F3F4F0';

      // --- Header Banner ---
      doc
        .rect(40, 40, 515, 60)
        .fill(primaryDarkGreen);

      doc
        .fillColor('#FFFFFF')
        .fontSize(20)
        .font('Helvetica-Bold')
        .text('CROPCARE AI - DIAGNOSTIC REPORT', 55, 52);

      doc
        .fontSize(10)
        .font('Helvetica')
        .text(`Generated: ${new Date(prediction.createdAt || Date.now()).toLocaleDateString('en-US', { dateStyle: 'full' })}`, 55, 78);

      doc.moveDown(2);

      // --- Disclaimer Box (MANDATORY) ---
      const disclaimerY = 115;
      doc
        .rect(40, disclaimerY, 515, 36)
        .fill('#FEF3C7')
        .stroke('#F59E0B');

      doc
        .fillColor('#92400E')
        .fontSize(9.5)
        .font('Helvetica-Bold')
        .text(
          'DISCLAIMER: This is a preliminary AI prediction and does not replace expert agricultural diagnosis.',
          50,
          disclaimerY + 12,
          { width: 495, align: 'center' }
        );

      let currentY = 165;

      // --- Prediction Summary Card ---
      doc
        .roundedRect(40, currentY, 515, 80, 6)
        .fill(lightBg);

      const isHealthy = disease ? disease.isHealthy : prediction.finalLabel.toLowerCase().includes('healthy');
      const badgeColor = isHealthy ? '#059669' : '#DC2626';
      const badgeText = isHealthy ? 'HEALTHY' : 'DISEASE DETECTED';

      const cleanDiseaseName = (function() {
        const raw = disease ? disease.name : prediction.finalLabel;
        if (!raw) return 'Unknown Pathology';
        const part = raw.includes('___') ? raw.split('___')[1] : raw;
        const cleaned = part.replace(/^(Pepper|Tomato|Potato|Apple|Corn|Grape|Peach|Cherry|Strawberry|Squash|Orange|Blueberry|Raspberry|Soybean)\s+/i, '').replace(/_/g, ' ').trim();
        return cleaned.toLowerCase() === 'healthy' ? 'Healthy Foliage (No Disease Detected)' : cleaned;
      })();

      doc
        .fillColor(primaryDarkGreen)
        .fontSize(14)
        .font('Helvetica-Bold')
        .text(cleanDiseaseName, 55, currentY + 14);

      doc
        .fillColor(oliveColor)
        .fontSize(11)
        .font('Helvetica')
        .text(`Crop: ${disease && disease.crop ? disease.crop.name : 'Crop Leaf'} | Status: `, 55, currentY + 36);

      // Badge
      doc
        .fillColor(badgeColor)
        .font('Helvetica-Bold')
        .text(badgeText, 215, currentY + 36);

      // Confidence
      const confPct = Math.round((prediction.confidence || 0) * 100);
      doc
        .fillColor(charcoal)
        .font('Helvetica')
        .text(`AI Confidence: ${confPct}% (Classification: ${prediction.status || 'confident'})`, 55, currentY + 54);

      currentY += 95;

      // --- Images Section (Original vs Grad-CAM Heatmap) ---
      const uploadsDir = path.join(__dirname, '..', '..');
      let origImgPath = prediction.imagePath ? path.join(uploadsDir, prediction.imagePath) : null;
      let heatImgPath = prediction.heatmapPath ? path.join(uploadsDir, prediction.heatmapPath) : null;

      const hasOrig = origImgPath && fs.existsSync(origImgPath);
      const hasHeat = heatImgPath && fs.existsSync(heatImgPath);

      if (hasOrig || hasHeat) {
        doc
          .fillColor(primaryDarkGreen)
          .fontSize(12)
          .font('Helvetica-Bold')
          .text('VISUAL INSPECTION & EXPLAINABLE AI (GRAD-CAM)', 40, currentY);

        currentY += 18;

        const imgWidth = 230;
        const imgHeight = 150;

        if (hasOrig) {
          try {
            doc.image(origImgPath, 50, currentY, { width: imgWidth, height: imgHeight, fit: [imgWidth, imgHeight] });
            doc
              .fontSize(9)
              .fillColor(charcoal)
              .font('Helvetica')
              .text('Original Leaf Photo', 50, currentY + imgHeight + 4, { width: imgWidth, align: 'center' });
          } catch (e) {
            logger.warn(`Could not render original image in PDF: ${e.message}`);
          }
        }

        if (hasHeat) {
          try {
            doc.image(heatImgPath, 310, currentY, { width: imgWidth, height: imgHeight, fit: [imgWidth, imgHeight] });
            doc
              .fontSize(9)
              .fillColor(charcoal)
              .font('Helvetica')
              .text('Grad-CAM Heatmap (Highlighted Focus Areas)', 310, currentY + imgHeight + 4, { width: imgWidth, align: 'center' });
          } catch (e) {
            logger.warn(`Could not render heatmap image in PDF: ${e.message}`);
          }
        }

        currentY += imgHeight + 25;
      }

      // --- Top Predictions Breakdown ---
      if (prediction.topPredictions && prediction.topPredictions.length > 0) {
        doc
          .fillColor(primaryDarkGreen)
          .fontSize(11)
          .font('Helvetica-Bold')
          .text('Top Model Predictions:', 40, currentY);
        currentY += 14;

        prediction.topPredictions.forEach((pred, i) => {
          const raw = pred.disease || (pred.label.includes('___') ? pred.label.split('___')[1] : pred.label);
          const labelClean = raw.replace(/_/g, ' ').trim();
          const pct = Math.round(pred.confidence * 100);
          doc
            .fillColor(charcoal)
            .fontSize(9.5)
            .font('Helvetica')
            .text(`${i + 1}. ${labelClean}: ${pct}%`, 55, currentY);
          currentY += 13;
        });
        currentY += 10;
      }

      // Check page break for disease details
      if (currentY > 620) {
        doc.addPage();
        currentY = 40;
      }

      // --- Disease Details & Treatment Guidance ---
      if (disease) {
        // Description
        doc
          .fillColor(primaryDarkGreen)
          .fontSize(12)
          .font('Helvetica-Bold')
          .text('DISEASE DESCRIPTION', 40, currentY);
        currentY += 15;

        doc
          .fillColor(charcoal)
          .fontSize(9.5)
          .font('Helvetica')
          .text(disease.description || 'No description provided.', 40, currentY, { width: 515, lineGap: 3 });
        currentY = doc.y + 12;

        // Symptoms & Causes
        if (disease.symptoms && disease.symptoms.length > 0) {
          if (currentY > 700) { doc.addPage(); currentY = 40; }
          doc.fillColor(secondaryGreen).fontSize(11).font('Helvetica-Bold').text('Key Symptoms:', 40, currentY);
          currentY += 14;
          disease.symptoms.forEach(s => {
            doc.fillColor(charcoal).fontSize(9).font('Helvetica').text(`• ${s}`, 55, currentY, { width: 500 });
            currentY = doc.y + 2;
          });
          currentY += 6;
        }

        // Prevention
        if (disease.prevention && disease.prevention.length > 0) {
          if (currentY > 700) { doc.addPage(); currentY = 40; }
          doc.fillColor(secondaryGreen).fontSize(11).font('Helvetica-Bold').text('Prevention & Cultural Sanitation:', 40, currentY);
          currentY += 14;
          disease.prevention.forEach(p => {
            doc.fillColor(charcoal).fontSize(9).font('Helvetica').text(`• ${p}`, 55, currentY, { width: 500 });
            currentY = doc.y + 2;
          });
          currentY += 6;
        }

        // Organic Treatment
        if (disease.organicTreatment && disease.organicTreatment.length > 0) {
          if (currentY > 700) { doc.addPage(); currentY = 40; }
          doc.fillColor(secondaryGreen).fontSize(11).font('Helvetica-Bold').text('Organic & Biological Controls:', 40, currentY);
          currentY += 14;
          disease.organicTreatment.forEach(t => {
            doc.fillColor(charcoal).fontSize(9).font('Helvetica').text(`• ${t}`, 55, currentY, { width: 500 });
            currentY = doc.y + 2;
          });
          currentY += 6;
        }

        // Chemical Treatment
        if (disease.chemicalTreatment && disease.chemicalTreatment.length > 0) {
          if (currentY > 700) { doc.addPage(); currentY = 40; }
          doc.fillColor(secondaryGreen).fontSize(11).font('Helvetica-Bold').text('Chemical & Fungicidal Interventions:', 40, currentY);
          currentY += 14;
          disease.chemicalTreatment.forEach(c => {
            doc.fillColor(charcoal).fontSize(9).font('Helvetica').text(`• ${c}`, 55, currentY, { width: 500 });
            currentY = doc.y + 2;
          });
          currentY += 6;
        }
      }

      // --- Footer ---
      const pageHeight = doc.page.height;
      doc
        .fontSize(8)
        .fillColor('#9CA3AF')
        .text('CropCare AI • Sustainable Agriculture • Verified ML Screening System', 40, pageHeight - 30, { align: 'center', width: 515 });

      doc.end();

      outputStream.on('finish', () => resolve());
      outputStream.on('error', err => reject(err));
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  generatePredictionPdf
};
