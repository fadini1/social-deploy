import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

import useCurrentUser from "@/hooks/useCurrentUser"
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";

import Modal from "../Modal";
import Input from "../Input";
import UploadImage from "../UploadImage";

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const editModal = useEditModal();

  const [profileImage, setProfileImage] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio); 
  }, [
    currentUser?.profileImage,
    currentUser?.coverImage,
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch('/api/edit', {
        name,
        username,
        bio,
        profileImage,
        coverImage
      });

      mutateFetchedUser();

      toast.success('Updated Successfully');

      editModal.onClose();
    } catch (error) {
      toast.error('Something went wrong :D');
    } finally {
      setIsLoading(false);
    }
  }, [
    name,
    username,
    bio,
    profileImage,
    coverImage,
    editModal,
    mutateFetchedUser
  ]);

  const bodyContent = (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <UploadImage
          value={profileImage} 
          disabled={isLoading}
          onChange={(image) => setProfileImage(image)}
          label="Profile Image"
        />
        <p className="text-lg bg-neutral-800 px-3 py-1.5 rounded-lg">
          Upload your Profile Image
        </p>
      </div>
      <div className="flex items-center gap-3">
        <UploadImage
          value={coverImage} 
          disabled={isLoading}
          onChange={(image) => setCoverImage(image)}
          label="Upload your Cover Image"
        />
        <p className="text-lg bg-neutral-800 px-3 py-1.5 rounded-lg">
          Upload your Cover Image
        </p>
      </div>
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
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
      />
    </div>
  )

  return (
    <Modal 
      disabled={isLoading}  
      isOpen={editModal.isOpen}
      title="Your Profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  )
}

export default EditModal