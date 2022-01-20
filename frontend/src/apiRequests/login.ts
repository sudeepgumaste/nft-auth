export const login = async (data: {
  message: string;
  signature: string;
}): Promise<LoginResponse> => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URI as string}/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  if (!response.ok) {
    throw new Error(`${response.status} ${result.message}`);
  }
  return result;
};
