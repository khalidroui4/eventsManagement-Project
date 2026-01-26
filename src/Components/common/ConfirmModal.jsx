import Modal from "./Modal";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title || "Confirmer l'action"}
    >
      <div style={{ textAlign: "center", padding: "10px 0" }}>
        <div style={{ marginBottom: "15px", color: "#ff9800" }}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <p
          style={{
            fontSize: "1.1rem",
            color: "rgba(255,255,255,0.9)",
            marginBottom: "20px",
          }}
        >
          {message}
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
          <button
            className="cancel"
            onClick={onClose}
            style={{ padding: "10px 30px" }}
          >
            Non, annuler
          </button>
          <button
            className="delete-btn-sm"
            onClick={onConfirm}
            style={{
              padding: "10px 30px",
              background: "linear-gradient(90deg, #ff6b6b 0%, #ff4757 100%)",
              color: "white",
              border: "none",
            }}
          >
            Oui, continuer
          </button>
        </div>
      </div>
    </Modal>
  );
}
