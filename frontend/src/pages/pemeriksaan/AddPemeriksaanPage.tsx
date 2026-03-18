import { useNavigate } from "react-router-dom";
import MainLayout from '../../layouts/MainLayout'
import GowCard from '../../comps/card/GowCard'
import GowInput from '../../comps/input/GowInput'
import { useEffect, useState } from 'react';
import type { addPasienType, DropdownOption } from '../../types/addPasienType';
import GowDropdownSearchArray from '../../comps/dropdown/GowDropdownSearchArray';
import GowDatePickerMask from '../../comps/datepickermask/GowDatePickerMask';
import GowTextArea from '../../comps/textarea/GowTextArea';
import GowButton from '../../comps/button/GowButton';
import type { addPermintaanPemeriksaan, addInputHasilPeriksa } from '../../types/addPemeriksaanType';
import { getAccessToken } from "../../auth/auth";
import api from "../../api/axios";
import { getUser } from "../../types/loginType";

const AddPemeriksaanPage = () => {

    const navigate = useNavigate();

    const jenis_kelamin_arr = [
        { value: "default", text: "Pilih Jenis Kelamin" },
        { value: "Laki-laki", text: "Laki-laki" },
        { value: "Perempuan", text: "Perempuan" }
    ];

    const [selectedJenisKelamin, setSelectedJenisKelamin] = useState(jenis_kelamin_arr[0]);

    const [listPasienByRM, setListPasienByRM] = useState<addPasienType[]>([]);
    const [selectedNoRm, setSelectedNoRm] = useState<addPasienType | null>(null);

    const status_kawin_arr = [
        { value: "default", text: "Pilih Status Kawin" },
        { value: "Kawin", text: "Kawin" },
        { value: "Belum Kawin", text: "Belum Kawin" }
    ];

    const [selectedStatusKawin, setSelectedStatusKawin] = useState(status_kawin_arr[0]);

    const bidang_periksa_arr = [
        { value: "default", text: "Pilih Bidang Periksa" },
        { value: "HEMATOLOGI", text: "HEMATOLOGI" },
        { value: "IMUNOLOGI", text: "IMUNOLOGI" }
    ];

    const [selectedBidangPeriksa, setSelectedBidangPeriksa] = useState(bidang_periksa_arr[0]);

    const jenis_pemeriksaan_arr = [
        { value: "default", text: "Pilih Jenis Pemeriksaan" },
        { value: "DARAH LENGKAP", text: "DARAH LENGKAP" },
        { value: "COVID-19", text: "COVID-19" }
    ];

    const [selectedJenisPemeriksaan, setSelectedJenisPemeriksaan] = useState(jenis_pemeriksaan_arr[0]);

    const sub_periksa_arr = [
        { value: "default", text: "Pilih Sub Periksa" },
        { value: "HEMOGLOBIN", text: "HEMOGLOBIN" },
        { value: "RAPID ANTIBODI", text: "RAPID ANTIBODI" }
    ];

    const [selectedSubPeriksa, setSelectedSubPeriksa] = useState(sub_periksa_arr[0]);

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
        id_pasien: "",
        kode_reg: "",
        tanggal_periksa: ""
    });

    const [addInputHasilPeriksa, setAddInputHasilPeriksa] = useState<addInputHasilPeriksa>({
        harga: "",
        hasil: "",
        id_sub_periksa: '',
        id_tx_pemeriksaan: "",
        nilai_normal: "",
        tanggal_periksa: ""
    });

    const [loading, setLoading] = useState(false);

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
            } catch (error) {
                setLoading(false);
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, []);

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
                            title='Tambahkan Permintaan Pemeriksaan'
                            isDisabled={false}
                            color="bg-gray-500"
                            onClick={() => {
                                console.log("Inputan Permintaan Pemeriksaan ", addPermintaanPemeriksaan)
                            }}
                        />

                        <GowButton
                            title='Print Form. Permintaan Pemeriksaan'
                            isDisabled={false}
                            color="bg-yellow-500"
                            onClick={() => {
                                console.log("Inputan Permintaan Pemeriksaan ", addPermintaanPemeriksaan)
                            }}
                        />
                    </div>
                </>}
            />

            {/* space */}
            <div className="mb-6"></div>

            {/* Card Input Hasil Periksa */}
            <GowCard
                title='Input Hasil Periksa'
                bgCard='bg-indigo-600'
                children={
                    <>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="p-2 space-y-3">
                                {/* Bidang Periksa */}
                                <GowDropdownSearchArray
                                    list_option={bidang_periksa_arr}
                                    selected_option={selectedBidangPeriksa}
                                    label="Bidang Periksa"
                                    onChange={(val) => {
                                        setSelectedBidangPeriksa(val);
                                    }}
                                    isDisabled={false}
                                    id='bidang_periksa'
                                    name='bidang_periksa'
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
                                    placeholder='nilai_normal'
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
                                    list_option={jenis_pemeriksaan_arr}
                                    selected_option={selectedJenisPemeriksaan}
                                    label="Jenis Pemeriksaan"
                                    onChange={(val) => {
                                        setSelectedJenisPemeriksaan(val);
                                    }}
                                    isDisabled={false}
                                    id='jenis_pemeriksaan'
                                    name='jenis_pemeriksaan'
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
                                    list_option={sub_periksa_arr}
                                    selected_option={selectedSubPeriksa}
                                    label="Sub Periksa"
                                    onChange={(val) => {
                                        setSelectedSubPeriksa(val);
                                        setAddInputHasilPeriksa(prev => ({
                                            ...prev,
                                            id_sub_periksa: val.value
                                        }))
                                    }}
                                    isDisabled={false}
                                    id='sub_periksa'
                                    name='sub_periksa'
                                />
                            </div>
                        </div>

                        <div className='mt-4 p-2'>
                            <GowButton
                                title='Tambahkan Hasil Periksa'
                                isDisabled={false}
                                color="bg-green-500"
                                onClick={() => {
                                    console.log("Inputan Hasil Periksa ", addInputHasilPeriksa)
                                }}
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
                                        <th className="border px-3 py-2 text-left">Sub Periksa</th>
                                        <th className="border px-3 py-2 text-left">Hasil</th>
                                        <th className="border px-3 py-2 text-left">Nilai Normal</th>
                                        <th className="border px-3 py-2 text-left">Harga</th>
                                        <th className="border px-3 py-2 text-center">Aksi</th>
                                    </tr>
                                </thead>

                                {/* Body */}
                                <tbody>
                                    <tr className="hover:bg-gray-50">
                                        <td className="border px-3 py-2">1</td>
                                        <td className="border px-3 py-2">Hematologi</td>
                                        <td className="border px-3 py-2">Hb</td>
                                        <td className="border px-3 py-2">13 g/dL</td>
                                        <td className="border px-3 py-2">12 - 16</td>
                                        <td className="border px-3 py-2">50.000</td>
                                        <td className="border px-3 py-2 text-center">
                                            <button
                                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                                onClick={() => console.log("Delete row 1")}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>

                                    <tr className="hover:bg-gray-50">
                                        <td className="border px-3 py-2">2</td>
                                        <td className="border px-3 py-2">Kimia Klinik</td>
                                        <td className="border px-3 py-2">Glukosa</td>
                                        <td className="border px-3 py-2">90 mg/dL</td>
                                        <td className="border px-3 py-2">70 - 110</td>
                                        <td className="border px-3 py-2">75.000</td>
                                        <td className="border px-3 py-2 text-center">
                                            <button
                                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                                onClick={() => console.log("Delete row 2")}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* button */}
                            <div className='mt-4 p-2 flex gap-2'>
                                <GowButton
                                    title='Print Hasil Periksa'
                                    isDisabled={false}
                                    color="bg-teal-500"
                                    onClick={() => {
                                        console.log("Print Hasil Periksa ", addPermintaanPemeriksaan)
                                    }}
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
        </div>
    </MainLayout>

}

export default AddPemeriksaanPage