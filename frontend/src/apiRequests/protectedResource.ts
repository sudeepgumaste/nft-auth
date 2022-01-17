export const getProtectedResource = async (
  signature: string
): Promise<{ message: string }> => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URI as string}/protected`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        signature,
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(`${response.status} ${data.message}`);
  }
  return data;
};
