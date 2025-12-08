import axios from "axios";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from "react-toastify";
import { Endpoints } from "../../shared/constants/Endpoints";
import { useNavigate } from "react-router-dom";
import { StorageManager } from "../../shared/StorageManager";

const Login2 = () => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: {
            "email": "srikanth@aspire.com",
            "password": "9346583155"
        }
    });
    const nav = useNavigate();


    // const [email, setEmail] = useState('srikanth@aspire.com');
    // const [password, setPassword] = useState('9346583155');
    // const [isEmailValid, setIsEmailValid] = useState(true);
    // const [isPasswordValid, setIsPasswordValid] = useState(true);


    const [isLoading, setIsLoading] = useState(false);



    const onSubmitData = (data: any) => {
        console.log("SUBMIT==")

        console.log('data:', data)

        if (isValid) {
            setIsLoading(true);
            axios.post(Endpoints.LOGIN, data)
                .then(res => {
                    console.log('res:', res)
                    console.log('res.data:', res.data)

                    if (res.data.status === "FAILURE") {
                        // alert("Invalid Email and password");
                        toast.error("Invalid Email and password")
                    } else {
                        // alert("Successful login");
                        StorageManager.setToken(res.data.data.token);
                        // localStorage.setItem('token', res.data.data.token)
                        toast.success("Successfull Login")

                        /*  Redirect Code */
                        nav('/dashboard')

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
        <main>


            <div className="card relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
                <div className="card-header">
                    Login
                </div>
                {/* <form onSubmit={handleSubmit((data:any)=>console.log("data",data))}> */}
                <form onSubmit={handleSubmit(onSubmitData)}>
                    <div className="card-body">
                        {/* {email}
                    {password} */}

                        {/* Form Fields */}
                        {/* Email */}
                        <div className="mb-3 flex flex-col">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register('email', { required: "MailId is required" })} />


                            {errors && errors.email && <div className="invalid-feedback">
                                Please enter email.
                            </div>}
                        </div>
                        {/* Password */}
                        <div className="mb-3 flex flex-col">
                            <label htmlFor="exampleInputEmail2" className="form-label">Password</label>
                            <input type="text" className="form-control" id="exampleInputEmail2"   {...register('password')} />
                            {errors && errors.email && <div className="invalid-feedback">
                                Please enter password.
                            </div>}
                        </div>



                    </div>
                    <div className="card-footer">

                        {/* Form Fields */}
                        {isLoading ? (<h4>Loading please wait...</h4>) : <button type="submit" className="btn-primary" >Submit</button>}



                    </div>
                </form>
            </div>


            <ToastContainer />
        </main>
    )
}

export default Login2