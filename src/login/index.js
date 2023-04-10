import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import './index.css';


export function LoginPage(){
    return (
        <div className="login-frame">
            <div className="align-div">
                <Form
                    name="login-form"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
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

                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>아이디 저장</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button className="buttons" type="primary" htmlType="submit">
                            로그인
                        </Button>
                        <Button className="buttons" type="primary">
                            회원 가입
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}