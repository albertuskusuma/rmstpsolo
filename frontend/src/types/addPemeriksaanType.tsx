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

export type subPeriksaObj = {
    value: string,
    text: string,
    harga: string,
}

export type jenisPeriksaObj = {
    value: string,
    text: string,
    dataSub: subPeriksaObj[]
}

export type bidangPeriksaObj = {
    value: string,
    text: string,
    dataJenis: jenisPeriksaObj[],
    dataSub: subPeriksaObj[]
}

export type detailPeriksa = {
    id_tx_detail_pemeriksaan: string,
    nama_bidang_periksa: string,
    nama_pemeriksaan: string,
    nama_sub_periksa: string,
    hasil: string
    nilai_normal: string,
    harga: string,
}