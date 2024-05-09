import React, { useState, useRef, useEffect } from 'react';
import { IoIosMail } from "react-icons/io";
import { FaMobileScreenButton } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { SiCodechef } from "react-icons/si";
import { LiaEditSolid } from "react-icons/lia";
import { FaTwitter } from "react-icons/fa6";
import img from "./profile.png";
import Cookies from "js-cookie";
import axios from "axios";

const Profile = () => {

  const [edit, setEdit] = useState(false);
  const editRef = useRef(false); 
  const [user, setUser] = useState("");
  const [dob, setDob] = useState("");
  const [gender,setGender] = useState("");
  const [profession, setProfession] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [LinkedIn, setLinkdIn] = useState("");
  const [github, setGithub] = useState("");
  const [codechef, setCodechef] = useState("");
  const [x, setX] = useState("");
  const url = process.env.REACT_APP_BACKEND_URL;
  
//   onChange = {(e) => {(e.target.value)}}
  

useEffect(()=>{
  const details = async ()=>{
      const a = Cookies.get("loggedIn");
      setUser(a);
      console.log(user);
        try {
            const res = await axios.post(`${url}/get-contact`, {user:a});
            console.log(res);
            setDob(res.data.dob);
            setGender(res.data.gender);
            setProfession(res.data.profession);
            setMobile(res.data.mobile);
            setEmail(res.data.email);
            setLinkdIn(res.data.LinkedIn);
            setGithub(res.data.github);
            setCodechef(res.data.codechef);
            setX(res.data.X);

        } catch (error) {
            console.log(error);
        }
    }
    details();
  },[ ])
  // dob, gender, profession, mobile, email, LinkedIn, github, codechef, x
  const Edit = () => {
    setEdit(!editRef.current);
    editRef.current = !editRef.current;
  }

  const handleCancel = () => {
      setEdit(false); // Reset edit state
      editRef.current = false; // Reset edit ref
    };

    const handleSave = async() => {
        const data = {
            dob,
            gender,
            profession,
            mobile,
            email,
            LinkedIn,
            github,
            codechef,
            X:x,
            user
        };
        try {
            const res = await axios.post(`${url}/contact`, data);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
        // console.log(data);
      setEdit(false); // Reset edit state
      editRef.current = false; // Reset edit ref
    };



 
    return (
      <div className="bg-gray-100 w-[100vw] min-h-screen py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Your Profile</h1>
              <p className="text-gray-600">Manage your profile here</p>
            </div>
            <button
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md flex items-center"
              onClick={Edit}
            >
              <LiaEditSolid className="mr-2" />
              Edit Profile
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Section */}
            <div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <img src={img} alt="Profile" className="h-48 w-auto mx-auto mb-6 rounded-full" />
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{user}</h2>
                <div className="text-gray-700">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-2">
                    <span>Date of Birth:</span>
                    <span>{dob}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-2">
                    <span>Gender:</span>
                    <span>{gender}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Profession:</span>
                    <span>{profession}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Section */}
            <div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Info</h2>
                <div className="flex items-center border-b border-gray-200 pb-2 mb-2">
                  <FaMobileScreenButton className="text-gray-500 mr-2" />
                  <span>{mobile}</span>
                </div>
                <div className="flex items-center border-b border-gray-200 pb-2 mb-2">
                  <IoIosMail className="text-gray-500 mr-2" />
                  <span>{email}</span>
                </div>
              </div>
              <div className="mt-8 bg-white rounded-lg p-6 shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Links</h2>
                <div className="flex items-center border-b border-gray-200 pb-2 mb-2">
                  <FaLinkedin className="text-gray-500 mr-2" />
                  <a href={LinkedIn} className="text-blue-500">{LinkedIn}</a>
                </div>
                <div className="flex items-center border-b border-gray-200 pb-2 mb-2">
                  <FaGithub className="text-gray-500 mr-2" />
                  <a href={github} className="text-blue-500">{github}</a>
                </div>
                <div className="flex items-center border-b border-gray-200 pb-2 mb-2">
                  <SiCodechef className="text-gray-500 mr-2" />
                  <a href={codechef} className="text-blue-500">{codechef}</a>
                </div>
                <div className="flex items-center">
                  <FaTwitter className="text-gray-500 mr-2" />
                  <a href={x} className="text-blue-500">{x}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {edit &&
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
            </div>
          </div>
        }
      </div>
    )
  }
  
  export default Profile;