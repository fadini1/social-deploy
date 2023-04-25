import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";

import useLoginModal from "@/hooks/useLoginModal"
import useRegisterModal from "@/hooks/userRegisterModal";

import Input from "../Input";
import Modal from "../Modal";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const createNewAccount = useCallback(() => {
    if (isLoading) {
      return;
    }
    
    loginModal.onClose();
    registerModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);  

      await signIn('credentials', {
        email,
        password
      });

      loginModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [loginModal, email, password]);

  const bodyContent = (
    <div className="flex flex-col gap-3">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}    
        disabled={isLoading}   
      />
      <Input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}    
        disabled={isLoading}   
      />
    </div>
  )

  const footerContent = (
    <div className="text-lg">
      <p>
        First time here? {' '} 
        <span
        onClick={createNewAccount} 
        className="text-teal-300 cursor-pointer hover:text-teal-100
        transition duration-500">
          Create an account
        </span>
      </p>
    </div>
  )

  return (
    <Modal 
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign In"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal