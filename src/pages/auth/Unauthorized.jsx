import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="unauthorized-container">
      <h1>Truy cập bị từ chối</h1>
      <p>Bạn không có quyền truy cập trang này.</p>
      <p>Vai trò hiện tại của bạn: {user?.role?.name || 'Chưa xác định'}</p>
      <button 
        onClick={() => navigate('/dashboard')}
        className="btn-primary"
      >
        Quay về trang chủ
      </button>
    </div>
  );
};

export default Unauthorized; 