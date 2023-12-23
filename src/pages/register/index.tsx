import RootLayout from "@/components/Layouts/RootLayout";
import Spinner from "@/components/ui/Spinner";
import { useCreateUserMutation, useLoginUserMutation } from "@/redux/features/user/userApi";
import { imageUploader } from "@/upload/upload";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface IRegisterInputs {
    name:string
    email: string
    password: string
    contactNo:string
    address:string
    profileImg:string | null
  }
const RegisterPage = () => {
  const router = useRouter();
  const { register, formState: { errors }, handleSubmit } = useForm<IRegisterInputs>();
  const [postRegister, { isError, error, isSuccess, isLoading, data:registerData }] =
    useCreateUserMutation();
  const handRegister = async (data:IRegisterInputs) => {
    console.log(data);
    let image=null;
     if(data?.profileImg){
        image = data.profileImg[0];
     }
    let imageData = null;
    if (image) {
      imageData = await imageUploader(image);
      if (imageData?.success === "false") {
        //console.log(imageData);
        toast.error("Image upload failed!");
      }
    }
    const options = {
      name:data.name,
      email: data.email,
      password: data.password,
      contactNo:data.contactNo,
      address:data.address,
      profileImg:imageData?.data?.display_url

    };
    
    postRegister(options);
  };
  if(registerData?.success){
    toast.success("Registration Successfull!");
    router.push('/login');
  }
 
  return (
    <div className="">
      <div className="w-11/12 md:w-3/5 lg:w-1/2 mx-auto my-8 bg-white p-6 rounded-xl shadow-md">
      {isLoading && <Spinner />}
        <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">
          Please Register
        </h1>

        <form
          onSubmit={handleSubmit(handRegister)}
          className="flex flex-col gap-4"
        >
          <div className=" w-full">
            < label className="block text-blue-500 text-sm font-bold mb-2" htmlFor="name">
              Name <span className="text-xs text-red-700">*</span>
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter Full Name"
              className="appearance-none border-0 border-b-2 border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-sm placeholder:font-bold "
              {...register("name", { required: "Name is Required" })}
            />
            {errors.name && (
              <p>
                <small className="text-red-600">{errors.name.message}</small>
              </p>
            )}
          </div>
          <div className=" w-full">
            < label className="block text-blue-500 text-sm font-bold mb-2" htmlFor="email">
              Email <span className="text-xs text-red-700">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              className="appearance-none border-0 border-b-2 border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-sm placeholder:font-bold "
              {...register("email", { required: "Email is Required" })}
            />
            {errors.email && (
              <p>
                <small className="text-red-600">{errors.email.message}</small>
              </p>
            )}
          </div>
          <div className=" w-full">
            < label className="block text-blue-500 text-sm font-bold mb-2" htmlFor="contactNo">
              Contact No <span className="text-xs text-red-700">*</span>
            </label>
            <input
              type="tel"
              id="contactNo"
              placeholder="Enter Contact No"
              className="appearance-none border-0 border-b-2 border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-sm placeholder:font-bold "
              {...register("contactNo", { required: "Contact No is Required" })}
            />
            {errors.contactNo && (
              <p>
                <small className="text-red-600">{errors.contactNo.message}</small>
              </p>
            )}
          </div>
          <div className=" w-full">
            < label className="block text-blue-500 text-sm font-bold mb-2" htmlFor="address">
              Address <span className="text-xs text-red-700">*</span>
            </label>
            <input
              type="text"
              id="address"
              placeholder="Enter Address"
              className="appearance-none border-0 border-b-2 border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-sm placeholder:font-bold "
              {...register("address", { required: "Address is Required" })}
            />
            {errors.address && (
              <p>
                <small className="text-red-600">{errors.address.message}</small>
              </p>
            )}
          </div>
          <div className="w-full">
            < label className="block text-blue-500 text-sm font-bold mb-2" htmlFor="profileImg">
              Photo
            </label>
            <input
              type="file"
              id="profileImg"
              placeholder="Enter Photo"
              className="appearance-none border-0 border-b-2 border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-sm placeholder:font-bold "  
              {...register("profileImg")} 
            />
    
          </div>
          <div className=" w-full">
            < label className="block text-blue-500 text-sm font-bold mb-2" htmlFor="password">
              Password <span className="text-xs text-red-700">*</span>
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              className="appearance-none border-0 border-b-2 border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-sm placeholder:font-bold "
              {...register("password", { required: "Password is Required" })}
            />
            {errors.password && (
              <p>
                <small className="text-red-600">{errors.password.message}</small>
              </p>
            )}
          </div>
          {isError && <p className="text-red-500">{(error as any)?.data?.message}</p>}
          <input
            className="w-full bg-blue-500 text-white font-bold py-2 rounded-md cursor-pointer"
            type="submit"
            value="Login"
          />
        </form>
        <div className="my-3">
          <p>
            <small>
              Already Have an Account?{" "}
              <Link href="/login" className="font-bold text-blue-500">
                Please Login
              </Link>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

RegisterPage.getLayout = function getLayout(page:ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};
