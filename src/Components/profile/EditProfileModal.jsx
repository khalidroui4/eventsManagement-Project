import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveProfile, setUserProfile } from "../../store/authSlice";
import Modal from "../common/Modal";
import { updateProfile } from "../../api/profileApi";
import { useToast } from "../../context/ToastContext";

export default function EditProfileModal({ user, isOpen, onClose }) {
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const [form, setForm] = useState({
    full_name: "",
    username: "",
    gmailU: "",
    location: "Maroc",
    profile_image: null,
    preview: null,
  });

  useEffect(() => {
    if (user) {
      setForm({
        full_name: user.full_name,
        username: user.username,
        gmailU: user.gmailU,
        location: user.location || "Maroc",
        profile_image: null,
        preview: user.profile_image
          ? `http://localhost/project_backend/${user.profile_image}`
          : null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        profile_image: file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("idU", user.idU);
    formData.append("full_name", form.full_name);
    formData.append("username", form.username);
    formData.append("gmailU", form.gmailU);
    formData.append("location", form.location);
    if (form.profile_image) {
      formData.append("profile_image", form.profile_image);
    }

    try {
      const res = await updateProfile(formData);
      if (res.success) {
        dispatch(setUserProfile(res.user));
        addToast("Profil mis à jour avec succès !", "success");
        onClose();
      } else {
        addToast("Erreur lors de la mise à jour du profil", "error");
      }
    } catch (e) {
      console.error(e);
      addToast("Une erreur est survenue", "error");
    }
  };

  return (
    <Modal title="Modifier le profil" isOpen={isOpen} onClose={onClose}>
      <div className="modal-body">
        <div
          className="form-group"
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "#1a3c3c",
              margin: "0 auto 10px",
              overflow: "hidden",
              border: "3px solid #4facfe",
            }}
          >
            {form.preview ? (
              <img
                src={form.preview}
                alt="Preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#ccc",
                }}
              >
                📷
              </div>
            )}
          </div>
          <label
            className="file-upload-btn"
            style={{
              display: "inline-block",
              padding: "8px 16px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
          >
            Changer la photo
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </label>
        </div>

        <div className="form-group">
          <label>Nom complet</label>
          <input
            type="text"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="gmailU"
            value={form.gmailU}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Localisation</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="modal-actions">
        <button className="cancel" onClick={onClose}>
          Annuler
        </button>
        <button className="save" onClick={handleSave}>
          Confirmer
        </button>
      </div>
    </Modal>
  );
}
