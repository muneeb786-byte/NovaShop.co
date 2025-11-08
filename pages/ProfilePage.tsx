import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';

const ProfilePage: React.FC = () => {
    const { user, logout } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) {
        return null; // Or a loading spinner
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-center">Your Profile</h1>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-500">Name</label>
                        <p className="text-lg font-semibold">{user.name}</p>
                    </div>
                    <hr />
                    <div>
                        <label className="text-sm font-medium text-gray-500">Email</label>
                        <p className="text-lg font-semibold">{user.email}</p>
                    </div>
                    <hr />
                    {user.location && (
                        <>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Location</label>
                                <p className="text-lg font-semibold">{user.location}</p>
                            </div>
                            <hr />
                        </>
                    )}
                     <div>
                        <label className="text-sm font-medium text-gray-500">Order History</label>
                        <p className="text-gray-600 mt-2">You have no past orders.</p>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <button
                        onClick={handleLogout}
                        className="w-full max-w-xs px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
