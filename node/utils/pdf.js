const { v4: uuid } = require("uuid");
const puppeteer = require("puppeteer");

const generatePDF = async (content) => {
	const path = `reports/${uuid()}.pdf`;
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setContent(content);
	await page.pdf({ path, format: "a4", printBackground: true });
	await browser.close();
    return path;
};

module.exports = {
	generatePDF,
};
