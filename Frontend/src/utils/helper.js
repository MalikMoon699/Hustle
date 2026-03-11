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

export const DashboardRoute = (role, navigate) => {
  if (role === "admin") {
    navigate("/admin/dashboard");
  } else {
    navigate("/dashboard");
  }
};

export const getExpireDate = (createdAt = "", periodType = "month") => {
  if (!createdAt) return "";

  const date = new Date(createdAt);

  if (periodType === "month") {
    date.setMonth(date.getMonth() + 1);
  } else if (periodType === "year") {
    date.setFullYear(date.getFullYear() + 1);
  }

  return date.toLocaleDateString(); // return string
};