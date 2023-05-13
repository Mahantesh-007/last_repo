import Image from "next/image";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div class="bg-gray-100 h-screen">
        <div class="container mx-auto px-4">
          <div
            class="flex justify-center items-center  py-80 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bm90ZXN8ZW58MHx8MHx8&w=1000&q=80')",
            }}
          >
            <h1 class="text-3xl font-bold text-gray-900">Notes Repository</h1>
          </div>

          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            style={{ marginTop: "100px" }}
          >
            <div class="bg-white rounded-lg shadow p-4">
              <img
                class="w-full h-40 object-cover object-center mb-4"
                src="https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
                alt="Branch 1"
              />
              <h2 class="text-lg font-bold mb-2">Computer Science</h2>
              <p class="text-gray-700">
                Computer science is the study of computing and its applications.
                It involves the design, development, and analysis of algorithms
                and software systems to solve complex problems. Computer science
                also encompasses topics such as computer architecture,
                artificial intelligence, and human-computer interaction.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow p-4">
              <img
                class="w-full h-40 object-cover object-center mb-4"
                src="https://images.unsplash.com/photo-1580894894513-541e068a3e2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                alt="Branch 2"
              />
              <h2 class="text-lg font-bold mb-2">Information Science</h2>
              <p class="text-gray-700">
                Information science is the interdisciplinary study of the
                collection, organization, storage, retrieval, and dissemination
                of information. It involves the application of principles from
                computer science, mathematics, and library science to address
                information-related problems. Information science also
                encompasses topics such as data analytics, information
                architecture, and information management.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow p-4">
              <img
                class="w-full h-40 object-cover object-center mb-4"
                src="https://images.unsplash.com/photo-1525338078858-d762b5e32f2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                alt="Branch 3"
              />
              <h2 class="text-lg font-bold mb-2">
                Artificial Intelligence and Machine Learning
              </h2>
              <p class="text-gray-700">
                Artificial intelligence (AI) is the simulation of human
                intelligence processes by machines, including learning,
                reasoning, and self-correction. Machine learning is a subset of
                AI that involves the use of algorithms and statistical models to
                enable systems to improve their performance on a task with
                experience. Together, AI and machine learning have a wide range
                of applications in fields such as healthcare, finance, and
                transportation.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow p-4">
              <img
                class="w-full h-40 object-cover object-center mb-4"
                src="https://images.unsplash.com/photo-1630298465577-3924a8b0e110?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                alt="Branch 4"
              />
              <h2 class="text-lg font-bold mb-2">Civil</h2>
              <p class="text-gray-700">
                Civil engineering is a branch of engineering that focuses on the
                design, construction, and maintenance of the built environment,
                including buildings, roads, bridges, and water supply systems.
                Civil engineers also work on projects related to the
                environment, such as waste management and environmental
                remediation.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow p-4">
              <img
                class="w-full h-40 object-cover object-center mb-4"
                src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                alt="Branch 5"
              />
              <h2 class="text-lg font-bold mb-2">
                Electronics and Communication
              </h2>
              <p class="text-gray-700">
                {" "}
                Electronics and communication engineering is a field that deals
                with the design, development, and application of electronic
                devices and communication systems. This includes designing and
                developing equipment such as microprocessors, electronic
                circuits, and communication networks, as well as systems for
                wireless communication, satellite communication, and fiber optic
                communication.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow p-4">
              <img
                class="w-full h-40 object-cover object-center mb-4"
                src="https://images.unsplash.com/photo-1563456021008-5cd6ac7c005d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bWVjaGFuaWNhbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                alt="Branch 5"
              />
              <h2 class="text-lg font-bold mb-2">Mechnical</h2>
              <p class="text-gray-700">
                {" "}
                Mechanical engineering is a branch of engineering that deals
                with the design, analysis, and manufacturing of mechanical
                systems. It involves the application of principles of physics
                and materials science to develop and improve a wide range of
                products and systems, from simple machines to complex industrial
                equipment. Mechanical engineers work in a variety of industries,
                including aerospace, automotive, energy, and manufacturing,
                among others.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
