import React, { ReactNode, useMemo } from "react";
import Modal from "react-modal";

type ModalProps = {
  onClose: () => void;
  label?: string;
  children: ReactNode;
  style?: object;
  width?: string;
};

const CustomModal = ({
  onClose,
  label,
  children,
  style,
  width = "552px",
}: ModalProps) => {

  const modalStyle = useMemo(() => {
    const customStyles = {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          overflow: "visible",
          transform: "translate(-50%, -50%)",
          borderRadius: "24px",
          transition: "all 0.3s ease-in-out",
          backgroundColor: "#0a1119",
          width
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: "999"
        },
      }
    return {
      content: {
        ...customStyles.content,
        ...style,
      },
      overlay: { ...customStyles.overlay }
    };
  }, [style, width]);

  return (
    <Modal
      style={{
        content: modalStyle.content,
        overlay: modalStyle.overlay
      }}
      isOpen={true}
      onRequestClose={onClose}
      ariaHideApp={false}
      contentLabel={label}
    >
      {children}
    </Modal>
  );
};

Modal.setAppElement("#root");

export default CustomModal;
