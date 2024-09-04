import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./welcome.module.css";
import ButtonComp from "../ui/ButtonComp";
import { DevTool } from "@hookform/devtools";
import { useSignUp } from "../../lib/state";
import { CompleteUserData } from "../../lib/types";

const { Text } = Typography;

const FormInput = ({ name, control, label, type = "text", placeholder }) => (
  <div className={styles.formItem}>
    <Text className={styles.label}>{label}</Text>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          {...field}
          type={type}
          placeholder={placeholder}
          className={styles.transparentInput}
        />
      )}
    />
  </div>
);

const WelcomePage = () => {
  const { state: signUpData } = useLocation(); // Destructure state containing SignUpData
  const { control, handleSubmit } = useForm<CompleteUserData>({
    defaultValues: { ...signUpData, firstName: "", lastName: "" },
  });
  const navigate = useNavigate();
  const { mutate: signUp, isLoading, isError, error } = useSignUp();

  const onSubmit = (data: CompleteUserData) => {
    console.log(data);
    signUp(data, {
      onSuccess: () => {
        navigate("/tags"); // Navigate to success page or other desired page
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.signUpModal}>
        <div className={styles.signUpContainer}>
          <div>
            <Text className={styles.title}>Welcome</Text>
          </div>

          <Text className={styles.description}>
            Please complete your profile to finish your registration.
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              name="firstName"
              control={control}
              label="First Name"
              type="text"
              placeholder="Enter your first name"
            />
            <FormInput
              name="lastName"
              control={control}
              label="Last Name"
              type="text"
              placeholder="Enter your last name"
            />
            <ButtonComp
              type="primary"
              htmlType="submit"
              className={styles.submitBtn}
              loading={isLoading}
            >
              Update
            </ButtonComp>
            {isError && <Text type="danger">Error: {error.message}</Text>}
          </form>
          <div className={styles.loginLink}>
            <Text onClick={() => navigate("/login")} className={styles.link}>
              Already have an account?
            </Text>
          </div>
        </div>
      </div>
      <DevTool control={control} />
    </div>
  );
};

export default WelcomePage;
