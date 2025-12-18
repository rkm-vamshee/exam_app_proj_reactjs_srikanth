import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Endpoints } from "../../../shared/constants/Endpoints";
import { RouteConstants } from "../../../shared/constants/RouteConstants";
import DashboardLayout from "../../../shared/ui/templates/DashboardLayout";
const pageTitle = "Create Question";
const CreateQuestion = () => {
    const nav = useNavigate()
    const { register, handleSubmit, formState: { errors, isValid }, getValues, setValue } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [chapters, setChapters] = useState([]);

    const [optionsTableData, setOptionsTableData] = useState<any>([]);



    const loadSubjects = () => {
        axios.get(Endpoints.SUBJECTS)
            .then(res => {
                console.log('res:', res)
                console.log('res.data:', res.data)

                if (res.data.status === "FAILURE") {
                    toast.error("No DATA FOUND")
                } else {
                    setSubjects(res.data.data)
                }
                setIsLoading(false);

            })
            .catch((err: any) => {

                console.log('err:', err)
                toast.error("Invalid Email and password")
                // alert("Invalid Email and password");
                setIsLoading(false);
            });
    }
    const loadChapters = (subjectId: string) => {
        /* 
        
http://localinfoz.com:3200/api/subjects/692162d670ce7665e5240c02/chapters
        */
        axios.get(`${Endpoints.SUBJECTS}/${subjectId}/chapters`)
            .then(res => {
                console.log('res:', res)
                console.log('res.data:', res.data)

                if (res.data.status === "FAILURE") {
                    toast.error("No DATA FOUND")
                } else {
                    setChapters(res.data.data)
                }
                setIsLoading(false);

            })
            .catch((err: any) => {

                console.log('err:', err)
                toast.error("Invalid Email and password")
                // alert("Invalid Email and password");
                setIsLoading(false);
            });
    }
    const prepareTableOptionsData = (noOfOptions: any) => {
        console.log('noOfOptions:', noOfOptions);
        let options = [];

        for (let i = 0; i < noOfOptions; i++) {
            options.push({
                "id": i + 1,
                "optionDisplay": ["A", "B", "C", "D"][i],
                "isCorrectAnswer": false
            }
            )
        }
        // console.log('options:', options)
        setOptionsTableData(options);
    }
    useEffect(() => {
        loadSubjects();
    }, [])


    const onSubmitData = (data: any) => {
        console.log("SUBMIT==")
        // console.log('data:', data)
        const payload = { ...data, tableOptionsData: optionsTableData }
        console.log('payload:', payload)
        if (isValid) {
            setIsLoading(true);
            axios.post(Endpoints.QUESTIONS, data)
                .then(res => {
                    console.log('res:', res)
                    console.log('res.data:', res.data)
                    if (res.data.status === "FAILURE") {
                        // alert("Invalid Email and password");
                        toast.error("Invalid Email and password")
                    } else {
                        toast.success(res.data.message)
                        nav(RouteConstants.QUESTIONS)
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
                        <Link to={RouteConstants.QUESTIONS} className="btn-primary p-0">Back</Link>
                    </div>
                </div>
                <div className="">
                    <form onSubmit={handleSubmit(onSubmitData)}>

                        <div className="card-body">
                            <div className="flex flex-row justify-between gap-6">
                                {/* Subject */}
                                <div className="mb-3 flex flex-col w-full">
                                    <label className="form-label">Select Subject</label>
                                    <select className="border" {...register('subjectId', { required: "subject is required" })} onChange={(e: any) => {
                                        // console.log(e.target.value)
                                        loadChapters(e.target.value);
                                        //  setValue( 'chapterId', e.target.value);

                                    }}>
                                        <option value="">Select</option>
                                        {subjects.map((s: any, i: number) => <option key={"subject_option" + i} value={s._id}>{s.name}</option>)}
                                    </select>
                                    {errors && errors.subjectId && <div className="invalid-feedback">
                                        Please Select Subject.
                                    </div>}
                                </div>
                                {/*! Chapter */}
                                <div className="mb-3 flex flex-col w-full">
                                    <label className="form-label">Select Chapter</label>
                                    <select className="border" {...register('chapterId', { required: "Chapter is required" })}  >
                                        <option value="">Select</option>
                                        {chapters.map((s: any, i: number) => <option key={"subject_option" + i} value={s._id}>{s.name}</option>)}
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
                                <select className="border" {...register('noOfoptions', { required: "no. of options is required" })}
                                    onChange={(e) => {
                                        console.log('e:', e)
                                        console.log('e:', e.target.value)
                                        setValue('noOfoptions', e.target.value)
                                        prepareTableOptionsData(e.target.value)



                                    }}
                                >
                                    <option value="">Select</option>
                                    <option value="4">4</option>
                                    {/* <option value="2">4</option> */}
                                    {/* {subjectsList} */}
                                </select>
                                {errors && errors.noOfoptions && <div className="invalid-feedback">
                                    Please Select no. of options.
                                </div>}
                            </div>

                            {/* Option	Option Display	Correct Option */}

                            <table className="w-full border">
                                <thead>
                                    <tr className="border">

                                        <th>Option</th>
                                        <th>Option Display	</th>
                                        <th>Correct Option</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {optionsTableData.length > 0 && optionsTableData.map((s: any, i: number) => (<tr className="border border-gray-600" key={"option_" + i}>
                                        <td className=" p-2">Option {s.id}</td>
                                        <td>
                                            <input type="text" className="border" onChange={(e) => {

                                                let tempData = { ...s, optionDisplay: e.target.value };
                                                console.log(tempData)

                                                // let tempData = {...s, optionDisplay:e.target.value};

                                                let tempWholeData: any = [...optionsTableData];

                                                tempWholeData[i] = tempData;
                                                setOptionsTableData(tempWholeData);


                                            }} />
                                        </td>
                                        <td>
                                            <input type="radio" name="questionOption" onChange={(e: any) => {
                                                console.log('e:', e.target.checked)
                                                let tempData: any = { ...s, isCorrectAnswer: e.target.checked };

                                                let tempWholeData: any = [...optionsTableData.map((tmpOption: any) => ({ ...tmpOption, isCorrectAnswer: false }))];
                                                console.log('tempWholeData:', tempWholeData)

                                                tempWholeData[i] = tempData;
                                                setOptionsTableData(tempWholeData);
                                            }} />

                                        </td>
                                    </tr>))}

                                </tbody>
                            </table>


                            {/* DifficultyLevel */}
                            <div className="mb-3 flex flex-col w-full">
                                <label className="form-label">DifficultyLevel</label>
                                <select className="border" {...register('difficultyLevel', { required: "no. of options is required" })} >
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="tough">Tough</option>
                                    {/* <option value="2">4</option> */}
                                    {/* {subjectsList} */}
                                </select>
                                {errors && errors.difficultyLevel && <div className="invalid-feedback">
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