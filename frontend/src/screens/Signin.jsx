import React, { useState } from "react";
import {
    Col,
    Row,
    Input,
    Form,
    Typography,
    Button,
    message,
    
} from "antd";
import page_routes from "../utils/router/pageMapper";
import { Link } from "react-router-dom";
import axios from "axios";

import { setAccessToken, setRefreshToken } from "../utils/axios/config"

import { useNavigate } from "react-router-dom";
import api_routes from "../utils/router/apiMapper";


const { Title, Text } = Typography;

export default function Signin() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    

    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        let formData = form.getFieldValue();
        if (Object.keys(formData).length === 0) {
            messageApi.open({
                type: "error",
                content: "Please fill in all the required fields",
            });
        } else {
            setLoading(true);
            
            try {
                const res = await axios.post(api_routes.LOGIN_API, formData);

                setAccessToken(res.data.access);
                setRefreshToken(res.data.refresh);

                messageApi.open({
                    type: "success",
                    content: "credentials valid",
                });

                navigate(page_routes.HOME_PAGE);
            } catch (error) {
                messageApi.open({
                    type: "error",
                    content: "Invalid credentials, please try again",
                });
                form.resetFields();
                setLoading(false);
            }
        }
    };
    const themeColor = "#450391";
    return (
        <>
            {contextHolder}
          
                <Row style={{ height: "100vh" }}>
                <Col
                        sm={12}
                        md={12}
                        lg={12}
                        style={{
                            background: "white",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingTop: "2vh",
                            height: "100vh",
                            
                        }}
                    >
                        <Row
                            style={{
                                height: "60vh",
                            }}
                        >
                            <Form
                                name="basic"
                                form={form}
                                onFinish={handleLogin}
                            >
                                <div
                                    style={{
                                        width: "95%",
                                    }}
                                >
                                    <Row
                                        justify={"center"}
                                        gutter={10}
                                        style={{
                                            margin: "1%",
                                        }}
                                    >
                                        <Col
                                            xs={22}
                                            md={20}
                                            lg={20}
                                            style={{
                                                width: "100%",
                                            }}
                                        >
                                            <Row>
                                                <Col xs={10} md={10} lg={10}>
                                                    <Title level={5}>
                                                        Sign in to <br></br>
                                                        <b
                                                            style={{
                                                                color: themeColor,
                                                            }}
                                                        >
                                                            Zentratech
                                                        </b>
                                                    </Title>
                                                </Col>
                                                <Col xs={4} md={4} lg={4}></Col>
                                                <Col xs={10} md={10} lg={10}>
                                                <Title level={5}
                                                       
                                                    >
                                                        Not a member? <br />
                                                        <Text
                                                        style={{
                                                            fontSize: "13px",
                                                        }}
                                                        strong
                                                    >
                                                        <Link
                                                            to={
                                                                page_routes.SIGNUP_PAGE
                                                            }
                                                            style={{
                                                                color: "black",
                                                            }}
                                                        >
                                                            Sign up here
                                                        </Link>
                                                    </Text>
                                                    </Title >
                                                    
                                                   
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row
                                        justify={"center"}
                                        gutter={10}
                                        style={{
                                            margin: "1%",
                                            paddingTop: "5vh",
                                        }}
                                    >
                                        <Col xs={22} md={20} lg={20}>
                                            <div>
                                                <Text
                                                    style={{
                                                        fontSize: "12px",
                                                        fontWeight: "650",
                                                        color: "black",
                                                    }}
                                                >
                                                    Your Email Address
                                                </Text>
                                                <br />
                                                <Form.Item
                                                    name="username"
                                                    rules={[
                                                        {
                                                            type: "email",
                                                            required: true,
                                                            message:
                                                                "Please enter your email address",
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        style={{
                                                            backgroundColor:
                                                                "white",
                                                            color: "black",
                                                        }}
                                                    />
                                                </Form.Item>
                                            </div>
                                        </Col>
                                        <Col
                                            xs={22}
                                            md={20}
                                            lg={20}
                                            style={{ marginTop: "2vh" }}
                                        >
                                            <div>
                                                <Text
                                                    style={{
                                                        fontSize: "12px",
                                                        fontWeight: "650",
                                                        color: "black",
                                                    }}
                                                >
                                                    Enter Your Password
                                                </Text>
                                                <br />
                                                <Form.Item
                                                    name="password"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Please enter your password",
                                                        },
                                                    ]}
                                                >
                                                    <div className="auth-icon">
                                                        <Input.Password
                                                            style={{
                                                                backgroundColor:
                                                                    "white",
                                                                color: "black",
                                                            }}
                                                        />
                                                    </div>
                                                </Form.Item>
                                            </div>
                                        </Col>

                                        <Col xs={22} md={20} lg={20}>
                                            <Form.Item>
                                                <Button
                                                    style={{
                                                        background: themeColor,
                                                        color: "white",
                                                        border: "purple",
                                                        width: "100%",
                                                        marginTop: "2vh",
                                                    }}
                                                    loading={loading}
                                                    htmlType="submit"
                                                >
                                                    Login
                                                </Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </div>
                            </Form>
                        </Row>
                    </Col>
                    <Col
                        lg={12}
                        md={12}
                        sm={12}
                        style={{
                            backgroundColor: themeColor,
                            
                        }}
                    >
                        <Row
                            justify={"center"}
                            align={"middle"}
                            style={{ height: "100vh" }}
                        >
                            <Col xs={20} sm={20} md={18} lg={13}>
                                <Row>
                                    <Title
                                        level={1}
                                        style={{
                                            fontSize: {
                                                xs: "24px",
                                                sm: "28px",
                                                md: "36px",
                                                lg: "42px",
                                                xl: "48px",
                                            },
                                            fontWeight: "750",
                                            color: "white",
                                        }}
                                    >
                                       

                                       Log in to<br></br><b>Zentratech</b> to connect<br></br> with the world!
                                    </Title>
                                    <Text
                                        style={{
                                            fontSize: "12px",
                                            color: "white",
                                        }}
                                    >
                                        Welcome to <b>Zentratech</b>, where you can connect with new people and chat with them without boundaries.

                                    </Text>
                                </Row>
                                
                            </Col>
                        </Row>
                    </Col>
                  
                </Row>
          
        </>
    );
}
