// components/login/LoginPage.tsx
import React, { useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "../signup/signup.module.css";
import ButtonComp from "../ui/ButtonComp";
import { DevTool } from "@hookform/devtools";
import { SignUpData } from "../../lib/types";
import { useLogin } from "../../lib/state";
import Header from "../header/Header";
import { AppContext } from "../../context/AppState";

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

const LoginPage = () => {
  const { control, handleSubmit } = useForm<SignUpData>(); // Using SignUpData type for login
  const navigate = useNavigate();
  const { setAuthToken, authToken } = useContext(AppContext);
  const { mutate: login, isLoading, isError, error } = useLogin(); // Use login hook

  const onSubmit = (data: SignUpData) => {
    login(data, {
      onSuccess: () => {
        // This will be called on success
        navigate("/dashboard");
      },
    });
  };

  useEffect(() => {
    if (authToken) {
      // If authToken is already set, navigate to the dashboard
      navigate("/dashboard");
    }
  }, [authToken, navigate]);

  return (
    <div className={styles.container}>
      <Header isLoggedIn={false} page="signup" />
      <div className={styles.signUpModal}>
        <div className={styles.signUpContainer}>
          <div>
            <Text className={styles.title}>Login</Text>
          </div>

          <Text className={styles.description}>
            Sign in to access and contribute to Our Resource Hub
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
            <ButtonComp
              type="primary"
              htmlType="submit"
              className={styles.submitBtn}
              loading={isLoading}
            >
              Continue
            </ButtonComp>
            {isError && <Text type="danger">Error: {error.message}</Text>}
          </form>
          <div className={styles.loginLink}>
            <Text onClick={() => navigate("/signup")} className={styles.link}>
              Don't have an account? Sign up
            </Text>
          </div>
        </div>
      </div>
      <DevTool control={control} />
    </div>
  );
};

export default LoginPage;

// import { useForm, Controller } from "react-hook-form";
// import { Input, Typography } from "antd";
// import { useNavigate } from "react-router-dom";
// import styles from "../signup/signup.module.css";
// import ButtonComp from "../ui/ButtonComp";
// import { DevTool } from "@hookform/devtools";
// import { SignUpData } from "../../lib/types";
// import { useLogin } from "../../lib/state";
// import Header from "../header/Header";
// const { Text } = Typography;

// const FormInput = ({ name, control, label, type = "text", placeholder }) => (
//   <div className={styles.formItem}>
//     <Text className={styles.label}>{label}</Text>
//     <Controller
//       name={name}
//       control={control}
//       render={({ field }) => (
//         <Input
//           {...field}
//           type={type}
//           placeholder={placeholder}
//           className={styles.transparentInput}
//         />
//       )}
//     />
//   </div>
// );

// const LoginPage = () => {
//   const { control, handleSubmit } = useForm<SignUpData>(); // Using SignUpData type for login
//   const navigate = useNavigate();
//   const { mutate: login, isLoading, isError, error } = useLogin(); // Use login hook

//   const onSubmit = async (data: SignUpData) => {
//     try {
//       await login(data); // Call the login API
//       navigate("/dashboard", {
//         state: { email: data.email, password: data.password },
//       });
//     } catch (error) {
//       console.error("Login failed", error);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <Header isLoggedIn={false} page="signup" />
//       <div className={styles.signUpModal}>
//         <div className={styles.signUpContainer}>
//           <div>
//             <Text className={styles.title}>Login</Text>
//           </div>

//           <Text className={styles.description}>
//             Sign in to access and contribute to Our Resource Hub
//           </Text>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <FormInput
//               name="email"
//               control={control}
//               label="Email"
//               type="email"
//               placeholder="Enter your email"
//             />
//             <FormInput
//               name="password"
//               control={control}
//               label="Password"
//               type="password"
//               placeholder="Enter your password"
//             />
//             <ButtonComp
//               type="primary"
//               htmlType="submit"
//               className={styles.submitBtn}
//               loading={isLoading}
//             >
//               Continue
//             </ButtonComp>
//             {isError && <Text type="danger">Error: {error.message}</Text>}
//           </form>
//           <div className={styles.loginLink}>
//             <Text onClick={() => navigate("/signup")} className={styles.link}>
//               Don't have an account? Sign up
//             </Text>
//           </div>
//         </div>
//       </div>
//       <DevTool control={control} />
//     </div>
//   );
// };

// export default LoginPage;
