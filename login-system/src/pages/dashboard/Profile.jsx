import { useAuth } from '../../contexts/AuthContext';

function Profile() {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Profile
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          View your account information.
        </p>
      </div>

      <div className="max-w-2xl rounded-2xl border border-gray-500 bg-gray-900 p-6 shadow-lg">
        <div className="space-y-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
              Name
            </p>

            <p className="mt-1 text-base text-white">
              {user?.name}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
              Email
            </p>

            <p className="mt-1 text-base text-white">
              {user?.email}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
              User ID
            </p>

            <p className="mt-1 break-all text-sm text-gray-400">
              {user?.id}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
              Account created
            </p>

            <p className="mt-1 text-base text-white">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : '—'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;