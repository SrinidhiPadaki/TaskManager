// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // import { DndProvider } from 'react-dnd';
// // import { HTML5Backend } from 'react-dnd-html5-backend'; // You can choose a different backend if needed
// // import Login from './pages/login';
// // import Register from './pages/Register';
// // import Dashboard from './pages/Dashboard';

// // const App = () => {
// //     const isAuthenticated = !!localStorage.getItem('token'); // Check if the token exists in localStorage

// //     return (
// //         <Router>
// //             <DndProvider backend={HTML5Backend}>
// //                 <Routes>
// //                     <Route path="/login" element={<Login />} />
// //                     <Route path="/register" element={<Register />} />
// //                     <Route
// //                         path="/dashboard"
// //                         element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
// //                     />
// //                     <Route path="*" element={<Navigate to="/login" />} />
// //                 </Routes>
// //             </DndProvider>
// //         </Router>
// //     );
// // };

// // export default App;

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend'; // You can choose a different backend if needed
// import Login from './pages/login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';

// const App = () => {
//     const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token')); // Track authentication state

//     // Use useEffect to listen for changes in localStorage (token)
//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         setIsAuthenticated(!!token);
//     }, [localStorage.getItem('token')]); // When the token changes, re-check authentication status

//     return (
//         <Router>
//             <DndProvider backend={HTML5Backend}>
//                 <Routes>
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/register" element={<Register />} />
//                     <Route
//                         path="/dashboard"
//                         element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
//                     />
//                     <Route path="*" element={<Navigate to="/login" />} />
//                 </Routes>
//             </DndProvider>
//         </Router>
//     );
// };

// export default App;

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import Login from './pages/login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';

// const App = () => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     // Use useEffect to check authentication state based on the presence of a token
//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         setIsAuthenticated(!!token);  // Set authentication state based on token presence
//     }, []); // Runs once when the component mounts

//     // Handle logout by clearing token from localStorage
//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         setIsAuthenticated(false);  // Set authentication state to false
//     };

//     return (
//         <Router>
//             <DndProvider backend={HTML5Backend}>
//                 <Routes>
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/register" element={<Register />} />
//                     <Route
//                         path="/dashboard"
//                         element={isAuthenticated ? <Dashboard/> : <Navigate to="/login" />}
//                     />
//                     <Route path="*" element={<Navigate to="/login" />} />
//                 </Routes>
//             </DndProvider>
//         </Router>
//     );
// };

// export default App;

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import Login from './pages/login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import TaskView from './components/TaskView';  // Import TaskView component

// const App = () => {
//     const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token')); // Track authentication state

//     // Use useEffect to listen for changes in localStorage (token)
//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         setIsAuthenticated(!!token);
//     }, [localStorage.getItem('token')]); // When the token changes, re-check authentication status

//     return (
//         <Router>
//             <DndProvider backend={HTML5Backend}>
//                 <Routes>
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/register" element={<Register />} />
//                     <Route
//                         path="/dashboard"
//                         element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
//                     />
//                     <Route
//                         path="/tasks/:id"  // Task detail page route with dynamic task id
//                         element={isAuthenticated ? <TaskView /> : <Navigate to="/login" />}
//                     />
//                     <Route path="*" element={<Navigate to="/login" />} />
//                 </Routes>
//             </DndProvider>
//         </Router>
//     );
// };

// export default App;


// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import Login from './pages/login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import TaskView from './components/TaskView'; // Re-add TaskView import
// import HandleGoogleRedirect from './pages/HandleGoogleRedirect';

// const App = () => {
//     const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
//     const [loading, setLoading] = useState(true);  // Track loading state


//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         const userId = localStorage.getItem('userId');
//         if (token && userId) {
//             setIsAuthenticated(true);
//         }
//         setLoading(false);  // Check both token and userId  

        
//     }, []);
//     if (loading) {
//         return <div>Loading...</div>; // Show a loading screen until auth check is complete
//     }

//     return (
//         <Router>
//             <DndProvider backend={HTML5Backend}>
//                 <Routes>
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/register" element={<Register />} />
//                     <Route
//                         path="/dashboard"
//                         element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
//                     />
//                     <Route
//                         path="/tasks/:id"
//                         element={isAuthenticated ? <TaskView /> : <Navigate to="/login" />} // TaskView route
//                     />
//                     <Route
//                         path="/api/auth/google/callback"
//                         element={<HandleGoogleRedirect />} // Handle Google redirect
//                     />
//                     <Route path="*" element={<Navigate to="/login" />} />
//                 </Routes>
//             </DndProvider>
//         </Router>
//     );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Login from './pages/login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TaskView from './components/TaskView'; 
import HandleGoogleRedirect from './pages/HandleGoogleRedirect';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('token'));
    const [loading, setLoading] = useState(true); // Add a loading state to show until authentication is verified

    useEffect(() => {
        // Check if the user has a valid token and userId in localStorage
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');
        if (token && userId) {
            setIsAuthenticated(!!sessionStorage.getItem('token')); // User is authenticated
        } else {
            setIsAuthenticated(!!sessionStorage.getItem('token')); // User is not authenticated
        }
        setLoading(false); // Set loading to false once the check is complete
    }, []);

    // If still loading, show a loading screen
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <DndProvider backend={HTML5Backend}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/auth/google/callback"
                        element={<HandleGoogleRedirect />} // Handle Google redirect
                    />
                    <Route
                        path="/dashboard"
                        element={isAuthenticated ===true? <Dashboard /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/tasks/:id"
                        element={isAuthenticated ===true? <TaskView /> : <Navigate to="/login" />}
                    />                    
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </DndProvider>
        </Router>
    );
};

export default App;
