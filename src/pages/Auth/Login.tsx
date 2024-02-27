import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { login } from "../../store/slices/user.slice";

const Login = () => {
  const [form] = Form.useForm();
  const [logginIn, setLoggingIn] = useState(false);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {    
    if(user.isLoggedIn) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const submitForm = async () => {
    const values = form.getFieldsValue();
    try {
      setLoggingIn(true);
      dispatch(login(values));

    } catch (err) {
      console.log(err, "error in calling login api");
      messageApi.error({
        duration: 3,
        content: "Failed to login. Please try again",
      });
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <div className={`${styles.container} poppins-regular`}>
        {contextHolder}
      <div className={styles.left}>
        <div></div>
        <div className={styles.hero}>
          <h2>Easily manage your business appointments</h2>
        </div>
      </div>
      <div className={styles.right}>
        <h2 className={styles.formHeader}>Login To Your Account</h2>

        <Form
          name="login"
          form={form}
          onFinish={submitForm}
          colon={false}
          layout="vertical"
          className={styles.formContainer}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Email is required",
              },
            ]}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className={styles.inputCustom}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Password is required",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter your password"
              className={styles.inputCustom}
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.submitBtn}
            loading={logginIn}
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
