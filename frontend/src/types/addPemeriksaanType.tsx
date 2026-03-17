export type addPermintaanPemeriksaan = {
    kode_reg: string,
    id_pasien: string,
    tanggal_periksa: string,
    id_analis_pemeriksa: string,
}

export type addInputHasilPeriksa = {
    id_tx_pemeriksaan:string,
    id_sub_periksa:string,
    hasil:string,
    nilai_normal:string,
    harga:string,
    tanggal_periksa:string,
}