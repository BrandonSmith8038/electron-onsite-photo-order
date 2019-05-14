const fs = require('fs');
const electron = require('electron');
const { BrowserWindow } = require('electron');
const ipcRenderer = require('electron').ipcRenderer;
const path = require('path');
const PDFDocument = require('pdfkit');
const homeDir = require('os').homedir();

module.exports = currentOrder => {
	const pdfDirectory = `${homeDir}/Orders/PDFs`;
	const ordersDirectory = `${homeDir}/Orders`;
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
		paymentMethod,
		total,
	} = currentOrder;

	const fontFolder = path.join(__dirname, '../../../assets/fonts');
	const imageFolder = path.join(__dirname, `../../../assets/img`);
	const doc = new PDFDocument();

	doc.pipe(
		fs.createWriteStream(
			`${pdfDirectory}/${firstName} ${lastName}/${firstName} ${lastName} - ${date}.pdf`,
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
	doc.text(`Payment Method: ${paymentMethod}`);
	doc.moveDown(2);
	doc.font('Helvetica-Bold').text(`Total: $${total}`, {
		underline: true,
	});

	// finalize the PDF and end the stream
	doc.end();
};

// fs.readdir(ordersDirectory, (err, files) => {
// 	if (err) throw err;
// 	for (const file of files) {
// 		if (files.length <= 1) return;
// 		const stats = fs.statSync(path.join(ordersDirectory, file));
// 		if (stats.isFile()) {
// 			fs.readFileSync(path.join(ordersDirectory, file), 'utf8', (err, data) => {
// 				if (err) throw err;
// 				const orderData = JSON.parse(data);
// 				const { firstName, lastName } = orderData;
// 				//TODO: Check If Folders Already Exist
// 				fs.mkdirSync(`${pdfDirectory}/${firstName} ${lastName}/`);
// 				createPDF(orderData);
// 			});
// 		}
// 	}
// });
