import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import "./index.css";
import {
    Link,
    Navigate,
} from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config/constants";
import { SHA256, enc } from "crypto-js";

export function Login() {
    const [form] = Form.useForm();
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        axios
            .get(`${API_URL}/login`)
            .then((res) => {
                setIsSuccess(true);
            })
            .catch((error) => {});
    }, []);

    const onFinish = function (values) {
        if (!isSuccess) {
            values.password = SHA256(values.password).toString(enc.Hex);
            axios
                .post(`${API_URL}/login`, values)
                .then((res) => {
                    setIsSuccess(true);
                })
                .catch((error) => {
                    message.error(error.response.data.message);
                });
        }
    };

    if (isSuccess) {
        return <Navigate to="/" />;
    }

    return (
        <Form
            form={form}
            name="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            style={{margin:"12px 12px 12px 12px"}}
        >
            <Form.Item
                label="아이디"
                name="username"
                rules={[
                    {
                        required: true,
                        message: "아이디를 입력해주세요.",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="비밀번호"
                name="password"
                rules={[
                    {
                        required: true,
                        message: "비밀번호를 입력해주세요.",
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName="checked"
            >
                <Checkbox>아이디 저장</Checkbox>
            </Form.Item>

            <Form.Item>
                <Button
                    className="buttons"
                    type="primary"
                    htmlType="submit"
                >
                    로그인
                </Button>
                <Link to="/signup">
                    <Button className="buttons" type="primary">
                        회원 가입
                    </Button>
                </Link>
            </Form.Item>
        </Form>
    );
}
