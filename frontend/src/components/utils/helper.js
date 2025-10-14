// export const getImageUrl = (path) => {
//   if (!path) return "/placeholder.png"; // fallback
//   if (path.startsWith("http")) return path; // already full URL
//   return `http://localhost:5000${path}`; // append backend URL
// };

export const getImageUrl = (path) => {
  if (!path) return "/placeholder.png";       // fallback if no image
  if (path.startsWith("http") || path.startsWith("data:image")) return path; // full URL or base64
  return `http://localhost:5000${path}`;     // append server URL for normal paths
};
