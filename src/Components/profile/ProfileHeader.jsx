import React, { useState } from "react";
import EditProfileModal from "./EditProfileModal";

export default function ProfileHeader({ user }) {
    const [isEditOpen, setIsEditOpen] = useState(false);

    return (
        <div className="profile-card">
            <button className="edit-btn" onClick={() => setIsEditOpen(true)}>
                ✎ modifier
            </button>

            <div className="profile-left">
                <div className="profile-img">
                    {user.profile_image ? (
                        <img src={`http://localhost/project_backend/${user.profile_image}`} alt={user.username} />
                    ) : (
                        <span style={{ fontSize: '4rem', color: '#132e2e', fontWeight: 'bold' }}>
                            {user.username.charAt(0).toUpperCase()}
                        </span>
                    )}
                </div>
            </div>

            <div className="profile-right">
                <h2>{user.full_name}</h2>
                <div className="row">
                    <strong>Username :</strong>
                    <span className="username">@{user.username}</span>
                </div>
                <div className="row">
                    <strong>Email :</strong>
                    <span>{user.gmailU}</span>
                </div>
                <div className="row">
                    <strong>Localisation :</strong>
                    <span>{user.location}</span>
                </div>
            </div>

            <EditProfileModal user={user} isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
        </div>
    );
}
