import { SignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useRef } from "react";

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Join Us Today
          </h1>
          <p className="text-gray-600">
            Create your AI Ticketing System account
          </p>
        </div>
        <SignUp
          signInUrl="/sign-in"
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "w-full bg-white/80 backdrop-blur-sm rounded-lg shadow-xl border-0",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton:
                "w-full justify-center border border-gray-300 hover:bg-gray-50 rounded-md",
              formButtonPrimary:
                "w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200",
              formFieldInput:
                "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              formFieldLabel: "block text-sm font-medium text-gray-700 mb-1",
              dividerLine: "bg-gray-300",
              dividerText: "text-gray-500",
              footerActionLink: "text-blue-600 hover:text-blue-700 font-medium",
            },
          }}
        />
      </div>
    </div>
  );
};

export default SignUpPage;
