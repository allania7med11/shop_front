import { useState } from 'react';
import { Badge, Avatar } from '@mui/material';
import { Controller } from 'react-hook-form';

export default function ProfilePhotoField({ name, control, src }) {
  const [profilePhoto, setProfilePhoto] = useState(src);

  const handlePhotoUpload = (event, onChange) => {
    debugger
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target.result;
        if (typeof result === 'string') {
          setProfilePhoto(result);
        }
        onChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <label htmlFor="upload-photo" style={{ cursor: 'pointer' }}>
          <input
            id="upload-photo"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => handlePhotoUpload(e, onChange)}
          />
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={<Avatar alt="Camera Button" src="/static/images/camera_button.png" />}
          >
            <Avatar
              alt="Profile Photo"
              src={profilePhoto}
              sx={{
                width: 175,
                height: 175,
                boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.4)',
                mb: 1,
              }}
            />
          </Badge>
        </label>
      )}
    />
  );
}
