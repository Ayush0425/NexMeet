import { Toaster } from "react-hot-toast";

function Toast() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#162032",
          color: "#fff",
          border: "1px solid #334155",
        },
      }}
    />
  );
}

export default Toast;