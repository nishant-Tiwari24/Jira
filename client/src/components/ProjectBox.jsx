// import React, { Link } from 'react';
// import axios from "axios";

// const ProjectBox = () => {
//     const url = process.env.REACT_APP_BACKEND_URL;
//     const [boxData, setBoxData] = React.useState([{
//         "name":"school",
//         "description": "nice word",
//         "admin": "rohit",
//         "projectType": "educatoin"
//       },
//       {
//         "name":"office",
//         "desp": "good work",
//         "admin": "bicchu",
//         "projectType": "finance"
//       }
//     ]);

//     React.useEffect(() => {
//         const fetchData = async () => {
//           try {
//             const resp = await axios.post(`${url}/get-project-detail`);
//             setBoxData(prevData => [...prevData, ...resp.data]);
//           } catch (error) {
//             console.log(error);
//           }
//         };
    
//         fetchData();
    
//       }, []);
//   return (
//     <div>
//         <div className="content" style={{ display: "flex" }}>
//             {boxData.map((elem, index)=>(
//             <Link to="/work">
//               <div key={index} className="bg-neutral-600 w-1/6 h-[250px] m-5 rounded-lg p-4 flex flex-col justify-between">
//                 <div className="mb-6 text-2xl border-b-2 border-black flex justify-center">{elem.name}</div>
//                 <div> 
//                   <p>admin: {elem.admin}</p>
//                   <p>description: {elem.description}</p>
//                 </div>
//                 <div className="border-t-2 border-black justify-center align-bottom flex"> {elem.projectType} </div>
//               </div>
//             </Link>
//             ))
//             }
//           </div>
//     </div>
//   )
// }

// export default ProjectBox


import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from "axios";
// import Cookies from "js-cookie";

const ProjectBox = () => {
    const url = process.env.REACT_APP_BACKEND_URL;
    const [boxData, setBoxData] = React.useState([]);
    // const [usrname, setUsername] = React.useState( Cookies.get("loggedIn"));

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.post(`${url}/get-project-detail`);
                setBoxData(resp.data); // Directly set boxData to response data
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-wrap justify-cente">
          {boxData.map((elem, index) => (
            <Link key={index} to={`/project/${elem.name}`} className="w-64 m-4 bg-gray-700 rounded-lg shadow hover:shadow-lg hover:scale-102 transition duration-300 ease-in-out border border-gray-600">
              <div className="p-4 text-white">
                <h2 className="text-xl font-medium mb-2">{elem.name}</h2>
                <p className="text-gray-300">
                  admin: <span className="font-bold">{elem.admin}</span>
                </p>
                <p className="text-gray-300">
                  description: {elem.description || elem.desp}
                </p>
                <div className="mt-4 text-right">
                  <button className="px-3 py-1 text-white bg-amber-500 rounded-full hover:bg-amber-600 focus:outline-none">
                    {elem.projectType}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      );
}

export default ProjectBox;
