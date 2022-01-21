export const getProtectedResource = async (): Promise<{ message: string }> => {
  const token = localStorage.getItem("jwt");
  if (!token) {
    throw new Error("No token found");
  }

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URI as string}/protected`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(`${response.status} ${data.message}`);
  }
  return data;
};
