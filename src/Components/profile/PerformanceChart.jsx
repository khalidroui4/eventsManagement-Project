import React from "react";
import { motion } from "framer-motion";

export default function PerformanceChart({ events }) {
    // 1. Prepare data
    const data = events.map(e => ({
        name: e.event_name,
        participants: parseInt(e.num_participant) || 0,
        capacity: parseInt(e.capaciteE) || 100
    })).slice(0, 7); // Show max 7 items to avoid overcrowding

    if (data.length === 0) return null;

    const maxVal = Math.max(...data.map(d => d.participants), 10); // Avoid division by zero

    return (
        <div className="profile-section" style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
            marginTop: '30px',
            marginBottom: '30px'
        }}>
            <h3 style={{ marginBottom: '20px' }}>📊 Aperçu des participations</h3>

            <div style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                height: "200px",
                gap: "10px",
                padding: "20px 10px 0"
            }}>
                {data.map((item, i) => {
                    const heightPct = (item.participants / maxVal) * 100;
                    return (
                        <div key={i} style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1,
                            height: '100%', justifyContent: 'flex-end'
                        }}>
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${heightPct}%` }}
                                transition={{ duration: 0.8, delay: i * 0.1, type: "spring" }}
                                style={{
                                    width: '100%',
                                    maxWidth: '40px',
                                    background: 'linear-gradient(to top, #4facfe, #00f2fe)',
                                    borderRadius: '8px 8px 0 0',
                                    position: 'relative',
                                    minHeight: '4px'
                                }}
                            >
                                <span style={{
                                    position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)',
                                    color: 'white', fontSize: '0.8rem', fontWeight: 'bold'
                                }}>
                                    {item.participants}
                                </span>
                            </motion.div>
                            <span style={{
                                marginTop: '10px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)',
                                textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                maxWidth: '60px'
                            }}>
                                {item.name.split(' ')[0]}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
