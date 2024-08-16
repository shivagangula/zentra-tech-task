import React, { useState } from "react";
import {
    Col,
    Row,
    Input,
    Form,
    message,
    Button,
    Typography,
   
    Checkbox,
   
} from "antd";
import "./styles.css";
import { Link } from "react-router-dom";
import page_routes from "../utils/router/pageMapper";
import axios from "axios";
import PingAlert from "../utils/alert";
import { CheckCircleFilled, CheckCircleOutlined } from "@ant-design/icons";

import { setAccessToken, setRefreshToken } from "../utils/axios/config"
import api_routes from "../utils/router/apiMapper";

const { Text, Title } = Typography;

export default function Signup() {
    const [form] = Form.useForm();
   
    const pingAlert = PingAlert();
    const [messageApi, contextHolder] = message.useMessage();
    const [btnLoader, setBtnLoader] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState({
        matched: false,
        length: false,
        lowercase: false,
        digit: false,
        specialCharacter: false,
    });
    const [submitBottonDisabled, setSubmitBottonDisabled] = useState(true);
    

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        const updatedValidation = {
            matched: false,
            length: password.length >= 8,
            lowercase: /[a-z]/.test(password),
            digit: /\d/.test(password),
            specialCharacter: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        };

        setPasswordValidation(updatedValidation);

        const isAllValid = Object.values(passwordValidation).every(
            (value) => value
        );
        if (isAllValid) {
            setSubmitBottonDisabled(false);
        }
    };

    const CheckConfirmPasswordChange = (e) => {
        const password = e.target.value;
        const formData = form.getFieldsValue();

        if (formData.password === password) {
            setPasswordValidation({ ...passwordValidation, matched: true });
        }

        passwordValidation.matched = formData.password === password;

        const isAllValid = Object.values(passwordValidation).every(
            (value) => value
        );

        if (isAllValid) {
            setSubmitBottonDisabled(false);
        }
    };

    const submitSignup = async (values) => {
        try {
            setBtnLoader(true);
            const formData = form.getFieldsValue();
            console.log(api_routes.SIGNUP_API)
            const res = await axios.post(api_routes.SIGNUP_API, formData);

            setAccessToken(res.data.access_token);
            setRefreshToken(res.data.refresh_token);
            pingAlert.success(
                "signup succussfully",
                6
            );
            window.location.href = page_routes.LOGIN_PAGE;
            setBtnLoader(false);
        } catch (error) {
            setBtnLoader(false);
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                messageApi.error(error.response.data.message);
            } else {
                messageApi.error("Something went wrong. Please try again.");
            }
        }
    };
    const themeColor = "#450391";

    return (
        <>
            
                <Row style={{ height: "100vh" }}>
                    <Col
                        lg={12}
                        md={12}
                        sm={12}
                        style={{
                            background: "white",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100vh",
                            
                        }}
                    >
                        {contextHolder}
                        

                        <Row
                            style={{
                                background: "white",
                                marginRight: "5%",
                                marginLeft: "5%",
                            }}
                            justify={"center"}
                        >
                            <Col xs={24} md={24} lg={24}>
                                <Form
                                    form={form}
                                    onFinish={submitSignup}
                                    autoComplete="off"
                                >
                                    <div style={{ width: "100%" }}>
                                        <Row
                                            justify={"center"}
                                            gutter={10}
                                            style={{ margin: "1%" }}
                                        >
                                            <Col xs={24} md={20} lg={20}>
                                                <Row>
                                                    <Col
                                                        xs={10}
                                                        md={10}
                                                        lg={10}
                                                    >
                                                        <Title level={5}>
                                                            Sign up to <br></br>
                                                            <b
                                                                style={{
                                                                    color: themeColor,
                                                                }}
                                                            >
                                                                zentratech
                                                            </b>
                                                        </Title>
                                                    </Col>
                                                    <Col
                                                        xs={4}
                                                        md={4}
                                                        lg={4}
                                                    ></Col>
                                                    <Col
                                                        xs={10}
                                                        md={10}
                                                        lg={10}
                                                    >
                                                        <Title level={5}>
                                                            
                                                    
                                                            Already a member? <br />
                                                            <Text
                                                            style={{
                                                                fontSize:
                                                                    "13px",
                                                            }}
                                                            strong
                                                        >
                                                            <Link
                                                                to={
                                                                    page_routes.LOGIN_PAGE
                                                                }
                                                                style={{
                                                                    color: "black",
                                                                }}
                                                            >
                                                                Log in here
                                                            </Link>
                                                        </Text>
                                                        </Title>
                                                       
                                                       
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={24} md={20} lg={20}>
                                                <Row gutter={5}>
                                                    <Col
                                                        xs={12}
                                                        md={12}
                                                        lg={12}
                                                    >
                                                        <div
                                                            style={{
                                                                marginTop:
                                                                    "3vh",
                                                            }}
                                                        >
                                                            <Text
                                                                style={{
                                                                    fontSize:
                                                                        "12px",
                                                                    fontWeight:
                                                                        "650",
                                                                    color: "black",
                                                                }}
                                                            >
                                                                Your First Name
                                                            </Text>

                                                            <Form.Item
                                                                name={
                                                                    "first_name"
                                                                }
                                                                maxLength={12}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message:
                                                                            "Please enter your first name!",
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
                                                        xs={12}
                                                        md={12}
                                                        lg={12}
                                                    >
                                                        <div
                                                            style={{
                                                                marginTop:
                                                                    "3vh",
                                                            }}
                                                        >
                                                            <Text
                                                                style={{
                                                                    fontSize:
                                                                        "12px",
                                                                    fontWeight:
                                                                        "650",
                                                                    color: "black",
                                                                }}
                                                            >
                                                                Your Last Name
                                                            </Text>

                                                            <Form.Item
                                                                name={
                                                                    "last_name"
                                                                }
                                                                maxLength={12}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message:
                                                                            "Please enter your last name!",
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
                                                </Row>
                                            </Col>

                                            <Col xs={24} md={20} lg={20}>
                                                <div
                                                    style={{ marginTop: "2%" }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: "12px",
                                                            fontWeight: "650",
                                                            color: "black",
                                                        }}
                                                    >
                                                        Your Email Address
                                                    </Text>

                                                    <Form.Item
                                                        name={"email"}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    "Please enter your new email!",
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

                                     

                                            <Col xs={24} md={20} lg={20}>
                                                <Row
                                                    gutter={5}
                                                    align={"middle"}
                                                >
                                                    <Col
                                                        xs={12}
                                                        md={12}
                                                        lg={12}
                                                    >
                                                        <div
                                                            style={{
                                                                marginTop: "2%",
                                                            }}
                                                        >
                                                            <Text
                                                                style={{
                                                                    fontSize:
                                                                        "12px",
                                                                    fontWeight:
                                                                        "650",
                                                                    color: "black",
                                                                }}
                                                            >
                                                                Create a
                                                                Password
                                                            </Text>
                                                            <br />
                                                            <Form.Item
                                                                name={
                                                                    "password"
                                                                }
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message:
                                                                            "Please enter your new password!",
                                                                    },
                                                                ]}
                                                            >
                                                                <Input.Password
                                                                    onChange={
                                                                        handlePasswordChange
                                                                    }
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
                                                        xs={12}
                                                        md={13}
                                                        lg={12}
                                                    >
                                                        <div
                                                            style={{
                                                                marginTop: "2%",
                                                            }}
                                                        >
                                                            <Text
                                                                style={{
                                                                    fontSize:
                                                                        "12px",
                                                                    fontWeight:
                                                                        "650",
                                                                    color: "black",
                                                                }}
                                                            >
                                                                Confirm Your
                                                                Password
                                                            </Text>
                                                            <br />
                                                            <Form.Item
                                                                name={
                                                                    "passwordTwo"
                                                                }
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message:
                                                                            "Please confirm your new password!",
                                                                    },
                                                                ]}
                                                            >
                                                                <Input.Password
                                                                    onChange={
                                                                        CheckConfirmPasswordChange
                                                                    }
                                                                    style={{
                                                                        backgroundColor:
                                                                            "white",
                                                                        color: "black",
                                                                    }}
                                                                />
                                                            </Form.Item>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>

                                            <Col xs={24} md={20} lg={20}>
                                                <Form.Item
                                                    name="agreement"
                                                    valuePropName="checked"
                                                    rules={[
                                                        {
                                                            validator: (
                                                                _,
                                                                value
                                                            ) =>
                                                                value
                                                                    ? Promise.resolve()
                                                                    : Promise.reject(
                                                                          new Error(
                                                                              "Should accept agreement"
                                                                          )
                                                                      ),
                                                        },
                                                    ]}
                                                >
                                                    <Checkbox
                                                        style={{
                                                            backgroundColor:
                                                                "white",
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontSize:
                                                                    "11px",
                                                                color: "black",
                                                            }}
                                                        >
                                                            By signing up, you
                                                            agree to our{" "}
                                                            <a
                                                              
                                                            >
                                                                <b>
                                                                    Terms of
                                                                    Service
                                                                </b>
                                                            </a>{" "}
                                                            and{" "}
                                                            <a
                                                              
                                                            >
                                                                <b>
                                                                    Privacy
                                                                    Policy
                                                                </b>
                                                            </a>
                                                            .
                                                        </Text>
                                                    </Checkbox>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={20} lg={20}>
                                                <div
                                                    style={{
                                                        marginTop: "10px",
                                                        color: "black",
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            color: "black",
                                                        }}
                                                    >
                                                        {passwordValidation.matched ? (
                                                            <CheckCircleFilled
                                                                style={{
                                                                    color: "green",
                                                                }}
                                                            />
                                                        ) : (
                                                            <CheckCircleOutlined />
                                                        )}{" "}
                                                        Password & Confirm
                                                        password matched
                                                    </Text>
                                                    <br />
                                                    <Text
                                                        style={{
                                                            color: "black",
                                                        }}
                                                    >
                                                        {passwordValidation.length ? (
                                                            <CheckCircleFilled
                                                                style={{
                                                                    color: "green",
                                                                }}
                                                            />
                                                        ) : (
                                                            <CheckCircleOutlined />
                                                        )}{" "}
                                                        Length is at least 8
                                                        characters
                                                    </Text>

                                                    <br />
                                                    <Text
                                                        style={{
                                                            color: "black",
                                                        }}
                                                    >
                                                        {passwordValidation.lowercase ? (
                                                            <CheckCircleFilled
                                                                style={{
                                                                    color: "green",
                                                                }}
                                                            />
                                                        ) : (
                                                            <CheckCircleOutlined />
                                                        )}{" "}
                                                        At least one lowercase
                                                        letter
                                                    </Text>

                                                    <br />
                                                    <Text
                                                        style={{
                                                            color: "black",
                                                        }}
                                                    >
                                                        {passwordValidation.digit ? (
                                                            <CheckCircleFilled
                                                                style={{
                                                                    color: "green",
                                                                }}
                                                            />
                                                        ) : (
                                                            <CheckCircleOutlined />
                                                        )}{" "}
                                                        At least one digit
                                                    </Text>

                                                    <br />
                                                    <Text
                                                        style={{
                                                            color: "black",
                                                        }}
                                                    >
                                                        {passwordValidation.specialCharacter ? (
                                                            <CheckCircleFilled
                                                                style={{
                                                                    color: "green",
                                                                }}
                                                            />
                                                        ) : (
                                                            <CheckCircleOutlined />
                                                        )}{" "}
                                                        At least one special
                                                        character
                                                    </Text>
                                                </div>
                                            </Col>

                                            <Col xs={24} md={20} lg={20}>
                                                <div
                                                    style={{
                                                        textAlign: "center",
                                                        marginTop: "2vh",
                                                    }}
                                                >
                                                    <Button
                                                        disabled={
                                                            submitBottonDisabled
                                                        }
                                                        loading={btnLoader}
                                                        style={{
                                                            background:
                                                                submitBottonDisabled
                                                                    ? "lightgray"
                                                                    : themeColor,
                                                            color: "white",
                                                            border: "purple",
                                                            width: "100%",
                                                            marginTop: "10px",
                                                        }}
                                                        type="primary"
                                                        htmlType="submit"
                                                    >
                                                        Create Account
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Form>
                            </Col>
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
                                        Sign Up to<br></br> Connect with
                                        Strangers <br></br> in the World!
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
