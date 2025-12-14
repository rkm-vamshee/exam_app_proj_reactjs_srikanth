import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Endpoints } from "../../../shared/constants/Endpoints";
import { RouteConstants } from "../../../shared/constants/RouteConstants";
import DashboardLayout from "../../../shared/ui/templates/DashboardLayout";

const pageTitle ="List Questions";
const ListQuestions = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [list, setList] = useState([]);

    // const loadList = () => {
    //     axios.get(Endpoints.SUB_CATEGORIES)
    //         .then(res => {
    //             console.log('res:', res)
    //             console.log('res.data:', res.data)

    //             if (res.data.status === "FAILURE") {
    //                 toast.error("No DATA FOUND")
    //             } else {
    //                 setList(res.data.data)
    //             }
    //             setIsLoading(false);

    //         })
    //         .catch((err: any) => {

    //             console.log('err:', err)
    //             toast.error("Invalid Email and password")
    //             // alert("Invalid Email and password");
    //             setIsLoading(false);
    //         });
    // }
    const loadList = async () => {

        try{

            const res = await axios.get(Endpoints.QUESTIONS);
            if (res.data.status === "FAILURE") {
                toast.error("No DATA FOUND")
            } else {
                setList(res.data.data)
            }
        }
        catch(err){
               console.log('err:', err)
                toast.error("Invalid Email and password")
                // alert("Invalid Email and password");
                
        }
        finally{
            setIsLoading(false);
        }



    }

    const onDelete = (item: any) => {
        axios.delete(Endpoints.CATEGORIES + "/" + item._id)
            .then(res => {
                console.log('res:', res)
                console.log('res.data:', res.data)

                if (res.data.status === "FAILURE") {
                    toast.error("No DATA FOUND")
                } else {
                    // setList(res.data.data)
                    loadList()
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
        loadList();
    }, [])


    return (
        <DashboardLayout>
            <div>

                <div className="flex flex-row justify-between p-3">

                    <h1>{pageTitle}</h1>
                    <div>
                        <Link to={RouteConstants.QUESTIONS_CREATE} className="btn-primary p-0">Create</Link>
                    </div>
                </div>

                <div className="">
                    <table className="w-full border ">
                        <thead >
                            <tr className="bg-yellow-200 border-b p-3">
                                <th className=" p-2">Sno</th>
                                <th className="text-left">Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((item: any, index: number) => (<tr key={"catList" + index} className="border-b">
                                <td className="p-3">{index + 1}</td>
                                <td className="text-left">{item.name}</td>
                                <td>
                                    <Link to={RouteConstants.CATEGORY_EDIT + "/" + item._id} className="btn-primary p-0">Edit</Link>
                                    <button type="button" className="btn-danger" onClick={() => onDelete(item)}>Delete</button>
                                </td>
                            </tr>))}

                        </tbody>
                    </table>





                </div>

            </div>




        </DashboardLayout>
    )
}

export default ListQuestions;