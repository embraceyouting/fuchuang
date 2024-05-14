const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const { upload } = require("./upload");
const crypto = require("crypto");
const axios = require("axios");
// const chromium = require('chrome-aws-lambda');

const assetsDir = path.resolve(process.cwd(), "assets");

const style = `<style>${fs.readFileSync(path.resolve(assetsDir, "./css/base.css"), "utf-8")}</style>`
const echartJs = `<script>${fs.readFileSync(path.resolve(assetsDir, "./js/echarts.min.js"), "utf-8")}</script>`;
const echartComponent = fs.readFileSync(path.resolve(assetsDir, "./html/echart.html"), "utf-8")

function hashBuffer(buffer) {
	const hash = crypto.createHash("sha256");
	hash.update(buffer);
	return hash.digest("hex");
}

async function generatePDF(html, data) {
	const name = hashBuffer(Buffer.from(html));
	const onlineUrl = `https://flyview-1321329206.cos.ap-beijing.myqcloud.com/${name}.pdf`;
	const res = await axios.get(onlineUrl).catch(() => ({status: 404}));
	if (res.status === 200) {
		return onlineUrl;
	}
	const browser = await puppeteer.launch()
	// const browser = await chromium.puppeteer.launch({
	// 	args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
	// 	defaultViewport: chromium.defaultViewport,
	// 	executablePath: await chromium.executablePath,
	// 	headless: true,
	// 	ignoreHTTPSErrors: true,
	// })
	const page = await browser.newPage();

	html += style;
	html = '<h1>问题分析</h1>\n' + echartJs + `<script>const data = ${data}</script>` + echartComponent + html;
	await page.setContent(html);

	const buffer = await page.pdf({
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

	const url = await upload(buffer, `${name}.pdf`, "application/pdf");
	await browser.close();
	return url;
}

module.exports = {
	generatePDF,
};
