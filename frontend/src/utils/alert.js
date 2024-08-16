import { message } from "antd";

function PingAlert() {
  return {
    loadingKey: null,

    success: (content, duration) => message.success(content, duration),
    error: (content, duration) => message.error(content, duration),
    info: (content, duration) => message.info(content, duration),
    warning: (content, duration) => message.warning(content, duration),
  };
}

export default PingAlert;