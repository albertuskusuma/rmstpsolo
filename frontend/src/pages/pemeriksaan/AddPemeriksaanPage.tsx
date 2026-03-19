import { useNavigate } from "react-router-dom";
import MainLayout from '../../layouts/MainLayout'
import GowCard from '../../comps/card/GowCard'
import GowInput from '../../comps/input/GowInput'
import { useEffect, useMemo, useState } from 'react';
import type { addPasienType } from '../../types/addPasienType';
import GowDropdownSearchArray from '../../comps/dropdown/GowDropdownSearchArray';
import GowDatePickerMask from '../../comps/datepickermask/GowDatePickerMask';
import GowTextArea from '../../comps/textarea/GowTextArea';
import GowButton from '../../comps/button/GowButton';
import type { addPermintaanPemeriksaan, addInputHasilPeriksa, bidangPeriksaObj, jenisPeriksaObj, subPeriksaObj, detailPeriksa } from '../../types/addPemeriksaanType';
import { getAccessToken } from "../../auth/auth";
import api from "../../api/axios";
import { getUser } from "../../types/loginType";
import { showAlert } from "../../comps/sweetalert/SweetAlert";

const AddPemeriksaanPage = () => {

    const navigate = useNavigate();

    const [listPasienByRM, setListPasienByRM] = useState<addPasienType[]>([]);
    const [selectedNoRm, setSelectedNoRm] = useState<addPasienType | null>(null);

    const [getPasien, setGetPasien] = useState<addPasienType>({
        id_pasien: "",
        no_rm: "",
        nama_pasien: "",
        nik: "",
        kategori_pasien: "",
        jenis_kelamin: "",
        dokter_pengirim: "",
        gol_darah: "",
        tanggal_lahir: "",
        status_kawin: "",
        no_hp: "",
        pekerjaan: "",
        no_kk: "",
        nama_ayah: "",
        nama_ibu: "",
        alamat: "",
        nama_petugas: "",
        value: "",
        text: "",
    });

    const [addPermintaanPemeriksaan, setAddPermintaanPemeriksaan] = useState<addPermintaanPemeriksaan>({
        id_analis_pemeriksa: "",
        id_pasien: "0",
        kode_reg: "",
        tanggal_periksa: ""
    });

    const [addInputHasilPeriksa, setAddInputHasilPeriksa] = useState<addInputHasilPeriksa>({
        harga: "",
        hasil: "",
        id_sub_periksa: '0',
        id_tx_pemeriksaan: "0",
        nilai_normal: "",
        tanggal_periksa: new Date().toISOString().split("T")[0].split("-").reverse().join("-")
    });

    const [loading, setLoading] = useState(false);

    const [showFormInputPeriksa, setShowFormInputPeriksa] = useState(false);

    const [listBidang, setListBidang] = useState<bidangPeriksaObj[]>([]);
    const [selectedBidang, setSelectedBidang] = useState<bidangPeriksaObj | null>(null);
    const [selectedJenis, setSelectedJenis] = useState<jenisPeriksaObj | null>(null);
    const [selectedSub, setSelectedSub] = useState<subPeriksaObj | null>(null);

    const [listDetail, setListDetail] = useState<detailPeriksa[]>([]);

    const handleBidangChange = (val: bidangPeriksaObj) => {
        setSelectedBidang(val);
        setSelectedJenis(null); // reset jenis
        setSelectedSub(null);   // reset sub
    };

    const handleJenisChange = (val: jenisPeriksaObj) => {
        setSelectedJenis(val);
        setSelectedSub(null);   // reset sub
    };

    const handleSubChange = (val: subPeriksaObj) => {
        setSelectedSub(val);
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = getAccessToken();
            if (!token) return;

            setLoading(true);

            try {
                // get kode_reg
                const resKode = await api.get("/pasien/getKodeReg");
                if (resKode.data.status === "OK") {
                    setAddPermintaanPemeriksaan(prev => ({
                        ...prev,
                        kode_reg: resKode.data.data?.toString() || ""
                    }));
                }

                // get list pasien
                const res = await api.get("/pasien/getPasiensBySearch?search=");
                if (res.data.status === "OK") {
                    const dataWithPetugas = res.data.data.map((item: any) => ({
                        ...item,
                        nama_petugas: getUser()?.username || ""
                    }));

                    setListPasienByRM(dataWithPetugas);
                    setLoading(false);
                }

                // get master pemeriksaan
                const resMP = await api.get("/transperiksa/getMasterPemeriksaan"); // endpoint backend
                if (resMP.data.status === "OK") {
                    setListBidang(resMP.data.data); // nested data
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                console.error("Error fetching data", error);
                showAlert({
                    icon: "error",
                    title: "Gagal",
                    text: "Error fetching data",
                });
            }
        };

        fetchData();
    }, []);

    const totalHarga = useMemo(() => {
        return listDetail.reduce((total, item) => {
            return total + Number(item.harga || 0);
        }, 0);
    }, [listDetail]);

    const formatRupiah = (angka: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(angka);
    };

    const parseRupiah = (rupiah: string) => {
        return parseFloat(
            rupiah
                .replace(/[^0-9,-]+/g, "") // hapus Rp, spasi, dll
                .replace(/\./g, "")        // hapus titik ribuan
                .replace(",", ".")         // ganti koma jadi titik desimal
        );
    };

    const handleAddPermintaanPemeriksaan = async () => {
        if (addPermintaanPemeriksaan.id_pasien == "0") {
            showAlert({
                icon: "error",
                title: "Gagal",
                text: "Pilih Pasien Dulu",
            });
        } else {
            try {
                const res = await api.post("/transperiksa/addTransPemeriksaanHeader", {
                    kode_reg: addPermintaanPemeriksaan.kode_reg,
                    id_pasien: addPermintaanPemeriksaan.id_pasien,
                    tanggal_periksa: addPermintaanPemeriksaan.tanggal_periksa,
                    is_active: 1,
                    id_analis_pemeriksa: addPermintaanPemeriksaan.id_analis_pemeriksa
                });
                if (res.data.status === "OK") {
                    setAddInputHasilPeriksa(prev => ({
                        ...prev,
                        id_tx_pemeriksaan: res.data['data']['rows']['0']['id_tx_pemeriksaan']
                    }))
                    showAlert({
                        icon: "success",
                        html: `
                        Silahkan Print Formulir<br/>
                        Permintaan Pemeriksaan<br/>
                        berwarna kuning
                    `,
                    });
                    setShowFormInputPeriksa(true);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                console.error("Error fetching data", error);
                showAlert({
                    icon: "error",
                    title: "Gagal",
                    text: "Error fetching data",
                });
            }
        }
    }

    const handleAddInputPemeriksaan = async () => {

        if (addInputHasilPeriksa.id_tx_pemeriksaan == "0"
            || addInputHasilPeriksa.id_sub_periksa == "0"
            || addInputHasilPeriksa.nilai_normal == ""
            || addInputHasilPeriksa.hasil == ""
        ) {
            showAlert({
                icon: "error",
                title: "Gagal",
                text: "Silahkan input hasil periksa",
            });
        } else {
            try {
                const payload = [
                    {
                        harga: parseRupiah(addInputHasilPeriksa.harga),
                        hasil: addInputHasilPeriksa.hasil,
                        id_sub_periksa: addInputHasilPeriksa.id_sub_periksa,
                        id_tx_pemeriksaan: addInputHasilPeriksa.id_tx_pemeriksaan,
                        nilai_normal: addInputHasilPeriksa.nilai_normal,
                    }
                ];

                const res = await api.post("/transperiksa/addTransPemeriksaanDetail", payload);
                if (res.data.status === "OK") {
                    showAlert({
                        icon: "success",
                        html: `Sukses Input Hasil periksa`,
                    });
                    getDetailPemeriksaan()
                    setShowFormInputPeriksa(true);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                console.error("Error fetching data", error);
                showAlert({
                    icon: "error",
                    title: "Gagal",
                    text: "Error fetching data",
                });
            } finally {
                setLoading(false)
            }
        }
    }

    const getDetailPemeriksaan = async () => {

        try {
            const payload =
            {
                kode_reg: addPermintaanPemeriksaan.kode_reg,
            };

            const res = await api.post("/transperiksa/getDetailPemeriksaan", payload);
            if (res.data.status === "OK") {
                setListDetail(res.data['data'])
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.error("Error fetching data", error);
            showAlert({
                icon: "error",
                title: "Gagal",
                text: "Error fetching data",
            });
        } finally {
            setLoading(false)
        }
    }

    const handleHapusHasilPemeriksaanDetail = async (id_tx_detail_pemeriksaanPar: string) => {

        try {
            const payload = {
                id_tx_detail_pemeriksaan: id_tx_detail_pemeriksaanPar,
            }

            const res = await api.post("/transperiksa/hapusHasilPemeriksaanDetail", payload);
            if (res.data.status === "OK") {
                showAlert({
                    icon: "success",
                    html: `Sukses Delete Hasil periksa`,
                });
                getDetailPemeriksaan()
                setShowFormInputPeriksa(true);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.error("Error fetching data", error);
            showAlert({
                icon: "error",
                title: "Gagal",
                text: "Error fetching data",
            });
        } finally {
            setLoading(false)
        }
    }

    const baseUrl = import.meta.env.VITE_API_URL;

    const handlePrintPdfPermintaanPeriksa = async () => {
        setLoading(true);
        try {
            const payload = {
                // kode_reg: "P1", // ganti sesuai kebutuhan
                kode_reg: addPermintaanPemeriksaan.kode_reg
            };

            // Gunakan fetch agar bisa ambil blob PDF
            const response = await fetch(`${baseUrl}/printpdf/getPrintPdfPermintaanPemeriksaanLab`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Gagal mengambil PDF");
            }

            // Ambil PDF sebagai Blob
            const blob = await response.blob();

            // Buat URL sementara untuk buka PDF
            const url = window.URL.createObjectURL(blob);

            // Buka PDF di tab baru
            window.open(url, "_blank");

            return true; // optional, kalau mau pakai return
        } catch (error) {
            console.error("Error fetching PDF", error);
            showAlert({
                icon: "error",
                title: "Gagal",
                text: "Error fetching PDF",
            });
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handlePrintPdfHasilPeriksa = async () => {
        setLoading(true);
        try {
            const payload = {
                // kode_reg: "P1", // ganti sesuai kebutuhan
                kode_reg: addPermintaanPemeriksaan.kode_reg
            };

            // Gunakan fetch agar bisa ambil blob PDF
            const response = await fetch(`${baseUrl}/printpdf/getPrintPdfHasilPemeriksaanLab`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Gagal mengambil PDF");
            }

            // Ambil PDF sebagai Blob
            const blob = await response.blob();

            // Buat URL sementara untuk buka PDF
            const url = window.URL.createObjectURL(blob);

            // Buka PDF di tab baru
            window.open(url, "_blank");

            return true; // optional, kalau mau pakai return
        } catch (error) {
            console.error("Error fetching PDF", error);
            showAlert({
                icon: "error",
                title: "Gagal",
                text: "Error fetching PDF",
            });
            return false;
        } finally {
            setLoading(false);
        }
    };

    return <MainLayout>
        <div>
            <GowCard
                title='Input Permintaan Pemeriksaan'
                bgCard='bg-gray-600'
                children={<>
                    <div className='mb-3'>
                        <GowButton
                            title='Input Pasien Baru'
                            color='bg-blue-400'
                            isDisabled={false}
                            onClick={() => {
                                navigate("/input-pasien")
                            }}
                        />
                    </div>
                    <div className='mb-5'>
                        {/* Kode Reg */}
                        <GowInput
                            id="kode_reg"
                            name="kode_reg"
                            value={addPermintaanPemeriksaan.kode_reg}
                            isDisabled={true}
                            label="Kode Reg"
                            placeholder="Kode Reg"
                            type="text"
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-2 space-y-3">
                            {/* No RM */}
                            <GowDropdownSearchArray
                                list_option={listPasienByRM}
                                selected_option={selectedNoRm}
                                label="No RM"
                                onChange={(val) => {
                                    const pasien = listPasienByRM.find(
                                        (p) => p.no_rm === val.value
                                    );

                                    if (pasien) {
                                        setGetPasien(pasien);
                                        setAddPermintaanPemeriksaan(prev => ({
                                            ...prev,
                                            id_pasien: pasien.id_pasien,
                                            id_analis_pemeriksa: String(getUser()?.id_users),
                                            tanggal_periksa: new Date().toISOString().split("T")[0]
                                        }))
                                        setSelectedNoRm(pasien);
                                    }
                                }}
                                isDisabled={false}
                                id='no_rm'
                                name='no_rm'
                            />

                            {/* Nama Pasien */}
                            <GowInput
                                id="nama_pasien"
                                name="nama_pasien"
                                value={getPasien.nama_pasien}
                                isDisabled={true}
                                label="Nama Pasien"
                                placeholder="Nama Pasien"
                                type="text"
                                onChange={(val) =>
                                    setGetPasien(prev => ({
                                        ...prev,
                                        nama_pasien: val
                                    }))
                                }
                            />

                            {/* NIK */}
                            <GowInput
                                id="nik"
                                name="nik"
                                value={getPasien.nik}
                                isDisabled={true}
                                label="NIK"
                                placeholder="NIK"
                                type="text"
                                onChange={(val) =>
                                    setGetPasien(prev => ({
                                        ...prev,
                                        nik: val
                                    }))
                                }
                            />

                            {/* Kategori Pasien */}
                            <GowInput
                                id="kategori_pasien"
                                name="kategori_pasien"
                                value={getPasien.kategori_pasien}
                                isDisabled={true}
                                label="Kategori Pasien"
                                placeholder="Kategori Pasien"
                                type="text"
                                onChange={(val) =>
                                    setGetPasien(prev => ({
                                        ...prev,
                                        kategori_pasien: val
                                    }))
                                }
                            />

                            {/* Jenis Kelamin */}
                            <GowInput
                                id="jenis_kelamin"
                                name="jenis_kelamin"
                                value={getPasien.jenis_kelamin}
                                isDisabled={true}
                                label="Jenis Kelamin"
                                placeholder="Jenis Kelamin"
                                type="text"
                                onChange={(val) =>
                                    setGetPasien(prev => ({
                                        ...prev,
                                        jenis_kelamin: val
                                    }))
                                }
                            />

                            {/* Dokter Pengirim */}
                            <GowInput
                                id="dokter_pengirim"
                                name="dokter_pengirim"
                                value={getPasien.dokter_pengirim}
                                isDisabled={true}
                                label="Dokter Pengirim"
                                placeholder="Dokter Pengirim"
                                type="text"
                                onChange={(val) =>
                                    setGetPasien(prev => ({
                                        ...prev,
                                        dokter_pengirim: val
                                    }))
                                }
                            />
                        </div>
                        <div className="p-2 space-y-3">
                            {/* Gol Darah */}
                            <GowInput
                                id='gol_darah'
                                name='gol_darah'
                                value={getPasien.gol_darah}
                                isDisabled={true}
                                label='Gol Darah'
                                onChange={(e) => {
                                    setGetPasien(prev => ({
                                        ...prev,
                                        gol_darah: e
                                    }))
                                }}
                                type='text'
                                placeholder='Gol Darah'
                            />

                            {/* Tgl lahir */}
                            <GowDatePickerMask
                                label="Tgl Lahir"
                                value={getPasien.tanggal_lahir}
                                onChange={(val) => {
                                    setGetPasien(prev => ({
                                        ...prev,
                                        tanggal_lahir: val
                                    }));
                                }}
                                isDisabled={true}
                                placeholder='Contoh 15-11-1993'
                            />

                            {/* Status Kawin */}
                            <GowInput
                                id='status_kawin'
                                name='status_kawin'
                                value={getPasien.status_kawin}
                                isDisabled={true}
                                label='Status Kawin'
                                onChange={(e) => {
                                    setGetPasien(prev => ({
                                        ...prev,
                                        status_kawin: e
                                    }))
                                }}
                                type='text'
                                placeholder='Status Kawin'
                            />

                            {/* No Telp */}
                            <GowInput
                                id='no_hp'
                                name='no_hp'
                                value={getPasien.no_hp}
                                isDisabled={true}
                                label='No HP / No Telp'
                                onChange={(e) => {
                                    setGetPasien(prev => ({
                                        ...prev,
                                        no_hp: e
                                    }))
                                }}
                                type='text'
                                placeholder='No HP / No Telp'
                            />

                            {/* Pekerjaan */}
                            <GowInput
                                id='pekerjaan'
                                name='pekerjaan'
                                value={getPasien.pekerjaan}
                                isDisabled={true}
                                label='Pekerjaan'
                                onChange={(e) => {
                                    setGetPasien(prev => ({
                                        ...prev,
                                        pekerjaan: e
                                    }))
                                }}
                                type='text'
                                placeholder='Pekerjaan'
                            />
                        </div>
                        <div className="p-2 space-y-3">
                            {/* No KK */}
                            <GowInput
                                id='no_kk'
                                name='no_kk'
                                value={getPasien.no_kk}
                                isDisabled={true}
                                label='No KK'
                                onChange={(e) => {
                                    setGetPasien(prev => ({
                                        ...prev,
                                        no_kk: e
                                    }))
                                }}
                                type='text'
                                placeholder='No KK'
                            />

                            {/* nama ayah */}
                            <GowInput
                                id='nama_ayah'
                                name='nama_ayah'
                                value={getPasien.nama_ayah}
                                isDisabled={true}
                                label='Nama Ayah'
                                onChange={(e) => {
                                    setGetPasien(prev => ({
                                        ...prev,
                                        nama_ayah: e
                                    }))
                                }}
                                type='text'
                                placeholder='Nama Ayah'
                            />

                            {/* nama ibu */}
                            <GowInput
                                id='nama_ibu'
                                name='nama_ibu'
                                value={getPasien.nama_ibu}
                                isDisabled={true}
                                label='Nama Ibu'
                                onChange={(e) => {
                                    setGetPasien(prev => ({
                                        ...prev,
                                        nama_ibu: e
                                    }))
                                }}
                                type='text'
                                placeholder='Nama Ibu'
                            />

                            {/* Alamat */}
                            <GowTextArea
                                id='alamat'
                                name='alamat'
                                value={getPasien.alamat}
                                isDisabled={true}
                                label='Alamat'
                                onChange={(e) => {
                                    setGetPasien(prev => ({
                                        ...prev,
                                        alamat: e
                                    }))
                                }}
                                placeholder='Alamat'
                            />

                            {/* nama petugas */}
                            <GowInput
                                id='nama_petugas'
                                name='nama_petugas'
                                value={getPasien.nama_petugas}
                                isDisabled={true}
                                label='Nama Petugas'
                                onChange={(e) => {
                                    setGetPasien(prev => ({
                                        ...prev,
                                        nama_petugas: e
                                    }))
                                }}
                                type='text'
                                placeholder='Nama Petugas'
                            />
                        </div>
                    </div>

                    <div className='mt-4 p-2 flex gap-2'>
                        <GowButton
                            title={loading ? 'Process...' : 'Tambahkan Permintaan Pemeriksaan'}
                            isDisabled={false}
                            color="bg-gray-500"
                            onClick={handleAddPermintaanPemeriksaan}
                        />

                        <GowButton
                            title={loading ? "Process" : 'Print Form. Permintaan Pemeriksaan'}
                            isDisabled={false}
                            color="bg-yellow-500"
                            onClick={handlePrintPdfPermintaanPeriksa}
                            // onClick={handlePrintPdfHasilPeriksa}
                        />
                    </div>
                </>}
            />

            {/* space */}
            <div className="mb-6"></div>

            {/* Card Input Hasil Periksa */}
            {showFormInputPeriksa &&
                <GowCard
                    title='Input Hasil Periksa'
                    bgCard='bg-indigo-600'
                    children={
                        <>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="p-2 space-y-3">
                                    {/* Bidang Periksa */}
                                    <GowDropdownSearchArray
                                        list_option={listBidang.map(b => ({ value: b.value, text: b.text }))}
                                        selected_option={selectedBidang ? { value: selectedBidang.value, text: selectedBidang.text } : null}
                                        onChange={(val) => handleBidangChange(listBidang.find(b => b.value === val.value)!)}
                                        label="Bidang Periksa"
                                    />

                                    {/* Nilai Normal */}
                                    <GowTextArea
                                        id='nilai_normal'
                                        name='nilai_normal'
                                        value={addInputHasilPeriksa.nilai_normal}
                                        isDisabled={false}
                                        label='Nilai Normal'
                                        onChange={(e) => {
                                            setAddInputHasilPeriksa(prev => ({
                                                ...prev,
                                                nilai_normal: e
                                            }))
                                        }}
                                        placeholder='Nilai Normal'
                                    />

                                    {/* Hasil Periksa */}
                                    <GowInput
                                        id='hasil_periksa'
                                        name='hasil_periksa'
                                        value={addInputHasilPeriksa.hasil}
                                        isDisabled={false}
                                        label='Hasil Periksa'
                                        onChange={(e) => {
                                            setAddInputHasilPeriksa(prev => ({
                                                ...prev,
                                                hasil: e
                                            }))
                                        }}
                                        type='text'
                                        placeholder='Hasil Periksa'
                                    />
                                </div>

                                <div className="p-2 space-y-3">
                                    {/* Jenis Pemeriksaan */}
                                    <GowDropdownSearchArray
                                        list_option={selectedBidang ? selectedBidang.dataJenis.map(j => ({ value: j.value, text: j.text })) : []}
                                        selected_option={selectedJenis ? { value: selectedJenis.value, text: selectedJenis.text } : null}
                                        onChange={(val) => handleJenisChange(selectedBidang!.dataJenis.find(j => j.value === val.value)!)}
                                        label="Jenis Pemeriksaan"
                                    />

                                    {/* Tanggal Cetak */}
                                    <GowInput
                                        id='tanggal_cetak'
                                        name='tanggal_cetak'
                                        value={addInputHasilPeriksa.tanggal_periksa}
                                        isDisabled={true}
                                        label='Tanggal Cetak'
                                        onChange={(e) => {
                                            setAddInputHasilPeriksa(prev => ({
                                                ...prev,
                                                tanggal_periksa: e
                                            }))
                                        }}
                                        type='text'
                                        placeholder='Tanggal Cetak'
                                    />

                                    {/* Harga */}
                                    <GowInput
                                        id='harga'
                                        name='harga'
                                        value={addInputHasilPeriksa.harga}
                                        isDisabled={true}
                                        label='Harga'
                                        onChange={(e) => {
                                            setAddInputHasilPeriksa(prev => ({
                                                ...prev,
                                                harga: e
                                            }))
                                        }}
                                        type='text'
                                        placeholder='Harga'
                                    />
                                </div>

                                <div className="p-2 space-y-3">
                                    {/* Sub Periksa */}
                                    <GowDropdownSearchArray
                                        list_option={selectedJenis ? selectedJenis.dataSub.map(s => ({ value: s.value, text: s.text })) : []}
                                        selected_option={selectedSub ? { value: selectedSub.value, text: selectedSub.text } : null}
                                        onChange={(val) => {
                                            const selected = selectedJenis!.dataSub.find(s => s.value === val.value);
                                            handleSubChange(selected!);
                                            let parseHarga = formatRupiah(Number(selected?.harga) || 0)
                                            setAddInputHasilPeriksa(prev => ({
                                                ...prev,
                                                harga: parseHarga ?? "",
                                                id_sub_periksa: selected?.value ?? ""
                                            }));
                                        }}
                                        label="Sub Periksa"
                                    />
                                </div>
                            </div>

                            <div className='mt-4 p-2'>
                                <GowButton
                                    title='Tambahkan Hasil Periksa'
                                    isDisabled={false}
                                    color="bg-green-500"
                                    onClick={handleAddInputPemeriksaan}
                                />
                            </div>

                            {/* Table Hasil Periksa */}
                            <h3 className="mt-4 p-2 text-lg font-semibold text-gray-800">
                                Hasil Periksa
                            </h3>
                            <div className="p-2 overflow-x-auto">
                                <table className="min-w-full border border-gray-300 rounded-md">

                                    {/* Header */}
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border px-3 py-2 text-left">No</th>
                                            <th className="border px-3 py-2 text-left">Bidang Periksa</th>
                                            <th className="border px-3 py-2 text-left">Pemeriksaan</th>
                                            <th className="border px-3 py-2 text-left">Sub Periksa</th>
                                            <th className="border px-3 py-2 text-left">Hasil</th>
                                            <th className="border px-3 py-2 text-left">Nilai Normal</th>
                                            <th className="border px-3 py-2 text-left">Harga</th>
                                            <th className="border px-3 py-2 text-center">Aksi</th>
                                        </tr>
                                    </thead>

                                    {/* Body */}
                                    <tbody>
                                        {listDetail && listDetail.length > 0 ? (
                                            listDetail.map((e, i) => (
                                                <tr key={i} className="hover:bg-gray-50">
                                                    <td className="border px-3 py-2">{i + 1}</td>
                                                    <td className="border px-3 py-2">{e.nama_bidang_periksa || "-"}</td>
                                                    <td className="border px-3 py-2">{e.nama_pemeriksaan || "-"}</td>
                                                    <td className="border px-3 py-2">{e.nama_sub_periksa || "-"}</td>
                                                    <td className="border px-3 py-2">{e.hasil || "-"}</td>
                                                    <td className="border px-3 py-2">{e.nilai_normal || "-"}</td>
                                                    <td className="border px-3 py-2 text-right">{formatRupiah(Number(e.harga || 0))}</td>
                                                    {/* Aksi */}
                                                    <td className="border px-3 py-2 text-center">
                                                        <button
                                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                                            onClick={() => handleHapusHasilPemeriksaanDetail(e.id_tx_detail_pemeriksaan)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={8} className="text-center py-2">
                                                    Data tidak ada
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                    {/* Footer (Total) */}
                                    {listDetail && listDetail.length > 0 && (
                                        <tfoot>
                                            <tr className="bg-gray-100 font-semibold">
                                                <td colSpan={6} className="border px-3 py-2 text-right">
                                                    Total Harga
                                                </td>
                                                <td className="border px-3 py-2 text-right">
                                                    {formatRupiah(totalHarga)}
                                                </td>
                                            </tr>
                                        </tfoot>
                                    )}
                                </table>

                                {/* button */}
                                <div className='mt-4 p-2 flex gap-2'>
                                    <GowButton
                                        title={loading ? 'Process' : 'Print Hasil Periksa'}
                                        isDisabled={false}
                                        color="bg-teal-500"
                                        onClick={handlePrintPdfHasilPeriksa}
                                    />

                                    <GowButton
                                        title='Print Kwitansi'
                                        isDisabled={false}
                                        color="bg-orange-500"
                                        onClick={() => {
                                            console.log("Print Kwitansi ", addPermintaanPemeriksaan)
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                    }
                />
            }
        </div>
    </MainLayout>

}

export default AddPemeriksaanPage