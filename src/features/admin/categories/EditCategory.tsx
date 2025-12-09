import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Endpoints } from "../../../shared/constants/Endpoints";
import { RouteConstants } from "../../../shared/constants/RouteConstants";
import DashboardLayout from "../../../shared/ui/templates/DashboardLayout";
const pageTitle="Edit Category";
const EditCategory = () => {
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [itemData, setItemData] = useState({_id:"", name:""});

      const { register, handleSubmit, formState: { errors, isValid }, setValue } = useForm();
      const nav = useNavigate();

       const onSubmitData = (data: any) => {
        console.log("SUBMIT==")

        console.log('data:', data)

        if (isValid) {
            setIsLoading(true);
            axios.patch(Endpoints.CATEGORIES+"/"+itemData?._id, data)
                .then(res => {
                    console.log('res:', res)
                    console.log('res.data:', res.data)

                    if (res.data.status === "FAILURE") {
                        // alert("Invalid Email and password");
                        toast.error("Invalid id for category")
                      } else {
                        
                        
                        toast.success(res.data.message)
                 
                        nav(RouteConstants.CATEGORIES)

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
     const loadItem = (_id:any) => {
        axios.get(Endpoints.CATEGORIES+"/"+_id)
            .then(res => {
                
                console.log('res.data: SHOW CAT', res.data)

                if (res.data.status === "FAILURE") {
                    toast.error("No DATA FOUND")
                } else {
                    // setList(res.data.data)
                    setItemData(res.data.data)
                    setValue('name', res.data.data.name);

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
   useEffect(() => {
          loadItem(id);
      }, [])
  return (
     <DashboardLayout>
            <div>

                <div className="flex flex-row justify-between p-3">

                <h1>{pageTitle}</h1>
                <div>
                    <Link to={RouteConstants.CATEGORIES} className="btn-danger p-0">Back</Link>
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

export default EditCategory