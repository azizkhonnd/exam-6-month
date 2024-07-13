/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.scss';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post("https://backend-e-commerce-production.up.railway.app/api/v1/users/login", values, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });
      localStorage.setItem("user-info", JSON.stringify(response.data));
      toast.success('Login successful!');
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`An error occurred: ${error.response.data.message}`);
      } else {
        toast.error(`An error occurred: ${error.message}`);
      }
    }
  };

  return (
    <div className='container'>
      <ToastContainer />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '11px' }}>
        <div className="login__title" style={{ textAlign: 'center', marginBottom: '43px' }}>
          <h2 className='register__title' style={{ fontSize: '42px', marginBottom: '11px' }}>Login</h2>
          <p className='register__subtitle'>
            Enter your credentials to access your account.
          </p>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ width: '340px', display: 'flex', flexDirection: 'column', gap: '5px' }}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email address!' }]}
          >
            <div>
              <p className='email__title' style={{ marginBottom: '14px' }}>
                Email address
              </p>
              <Input
                className='input__placeholder'
                prefix={<UserOutlined className="site-form-item-icon" style={{ height: '40px' }} />}
                placeholder="email@domain.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <div>
              <p className='password__title' style={{ marginBottom: '14px' }}>Password</p>
              <Input
                className='input__placeholder'
                prefix={<LockOutlined className="site-form-item-icon" style={{ height: '40px' }} />}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </Form.Item>
          <Form.Item>
            <div>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a className="login-form-forgot" href="" style={{ float: 'right' }}>
                Forgot password
              </a>
            </div>
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%', height: '40px', marginBottom: "22px" }}>
              Login
            </Button>

            <p className='link__title'>
              Don’t have an account? <Link to="/auth/register">register now</Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
