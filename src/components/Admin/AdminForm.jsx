import React, { useContext, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import MonumentCard from '@/components/MonumentCard';
import userContext from '@/contexts/userContext';
import { useMonuments, useAddMonument, useEditMonument, useDeleteMonument, useGetMonument } from '@/hooks/useMonuments';
import { useUsers, useDeleteUser } from '@/hooks/useUsers';

export default function AdminForm({ choice }) {
    const { data: monuments = [] } = useMonuments();
    const { data: users = [] } = useUsers();
    const { user: loginUser } = useContext(userContext);

    const addMutation = useAddMonument();
    const editMutation = useEditMonument();
    const deleteMutation = useDeleteMonument();
    const deleteUserMutation = useDeleteUser();

    const [result, setResult] = useState(null);

    const fields = [
        { type: "text", name: "name", label: "Name", required: true },
        { type: "text", name: "location", label: "Location", required: true },
        { type: "file", name: "image", label: "Image", required: true },
        { type: "number", name: "price", label: "Price", required: true },
        { type: "text", name: "category", label: "category", required: true },
        { type: "textarea", name: "description", label: "Description", required: true }
    ];

    const [formData, setFormData] = useState({
        name: '',
        location: '',
        image: '',
        price: '',
        category: '',
        description: '',
        selectedMonument: ''
    });

    useEffect(() => {
        if (monuments.length > 0 && !formData.selectedMonument) {
            setFormData((prevData) => ({
                ...prevData,
                selectedMonument: monuments[0]._id
            }));
        }
    }, [monuments, formData.selectedMonument]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        try {
            let res;
            if (choice === 'Add') {
                data.append('name', formData.name);
                data.append('location', formData.location);
                data.append('image', formData.image);
                data.append('price', formData.price);
                data.append('category', formData.category);
                data.append('description', formData.description);

                res = await addMutation.mutateAsync(data);
            }
            else if (choice === 'Edit') {
                data.append("_id", formData.selectedMonument);
                data.append('name', formData.name);
                data.append('location', formData.location);
                data.append('image', formData.image);
                data.append('price', formData.price);
                data.append('category', formData.category);
                data.append('description', formData.description);

                res = await editMutation.mutateAsync(data);
            }
            else if (choice === 'Delete') {
                res = await deleteMutation.mutateAsync(formData.selectedMonument);
            }
            else if (choice === 'Get') {
                // For Get, we still use a direct call or a one-off query, but since it's a form submit, mutateAsync is fine if we want, 
                // but we should probably just fetch it. However, the original code used http.post for Get.
                // I'll stick to a direct http call for one-off searches if they don't benefit from caching.
                const response = await http.post("/monuments/getmonument", { _id: formData.selectedMonument });
                res = response.data;
            }

            if (res) {
                setResult(res.data);
                toast.success(res.statusMessage || "Success");
            }
        }
        catch (error) {
            const errorMsg = error.response?.data?.message || error.response?.data?.statusMessage || "Request failed";
            toast.error(errorMsg);
        }

        setFormData({
            ...formData,
            name: '',
            location: '',
            image: '',
            price: '',
            category: '',
            description: '',
        });
    }

    const handleDeleteUser = async (user) => {
        try {
            const res = await deleteUserMutation.mutateAsync(user._id);
            toast.success(res.data.username + ": " + res.statusMessage);
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Delete failed");
        }
    }

    return (
        <div className='mt-2 mx-auto w-full max-w-4xl'>
            <h1 className='text-xl md:text-2xl font-bold mb-4 dark:text-white'>
                {choice} {(choice === "Get All") ? "Monuments" : choice === "All Users" ? "" : "Monument"}
            </h1>

            {choice !== "All Users" && (
                <form className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-8 mb-8" onSubmit={handleSubmit}>
                    {(choice === "Edit" || choice === "Delete" || choice === "Get") &&
                        <div className="sm:col-span-2">
                            <label htmlFor="selectedMonument" className="block text-sm font-medium text-gray-700 dark:text-slate-400 mb-1">Select Monument</label>
                            <select
                                required
                                value={formData.selectedMonument}
                                onChange={handleInputChange}
                                name="selectedMonument"
                                id="selectedMonument"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                                {monuments.map((monument) => (
                                    <option value={monument._id} key={monument._id}>
                                        {monument.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    }

                    {(choice === "Add" || choice === "Edit") &&
                        fields.map((field, ind) => (
                            <div className="sm:col-span-2" key={ind}>
                                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 dark:text-slate-400 mb-1">{field.label}</label>
                                {field.type === "textarea" ? (
                                    <textarea
                                        value={formData[field.name]}
                                        onChange={handleInputChange}
                                        required={choice === "Add"}
                                        name={field.name}
                                        id={field.name}
                                        rows="3"
                                        className="w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:ring-2 focus:ring-sky-500 dark:bg-slate-700 dark:border-white/10 dark:text-white"
                                    />
                                ) : (
                                    <input
                                        name={field.name}
                                        value={field.type === "file" ? undefined : formData[field.name]}
                                        onChange={field.type === "file" ? handleFileChange : handleInputChange}
                                        type={field.type}
                                        id={field.name}
                                        required={choice === "Add" && field.type !== "file"}
                                        className="w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:ring-2 focus:ring-sky-500 dark:bg-slate-700 dark:border-white/10 dark:text-white"
                                    />
                                )}
                            </div>
                        ))
                    }

                    <div className="sm:col-span-2">
                        <Button type="submit" className="w-full sm:w-auto">
                            Submit
                        </Button>
                    </div>
                </form>
            )}

            {result && choice === "Get" && <MonumentCard monument={result} />}

            {choice === "All Users" && (
                <div className="overflow-x-auto mt-4 mb-4">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-4 py-3">Username</th>
                                <th scope="col" className="px-4 py-3">Email</th>
                                <th scope="col" className="px-4 py-3">Created At</th>
                                <th scope="col" className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={user._id}>
                                    <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.username} {loginUser?.username === user.username ? "(you)" : ""}
                                    </th>
                                    <td className="px-4 py-4">{user.email}</td>
                                    <td className="px-4 py-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td className="px-4 py-4">
                                        <Button 
                                            variant="destructive" 
                                            size="sm" 
                                            onClick={() => handleDeleteUser(user)}
                                            disabled={loginUser?.username === user.username}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
