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