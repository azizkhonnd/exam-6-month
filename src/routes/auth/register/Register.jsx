import { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined, PhoneOutlined, HomeOutlined, EnvironmentOutlined, ApartmentOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.scss';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [apartment, setApartment] = useState("");
    const [zip, setZip] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    const navigate = useNavigate();

    const register = async () => {
        const item = {
            name,
            email,
            password,
            confirm_password: confirmPassword,
            phone,
            street,
            apartment,
            zip,
            city,
            country,
        };
        console.log(item);
        try {
            const response = await axios.post(
                "https://backend-e-commerce-production.up.railway.app/api/v1/users/register",
                item,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                }
            );
            localStorage.setItem("user-info", JSON.stringify(response.data));
            localStorage.setItem("token", response.data.token); // Save the token
            toast.success('Registration successful!');
            navigate("/auth/login");
        } catch (error) {
            if (error.response && error.response.data) {
                console.error("Error response data:", error.response.data);
                toast.error(`An error occurred: ${error.response.data.message || error.response.data}`);
            } else {
                console.error("Error message:", error.message);
                toast.error(`An error occurred: ${error.message}`);
            }
        }
    };

    return (
        <div className='container' style={{ marginTop: '195px' }}>
            <ToastContainer />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '11px', }}>
                <div className="login__title" style={{ textAlign: 'center', marginBottom: '13px' }}>
                    <h2 className='register__title' style={{ fontSize: '42px', marginBottom: '1px' }}>Register</h2>
                </div>
                <Form
                    name="normal_register"
                    className="register-form"
                    initialValues={{ remember: true }}
                    style={{ width: '340px', display: 'flex', flexDirection: 'column' }}
                    onFinish={register}
                >
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Please input your Name!' }]}
                    >
                        <div>
                            <p className='name__title' style={{ marginBottom: '7px' }}>Name</p>
                            <Input onChange={(e) => setName(e.target.value)} className='input__placeholder' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Your Name" />
                        </div>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email address!' }]}
                    >
                        <div>
                            <p className='email__title' style={{ marginBottom: '7px' }}>Email address</p>
                            <Input onChange={(e) => setEmail(e.target.value)} className='input__placeholder' prefix={<MailOutlined className="site-form-item-icon" />} placeholder="email@domain.com" />
                        </div>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <div>
                            <p className='password__title' style={{ marginBottom: '7px' }}>Password</p>
                            <Input
                                onChange={(e) => setPassword(e.target.value)}
                                className='input__placeholder'
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </div>
                    </Form.Item>
                    <Form.Item
                        name="confirm_password"
                        rules={[{ required: true, message: 'Please confirm your Password!' }]}
                    >
                        <div>
                            <p className='password__title' style={{ marginBottom: '7px' }}>Confirm Password</p>
                            <Input
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className='input__placeholder'
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Confirm Password"
                            />
                        </div>
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        rules={[{ required: true, message: 'Please input your Phone number!' }]}
                    >
                        <div>
                            <p className='phone__title' style={{ marginBottom: '7px' }}>Phone number</p>
                            <Input onChange={(e) => setPhone(e.target.value)} className='input__placeholder' prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="+998999787525" />
                        </div>
                    </Form.Item>
                    <Form.Item
                        name="street"
                        rules={[{ required: true, message: 'Please input your Street!' }]}
                    >
                        <div>
                            <p className='street__title' style={{ marginBottom: '7px' }}>Street</p>
                            <Input onChange={(e) => setStreet(e.target.value)} className='input__placeholder' prefix={<HomeOutlined className="site-form-item-icon" />} placeholder="Street" />
                        </div>
                    </Form.Item>
                    <Form.Item
                        name="apartment"
                        rules={[{ required: true, message: 'Please input your Apartment!' }]}
                    >
                        <div>
                            <p className='apartment__title' style={{ marginBottom: '7px' }}>Apartment</p>
                            <Input onChange={(e) => setApartment(e.target.value)} className='input__placeholder' prefix={<ApartmentOutlined className="site-form-item-icon" />} placeholder="Apartment" />
                        </div>
                    </Form.Item>
                    <Form.Item
                        name="zip"
                        rules={[{ required: true, message: 'Please input your Zip code!' }]}
                    >
                        <div>
                            <p className='zip__title' style={{ marginBottom: '7px' }}>Zip code</p>
                            <Input onChange={(e) => setZip(e.target.value)} className='input__placeholder' prefix={<EnvironmentOutlined className="site-form-item-icon" />} placeholder="Zip code" />
                        </div>
                    </Form.Item>
                    <Form.Item
                        name="city"
                        rules={[{ required: true, message: 'Please input your City!' }]}
                    >
                        <div>
                            <p className='city__title' style={{ marginBottom: '7px' }}>City</p>
                            <Input onChange={(e) => setCity(e.target.value)} className='input__placeholder' prefix={<EnvironmentOutlined className="site-form-item-icon" />} placeholder="City" />
                        </div>
                    </Form.Item>
                    <Form.Item
                        name="country"
                        rules={[{ required: true, message: 'Please input your Country!' }]}
                    >
                        <div>
                            <p className='country__title' style={{ marginBottom: '7px' }}>Country</p>
                            <Input onChange={(e) => setCountry(e.target.value)} className='input__placeholder' prefix={<EnvironmentOutlined className="site-form-item-icon" />} placeholder="Country" />
                        </div>
                    </Form.Item>

                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <a className="login-form-forgot" href="" style={{ float: 'right' }}>
                            Forgot password
                        </a>
                    </Form.Item>
                    <Form.Item style={{ textAlign: 'center' }}>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%', height: '40px', marginBottom: "22px" }}>
                            Register
                        </Button>

                        <p className='link__title'>
                            Already have an account? <Link to="/auth/login">login now</Link>
                        </p>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Register;
