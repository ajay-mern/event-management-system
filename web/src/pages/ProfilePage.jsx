import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();
  console.log(user.userinfo.name)
  // const Userdetails = user.userinfo

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-xl">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Name</h2>
          <p className="text-gray-700">{user?.userinfo?.name || 'N/A'}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Email</h2>
          <p className="text-gray-700">{user?.userinfo?.email || 'N/A'}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Role</h2>
          <p className="text-gray-700 capitalize">{user?.userinfo?.role || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
