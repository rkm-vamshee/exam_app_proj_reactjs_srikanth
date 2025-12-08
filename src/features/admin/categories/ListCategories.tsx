import { useEffect, useState } from "react";
import DashboardLayout from "../../../shared/ui/templates/DashboardLayout";
import axios from "axios";
import { Endpoints } from "../../../shared/constants/Endpoints";
import { toast } from "react-toastify";

const ListCategories = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    const loadList = () => {
        axios.get(Endpoints.CATEGORIES)
            .then(res => {
                console.log('res:', res)
                console.log('res.data:', res.data)

                if (res.data.status === "FAILURE") {
                    toast.error("No DATA FOUND")
                } else {


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

                <h1>ListCategories</h1>

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
                            <tr>
                                <td>Sno</td>
                                <td>Name</td>
                                <td>Actions</td>
                            </tr>
                        </tbody>
                    </table>





                </div>

            </div>




        </DashboardLayout>
    )
}

export default ListCategories;