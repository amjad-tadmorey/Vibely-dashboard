import { ShieldOff } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AccessDenied() {
    return (
        <div className="flex items-center justify-center bg-gray-50 px-4">
            <div className="text-center p-8 bg-white shadow-xl rounded-2xl max-w-md">
                <div className="flex justify-center mb-4">
                    <ShieldOff className="text-red-500" size={64} />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Access Denied</h1>
                <p className="text-gray-600 mb-6">
                    You don’t have permission to view this page. Please contact the administrator.
                </p>
                <Link
                    to="/"
                    className="inline-block px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}
