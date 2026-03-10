export const handleUploadImage = async (avatarFile) => {
  try {
    let avatarUrl = "";
    if (avatarFile) {
      const formData = new FormData();
      formData.append("image", avatarFile);
      const res = await fetch(
        `${import.meta.env.VITE_IMAGE_BACKEND}/addImage`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to upload avatar");

      avatarUrl = data.url;
    }
    return avatarUrl;
  } catch (err) {
    console.error("Failed to Upload Image:", err);
  }
};
