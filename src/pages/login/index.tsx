import RootLayout from "@/components/Layouts/RootLayout";
import Spinner from "@/components/ui/Spinner";
import { useLoginUserMutation } from "@/redux/features/user/userApi";
import { saveUser, setAccessToken, setLoader } from "@/redux/features/user/userSlice";
import { useAppDispatch } from "@/redux/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface ILoginInputs {
    email: string
    password: string
  }
const LoginPage = () => {
  const router = useRouter();
  const dispatch=useAppDispatch()
  const { register, formState: { errors }, handleSubmit } = useForm<ILoginInputs>();
  const [postLogin, { isError, error, isSuccess, isLoading, data:loginData }] =
    useLoginUserMutation();
  const handleLogin = (data:ILoginInputs) => {
    console.log(data);
    const options = {
      email: data.email,
      password: data.password,
    };
    postLogin(options);
  };
  if(loginData?.success){
    dispatch(setAccessToken(loginData?.token as string));
    dispatch(setLoader());
    localStorage.setItem("quizAccessToken",loginData?.token);
    toast.success("Login Successfull!");
    router.push('/');
  }
 

  return (
    <div className="">
      <div className="w-11/12 md:w-3/5 lg:w-1/2 mx-auto my-8 bg-white p-6 rounded-xl shadow-md">
      {isLoading && <Spinner />}
        <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">
          Please Login
        </h1>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col gap-4"
        >
          <div className=" w-full">
            < label className="block text-blue-500 text-sm font-bold mb-2" htmlFor="email">
              Email
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
            < label className="block text-blue-500 text-sm font-bold mb-2" htmlFor="password">
              Password
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
              No Account?{" "}
              <Link href="/register" className="font-bold text-blue-500">
                Please Register
              </Link>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

LoginPage.getLayout = function getLayout(page:ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};
