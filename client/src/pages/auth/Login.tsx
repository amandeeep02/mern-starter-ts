import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
    const [error, setError] = useState("");
    const { loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            await loginWithGoogle();
            navigate("/Landing");
        } catch (err) {
            setError("Failed to sign in with Google");
            console.error(err);
        }
    };

    return (
        <div>
            {error && <div className="error">{error}</div>}
            <button type="button" onClick={handleGoogleSignIn}>
                Sign in with Google
            </button>
        </div>
    );
}

export default Login;
