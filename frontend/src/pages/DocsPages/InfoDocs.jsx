import { ArrowUpRight } from "lucide-react";

// Every getting started info are listed here
const gettingStartedSteps = [
  {
    title: "1. Singup - Register a new user",
    steps: {
      t1: "Navigate to the Signup Page of the DevHub.",
      link: "https://devhub-self.vercel.app/register",
      moveCode: "Go to Signup",
      t2: "Fill in the required information such as username, email, and password.",
    },
  },
  {
    title:
      "2. Verification - After register you need to verify your account on email",
    steps: {
      t1: "1. check your email.",
      link: "https://mail.google.com/mail/u/0/#inbox",
      moveCode: "Go to GMAIL",
      t2: "2. After receive the email please click on the activation link.",
    },
  },
  {
    title: "3. Login - Login to your account",
    steps: {
      t1: "1. Navigate to the Login Page of the DevHub.",
      link: "https://devhub-self.vercel.app/login",
      moveCode: "Go to login",
      t2: "2. Fill in the required information such as email, and valid password.",
    },
  },
  {
    title: "4. New-post - Create a new post",
    steps: {
      t1: "1. Navigate to the create post Page of the DevHub.",
      link: "https://devhub-self.vercel.app/new-post",
      moveCode: "Go to new-post",
      t2: "2. Fill in the required information such as short description, tags and related links.",
    },
  },
  {
    title: "5. Delete-account - Delete your account",
    steps: {
      t1: "1. Navigate to the delete account Page of the DevHub.",
      link: "https://devhub-self.vercel.app/delete-user-account",
      moveCode: "Go to delete-user-account",
      t2: "2. Read a policies carefully and than fill in the required information.",
    },
  },
  {
    title: "6. Get-profile - Get your profile",
    steps: {
      t1: "1. Navigate to the users profile Page of the DevHub.",
      link: "https://devhub-self.vercel.app/get-profile",
      moveCode: "Go to get-profile",
      t2: "2. See your profile and post if available.",
    },
  },
  {
    title: "7. Create Q&A - create Q&A and ask a questions",
    steps: {
      t1: "1. Navigate to the Q&A Page of the DevHub.",
      link: "https://devhub-self.vercel.app/new-post",
      moveCode: "Go to Q&A section",
      t2: "2. create a new question and ask to the community.",
    },
  },
];

const InfoDocs = () => {
  return (
    <div className="bg-slate-950/20 opacity-70 via-slate-800 to-slate-900 backdrop-blur-3xl font-mono p-5 m-5 rounded-lg border-2 border-white">
      <h1 className="text-center text-[25px] font-bold">Platform Info</h1>
      <div className="flex gap-0.5 rounded-2xl p-2 hover:border-r-6 hover:border-r-cyan-200 hover:border-b-6 hover:border-b-cyan-200 hover:duration-200 mt-3">
        <p className="text-3xl font-mono font-bold mr-3 text-cyan-500">
          Welcome
        </p>
        <p className="text-3xl font-mono font-bold text-slate-300">D</p>
        <p className="text-3xl font-mono font-bold text-slate-500">E</p>
        <p className="text-3xl font-mono font-bold text-slate-700">V</p>
        <p className="text-3xl font-mono font-bold text-cyan-600">H</p>
        <p className="text-3xl font-mono font-bold text-cyan-700">U</p>
        <p className="text-3xl font-mono font-bold text-slate-700">B,</p>
      </div>
      <div>
        <p className="mt-5 text-[16px] ml-3">
          DevHuB is a A developers community where dev can share a new and
          latest updates,version to the other devs.
        </p>
        <p className="mt-3 text-[16px] ml-3">
          Our platform provides a seamless experience for developers to connect
          and stay updated with the latest trends in the tech world.
        </p>
      </div>
      <div className="flex flex-col gap-2 ml-4">
        <h2 className="text-cyan-400 mt-2 p-3 text-[23px] font-bold">
          Why DevHub ?
        </h2>
        <ul className="list-disc ml-10">
          <li className="text-[16px]">
            Stay Updated: Get the latest updates on new releases, versions, and
            trends in the developer community.
          </li>
          <li className="text-[16px]">
            Connect with Peers: Network with fellow developers, share knowledge.
          </li>
          <li className="text-[16px]">
            Resource Hub: Access a wealth of resources and documentation to
            enhance your skills.
          </li>
          <li className="text-[16px]">
            User-Friendly Interface: Enjoy a seamless and intuitive platform
            designed for developers.
          </li>
        </ul>

        <h2 className="text-cyan-400 mt-2 p-3 text-[23px] font-bold">
          Key Features
        </h2>
        <ul className="list-disc ml-10">
          <li className="text-[16px]">Tech news sharing</li>
          <li className="text-[16px]">Community interaction</li>
          <li className="text-[16px]">Real-time updates</li>
          <li className="text-[16px]">User profiles</li>
          <li className="text-[16px]">Latest Post Updates</li>
          <li className="text-[16px]">Post Creation</li>
          <li className="text-[16px]">Latest Post Search</li>
        </ul>

        <h2 className="text-cyan-400 mt-2 p-3 text-[23px] font-bold">
          Getting Started with DevHub
        </h2>
        <div className="bg-linear-to-tr from-gray-700 via-gray-800 to-stone-900 p-4 rounded-2xl border-r-4 border-white border-b-4 border-b-white border-l-2 border-t-2">
          {gettingStartedSteps.map((step, i) => (
            <div className="ml-5 flex flex-col gap-2 hover:bg-linear-to-br from-slate-950 via-slate-850 to-slate-900 p-3 rounded-lg transition-all duration-200 hover:border-2 hover:border-white">
              <h2 className="font-mono font-bold text-[18px]">{step.title}</h2>
              <p className="ml-3 font-mono text-[16px]">Steps:</p>
              <div>
                <ul className="ml-12">
                  <li className="text-[17px] font-bold flex">
                    {step.steps.t1}
                    <a
                      href={step.steps.link}
                      className="font-bold text-[17px] text-blue-600 flex hover:underline ml-5"
                      target="_blank"
                    >
                      <ArrowUpRight /> {step.steps.moveCode}
                    </a>
                  </li>
                  <li>
                    <p className="text-[17px] font-bold">{step.steps.t2}</p>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
        <h2 className="text-cyan-400 mt-2 p-3 text-[23px] font-bold">
          Community Guidelines
        </h2>
        <ul className="list-disc ml-10">
          <li className="text-[16px]">No spam</li>
          <li className="text-[16px]">No plagiarism</li>
          <li className="text-[16px]">Respectful content</li>
          <li className="text-[16px]">Constructive feedback</li>
          <li className="text-[16px]">Follow platform rules</li>
        </ul>

        <h2 className="text-cyan-400 mt-2 p-3 text-[23px] font-bold">
          New feature : Ask Questions to community
        </h2>
          <div className="flex flex-col gap-2">
            <p className="ml-6 text-[18px] font-bold">" can you ask a questions to the community? yes, why not !"</p>
            <div className="flex flex-col bg-slate-800/30 p-2 rounded-2xl border-r-4 border-r-white border-b-4 border-b-white border-t-2 border-t-white border-l-2 border-l-white ">
                <div className="flex w-full h-full">
                    <img src="https://devhub-s3-bucket.s3.eu-north-1.amazonaws.com/image1.png" width={600} alt="Image-1" className="p-4 border-2 border-slate-700/90 rounded-xl hover:animate-pulse hover:border-b-4 hover:border-slate-950/90 hover:cursor-pointer" />
                    <p className="p-2.5 text-center flex items-center">
                       First of all, you have to login to ask question to the community.
                       After login, Go-to the create post page.
                       Then click on Q&A and now you can ask question to the community.
                    </p>
                </div>
                 <div className="flex w-full h-full">
                    <p className="p-2.5 text-center flex items-center">
                      Now after creating a new question you can see the question in the questions page.
                      and also live comment on it.
                      Here is the time system how much time a question is open to collect the opinion from the community.
                    </p>
                    <img src="https://devhub-s3-bucket.s3.eu-north-1.amazonaws.com/image.png" alt="Image-2" width={600} className="p-4 border-2 border-slate-700/90 rounded-xl hover:animate-pulse hover:border-b-4 hover:border-slate-950/90 hover:cursor-pointer" />
                </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default InfoDocs;
