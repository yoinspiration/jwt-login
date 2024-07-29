import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../authSlice';
import { Form, Button, Card, Container } from 'react-bootstrap';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const validate = (): boolean => {
    const newErrors: { username?: string; password?: string } = {};
    
    if (!username) {
      newErrors.username = '用户名不能为空';
    }
    if (!password) {
      newErrors.password = '密码不能为空';
    } else if (password.length < 6) {
      newErrors.password = '密码长度不能少于 6 位';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // if (validate()) {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({username, password}),
        });
        
        if (!response.ok) {
          throw new Error('登录失败');
        }
        
        const data = await response.json();
        dispatch(login({token: data.token, username}));
        navigate('/userinfo'); // Navigate to user info page on successful login
      } catch (error) {
        console.error('Login error:', error);
      }
    // }
  };
  
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: '20rem' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">登录页面</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>用户名</Form.Label>
              <Form.Control
                type="text"
                placeholder="请输入用户名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              {/*{errors.username && <p className="error">{errors.username}</p>}*/}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>密码</Form.Label>
              <Form.Control
                type="password"
                placeholder="请输入密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/*{errors.password && <p className="error">{errors.password}</p>}*/}
            </Form.Group>
              <Button variant="primary" type="submit">
                登录
              </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
      
export default LoginForm;
