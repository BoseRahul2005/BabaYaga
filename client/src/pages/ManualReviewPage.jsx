import { useState } from "react";
import { useForm } from "react-hook-form";
import API from "../api/axios";

const ManualReviewPage = () => {
  const [response, setResponse] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    let language = "javascript";
    const code = data.example;
    try {
      const review = await API.post(`/review/review-code/${language}`, {
        code,
      });
      console.log(review.data.response);
      setResponse(review.data.response);
    } catch (error) {
      console.log("Error from backend:", error);
    }
  };

  return (
    <>
      <h2>Manual AI Code Review Playground</h2>
      <p>
        Paste any arbitrary code snippet to perform deep multi-pass AI security
        & logic analysis on demand.
      </p>
      <hr />

      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          className="h-64 w-full rounded-md bg-stone-800 text-amber-50 focus:outline-none focus:border-none border-none"
          placeholder="Paste your code here.."
          {...register("example")}
        />

        <button
          disabled={isSubmitting}
          className="bg-stone-800 text-amber-50 cursor-pointer  hover:bg-stone-700"
        >
          {isSubmitting ? "Reviewing..." : "Review Code"}
        </button>
      </form>

      <div className="border-2 border-amber-950 p-5">
        <h4 className="font-bold text-2xl mb-5">Recent analysis results</h4>
        <hr />
        <p className="text-xl">{response}</p>
      </div>
    </>
  );
};

export default ManualReviewPage;