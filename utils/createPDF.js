const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const homeDir = require('os').homedir();
const sampleData = require('../sampleData');

module.exports = () => {
	const createPDF = currentOrder => {
		const {
			firstName,
			lastName,
			date,
			email,
			phone,
			street,
			city,
			state,
			zip,
			photos,
			notes,
			payment,
			total,
		} = currentOrder;

		const fontFolder = path.join(__dirname, '../assets/fonts');
		const imageFolder = path.join(__dirname, `../assets/img`);
		const directory = `${homeDir}/Orders/PDFs`;
		const doc = new PDFDocument();

		doc.pipe(
			fs.createWriteStream(
				`${directory}/${firstName} ${lastName} - ${date}.pdf`,
			),
		); // write to PDF

		// add stuff to PDF here using methods described below...
		doc.moveDown(5);
		doc.image(`${imageFolder}/logo.png`, 170, 0, {
			align: 'center',
		});
		doc
			.font(`${fontFolder}/Confetti Western.otf`)
			.fillColor('#9A2309')
			.fontSize(30)
			.text('Red Dirt Photography', {
				align: 'center',
			});
		doc
			.font('Helvetica')
			.fillColor('black')
			.fontSize(18)
			.text(`${date}`, {
				align: 'center',
			});
		doc.moveDown(2);
		doc.text(`Name: ${firstName} ${lastName}`, {});
		doc.text(`Email: ${email}`);
		doc.text(`Phone: ${phone}`);
		doc.moveDown(1);
		if (street) doc.text(`Street: ${street}`);
		if (city) doc.text(`City: ${city}`);
		if (state) doc.text(`State: ${state}`);
		if (zip) doc.text(`Zip: ${zip}`);
		doc.moveDown(1);
		doc.text(`Photos: ${photos}`);
		doc.moveDown(1);
		if (notes) doc.text(`Notes: ${notes}`);
		doc.moveDown(1);
		doc.text(`Payment Method: ${payment}`);
		doc.moveDown(2);
		doc.font('Helvetica-Bold').text(`Total: $${total}`, {
			underline: true,
		});

		// finalize the PDF and end the stream
		doc.end();
	};

	createPDF(sampleData[1]);
};
