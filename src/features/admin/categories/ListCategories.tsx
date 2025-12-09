import { useEffect, useState } from "react";
import DashboardLayout from "../../../shared/ui/templates/DashboardLayout";
import axios from "axios";
import { Endpoints } from "../../../shared/constants/Endpoints";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { RouteConstants } from "../../../shared/constants/RouteConstants";

const ListCategories = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [list, setList] = useState([]);

    const loadList = () => {
        axios.get(Endpoints.CATEGORIES)
            .then(res => {
                console.log('res:', res)
                console.log('res.data:', res.data)

                if (res.data.status === "FAILURE") {
                    toast.error("No DATA FOUND")
                } else {
                    setList(res.data.data)
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

                    <h1>ListCategories</h1>
                    <div>
                        <Link to={RouteConstants.CATEGORY_CREATE} className="btn-primary p-0">Create</Link>
                    </div>
                </div>

                <div className="table">
                    <table >
                        <thead>
                            <tr>
                                <th>Sno</th>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((item: any, index: number) => (<tr key={"catList" + index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>
                                    <Link to={RouteConstants.CATEGORY_EDIT+"/"+item._id} className="btn-primary p-0">Edit</Link>
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

export default ListCategories;