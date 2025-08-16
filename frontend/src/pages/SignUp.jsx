import { useState } from 'react';
import { registerUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const Signup=()=> {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password2: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert('Signup successful!');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Error signing up');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="first_name" placeholder="First Name" onChange={handleChange} required />
      <input name="last_name" placeholder="Last Name" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <input name="password2" type="password" placeholder="Confirm Password" onChange={handleChange} required />
      <button type="submit">Sign Up</button>
    </form>
  );
}
export default Signup;