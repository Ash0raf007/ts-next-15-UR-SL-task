"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthResponse } from '@/types/AuthType';
import { signInAction } from '../../../../actions/login';
// import Image from 'next/image';

// Define the type for the result returned by signInAction


// Define the component
const Page = () => {
  
const router=useRouter()
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);


  // Login function to handle user authentication

  const userLogin = async (formData: FormData) => {
    setError('');
    setLoading(true);

    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
    const result:AuthResponse = await signInAction(username, password);
    console.log(result, "Login result");

    if (result.token) {  // Check if the token exists in the result
      // Redirect to the desired page upon successful login
      router.push("/all-products");
    } else {
      // Display the error message returned from the signInAction
      setError("wrong user name or password try again");
    }
  } catch (error: unknown) {
    console.error(error);
    setError("An error occurred during login. Please try again.");
  } finally {
    setLoading(false); // Reset loading state after the request
  }
};
  

  return (
    <div className="flex flex-col items-center justify-center mt-[189px]">
    <div>
<p>TS task Logic </p>
    </div>

    <form action={userLogin}>
      <div className="flex flex-col items-center justify-center">
        <div className="mt-[31px]">
          <div className="flex flex-col">
            <label htmlFor="username">User Name</label>
            <input
              type="name"
              id="username"
              name="username"
              required
              placeholder="your username"
              className="w-[300px] h-[40px] pl-[10px] rounded-xl border border-[#333333]"
            />
          </div>

          <div className="flex flex-col mt-[10px]">
            <label htmlFor="password">Password</label>
            <div className="flex w-[300px] h-[40px] rounded-xl border border-[#333333]">
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="**********"
                className="w-full pl-[10px] border-none outline-none rounded-xl"
              />
    
            </div>
          </div>
        </div>
        {error && (
          <div className="flex justify-center">
            <p className="text-red-500 text-[13px] mt-[5px]">{error}</p>
          </div>
        )}
        <div className="w-[300px] h-[40px] bg-[#262626] text-white flex text-center items-center justify-center rounded-lg cursor-pointer mt-[10px]">
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </div>
    </form>

    <div className='mt-[20px] text-[15px] flex gap-[20px] text-center'>
      <div>
      <p>Your user Name</p>
    <p className='text-red-700  border-4 rounded-md px-[10px] '>emilys</p>
    </div>
    <div>
    <p>your password</p>

<p className='text-red-700 border-4 rounded-md px-[10px] '>emilyspass</p>
    </div>

    </div>
  </div>
  );
};

export default Page;








// "use client"; // This indicates that the component is a client component
// import Image from "next/image";
// import { useState } from "react";
// import { signInAction } from "../../../actions/login"; // Ensure this points to your action handler

// export default function Login() {
//   const [error, setError] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);

//   const cusLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault(); // Prevent default form submission

//     const form = e.currentTarget; // Access the form
//     const formData = new FormData(form); // Create FormData from the form

//     setError("");
//     setLoading(true); // Start loading

//     const usename:string = formData.get("email") as string
//     const password:string|number = formData.get("password")  as string|number


//     // Validate inputs
//     if (!username || !password) {
//       setError("Email and password are required.");
//       setLoading(false);
//       return;
//     }

//     const result = await signInAction({ usename, password }); // Call the login action

//     setLoading(false); // End loading

//     if (result.error) {
//       setError(result.error); // Set error if login fails
//       return;
//     }

//     // Handle successful login (e.g., redirect or display success message)
//   };

//   return (
    // <div className="flex flex-col items-center justify-center mt-[189px]">
    //   <div>
    //     <Image src="/logo.png" width={225} height={102} alt="logo" />
    //   </div>

    //   <form onSubmit={cusLogin} method="POST">
    //     <div className="flex flex-col items-center justify-center">
    //       <div className="mt-[31px]">
    //         <div className="flex flex-col">
    //           <label htmlFor="email">Email address</label>
    //           <input
    //             type="email"
    //             id="email"
    //             name="email"
    //             required
    //             placeholder="your username"
    //             className="w-[544px] h-[55px] pl-[10px] rounded-xl border border-[#333333]"
    //           />
    //         </div>

    //         <div className="flex flex-col mt-[10px]">
    //           <label htmlFor="password">Password</label>
    //           <div className="flex w-[544px] h-[55px] rounded-xl border border-[#333333]">
    //             <input
    //               type="password"
    //               id="password"
    //               name="password"
    //               required
    //               placeholder="**********"
    //               className="w-full pl-[10px] border-none outline-none rounded-xl"
    //             />
    //             <button
    //               type="button"
    //               className="border-none bg-transparent cursor-pointer px-[5px]"
    //             >
    //               <Image
    //                 src="/show-password.svg"
    //                 width={20}
    //                 height={20}
    //                 alt="icon"
    //               />
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //       {error && (
    //         <div className="flex justify-center">
    //           <p className="text-red-500 text-[13px] mt-[5px]">{error}</p>
    //         </div>
    //       )}
    //       <div className="w-[445px] h-[56px] bg-[#262626] text-white flex text-center items-center justify-center rounded-lg cursor-pointer mt-[70px]">
    //         <button type="submit" disabled={loading}>
    //           {loading ? 'Logging in...' : 'Login'}
    //         </button>
    //       </div>
    //     </div>
    //   </form>
    // </div>
//   );
// }
