import { useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosClient } from "../../utils/axios.client";
import AuthContext from "../../context/AuthContext";
import toast from "react-hot-toast";
import { IoMail } from "react-icons/io5";
import ClipLoader from "react-spinners/ClipLoader";

export const VerifyEmail = () => {
  const { token, user, setUser } = useContext(AuthContext);
  const [resendMessage, setResentMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
  }

  const query = useQuery();

  const resendEmail = () => {
    setLoading(true);
    axiosClient
      .post(
        import.meta.env.VITE_BACKEND_URL +
          "api/email/verification-notification",
        "",
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setResentMessage(res.data.message);
        setLoading(false);
      })
      .catch(() => {
        setResentMessage("Something went wrong!");
      });
  };

  const verify = async (url: string | null) => {
    if (!url) return;

    axiosClient
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        toast.success(res.data.message);
        setUser({
          id: user.id,
          name: user.name,
          profile: user.profile,
          isVerified: true,
        });
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    query.get("url") && verify(query.get("url"));
  }, []);

  return (
    <div className="flex h-[82vh] justify-center items-center dark:bg-slate-900 dark:text-slate-300">
      <div className="border border-gray-300 p-10 rounded-md flex flex-col items-center dark:border-none dark:bg-slate-800">
        {resendMessage && (
          <div className="w-full bg-blue-500 p-2 rounded text-white">
            {resendMessage}
          </div>
        )}
        <IoMail className="text-blue-500 my-5" size={50} />

        <h1 className="text-lg font-bold my-2">Please verify your email</h1>
        <p className="mb-2">We send an email to</p>
        <p className="font-bold mb-10">{user.email}</p>

        <p className="mb-5">Still can't find the email? No problem</p>
        <button
          disabled={loading}
          className="bg-blue-500 w-full rounded-md py-2 px-4 text-white hover:bg-blue-700"
          onClick={() => resendEmail()}
        >
          {loading ? <ClipLoader size={17} color="white" /> : "Resend Email"}
        </button>
      </div>
    </div>
  );
};
