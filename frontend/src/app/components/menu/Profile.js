import Auth from "@/Auth/Auth";
import { useEffect, useState } from "react";

export default function Profile() {

    const [profile, setProfile] = useState({})

    useEffect(() => {

        Auth.profile(setProfile)

    }, [])

    return (
        <div className="profile_block">
            {profile.email}
        </div>
    );
}