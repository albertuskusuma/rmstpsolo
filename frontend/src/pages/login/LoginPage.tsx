import React, { useState } from 'react';
import type { loginType } from '../../types/loginType';
import GowInput from '../../comps/input/GowInput';
import GowButton from '../../comps/button/GowButton';

const LoginPage: React.FC = () => {
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

    const handleLogin = () => {
        console.log('Login:', loginForm);
    };

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
                    title="Login"
                    isDisabled={false}
                    color="bg-teal-500 hover:bg-teal-600 transition"
                    onClick={handleLogin}
                />
            </div>
        </div>
    );
};

export default LoginPage;