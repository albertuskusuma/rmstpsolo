import * as printPdfModels from "../models/printPdfModels"
import puppeteer from "puppeteer";
import { generateHTML } from "../templates/permintaanLabTemplate";
import { generateHTMLHasilLab } from "../templates/hasilLabTemplate";

export const getPrintPdfPermintaanPemeriksaanLab = async (kode_reg: string) => {

    const result = await printPdfModels.getPrintPdfPermintaanPemeriksaanLab(kode_reg);
    // console.log(result)

    // FIX: ambil .data
    const html = generateHTML(result);
    // console.log(html)

    const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
            top: "10mm",
            right: "10mm",
            bottom: "10mm",
            left: "10mm",
        },
    });

    await browser.close();

    return pdf;
};

export const getPrintPdfHasilPemeriksaanLab = async (kode_reg: string) => {
    const result =  await printPdfModels.getPrintPdfHasilPemeriksaanLab(kode_reg)

    // FIX: ambil .data
    const html = generateHTMLHasilLab(result);
    // console.log(html)

    const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
            top: "10mm",
            right: "10mm",
            bottom: "10mm",
            left: "10mm",
        },
    });

    await browser.close();

    return pdf;
}

export const getPrintPdfBayarLab = async (kode_reg: string) => {
    return await printPdfModels.getPrintPdfBayarLab(kode_reg)
}