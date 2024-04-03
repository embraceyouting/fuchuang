const { v4: uuid } = require("uuid");
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

fs.existsSync(path.resolve(__dirname, "../public/pdf")) || fs.mkdirSync(path.resolve(__dirname, "../public/pdf"), { recursive: true });

const style = `<style>${fs.readFileSync(path.resolve(__dirname, "../assets/css/base.css"), "utf-8")}</style>`
const echartJs = `<script>${fs.readFileSync(path.resolve(__dirname, "../assets/js/echarts.min.js"), "utf-8")}</script>`;
const echartComponent = fs.readFileSync(path.resolve(__dirname, "../assets/html/echart.html"), "utf-8")

async function generatePDF(html, data) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	html += style;
	html = '<h1>问题分析</h1>\n' + echartJs + `<script>const data = ${data}</script>` + echartComponent + html;
	fs.writeFileSync(path.resolve(__dirname, "../public/pdf", "echart.html"), html);
	await page.setContent(html);

	const pdfPath = `pdf/${uuid()}.pdf`;
	await page.pdf({
		path: path.resolve(__dirname, "../public", pdfPath),
		format: "A4",
		printBackground: true,
		margin: {
			top: '1.5cm',
			right: '1.2cm',
			bottom: '1.5cm',
			left: '1.2cm',
		},
		preferCSSPageSize: true,
	});

	await browser.close();

	return pdfPath;
}

module.exports = {
	generatePDF,
};
