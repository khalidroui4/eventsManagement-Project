import React from "react";
import "../../styles/skeleton.css";

export default function Skeleton({ type = "text", width, height, style }) {
    const styles = {
        width,
        height,
        ...style,
    };
    return <div className={`skeleton ${type}`} style={styles}></div>;
}
