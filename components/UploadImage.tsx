import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import Image from "next/image";

interface UploadImageProps {
  onChange: (base64: string) => void;
  label: string;
  value?: string;
  disabled?: boolean;
}

const UploadImage: React.FC<UploadImageProps> = ({
  onChange,
  label,
  value,
  disabled
}) => {
  const [base64, setBase64] = useState(value);

  const handleChange = useCallback((base64: string) => {
    onChange(base64)
  }, [onChange]);

  const handleDrop = useCallback((files: any) => {
    const file = files[0];
    const reader = new FileReader();

    reader.onload = (event: any) => {
      setBase64(event.target.result);
      handleChange(event.target.result);
    }

    reader.readAsDataURL(file);
  }, [handleChange]);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      'image/jpeg' : [],
      'image/png' : [],
    }
  });

  return (
    <div
      {...getRootProps({
        className: `
        w-20
        h-20 
        p-4
        text-center 
        border-2 
        border-dotted 
        border-emerald-400 
        rounded-full 
        hover:border-emerald-100
        transition
        duration-500
        bg-[#101010]
        hover:bg-emerald-900`
      })}
    >
      <input {...getInputProps()} />
      {
        base64 ? (
          <div className="flex items-center justify-center">
            <Image
              src={base64}
              height='100' 
              width='100'
              alt="Uploaded Image"
            />
          </div>
        ) : (
          null
        )
      }
    </div>
  )
}

export default UploadImage