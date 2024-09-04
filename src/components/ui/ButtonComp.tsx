import React from "react";
import { Button } from "antd";

type ButtonComponentProps = {
  text: string;
  onClick?: () => void;
};

const ButtonComponentProps: React.FC<ButtonComponentProps> = ({
  text,
  onClick,
}) => {
  return (
    <Button type="primary" onClick={onClick}>
      {text}
    </Button>
  );
};

export default Button;
