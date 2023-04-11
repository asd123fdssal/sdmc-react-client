import {
    Button,
    Form,
    Input,
} from 'antd';
import React, { useState } from 'react';
import './index.css';

export function SignUpPage() {
    return (
      <div className="container">
          <div className="forms">
              <Form
                  name="login-form"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  style={{ maxWidth: 1024 }}
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

                  <Form.Item
                      label="비밀번호 재확인"
                      name="password_confirm"
                      rules={[{ required: true, message: '비밀번호를 다시 입력해주세요.' }]}
                  >
                      <Input.Password />
                  </Form.Item>

                  <Form.Item
                      label="이메일"
                      name="e-mail"
                      rules={[{ required: true, message: '이메일을 입력해주세요.' }]}
                  >
                      <Input />
                  </Form.Item>

                  <Form.Item
                      label="닉네임"
                      name="nickname"
                      rules={[{ required: true, message: '닉네임을 입력해주세요.' }]}
                  >
                      <Input />
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <Button className="buttons" type="primary" htmlType="submit">
                          회원 가입
                      </Button>
                  </Form.Item>
              </Form>
          </div>
      </div>
    );
}