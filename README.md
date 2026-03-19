# rmstpsolo
Aplikasi Simple Rekam Medis dengan backend Node JS (Express JS) front end React database PostgreSQL.

# Step 1 : 
buat folder backend jalankan ini
npm init -y
npm install express cors
npm install -D typescript ts-node-dev @types/node @types/express
npm install -D @types/cors

mkdir src
mkdir src/controllers
mkdir src/routes
mkdir src/services
mkdir src/index.ts

ubah tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "strict": true
  }
}

ubah package.json
"scripts": {
    "dev": "ts-node-dev src/index.ts"
},

# Step 2 : Koneksi ke database PostgreSQL, read data pasien
mkdir src/config
mkdir src/models
npm install pg
npm install -D @types/pg

buat proses get data pasien by search

# Step 3 : generated no rm
proses generated no rm "RM"+id_pasien+tanggalsekarang

# Step 4 : generated kode reg, perbaikan checking generated no rm
proses generated kode reg "P"+id_tx_periksa+1, perbaikan checking generated no rm

# Step 5 : Tambahkan Permintaan Pemeriksaan
proses input pemeriksaan di tx_pemeriksaan sbg header

# Step 6 : Tambahkan Hasil Pemeriksaan
proses input hasil pemeriksaan di tx_detail_pemeriksaan berdasarkan id_tx_pemeriksaan

# Step 7 : Hapus Hasil Pemeriksaan
proses update is_active = 0 di tx_detail_pemeriksaan berdasarkan
id_detail_pemeriksaan

# Step 8 : Query Print PDF Permintaan Pemeriksaan Laboratorium
query untuk print PDF permintaan pemeriksaan laboratorium

# Step 9 : Query Hasil Pemeriksaan Laboratorium
query untuk hasil pemeriksaan laboratorium

# Step 10 : Query Hasil Bayar 
query untuk hasil Bayar 

# Step 11 : Login & Logout pakai JWT, setting pake .env
npm install express cors dotenv bcrypt jsonwebtoken cookie-parser pg

npm install -D typescript ts-node-dev \
@types/node \
@types/express \
@types/cors \
@types/bcrypt \
@types/jsonwebtoken \
@types/cookie-parser

proses login dan logout pakai JWT biasa username dan password

# Step 12 : Install frontend React Typescript
npm create vite@latest frontend

# Step 13 : Install Tailwind versi 3.4.17
npm install
npm install -D tailwindcss@3
npx tailwindcss init -p
npm install -D tailwindcss postcss autoprefixer
di tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

di index.css ganti
@tailwind base;
@tailwind components;
@tailwind utilities;

di index.html
<link href="src/output.css" rel="stylesheet">
test komponen
<a href="#" className="font-bold text-white bg-orange-400 rounded-full px-5 py-3">
  View Profile
</a>

# Step 14 : Slicing UI header, footer, sidebar, content untuk halaman dashboard
proses slicing UI only

# Step 15 : Add router link untuk page
npm install react-router-dom
npm install -D @types/react-router-dom
atur link untuk login, dashboard, input pemeriksaan

# Step 16 : Slicing component form input text, number, search dropdown array
slicing all component form : input text, number,
search dropdown array,

# Step 17 : make own component search dropdown array
buat komponen baru dropdown search array

# Step 18 : make own component input text, email, number
buat komponen input yg bukan date picker

# Step 19 : make own component input date mask, placeholder italic
buat komponen input date mask, placeholder italic

# Step 20 : rename folder datepicker into datepickermask
ubah nama folder datepicker jadi datepickermask

# Step 21 : make own component card, textarea, button, fix bug dropdownsearch and slicing UI add new pasien, add input pemeriksaan
buat komponen card kosongan, textarea, button, fix bug dropdownsearch dan slicing form add new pasien add input pemeriksaan

# Step 22 : slicing UI login page
buat UI login page

# Step 23 : proses login into BE using axios, logout, protecting route, check accessToken & refreshToken, cookie parser
proses login ke BE pakai axios, protecting route, check accessToken & refreshToken
install di BE npm install cookie-parser, npm i --save-dev @types/cookie-parser

# Step 24 : selected kode_reg, no_rm, populate every biodata pasien from no_rm selected
proses get kode_reg dan get data pasien by no_rm

# Step 25 : make own component custom sweet alert, add permintaan pemeriksaan, add hasil periksa, delete periksa
tambahkan sweet alert npm install sweetalert2 sweetalert2-react-content
buat get data master pemeriksaan
biat get data detail hasil periksa by kode_reg
add permintaan pemeriksaan, add hasil periksa, delete periksa

# Step 25 : slicing print form permintaan using pupeteer, tester print form permintaan
install pupeteer  npm install puppeteer
slicing print form permintaan