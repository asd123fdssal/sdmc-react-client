import { Button, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import { API_URL } from "../../config/constants";
import { Navigate } from "react-router-dom";
import { enc, SHA256 } from "crypto-js";

export function SignUpPage() {
    const [form] = Form.useForm();
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        axios
            .get(`${API_URL}/signup`)
            .then((res) => {})
            .catch((error) => {});
    }, []);

    const onFinish = function (values) {
        values.password = SHA256(values.password).toString(enc.Hex);
        axios
            .post(`${API_URL}/signup`, values)
            .then((res) => {
                setIsSuccess(true);
            })
            .catch((error) => {
                message.error(error.response.data.message);
            });
    };

    if (isSuccess) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container">
            <div className="forms">
                <Form
                    form={form}
                    name="signup-form"
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
                        label="비밀번호 재확인"
                        name="password_confirm"
                        rules={[
                            {
                                required: true,
                                message: "비밀번호를 다시 입력해주세요.",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            "비밀번호가 일치하지 않습니다."
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="이메일"
                        name="email"
                        rules={[
                            {
                                type: "email",
                                message: "유효하지 않은 이메일 형식입니다.",
                            },
                            {
                                required: true,
                                message: "이메일을 입력해주세요.",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="닉네임"
                        name="nickname"
                        rules={[
                            {
                                required: true,
                                message: "닉네임을 입력해주세요.",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button
                            className="buttons"
                            type="primary"
                            htmlType="submit"
                        >
                            회원 가입
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
