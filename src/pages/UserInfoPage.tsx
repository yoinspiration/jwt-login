import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { logout } from '../authSlice';
import { Button, Container } from 'react-bootstrap';

const UserInfoPage: React.FC = () => {
  const username = useSelector((state: RootState) => state.auth.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // Navigate to login page on logout
  };
  
  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4 fs-5">用户信息页面</h1>
      <div className="text-center">
        <p>用户名: {username}</p>
        <Button variant="secondary" onClick={handleLogout}>
          注销
        </Button>
      </div>
    </Container>
  );
};

export default UserInfoPage;
