import React, { useEffect, useRef, useState } from "react";
import Section from "../ui/Section";
import Row from "../ui/Row";
import { useDispatch, useSelector } from "react-redux";
import defaultimg from "../../assets/default-avatar.png";
import { Pencil } from "lucide-react";
import { uploadProfilePicture } from "../../features/user/userThunk";

export default function UserProfile () {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const fileInputRef = useRef(null);
    const [preview , setPreview] = useState(user?.profile_picture || defaultimg);

    useEffect(() => {
    if (user?.profile_picture) {
        setPreview(user.profile_picture); 
    }
    }, [user?.profile_picture]);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setPreview(URL.createObjectURL(file));

        dispatch(uploadProfilePicture(file));
    };

    return (
        <Section className="bg-theme !pt-[75px] ">
            <Row className="flex flex-col md:flex-row justify-between items-center md:items-start gap-y-[30px] md:gap-x-[30px] !max-w-[1122px] pb-[57px]">
                <div className="text-center md:text-left flex-1">
                    <h1 className="text-[40px] font-medium text-dark mb-[24px] leading">My Account</h1>
                    <p className="text-[20px] text-dark mb-[20px] leading">Hello {user?.name || "User"} !</p>
                    <p className="text-light text-p">
                    Aspernatur magni in repellat repellendus itaque consequuntur alias necessitatibus.
                    </p>
                </div>

                <div className="relative w-[150px] h-[150px]">
                <img
                    src={preview || defaultimg}
                    alt={user?.name || "User"}
                    className="w-full h-full rounded-full border-4 circle-border object-cover"
                />
                <div
                    className="absolute bottom-1 right-1 box-shadow bg-color text-white p-2 rounded-full cursor-pointer"
                    onClick={() => fileInputRef.current.click()}
                    title="Edit Profile Picture"
                >
                    <Pencil size={16} />
                </div>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                />
                </div>
            </Row>
        </Section>
    );
};