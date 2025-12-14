import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Endpoints } from "../../../shared/constants/Endpoints";
import { RouteConstants } from "../../../shared/constants/RouteConstants";
import DashboardLayout from "../../../shared/ui/templates/DashboardLayout";
const pageTitle = "Create Question";
const CreateQuestion = () => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const onSubmitData = (data: any) => {
        console.log("SUBMIT==")
        console.log('data:', data)
        if (isValid) {
            setIsLoading(true);
            axios.post(Endpoints.CATEGORIES, data)
                .then(res => {
                    console.log('res:', res)
                    console.log('res.data:', res.data)
                    if (res.data.status === "FAILURE") {
                        // alert("Invalid Email and password");
                        toast.error("Invalid Email and password")
                    } else {
                        toast.success(res.data.message)
                        // nav('/dashboard')
                    }
                    setIsLoading(false);
                })
                .catch((err: any) => {
                    console.log('err:', err)
                    toast.error("Invalid Email and password")
                    // alert("Invalid Email and password");
                    setIsLoading(false);
                });
        } else {
            alert("Invalid Data");
        }
    }
    return (
        <DashboardLayout>
            <div>
                <div className="flex flex-row justify-between p-3">
                    <h1>{pageTitle}</h1>
                    <div>
                        <Link to={RouteConstants.CATEGORIES} className="btn-primary p-0">Back</Link>
                    </div>
                </div>
                <div className="">
                    <form onSubmit={handleSubmit(onSubmitData)}>

                        <div className="card-body">
                            <div className="flex flex-row justify-between gap-6">
                                {/* Subject */}
                                <div className="mb-3 flex flex-col w-full">
                                    <label className="form-label">Select Subject</label>
                                    <select className="border" {...register('subjectId', { required: "subject is required" })} >
                                        <option value="">Select</option>
                                        {/* {subjectsList} */}
                                    </select>
                                    {errors && errors.subjectId && <div className="invalid-feedback">
                                        Please Select Subject.
                                    </div>}
                                </div>
                                {/* Chapter */}
                                <div className="mb-3 flex flex-col w-full">
                                    <label className="form-label">Select Chapter</label>
                                    <select className="border" {...register('chapterId', { required: "Chapter is required" })} >
                                        <option value="">Select</option>
                                        {/* {chaptersList} */}
                                    </select>
                                    {errors && errors.chapterId && <div className="invalid-feedback">
                                        Please Select Chapter.
                                    </div>}
                                </div>
                            </div>
                            <div className="mb-3 flex flex-col">
                                <label htmlFor="exampleInputEmail1" className="form-label">Question (With out Q.No.)</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register('question', { required: "question is required" })} />
                                {errors && errors.question && <div className="invalid-feedback">
                                    Please enter question.
                                </div>}
                            </div>
                            {/* Hint */}
                            <div className="mb-3 flex flex-col">
                                <label htmlFor="exampleInputEmail1" className="form-label">Hint</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register('hint', { required: "hint is required" })} />
                                {errors && errors.questin && <div className="invalid-feedback">
                                    Please enter hint.
                                </div>}
                            </div>
                            {/* Explaination */}
                            <div className="mb-3 flex flex-col">
                                <label htmlFor="exampleInputEmail1" className="form-label">Explaination</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register('explaination', { required: "explaination is required" })} />
                                {errors && errors.questin && <div className="invalid-feedback">
                                    Please enter explaination.
                                </div>}
                            </div>
                            <div className="mb-3 flex flex-col w-full">
                                <label className="form-label">Select Question Type</label>
                                <select className="border" {...register('questionType', { required: "Question Type is required" })} >
                                    <option value="Multiple Choice">Multiple Choice</option>
                                    {/* {subjectsList} */}
                                </select>
                                {errors && errors.questionType && <div className="invalid-feedback">
                                    Please Select Question Type.
                                </div>}
                            </div>
                            <div className="mb-3 flex flex-col w-full">
                                <label className="form-label">No Of options</label>
                                <select className="border" {...register('noOfoptions', { required: "no. of options is required" })} >
                                    <option value="4">4</option>
                                    {/* <option value="2">4</option> */}
                                    {/* {subjectsList} */}
                                </select>
                                {errors && errors.noOfoptions && <div className="invalid-feedback">
                                    Please Select no. of options.
                                </div>}
                            </div>

                            {/* Option	Option Display	Correct Option */}


                            {/* DifficultyLevel */}
                            <div className="mb-3 flex flex-col w-full">
                                <label className="form-label">DifficultyLevel</label>
                                <select className="border" {...register('noOfoptions', { required: "no. of options is required" })} >
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="tough">Tough</option>
                                    {/* <option value="2">4</option> */}
                                    {/* {subjectsList} */}
                                </select>
                                {errors && errors.noOfoptions && <div className="invalid-feedback">
                                    Please Select no. of options.
                                </div>}
                            </div>
                        </div>
                        <div className="card-footer">
                            {/* Form Fields */}
                            {isLoading ? (<h4>Loading please wait...</h4>) : <button type="submit" className="btn-primary" >Submit</button>}
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </DashboardLayout>
    )
}
export default CreateQuestion