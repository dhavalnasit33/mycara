export const getImageUrl = (path) => {
  if (!path) return "/placeholder.png"; // fallback
  if (path.startsWith("http")) return path; // already full URL
  return `http://localhost:5000${path}`; // append backend URL
};
