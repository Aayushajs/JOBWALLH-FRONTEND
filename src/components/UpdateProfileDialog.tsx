import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import { RootState } from '@/redux/store';

interface UpdateProfileDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const UpdateProfileDialog: React.FC<UpdateProfileDialogProps> = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store: RootState) => store.auth);

    const [input, setInput] = useState<{
        fullname: string;
        email: string;
        phoneNumber: string;
        bio: string;
        skills: string;
        file: File | string;
    }>({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(', ') || "",
        file: user?.profile?.resume || ""
    });

    const dispatch = useDispatch();

    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file && input.file instanceof File) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={() => setOpen(false)}>
            <DialogContent className="max-w-md sm:max-w-lg p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler} className="space-y-4">
                    {[
                        { id: 'fullname', label: 'Name', type: 'text', value: input.fullname },
                        { id: 'email', label: 'Email', type: 'email', value: input.email },
                        { id: 'phoneNumber', label: 'Number', type: 'text', value: input.phoneNumber },
                        { id: 'bio', label: 'Bio', type: 'text', value: input.bio },
                        { id: 'skills', label: 'Skills', type: 'text', value: input.skills }
                    ].map(({ id, label, type, value }) => (
                        <div className="flex flex-col space-y-2" key={id}>
                            <Label htmlFor={id}>{label}</Label>
                            <Input
                                id={id}
                                name={id}
                                type={type}
                                value={value}
                                onChange={changeEventHandler}
                                className="border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 w-full"
                            />
                        </div>
                    ))}
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="file">Resume</Label>
                        <Input
                            id="file"
                            name="file"
                            type="file"
                            accept="application/pdf"
                            onChange={fileChangeHandler}
                            className="border-gray-300 rounded-md shadow-sm w-full"
                        />
                    </div>
                    <DialogFooter>
                        {loading ? (
                            <Button className="w-full flex items-center justify-center py-3 bg-indigo-500 text-white rounded-md shadow-lg">
                                <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                                Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full py-3 bg-indigo-500 text-white rounded-md shadow-lg hover:bg-indigo-600">
                                Update
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;
