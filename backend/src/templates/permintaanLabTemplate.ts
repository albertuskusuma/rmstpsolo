import fs from "fs";
import path from "path";
import { DataPDF } from "../models/printPdfModels";

export const generateHTML = (data: DataPDF): string => {
  const logoPath = path.join(__dirname, "../../public/favicon_smkstpsolo.png");
  const logoBase64 = fs.readFileSync(logoPath, "base64");

  const { header, list_pemeriksaan } = data;

  // Alamat pakai break line
  const alamatHTML = header.alamat
    ?.split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('<br/>');

  const rows = list_pemeriksaan.map((item, index) => `
    <tr>
      <td style="text-align:center;">${index + 1}</td>
      <td style="text-align:center;"></td>
      <td>${item.nama_bidang_periksa}</td>
      <td>${item.nama_pemeriksaan}</td>
      <td>${item.nama_sub_periksa}</td>
    </tr>
  `).join("");

  return `
  <html>
    <head>
      <style>
        body {
          font-family: "Times New Roman", serif;
          margin: 0;
          display: flex;
          justify-content: center;
        }

        .page {
          width: 210mm;
          padding: 20px 25px;
        }

        .title .main {
          font-size: 16px;
          font-weight: bold;
          line-height: 1.2;
        }

        .form-title {
          text-align: center;
          font-weight: bold;
          font-size: 17px;
          margin-top: 15px;
          margin-bottom: 15px;
        }

        .info-wrapper {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .info-left, .info-right {
          font-size: 11px;
        }

        .info-left td, .info-right td {
          padding: 2px 4px;
          line-height: 1.2;
          vertical-align: top;
        }

        .info-left td.label, .info-right td.label {
          width: 120px;
          white-space: nowrap;
        }

        .info-left td.sep, .info-right td.sep {
          width: 5px;
        }

        .info-left td.value, .info-right td.value {
          max-width: 200px;
        }

        table.data {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
          font-size: 13px;
        }

        table.data th {
          border: 1px solid black;
          padding: 4px;
          background: #f2f2f2;
          text-align: center;
        }

        table.data td {
          border: 1px solid black;
          padding: 4px;
        }

        .kop-line {
          width: 100%;
          margin-top: 10px;
        }
      </style>
    </head>

    <body>
      <div class="page">

        <!-- HEADER -->
        <div style="display: flex; justify-content: center;">
          <div style="width: 85%; max-width: 800px;">
            <div style="display: flex; align-items: stretch;">
              <div style="display: flex; align-items: center; margin-right: 25px;">
                <img src="data:image/png;base64,${logoBase64}" 
                     style="height: 100%; max-height: 160px;" />
              </div>
              <div style="flex: 1; text-align: left;">
                <div class="title">
                  <div class="main">YAYASAN SANTO PAULUS SURAKARTA</div>
                  <div class="main">SMK SANTO PAULUS SURAKARTA</div>
                  <table style="margin-top:6px; font-size:13px; border-collapse: collapse;">
                    <tr>
                      <td style="white-space: nowrap; width: 180px; vertical-align: top; padding-right: 5px;">
                        KOMPETENSI KEAHLIAN
                      </td>
                      <td style="width: 10px; vertical-align: top;">:</td>
                      <td style="vertical-align: top;">
                        1. Kimia Industri<br/>
                        2. Teknologi Laboratorium Medik
                      </td>
                    </tr>
                  </table>
                  <div style="margin-top:6px; font-weight:bold; font-size:13px;">
                    TERAKREDITASI B
                  </div>
                  <div style="margin-top:6px; font-size:12px;">
                    Jl. Dr Rajiman 659R Pajang, Surakarta 57146 Telp./Fax. 712594
                  </div>
                  <div style="margin-top:4px; font-size:12px;">
                    Email: 
                    <span style="color: blue; text-decoration: underline;">
                      smksantopaulus@yahoo.com
                    </span>, 
                    <span style="color: blue; text-decoration: underline;">
                      smksantopaulus@gmail.com
                    </span>
                  </div>
                  <div style="margin-top:4px; font-size:12px;">
                    Website: smkstpsolo.sch.id
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- GARIS FULL WIDTH -->
        <div class="kop-line">
          <div style="border-top: 3px solid black;"></div>
          <div style="border-top: 1px solid black; margin-top: 2px;"></div>
        </div>

        <!-- JUDUL -->
        <div class="form-title">
          FORMULIR PERMINTAAN PEMERIKSAAN LABORATORIUM
        </div>

        <!-- INFO PASIEN 2 KOLOM -->
        <div class="info-wrapper">
          <!-- KIRI -->
          <table class="info-left">
            <tr>
              <td class="label">Kode Reg</td><td class="sep">:</td><td class="value">${header.kode_reg ?? '-'}</td>
            </tr>
            <tr>
              <td class="label">Nama Pasien</td><td class="sep">:</td><td class="value">${header.nama_pasien}</td>
            </tr>
            <tr>
              <td class="label">Dokter Pengirim</td><td class="sep">:</td><td class="value">${header.dokter_pengirim}</td>
            </tr>
            <tr>
              <td class="label">Gol Darah</td><td class="sep">:</td><td class="value">${header.gol_darah ?? '-'}</td>
            </tr>
            <tr>
              <td class="label">Status Menikah</td><td class="sep">:</td><td class="value">${header.status_kawin ?? '-'}</td>
            </tr>
            <tr>
              <td class="label">Pekerjaan</td><td class="sep">:</td><td class="value">${header.pekerjaan ?? '-'}</td>
            </tr>
            <tr>
              <td class="label">Nama Ayah</td><td class="sep">:</td><td class="value">${header.nama_ayah ?? '-'}</td>
            </tr>
            <tr>
              <td class="label">Alamat</td><td class="sep">:</td><td class="value">${alamatHTML ?? '-'}</td>
            </tr>
          </table>

          <!-- KANAN -->
          <table class="info-right">
            <tr>
              <td class="label">Tgl Registrasi</td><td class="sep">:</td><td class="value">${header.tanggal_registrasi ?? '-'}</td>
            </tr>
            <tr>
              <td class="label">Kategori Pasien</td><td class="sep">:</td><td class="value">${header.kategori_pasien}</td>
            </tr>
            <tr>
              <td class="label">Jenis Kelamin</td><td class="sep">:</td><td class="value">${header.jenis_kelamin}</td>
            </tr>
            <tr>
              <td class="label">Tgl Lahir</td><td class="sep">:</td><td class="value">${header.tanggal_lahir}</td>
            </tr>
            <tr>
              <td class="label">Telepon</td><td class="sep">:</td><td class="value">${header.no_hp ?? '-'}</td>
            </tr>
            <tr>
              <td class="label">No KK</td><td class="sep">:</td><td class="value">${header.no_kk ?? '-'}</td>
            </tr>
            <tr>
              <td class="label">Nama Ibu</td><td class="sep">:</td><td class="value">${header.nama_ibu ?? '-'}</td>
            </tr>
            <tr>
              <td class="label">Petugas</td><td class="sep">:</td><td class="value">${header.nama_petugas ?? '-'}</td>
            </tr>
          </table>
        </div>

        <!-- TABLE PEMERIKSAAN -->
        <table class="data">
          <thead>
            <tr>
              <th width="40">No</th>
              <th width="120">Centang Disini</th>
              <th>Bidang Periksa</th>
              <th>Pemeriksaan</th>
              <th>Sub Periksa</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>

      </div>
    </body>
  </html>
  `;
};