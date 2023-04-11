import React, {useEffect, useState} from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import './index.css';
import {Link, Navigate, redirect, Route, Routes, useNavigate} from "react-router-dom";
import axios from "axios";
import {API_URL} from "../config/constants";
import {SHA256, enc} from 'crypto-js';

export function Login(){
    const [form] = Form.useForm();
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        axios
            .get(`${API_URL}/login`)
            .then((res) => {

            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const onFinish = function (values){
        if(!isSuccess){
            values.password = SHA256(values.password).toString(enc.Hex);
            axios.post(`${API_URL}/login`, values).then(res =>{
                // 로그인 성공 여부 체크
                if(res.data.loginResult){
                    // 로그인 성공 시 메인으로 리다이렉트
                    //setIsSuccess(true);
                }else{

                }
            });
        }
    }

    if(isSuccess){
        return <Navigate to='/' />
    }

    return (
        <div className="container">
            <div className="forms">
                <Form
                    form={form}
                    name="login-form"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="아이디"
                        name="username"
                        rules={[{ required: true, message: '아이디를 입력해주세요.' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="비밀번호"
                        name="password"
                        rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <div id="error-field">
                        <a id="error-message"></a>
                    </div>

                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>아이디 저장</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button className="buttons" type="primary" htmlType="submit">
                            로그인
                        </Button>
                        <Link to="/signup">
                            <Button className="buttons" type="primary">
                                회원 가입
                            </Button>
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}