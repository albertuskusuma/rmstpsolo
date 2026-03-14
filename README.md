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