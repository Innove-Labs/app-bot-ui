import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import { Button, Form, Input, Radio, RadioChangeEvent, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { axiosInstance } from "../../utils/axios.util";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Register = () => {
  const [form] = Form.useForm();
  const [selectedUserType, setSelectedUserType] = useState("user");
  const [creatingUser, setCreatingUser] = useState(false);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if(user.isLoggedIn) {
      navigate('/dashboard')
    }
  }, [user.isLoggedIn, navigate])

  const submitForm = async () => {
    const values = form.getFieldsValue();
    if (values.password !== values.confirmPassword) {
      message.error({
        duration: 3,
        content: "Passwords should match",
      });
      return;
    }
    try {
      setCreatingUser(true);
      const response = await axiosInstance().post("/api/auth/signup", values);
      if (response.data) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err, "error in calling create user api");
      messageApi.error({
        duration: 3,
        content: "Failed to Create User. Please try again",
      });
    } finally {
      setCreatingUser(false);
    }
  };

  const changeUserType = (e: RadioChangeEvent) => {
    setSelectedUserType(e.target.value);
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
        <h2 className={styles.formHeader}>Create an account</h2>

        <Form
          name="register"
          form={form}
          onFinish={submitForm}
          colon={false}
          layout="vertical"
          className={styles.formContainer}
        >
          <Form.Item
            name="userType"
            initialValue="user"
            className={styles.userTypeContainer}
          >
            <Radio.Group defaultValue="user" onChange={changeUserType}>
              <Radio.Button value="user">User</Radio.Button>
              <Radio.Button value="admin">Admin</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Name is required",
              },
            ]}
          >
            <Input
              placeholder="Enter your name"
              className={styles.inputCustom}
            />
          </Form.Item>
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
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Re enter your password",
              },
            ]}
          >
            <Input.Password
              placeholder="Re-enter your password"
              className={styles.inputCustom}
            />
          </Form.Item>

          {/* optional fields depending on userType */}
          {selectedUserType === "user" && (
            <Form.Item
              name="referralId"
              rules={[
                {
                  required: true,
                  message: "Enter Referral Id",
                },
              ]}
            >
              <Input
                placeholder="Enter company referral Id"
                className={styles.inputCustom}
              />
            </Form.Item>
          )}
          {selectedUserType === "admin" && (
            <>
              <p>Company Details:</p>
              <Form.Item
                name="companyName"
                rules={[
                  {
                    required: true,
                    message: "Enter Company Name",
                  },
                ]}
              >
                <Input
                  className={styles.inputCustom}
                  placeholder="Enter Company name"
                />
              </Form.Item>
              <Form.Item
                name="companyAddress"
                rules={[
                  {
                    required: true,
                    message: "Enter Company Address",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Company Details"
                  className={styles.inputCustom}
                />
              </Form.Item>
              <Form.Item
                name="companyEmail"
                rules={[
                  {
                    required: true,
                    message: "Enter Company Email",
                  },
                ]}
              >
                <Input
                  type="email"
                  placeholder="Enter Company Email"
                  className={styles.inputCustom}
                />
              </Form.Item>
              <Form.Item
                name="companyDescription"
                rules={[
                  {
                    required: true,
                    message: "Enter Company Description",
                  },
                ]}
              >
                <TextArea
                  className={styles.inputCustom}
                  placeholder="Enter Company Description"
                />
              </Form.Item>
            </>
          )}
          <Button
            type="primary"
            htmlType="submit"
            className={styles.submitBtn}
            loading={creatingUser}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
