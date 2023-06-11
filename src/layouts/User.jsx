import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../pages/UserPage";
import PropTypes from "prop-types";

const User = () => {
    const params = useParams();
    const { userId } = params;
    return (
        <>
            <UserPage userId={userId} />
        </>
    );
};
User.propTypes = {
    userId: PropTypes.string
};
export default User;
