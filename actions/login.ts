"use server"
import { login } from "@/app/api/axios";
import { cookies } from "next/headers";
import axios from 'axios';




export const signInAction = async (username: string, password: string | number) => {
  let redirectPath: string | undefined;
  let token: string |number| undefined;

  try {

    if (!username || !password) {
      throw new Error("Please provide a valid email and password.");
  }
    const user = await login({ username, password });
    console.log("userrrr", user);
    if (!user?.data?.accessToken) {
      throw new Error("user not found");
    }
    if (!user?.data?.accessToken) {
      throw new Error("User not found.");
    }

    const cookieStore = await cookies(); // Await the cookies() function

    // Convert userId to string if it is a number
    cookieStore.set('token', user?.data?.accessToken);
    cookieStore.set('refreshToken', user?.data?.refreshToken);

    redirectPath = '/all-products';
    token = user?.data?.accessToken;

  }  catch (error: unknown) {
    console.log(error, "sssssssssssss");
    let errorMessage;

    // Check if the error is an AxiosError
    if (axios.isAxiosError(error)) {
      console.log("Axios error", error);
      console.log(error.response?.data, "Additional data");

      if (error.response) {
        errorMessage = error.response.data?.error;
      }
    } else {
      console.log("Unknown error", error);
      errorMessage = 'An unknown error occurred';
    }

    return { error: errorMessage };
  } finally {
    // Only redirect if redirectPath and token are defined
    if (redirectPath && token) {
      return { path: redirectPath, token: token };
    }
    return { error: 'Login failed. Please check your credentials.' };
  }

};










// 'use server';
// import { login } from "@/app/api/axios";
// import { cookies } from "next/headers";
// import { redirect } from 'next/navigation';

// interface FormData {
//     get: (key: string) => string | null;
// }

// interface UserResponse {
//     data: {
//       accessToken?: string;
//     };
// }

// interface ErrorResponse {
//     response?: {
//         status: number;
//         data: {
//             error?: string;
//             detail?: string;
//         };
//     };
//     message: string;
//     name: string;
// }

// export async function signInAction(formData: FormData): Promise<{ error?: string; errorType?: string }> {
//     const username:string = formData.get('email') as string
//     const password:string|number = formData.get('password') as string|number

//     let redirectPath: string | undefined;
//     let errorMessage: string | undefined;

//     try {
//         if (!username || !password) {
//             throw new Error("Please provide a valid email and password.");
//         }

//         const user: UserResponse = await login({ username, password });
//         console.log("User:", user);

//         if (!user?.data?.accessToken) {
//             throw new Error("User not found.");
//         }

//         // Set cookies
//         (await
//         // Set cookies
//         cookies()).set('token', user.data.accessToken);

//         // Set redirect path
//         redirectPath = '/dashboard/employess/profile';
//     } catch (error) {
//         const err = error as ErrorResponse;
//         console.error("Error:", err);

//         if (err.response) {
//             if (err.response.status === 500) {
//                 errorMessage = 'No response from the server. Please try again later.';
//             } else {
//                 errorMessage = err.response.data?.error || err.response.data?.detail || "An unknown error occurred.";
//             }
//         } else if (err instanceof Error) {
//             errorMessage = err.message;
//         } else {
//             errorMessage = "An unknown error occurred.";
//         }

//         return {
//             error: errorMessage,
//             errorType: err.name,
//         };
//     } finally {
//         if (redirectPath) {
//             redirect(redirectPath);
//         }
//     }

//     return {};
// }
