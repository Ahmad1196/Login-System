import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

function Profile() {
  const { user } = useAuth();
  const { isDark } = useTheme();

  return (
    <div>
      <div className="mb-8">
        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} sm:text-3xl`}>
          Profile
        </h1>

        <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          View your account information.
        </p>
      </div>

      <div className={`max-w-2xl rounded-2xl border ${isDark ? 'border-gray-600 bg-gray-900' : 'border-gray-300 bg-white'} p-6 shadow-lg`}>
        <div className="space-y-5">
          <div>
            <p className={`text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-900'}`}>
              Name
            </p>

            <p className={`mt-1 text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {user?.name}
            </p>
          </div>

          <div>
            <p className={`text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-900'}`}>
              Email
            </p>

            <p className={`mt-1 text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {user?.email}
            </p>
          </div>

          <div>
            <p className={`text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-900'}`}>
              User ID
            </p>

            <p className={`mt-1 break-all text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {user?.id}
            </p>
          </div>

          <div>
            <p className={`text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-900'}`}>
              Account created
            </p>

            <p className={`mt-1 text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
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