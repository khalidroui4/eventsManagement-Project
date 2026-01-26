import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendRequest } from "../../store/organizerRequestsSlice";
import { useToast } from "../../context/ToastContext";

export default function OrganizerRequestSection({ user }) {
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const [requestMsg, setRequestMsg] = useState("");

  const handleSendRequest = async (e) => {
    e.preventDefault();
    if (!requestMsg.trim()) return;

    await dispatch(sendRequest({ user_id: user.idU, message: requestMsg }));
    setRequestMsg("");
    addToast("Demande envoyée avec succès !", "success");
  };

  return (
    <div className="profile-section">
      <h3>Demande pour devenir organisateur</h3>
      <form className="organizer-form" onSubmit={handleSendRequest}>
        <textarea
          value={requestMsg}
          onChange={(e) => setRequestMsg(e.target.value)}
          placeholder="Expliquez pourquoi vous voulez devenir organisateur..."
          required
          style={{ width: "90%" }}
        />
        <button type="submit">Envoyer la demande</button>
      </form>
    </div>
  );
}
