export default function ProjectsUI() {
  return (
    <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-3">
      {projects.map((project, index) => (
        <div key={index} className="bg-white shadow-lg rounded-2xl p-4">
          <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded-xl" />
          <h2 className="text-xl font-semibold mt-4">{project.title}</h2>
          <p className="text-gray-600 mt-2">{project.description}</p>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            Learn More
          </a>
        </div>
      ))}
    </div>
  );
}

const projects = [
  {
    title: "3DLink",
    description:
      "A web-based 3D space generator where users can create personal avatars, add social network links, and interact with an AI chatbot powered by N8N.",
    image: "https://via.placeholder.com/300", // Replace with actual image URL
    link: "#", // Replace with actual project link
  },
  {
    title: "Unity Plugin for Work Risk Simulations",
    description:
      "A Unity plugin that allows non-programmers to create immersive workplace safety simulations, improving training and risk assessment.",
    image: "https://via.placeholder.com/300", // Replace with actual image URL
    link: "#", // Replace with actual project link
  },
  {
    title: "Scene Understanding & Synthesis Pipeline",
    description:
      "A deep learning pipeline that reconstructs real-world 3D environments and proposes alternative layouts based on user input.",
    image: "https://via.placeholder.com/300", // Replace with actual image URL
    link: "#", // Replace with actual project link
  },
  {
    title: "RayEngine",
    description:
      "A low-level C++ OpenGL graphics engine designed for creating retro aesthetic games with optimized rendering and performance.",
    image: "https://via.placeholder.com/300", // Replace with actual image URL
    link: "#", // Replace with actual project link
  }
];
