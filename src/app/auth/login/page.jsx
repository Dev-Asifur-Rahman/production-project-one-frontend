import LoginForm from "@/components/page-layout/login-page/LoginForm";
import GoogleLogin from "@/components/page-layout/register-page/GoogleLogin";

const page = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <LoginForm></LoginForm>
            <GoogleLogin></GoogleLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
