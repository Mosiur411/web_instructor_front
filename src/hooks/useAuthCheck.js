import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn, userLoggedOut, userloading } from "../redux/auth/authSlice";
import { decodeToken, isExpired } from "react-jwt";
import axios from "axios";

export const useAuthCheck = () => {
    const dispatch = useDispatch();
    const [authCheck, setAuthCheck] = useState(false);
    useEffect(() => {
        const checkAuth = async () => {
            let token = localStorage.getItem("accessToken");
            if (token && !isExpired(token)) {
                const decoded = decodeToken(token);
                dispatch(userLoggedIn({ ...decoded, token }));
            } else {
                try {
                    // Request new access token using refresh token cookie
                    const res = await axios.post(
                        `${import.meta.env.VITE_APP_API_URI}auth/refresh-token`,
                        {},
                        { withCredentials: true }
                    );

                    const newToken = res.data?.accessToken;

                    if (newToken) {
                        localStorage.setItem("accessToken", newToken);
                        const decoded = decodeToken(newToken);
                        dispatch(userLoggedIn({ ...decoded, token: newToken }));
                    } else {
                        dispatch(userLoggedOut());
                    }
                // eslint-disable-next-line no-unused-vars
                } catch (err) {
                    dispatch(userLoggedOut());
                }
            }

            dispatch(userloading());
            setAuthCheck(true);
        };

        checkAuth();
    }, [dispatch]);

    return authCheck;
};
