import { useForm, Controller } from "react-hook-form";
import { Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./signup.module.css"; // Import your CSS module
import ButtonComp from "../ui/ButtonComp";
import { DevTool } from "@hookform/devtools";
import { SignUpData } from "../../lib/types";
import Header from "../header/Header";

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

const SignUp = () => {
  const { control, handleSubmit } = useForm<SignUpData>();
  const navigate = useNavigate();

  const onSubmit = (data: SignUpData) => {
    navigate("/welcome", {
      state: { email: data.email, password: data.password },
    });
  };

  return (
    <div className={styles.container}>
      <Header isLoggedIn={false} page="signup" />
      <div className={styles.signUpModal}>
        <div className={styles.signUpContainer}>
          <div>
            <Text className={styles.title}>Sign Up</Text>
          </div>

          <Text className={styles.description}>
            Create an account to access and contribute to Our Resource Hub
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              name="email"
              control={control}
              label="Email"
              type="email"
              placeholder="Enter your email"
            />
            <FormInput
              name="password"
              control={control}
              label="Password"
              type="password"
              placeholder="Enter your password"
            />
            <FormInput
              name="confirmPassword"
              control={control}
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
            />
            <ButtonComp
              type="primary"
              htmlType="submit"
              className={styles.submitBtn}
            >
              Continue
            </ButtonComp>
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

export default SignUp;
