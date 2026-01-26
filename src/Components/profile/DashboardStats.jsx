import { motion } from "framer-motion";

export default function DashboardStats({ stats }) {
  return (
    <div
      className="stats-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            padding: "20px",
            borderRadius: "16px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "white",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "10px" }}>
            {stat.icon}
          </div>
          <h3 style={{ fontSize: "2rem", margin: "0", fontWeight: "700" }}>
            {stat.value}
          </h3>
          <p style={{ margin: "5px 0 0", opacity: 0.8, fontSize: "0.9rem" }}>
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
