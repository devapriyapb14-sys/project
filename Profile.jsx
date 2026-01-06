import React, { useState, useEffect } from "react";
import api from "../api/axios";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    place: "",
    email: "",
    phone: "",
    education: "",
  });

  const [loading, setLoading] = useState(true);

  // 🔗 Load profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/profile");
        setProfile(res.data);
      } catch (err) {
        console.error("Profile load failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  // 💾 Save profile to backend
  const handleSave = async () => {
    try {
      const res = await api.put("/auth/profile", profile);
      setProfile(res.data.user);
      alert("Profile saved successfully ✅");
    } catch (err) {
      alert("Failed to save profile");
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading profile...</p>;
  }

  return (
    <div className="profile-page">
      <h2 className="profile-title">My Profile</h2>

      <img
        src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
        alt="profile"
        className="profile-pic"
      />

      <div className="profile-form">
        <input name="name" value={profile.name} onChange={handleChange} placeholder="Name" />
        <input name="age" value={profile.age} onChange={handleChange} placeholder="Age" />
        <input name="place" value={profile.place} onChange={handleChange} placeholder="Place" />
        <input name="email" value={profile.email} disabled />
        <input name="phone" value={profile.phone} onChange={handleChange} placeholder="Phone" />
        <input name="education" value={profile.education} onChange={handleChange} placeholder="Education" />

        <button onClick={handleSave}>Save Profile</button>
      </div>
    </div>
  );
};

export default Profile;
