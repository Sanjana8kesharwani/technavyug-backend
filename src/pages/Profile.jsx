import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { users } from "../data/dummyData";

const Profile = () => {
  const { id } = useParams();
  const user = users.find((u) => u.id === parseInt(id));

  if (!user)
    return (
      <div className="text-center mt-20 text-white">
        User not found
      </div>
    );

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto mt-10 px-4 text-white">

        {/* Profile Card */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center shadow-lg">

          <img src={user.image} alt={user.name} className="w-36 h-36 mx-auto rounded-full object-cover mb-4 border-4 border-white/20"/>

          <h1 className="text-3xl font-bold"> {user.name} </h1>
          <p className="text-gray-400 mt-1"> {user.role} </p>
          <p className="text-gray-300 mt-4 max-w-xl mx-auto"> {user.bio} </p>

          {/*  Stats */}
          <div className="flex justify-center gap-10 mt-6">
            <div>
              <p className="text-2xl font-bold">{user.projects.length}</p>
              <p className="text-gray-400 text-sm">Projects</p>
            </div>

            <div>
              <p className="text-2xl font-bold">{user.certificates.length}</p>
              <p className="text-gray-400 text-sm">Certificates</p>
            </div>
          </div>

        </div>

        {/*  Skills */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">
            Skills
          </h2>

          <div className="flex flex-wrap gap-3">
            {user.skills.map((skill, i) => (
              <span key={i} className="px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm hover:scale-105 transition">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/*  Projects */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">
            Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {user.projects.length === 0 ? (
              <p className="text-gray-400">No projects yet</p>
            ) : (
              user.projects.map((project, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 hover:scale-105 hover:shadow-xl transition duration-300"
                >
                  <h3 className="text-lg font-semibold">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-sm mt-1">
                    {project.desc || "Project description here..."}
                  </p>

                  {/* Tech stack */}
                  {project.tech && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {project.tech.map((t, index) => (
                        <span
                          key={index}
                          className="text-xs bg-blue-500 px-2 py-1 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}

          </div>
        </div>

        {/*  Certificates */}
        <div className="mt-10 mb-10">
          <h2 className="text-xl font-semibold mb-4">
            Certificates
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            {user.certificates.length === 0 ? (
              <p className="text-gray-400">No certificates yet</p>
            ) : (
              user.certificates.map((cert, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white/10 border border-white/20 text-gray-300 hover:scale-105 hover:shadow-lg transition cursor-pointer"
                >
                  📜 {cert}
                </div>
              ))
            )}

          </div>
        </div>

      </div>
    </MainLayout>
  );
};

export default Profile;