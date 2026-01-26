import { useState, useEffect } from "react";
import Modal from "../common/Modal";

export default function EventModal({ event, isOpen, onClose, onSave }) {
  const [form, setForm] = useState({
    event_name: "",
    capaciteE: "",
    dateE: "",
    placeE: "",
    descriptionE: "",
  });

  useEffect(() => {
    if (event) {
      setForm({
        event_name: event.event_name,
        capaciteE: event.capaciteE,
        dateE: event.dateE,
        placeE: event.placeE,
        descriptionE: event.descriptionE,
      });
    } else {
      setForm({
        event_name: "",
        capaciteE: "",
        dateE: "",
        placeE: "",
        descriptionE: "",
      });
    }
  }, [event, isOpen]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <Modal
      title={event ? "Modifier l’événement" : "Ajouter un événement"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        <label>Nom</label>
        <input
          name="event_name"
          value={form.event_name}
          onChange={handleChange}
          required
        />

        <label>Capacité</label>
        <input
          type="number"
          name="capaciteE"
          value={form.capaciteE}
          onChange={handleChange}
          required
        />

        <label>Date</label>
        <input
          type="date"
          name="dateE"
          value={form.dateE}
          onChange={handleChange}
          required
        />

        <label>Lieu</label>
        <input
          name="placeE"
          value={form.placeE}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="descriptionE"
          value={form.descriptionE}
          onChange={handleChange}
          required
        />

        <div className="modal-actions">
          <button type="button" className="cancel" onClick={onClose}>
            Annuler
          </button>
          <button type="submit" className="save">
            {event ? "Enregistrer" : "Créer"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
