import React from "react";

const UserTitle = ({ record }) => {
    return <span>{record ? `${record.name}` : ''}</span>;
};

export default UserTitle;