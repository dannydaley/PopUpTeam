import { useState } from 'react';

export default function useFormData() {
  // Form data state
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    aboutMe: "",
    phone: "",
    work: "",
    country: "",
    location: "",
    hourlyRate: "",
    birthday: "",
  });
  
  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Set form data
  };

  return { formData, handleChange };
};