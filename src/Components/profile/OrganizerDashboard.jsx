import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEvent, editEvent, removeEvent } from "../../store/eventsSlice";
import { fetchCreatedEvents } from "../../store/profileSlice";
import EventList from "./EventList";
import EventModal from "./EventModal";
import { useToast } from "../../context/ToastContext";
import DashboardStats from "./DashboardStats";
import PerformanceChart from "./PerformanceChart";
import ConfirmModal from "../common/ConfirmModal";

export default function OrganizerDashboard({ createdEvents, user, loading }) {
    const dispatch = useDispatch();
    const { addToast } = useToast();
    const [showModal, setShowModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    const handleAdd = async (formData) => {
        await dispatch(addEvent({ event: formData, user }));
        dispatch(fetchCreatedEvents(user.idU));
        addToast("Événement créé avec succès !", "success");
        setShowModal(false);
    };

    const handleEdit = async (formData) => {
        if (editingEvent) {
            await dispatch(editEvent({ id: editingEvent.idE, event: formData }));
            dispatch(fetchCreatedEvents(user.idU));
            addToast("Événement modifié avec succès !", "success");
            setShowModal(false);
            setEditingEvent(null);
        }
    };

    const openDelete = (id) => {
        setDeleteId(id);
    };

    const confirmDelete = async () => {
        if (deleteId) {
            await dispatch(removeEvent(deleteId));
            dispatch(fetchCreatedEvents(user.idU));
            addToast("Événement supprimé !", "info");
            setDeleteId(null);
        }
    };

    const openCreate = () => {
        setEditingEvent(null);
        setShowModal(true);
    };

    const openEdit = (event) => {
        setEditingEvent(event);
        setShowModal(true);
    };

    // Calculate Stats
    const totalEvents = createdEvents.length;
    const totalParticipants = createdEvents.reduce((acc, curr) => acc + (parseInt(curr.num_participant) || 0), 0);
    const upcomingEvents = createdEvents.filter(e => new Date(e.dateE) >= new Date()).length;

    const stats = [
        { label: "Événements Créés", value: totalEvents, icon: "📅" },
        { label: "Total Participants", value: totalParticipants, icon: "👥" },
        { label: "À Venir", value: upcomingEvents, icon: "⏳" },
    ];

    return (
        <div className="profile-section">
            <div className="section-header">
                <h3>Mes événements créés</h3>
                <button className="add-event-btn" onClick={openCreate}>
                    + Ajouter un événement
                </button>
            </div>

            <DashboardStats stats={stats} />

            {/* PERFORMANCE CHART */}
            {createdEvents.length > 0 && <PerformanceChart events={createdEvents} />}

            <EventList
                events={createdEvents}
                emptyMessage="Vous n'avez encore créé aucun événement"
                loading={loading}
                renderActions={(e) => (
                    <>
                        <button className="edit-btn-sm" onClick={(ev) => { ev.stopPropagation(); openEdit(e); }}>
                            ✎ Modifier
                        </button>
                        <button className="delete-btn-sm" onClick={(ev) => { ev.stopPropagation(); openDelete(e.idE); }}>
                            🗑 Supprimer
                        </button>
                    </>
                )}
            />

            <EventModal
                isOpen={showModal}
                event={editingEvent}
                onClose={() => setShowModal(false)}
                onSave={editingEvent ? handleEdit : handleAdd}
            />

            {/* CONFIRM DELETE MODAL */}
            <ConfirmModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={confirmDelete}
                title="Supprimer l'événement ?"
                message="Cette action est irréversible. Voulez-vous vraiment supprimer cet événement ?"
            />
        </div>
    );
}
