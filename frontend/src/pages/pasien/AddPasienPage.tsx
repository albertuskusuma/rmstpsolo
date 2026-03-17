import MainLayout from '../../layouts/MainLayout'
import GowCard from '../../comps/card/GowCard'
import GowInput from '../../comps/input/GowInput'
import { useState } from 'react';
import type { addPasienType } from '../../types/addPasienType';
import GowDropdownSearchArray from '../../comps/dropdown/GowDropdownSearchArray';
import GowDatePickerMask from '../../comps/datepickermask/GowDatePickerMask';
import GowTextArea from '../../comps/textarea/GowTextArea';
import GowButton from '../../comps/button/GowButton';

const AddPasienPage = () => {

    const jenis_kelamin_arr = [
        { value: "default", text: "Pilih Jenis Kelamin" },
        { value: "Laki-laki", text: "Laki-laki" },
        { value: "Perempuan", text: "Perempuan" }
    ];

    const [selectedJenisKelamin, setSelectedJenisKelamin] = useState(jenis_kelamin_arr[0]);

    const status_kawin_arr = [
        { value: "default", text: "Pilih Status Kawin" },
        { value: "Kawin", text: "Kawin" },
        { value: "Belum Kawin", text: "Belum Kawin" }
    ];

    const [selectedStatusKawin, setSelectedStatusKawin] = useState(status_kawin_arr[0]);

    const [addForm, setAddForm] = useState<addPasienType>({
        no_rm: "123",
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
    });

    return <MainLayout>
        <div>
            <GowCard
                title='Form Add Pasien'
                bgCard='bg-gray-600'
                children={<>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-2 space-y-3">
                            {/* No RM */}
                            <GowInput
                                id='no_rm'
                                name='no_rm'
                                value={addForm.no_rm}
                                isDisabled={true}
                                label='No RM'
                                onChange={(e) => {
                                    setAddForm(prev => ({
                                        ...prev,
                                        no_rm: e
                                    }))
                                }}
                                type='text'
                                placeholder='No RM'
                            />

                            {/* Nama Pasien */}
                            <GowInput
                                id="nama_pasien"
                                name="nama_pasien"
                                value={addForm.nama_pasien}
                                isDisabled={false}
                                label="Nama Pasien"
                                placeholder="Nama Pasien"
                                type="text"
                                onChange={(val) =>
                                    setAddForm(prev => ({
                                        ...prev,
                                        nama_pasien: val
                                    }))
                                }
                            />

                            {/* NIK */}
                            <GowInput
                                id="nik"
                                name="nik"
                                value={addForm.nik}
                                isDisabled={false}
                                label="NIK"
                                placeholder="NIK"
                                type="text"
                                onChange={(val) =>
                                    setAddForm(prev => ({
                                        ...prev,
                                        nik: val
                                    }))
                                }
                            />

                            {/* Kategori Pasien */}
                            <GowInput
                                id="kategori_pasien"
                                name="kategori_pasien"
                                value={addForm.kategori_pasien}
                                isDisabled={false}
                                label="Kategori Pasien"
                                placeholder="Kategori Pasien"
                                type="text"
                                onChange={(val) =>
                                    setAddForm(prev => ({
                                        ...prev,
                                        kategori_pasien: val
                                    }))
                                }
                            />

                            {/* Jenis Kelamin */}
                            <GowDropdownSearchArray
                                list_option={jenis_kelamin_arr}
                                selected_option={selectedJenisKelamin}
                                label="Jenis Kelamin"
                                onChange={(val) => {
                                    setSelectedJenisKelamin(val);
                                    setAddForm(prev => ({
                                        ...prev,
                                        jenis_kelamin: val.value
                                    }))
                                }}
                                isDisabled={false}
                                id='jenis_kelamin'
                                name='jenis_kelamin'
                            />

                            {/* Dokter Pengirim */}
                            <GowInput
                                id="dokter_pengirim"
                                name="dokter_pengirim"
                                value={addForm.dokter_pengirim}
                                isDisabled={false}
                                label="Dokter Pengirim"
                                placeholder="Dokter Pengirim"
                                type="text"
                                onChange={(val) =>
                                    setAddForm(prev => ({
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
                                value={addForm.gol_darah}
                                isDisabled={false}
                                label='Gol Darah'
                                onChange={(e) => {
                                    setAddForm(prev => ({
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
                                value={addForm.tanggal_lahir}
                                onChange={(val) => {
                                    setAddForm(prev => ({
                                        ...prev,
                                        tanggal_lahir: val
                                    }));
                                }}
                                isDisabled={false}
                                placeholder='Contoh 15-11-1993'
                            />

                            {/* Status Kawin */}
                            <GowDropdownSearchArray
                                list_option={status_kawin_arr}
                                selected_option={selectedStatusKawin}
                                label="Status Kawin"
                                onChange={(val) => {
                                    setSelectedStatusKawin(val);
                                    setAddForm(prev => ({
                                        ...prev,
                                        status_kawin: val.value
                                    }))
                                }}
                                isDisabled={false}
                                id='status_kawin'
                                name='status_kawin'
                            />

                            {/* No Telp */}
                            <GowInput
                                id='no_hp'
                                name='no_hp'
                                value={addForm.no_hp}
                                isDisabled={false}
                                label='No HP / No Telp'
                                onChange={(e) => {
                                    setAddForm(prev => ({
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
                                value={addForm.pekerjaan}
                                isDisabled={false}
                                label='Pekerjaan'
                                onChange={(e) => {
                                    setAddForm(prev => ({
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
                                value={addForm.no_kk}
                                isDisabled={false}
                                label='No KK'
                                onChange={(e) => {
                                    setAddForm(prev => ({
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
                                value={addForm.nama_ayah}
                                isDisabled={false}
                                label='Nama Ayah'
                                onChange={(e) => {
                                    setAddForm(prev => ({
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
                                value={addForm.nama_ibu}
                                isDisabled={false}
                                label='Nama Ibu'
                                onChange={(e) => {
                                    setAddForm(prev => ({
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
                                value={addForm.alamat}
                                isDisabled={false}
                                label='Alamat'
                                onChange={(e) => {
                                    setAddForm(prev => ({
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
                                value={addForm.nama_petugas}
                                isDisabled={false}
                                label='Nama Petugas'
                                onChange={(e) => {
                                    setAddForm(prev => ({
                                        ...prev,
                                        nama_petugas: e
                                    }))
                                }}
                                type='text'
                                placeholder='Nama Petugas'
                            />
                        </div>
                    </div>

                    <div className='mt-4 p-2'>
                        <GowButton 
                            title='Simpan Data'
                            isDisabled={false}
                            color='bg-blue-500'
                            onClick={() => {
                                console.log("Inputan add ", addForm)
                            }}
                        />
                    </div>
                </>} />
        </div>
    </MainLayout>

}

export default AddPasienPage