import React from "react";

const BellhopTitle = ({ record }) => {
    return <span>{record ? `${record.name} Bellhop` : ''}</span>;
};

export default BellhopTitle;