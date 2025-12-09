import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Endpoints } from "../../../shared/constants/Endpoints";
import { RouteConstants } from "../../../shared/constants/RouteConstants";
import DashboardLayout from "../../../shared/ui/templates/DashboardLayout";
const pageTitle="Create Category";
const CreateCategory = () => {
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

                <div className="table">
                  <form onSubmit={handleSubmit(onSubmitData)}>
                    <div className="card-body">
                        {/* {email}
                    {password} */}

                        {/* Form Fields */}
                        {/* Email */}
                        <div className="mb-3 flex flex-col">
                            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register('name', { required: "Name is required" })} />


                            {errors && errors.name && <div className="invalid-feedback">
                                Please enter name.
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

export default CreateCategory