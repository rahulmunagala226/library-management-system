import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="container page-shell">
      <div className="section-heading">
        <span className="eyebrow">Profile</span>
        <h2>Student profile</h2>
      </div>

      <div className="profile-card info-card">
        <div className="profile-avatar">{user?.name?.charAt(0)?.toUpperCase() || 'S'}</div>
        <div className="profile-details">
          <h3>{user?.name || 'Student User'}</h3>
          <p>{user?.email || 'student@library.com'}</p>
          <div className="profile-grid">
            <div>
              <label>Student ID</label>
              <strong>{user?.studentId || 'STU-101'}</strong>
            </div>
            <div>
              <label>Role</label>
              <strong>{user?.role || 'student'}</strong>
            </div>
            <div>
              <label>Account status</label>
              <strong>{user?.status || 'active'}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
