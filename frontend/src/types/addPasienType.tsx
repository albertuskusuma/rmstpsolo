export type addPasienType = {
    id_pasien: string;
    no_rm: string;              // kolom 1
    nama_pasien: string;
    value: string,
    text: string,
    nik: string;
    kategori_pasien: string;
    jenis_kelamin: string;
    dokter_pengirim: string;
    gol_darah: string;
    tanggal_lahir: string;      // bisa pakai string 'YYYY-MM-DD' atau Date
    status_kawin: string;
    no_hp: string;
    pekerjaan: string;
    no_kk: string;
    nama_ayah: string;
    nama_ibu: string;
    alamat: string;
    nama_petugas: string;
};

// export type DropdownOption = {
//     value: string;
//     text: string;
//     fullData?: addPasienType; // optional, untuk simpan data lengkap pasien
// };