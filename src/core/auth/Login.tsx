import axios from "axios";
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify";

const Login = () => {

    const [email, setEmail] = useState('srikanth@aspire.com');
    const [password, setPassword] = useState('9346583155');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isLoading, setIsLoading] = useState(false);


    const onSubmit = () => {
        console.log("SUBMIT==")

        if (isFormValid()) {
            // const payload = { "email": "", "password": "" };
            // const payload = { email,password };
            const payload = { "email": email, "password": password };
            console.log('payload:', payload);
            // axios.post("Url", { email: "", password: "" })


            /* 
            axios.<methodName>(url).then().catch()
            axios.get(url).then().catch()
            axios.post(url,{}).then().catch()
            axios.delete(url).then().catch()
            axios.patch(url,{}).then().catch()
            
            */


            setIsLoading(true);
            axios.post("http://82.112.238.131:3200/api/admin/login", payload)
                .then(res => {
                    console.log('res:', res)
                    console.log('res.data:', res.data)

                    if (res.data.status === "FAILURE") {
                        // alert("Invalid Email and password");
                        toast.error("Invalid Email and password")
                    } else {
                        // alert("Successful login");
                        toast.success("Successfull Login")
                        /*  Redirect Code */
                        
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
    const isFormValid = (): boolean => {

        if (email === "") {
            setIsEmailValid(false);
            return false;
        } else if (password === "") {
            setIsEmailValid(true);
            setIsPasswordValid(false);
            return false;
        }
        setIsEmailValid(true);
        setIsPasswordValid(true);
        return true;
    }
    return (
        <main>

            {/* 
        card
        card-header
        card-body
        card-footer
        */}

            <div className="card relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
                <div className="card-header">
                    Login
                </div>
                <div className="card-body">
                    {/* {email}
                    {password} */}

                    {/* Form Fields */}
                    {/* Email */}
                    <div className="mb-3 flex flex-col">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} value={email} />
                        {!isEmailValid && <div className="invalid-feedback">
                            Please enter email.
                        </div>}
                    </div>
                    {/* Password */}
                    <div className="mb-3 flex flex-col">
                        <label htmlFor="exampleInputEmail2" className="form-label">Password</label>
                        <input type="email" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" onChange={(e) => setPassword(e.target.value)} value={password} />
                        {!isPasswordValid && <div className="invalid-feedback">
                            Please enter password.
                        </div>}
                    </div>



                </div>
                <div className="card-footer">

                    {/* Form Fields */}
                    {isLoading?(<h4>Loading please wait...</h4>):<button type="button" className="btn-primary" onClick={onSubmit}>Submit</button>   }

                    

                </div>
            </div>


            <ToastContainer />
        </main>
    )
}

export default Login