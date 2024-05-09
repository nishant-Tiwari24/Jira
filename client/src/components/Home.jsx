import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import Header from './Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectBox from './ProjectBox';
import Work from "./Work";
import Profile from "./Profile";


const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showPlus, setShowPlus] = useState(false);
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [showJoinClass, setShowJoinClass] = useState(false);
  const [projectcode , setProjectCode] = useState("");
  const [boxData, setBoxData] = useState([{
    "name":"school",
    "description": "nice word",
    "admin": "rohit",
    "projectType": "educatoin"
  },
  {
    "name":"office",
    "desp": "good work",
    "admin": "bicchu",
    "projectType": "finance"
  }
]);

const [name, setName] = useState("");
const [desp, setDesp] = useState("");
const [ptype, setType] = useState("");

  const url = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.post(`${url}/get-project-detail`);
        setBoxData(prevData => [...prevData, ...resp.data]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const togglePlus = () => {
    setShowPlus(!showPlus);
  };

  const toggleCreateClass = () => {
    setShowPlus(false);
    setShowCreateClass(!showCreateClass);
  };

  const toggleJoinClass = () => {
    setShowJoinClass(!showJoinClass);
    setShowPlus(false);
    // setShowPlus(!showPlus);
    console.log(Cookies.get("loggedIn"));
  };

  const logout = () =>{
    Cookies.remove("loggedIn");
  }

  const createProject = async () => {
    try {
      const a = Cookies.get('loggedIn');
      console.log(a);
      const data = {
        name: name,
        desp: desp,
        type: ptype,
        user: a,
      }
      const res = await axios.post(`${url}/create-project`, data);
      console.log(res);
      console.log(name, desp, ptype, Cookies.get("loggedIn"));
      // If creation is successful, close the modal and update boxDat
      setShowCreateClass(false);
      setBoxData(prevData => [...prevData, {"name": name, "admin": "bhowmik", "desp": desp, "projectType":ptype}]);
    } catch (error) {
      console.log(error);
    }
  };

  const joinproject = async() =>{
    console.log(projectcode);
    setShowJoinClass(!showJoinClass);
  };

  return (
<>
      <div className="page">
        {/* side bar content */}
        <div className={`sidebar ${isSidebarOpen ? '' : 'close'}`}>
          <div className="logo-details">
          <i class='bx bx-notepad'></i>
            <span className="logo_name">TeachHive</span>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="#">
                <i className="fas fa-home" />
                <span className="navlink">Home</span>
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="fas fa-calendar-check" />
                <span className="navlink">To-do</span>
              </Link>
            </li>
            <li>
              <Link to="/project">
                <i className="fas fa-graduation-cap" />
                <span className="navlink">All Project</span>
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="fas fa-cog" />
                <span className="navlink">Settings</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* home content */}
        <section className="home-section">
          <div className="home-content" style={{ justifyContent: "space-between" }}>
            <div className="menu">
              <button id='bx_menu' onClick={toggleSidebar}>
                <i className="bx bx-menu"/>
              </button>
              <span className="text">TeachHive</span>
            </div>
            <div className="menubar" style={{ display: "block" }}>
              <div className="icons">
                <div id="plus-btn" className="fa fa-plus" onClick={togglePlus} />

                <Link to="/profile">
                  <div id="user-btn" className="fas fa-user" />
                </Link>
                <Link to="/loginRegister">
                <div id="toggle-btn" style={{ marginRight: "1rem" }} onClick={logout} className="bx bx-log-out-circle font-bold"> </div>
                </Link>
              </div>
              {/* <div className={`profile ${showProfile ? 'active' : ''}`}>
                <img src="profile.jpeg" alt="" />
                <h3>Rohit</h3>
                <span>Student</span>
                <div className="profile-btn">
                  <a href="profile.html">Profile</a>
                  <button onClick={logout}>Logout</button>
                </div>
              </div> */}
              
              <div className={`plus ${showPlus ? 'active' : ''}`}>
                <button id="join" onClick={toggleJoinClass}>Join</button>
                <button id="rate" onClick={toggleCreateClass}>Create</button>
              </div>
              
            </div>
          </div>

          {/* home sub Routes */}
          <div className=" flex w-full" >
            <Routes>
                <Route path="/project" element={<ProjectBox />} />
                <Route path="/header" element={<Header />} />
                <Route path="/project/*" element={<Work />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>

        </section>
      </div>

      {/* join class */}
      {/* {showJoinClass && ( */}
        <div className={`joinclass ${showJoinClass ? 'active' : ''}`}>
          <p>Join Project</p>
          <div className="form">
            <input
              type="text"
              name="projectcode"
              placeholder="Project code"
              id="projectcode"
              required=""
              onChange={(e)=>setProjectCode(e.target.value)}
            />
            <br />
            <div className="joinbtn">
              <button id="jcancel-btn" onClick={toggleJoinClass}>cancel</button>
              <button id="join-btn" onClick={joinproject}>join</button>
            </div>
          </div>
        </div>
      {/* )} */}

      {/* create class */}
      {/* {showCreateClass && ( */}
        <div className={`createclass ${showCreateClass ? 'active' : ''}`}>
          <p>New Project</p>
          <div className="form">
            <input
              type="text"
              name="projectname"
              placeholder="Project Name"
              id="projectname"
              required=""
              onChange={(e)=>{setName(e.target.value)}}
            />
            <br />
            <input
              type="text"
              name="description"
              placeholder="Description"
              id="Semester"
              required=""
              onChange={(e)=>{setDesp(e.target.value)}}
            />
            <br />
            <select name="Project Type" id="projecttype" required="" onChange={(e)=>{setType(e.target.value)}}>
              <option value="">Project Type</option>
              <option value="visa">Software Development</option>
              <option value="rupay">Education</option>
              <option value="Marketing">Marketing</option>
              <option value="Design">Design</option>
              <option value="Personal">Personal</option>
              <option value="Product Management">Product Management</option>
              <option value="Human Resource">Human Resource</option>
              <option value="Finance">Finance</option>
            </select>
            <div className="create-btn">
              <button id="cancel-btn" onClick={toggleCreateClass}>cancel</button>
              <button id="create" onClick={createProject}>create</button>
            </div>
          </div>
        </div>
      {/* )} */}
    </>
  );
};

export default Home;




// import React, { useState, useEffect } from 'react';
// import axios from "axios";
// import Cookies from 'js-cookie';


// export const Home = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [boxData, setBoxData] = useState([{
//     "name":"school",
//     "description": "nice word",
//     "admin": "rohit",
//     "projectType": "educatoin"
//   },
//   {
//     "name":"office",
//     "desp": "good work",
//     "admin": "bicchu",
//     "projectType": "finance"
//   }
// ]);

// const [url, setUrl] = useState(process.env.REACT_APP_BACKEND_URL);

//   useEffect(() => {
//     const sidebarBtn = document.querySelector("#bx_menu");
//     const sidebar = document.querySelector(".sidebar");


//     // get box data from server
//     const projectData = async () =>{
//         try {
//           const resp = await axios.post(`${url}/get-project-detail`);
//           console.log(resp.data);
//           setBoxData([...boxData, ...resp.data])
//           console.log("data");
//         } catch (error) {
//           console.log(error);
//         }
//     }
//     projectData();


//     const toggleSidebar = () => {
//       setIsSidebarOpen(!isSidebarOpen);
//       sidebar.classList.toggle("close");
//     };
//     sidebarBtn.addEventListener("click", toggleSidebar);

//     const profileBtn = document.querySelector('#user-btn');
//     const profile = document.querySelector('.home-section .home-content .menubar .profile');
//     profileBtn.onclick = () => {
//       profile.classList.toggle('active');
//     }

//     const plusBtn = document.querySelector('#plus-btn');
//     const pluss = document.querySelector('.home-section .home-content .plus');
//     plusBtn.onclick = () => {
//       pluss.classList.toggle('active');
//     }

//     // create class box
//     const rateBtn = document.querySelector('#rate');
//     const Create = document.querySelector('.createclass');
//     const blur = document.querySelector('.page');
//     rateBtn.onclick = () => {
//       Create.classList.toggle('active');
//       pluss.classList.toggle('active');
//       blur.classList.toggle('active');
//     }

//     const cancelBtn = document.querySelector('#cancel-btn');
//     cancelBtn.onclick = () => {
//       Create.classList.toggle('active');
//       blur.classList.toggle('active');
//     }

//     // box creation
//     const createBtn = document.querySelector('#create');
//     createBtn.onclick = () => {
//       Create.classList.toggle('active');
//       blur.classList.toggle('active');
//       const createBox = async() =>{
//         try {
//           const res = await axios.post('/create-project', {});
//           console.log(res);
//         } catch (error) {
//           console.log(error);
//         }
//       }
//       // const flag_create = document.createElement('div');
//       // flag_create.innerHTML = `<div id="flag"></div>`;
//       // const contentDiv = document.querySelector('.content');
//       // contentDiv.appendChild(flag_create);
//       setBoxData([...boxData, {"name": "af", "admin": "sdf", "desp": "dsf"}]);
//       console.log("done");
//     }

//     const joinBtn = document.querySelector('#join');
//     const Join = document.querySelector('.joinclass');
//     joinBtn.onclick = () => {
//       Join.classList.toggle('active');
//       pluss.classList.toggle('active');
//       blur.classList.toggle('active');
//       console.log(Cookies.get("loggedIn"));
//     }

//     const jcancelBtn = document.querySelector('#jcancel-btn');
//     jcancelBtn.onclick = () => {
//       Join.classList.toggle('active');
//       blur.classList.toggle('active');
//     }

//     const joinBtn2 = document.querySelector('#join-btn');
//     joinBtn2.onclick = () => {
//       Join.classList.toggle('active');
//       blur.classList.toggle('active');
//       const newbox = document.createElement('div');
//       newbox.innerHTML = `<div id="flag"></div>`;
//       const contentDiv = document.querySelector('.content');
//       contentDiv.appendChild(newbox);
//     }

//     return () => {
//       // Cleanup: remove event listeners when component unmounts
//       sidebarBtn.removeEventListener("click", toggleSidebar);
//       profileBtn.onclick = null;
//       plusBtn.onclick = null;
//       rateBtn.onclick = null;
//       cancelBtn.onclick = null;
//       createBtn.onclick = null;
//       joinBtn.onclick = null;
//       jcancelBtn.onclick = null;
//       joinBtn2.onclick = null;
//     };
//   }, [isSidebarOpen]);

//   return (
//     <>
//       <div className="page">
//         <div className={`sidebar ${isSidebarOpen ? '' : 'close'}`}>
//           <div className="logo-details">
//             <i className="bx bxl-c-plus-plus" />
//             <span className="logo_name">TeachHive</span>
//           </div>
//           <ul className="nav-links">
//             <li>
//               <a href="#">
//                 <i className="fas fa-home" />
//                 <span className="navlink">Home</span>
//               </a>
//             </li>
//             <li>
//               <a href="#">
//                 <i className="fas fa-calendar-check" />
//                 <span className="navlink">To-do</span>
//               </a>
//             </li>
//             <li>
//               <a href="#">
//                 <i className="fas fa-graduation-cap" />
//                 <span className="navlink">All Project</span>
//               </a>
//             </li>
//             <li>
//               <a href="#">
//                 <i className="fas fa-cog" />
//                 <span className="navlink">Settings</span>
//               </a>
//             </li>
//           </ul>
//         </div>

//         <section className="home-section">
//           <div className="home-content" style={{ justifyContent: "space-between" }}>
//             <div className="menu">
//               <button id='bx_menu'>
//                 <i className="bx bx-menu"/>
//               </button>
//               <span className="text">TeachHive</span>
//             </div>
//             <div className="menubar" style={{ display: "block" }}>
//               <div className="icons">
//                 <div id="plus-btn" className="fa fa-plus" />
//                 <div id="user-btn" className="fas fa-user" />
//                 <div
//                   id="toggle-btn"
//                   style={{ marginRight: "1rem" }}
//                   className="fas fa-moon "
//                 />
//               </div>
//               <div className="profile">
//                 <img src="profile.jpeg" alt="" />
//                 <h3>Rohit</h3>
//                 <span>Student</span>
//                 <div className="profile-btn">
//                   <a href="profile.html">Profile</a>
//                   <a href="logout">Logout</a>
//                 </div>
//               </div>
//               <div className="plus">
//                 <button id="join">Join</button>
//                 <button id="rate">Create</button>
//               </div>
//             </div>
//           </div>

//           <div className="content" style={{ display: "flex" }}>
//             {boxData.map((elem, index)=>(
//               <div key={index} className="bg-neutral-600 w-1/6 h-[250px] m-5 rounded-lg p-4 flex flex-col justify-between">
//                 <div className="mb-6 text-2xl border-b-2 border-black flex justify-center">{elem.name}</div>
//                 <div> 
//                   <p>admin: {elem.admin}</p>
//                   <p>description: {elem.description}</p>
//                 </div>
//                 <div className="border-t-2 border-black justify-center align-bottom flex"> {elem.projectType} </div>
//               </div>
//             ))
//             }
//           </div>
//         </section>
//       </div>

//       <div className="joinclass">
//         <p>Join Project</p>
//         <div className="form">
//           <input
//             type="text"
//             name="projectcode"
//             placeholder="Project code"
//             id="projectcode"
//             required=""
//           />
//           <br />
//           <div className="joinbtn">
//             <button id="jcancel-btn">cancel</button>
//             <button id="join-btn">join</button>
//           </div>
//         </div>
//       </div>

//       <div className="createclass">
//         <p>New Project</p>
//         <div className="form">
//           <input
//             type="text"
//             name="projectname"
//             placeholder="Project Name"
//             id="projectname"
//             required=""
//           />
//           <br />
//           <input
//             type="text"
//             name="description"
//             placeholder="Description"
//             id="Semester"
//             required=""
//           />
//           <br />
//           <select name="Project Type" id="projecttype" required="">
//             <option value="">Project Type</option>
//             <option value="visa">Software Development</option>
//             <option value="rupay">Education</option>
//             <option value="Marketing">Marketing</option>
//             <option value="Design">Design</option>
//             <option value="Personal">Personal</option>
//             <option value="Product Management">Product Management</option>
//             <option value="Human Resource">Human Resource</option>
//             <option value="Finance">Finance</option>
//           </select>
//           <div className="create-btn">
//             <button id="cancel-btn">cancel</button>
//             <button id="create">create</button>
//           </div>
//         </div>
//       </div>

//     </>
//   );
// };

// export default Home;
