import React, { useEffect, useState } from 'react';
import { setUser, type loginType } from '../../types/loginType';
import GowInput from '../../comps/input/GowInput';
import GowButton from '../../comps/button/GowButton';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { getAccessToken, setAccessToken } from '../../auth/auth';

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState<loginType>({
        username: '',
        password: '',
    });

    const handleChange = (field: keyof loginType, value: string) => {
        setLoginForm(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleLogin = async () => {
        // console.log('Login:', loginForm);
        setLoading(true);
        try {
            const res = await api.post("/login/getUserLogin", {
                "username": loginForm.username,
                "password": loginForm.password
            });

            if (res.data.status == "OK") {
                setLoading(false)
                setAccessToken(res.data.accessToken)
                setUser(res.data.data);
                navigate("/dashboard", { replace: true });
            } else {
                setLoading(false);
                console.log("Login gagal")
            }
        } catch (error) {
            setLoading(false);
            console.log("Err : Server Error", error)
        }
    };

    useEffect(() => {
        if (getAccessToken()) {
            navigate("/dashboard", { replace: true });
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-200 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm flex flex-col gap-2">
                <h1 className="text-xl font-semibold text-center">EsTePe</h1>

                <GowInput
                    id="username"
                    name="username"
                    label="Username"
                    type="text"
                    placeholder="Username"
                    value={loginForm.username}
                    isDisabled={false}
                    onChange={(val) => handleChange('username', val)}
                />

                <GowInput
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Password"
                    value={loginForm.password}
                    isDisabled={false}
                    onChange={(val) => handleChange('password', val)}
                />

                {/* space */}
                <div className='mt-5'></div>
                <GowButton
                    title={loading ? "Process" : "Login"}
                    isDisabled={false}
                    color="bg-teal-500 hover:bg-teal-600 transition"
                    onClick={handleLogin}
                />
            </div>
        </div>
    );
};

export default LoginPage;