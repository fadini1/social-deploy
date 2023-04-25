import axios from 'axios';
import { useCallback, useState } from "react";
import { toast } from 'react-hot-toast'
import { signIn } from "next-auth/react";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/userRegisterModal";

import Input from "../Input";
import Modal from "../Modal";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const signInWithExistingAccount = useCallback(() => {
    if (isLoading) {
      return;
    }
    
    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post('/api/register', {
        email,
        password,
        username,
        name
      });

      setIsLoading(false);

      toast.success('Your account has been created successfully!'); 

      signIn('credentials', {
        email,
        password
      });

      registerModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong :/');
    } finally {
      setIsLoading(false);
    }
  }, [registerModal, email, password, username, name]);

  const bodyContent = (
    <div className="flex flex-col gap-3">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}    
        disabled={isLoading}   
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}    
        disabled={isLoading}   
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}    
        disabled={isLoading}   
      />
      <Input
        placeholder="Password"
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}    
        disabled={isLoading}   
      />
    </div>
  )

  const footerContent = (
    <div className="text-lg">
      <p>
        Already have an account? {' '} 
        <span
        onClick={signInWithExistingAccount} 
        className="text-teal-300 cursor-pointer hover:text-teal-100
        transition duration-500">
          Sign In
        </span>
      </p>
    </div>
  )

  return (
    <Modal 
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal;