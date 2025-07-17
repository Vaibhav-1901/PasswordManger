
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';





const Manager = () => {
    const eye = useRef()

    const [form, setform] = useState({ site: "", username: "", password: "" })

    const [password, setpassword] = useState([])

    const [showPassword, setShowPassword] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const site = useRef()
    const username = useRef()
    const passwordRef = useRef()

    const getpasswords = async () => {
        let res = await fetch('http://localhost:3000/')
        let data = await res.json()
        if (data) {
            setpassword(data);
        }

    }

    useEffect(() => {
        getpasswords()
        setEditingId(null);
    }, [])

    const Copy = (e) => {
        toast.success('Copied To Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",

        });
        { navigator.clipboard.writeText(e) }
    }




    const toggleShowPassword = () => {
        setShowPassword(prev => !prev);
    };

    const savePassword = async () => {
    
        
        if (form.password.length <= 3 || form.site.length <= 3) {
            toast.error('Too short! Both fields need 4+ characters.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",

            });

        }
        else {
            const newform = { ...form, id: uuidv4() }
            setform({ site: "", username: "", password: "" });
            toast.success('Password Saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });
            setpassword([...password, newform])
            await fetch("http://localhost:3000/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    newform
                )
            })


            // localStorage.setItem("passwords", JSON.stringify([...password, newform]))

        }


    }

    const deletePassword = async (id) => {
        let c = confirm("Are you sure you want to delete?")
        if (c) {
            let newPassword = password.filter((e) => { return id != e.id })
            setpassword(newPassword)
            try {
               const res= await fetch('http://localhost:3000/', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: id })
                });

                if (res.ok) {
                    toast('Password deleted successfully!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            }
            catch {
                toast.error('Please try again!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  
                });
            }


        }

    }

    const changeField = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })


    }
    const EditPassword = async (row) => {

        setform({ site: row.site, username: row.username, password: row.password });
        let newPassword = password.filter((e) => { return row.id != e.id })
        setpassword(newPassword)
        const res= await fetch('http://localhost:3000/', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: row.id })
                });
        
        
        // localStorage.setItem("passwords", JSON.stringify(newPassword))//WIll not com as whatif the user clicked on edit and just closed the browser




    }





    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"

            />


            <div className="max-w-[100vw]  md:max-w-[75vw] mx-auto mt-10 flex-col   rounded-2xl bg-white/10 backdrop-blur-md shadow-xl border border-white/20  text-white">
                <div className='flex justify-center items-center mx-auto flex-col mt-5'>
                    <h1 className='font-bold text-3xl font-mono'>
                        &lt;Lock<span className='text-emerald-500'>r</span>/&gt;
                    </h1>
                    <div className='Slogan'>Secure. Simple. Yours</div>
                </div>
                <div className="input px-0 flex flex-col md:block md:px-30 mt-2 ">
                    <div>
                        <input ref={site} onChange={(e) => { changeField(e) }} type="text" value={form.site} placeholder='Enter Website URL ' name='site' className='w-[100%] rounded-full bg-white/5  backdrop-blur border border-emerald-300  focus:outline-none py-[3px] px-3 placeholder-gray-400' />
                    </div>
                    <div className='mt-5 flex-row flex  gap-5'>
                        <input ref={username} onChange={(e) => { changeField(e) }} type="text" value={form.username} name='username' placeholder='Enter Username' className='w-[50%] rounded-full bg-white/5  backdrop-blur border border-emerald-300  focus:outline-none py-[3px] px-3 placeholder-gray-400 transition' />
                        <div className='w-[49%] md:flex md:items-center relative '>
                            <input ref={passwordRef} onChange={(e) => { changeField(e) }} type={showPassword ? "text" : "password"} name='password' value={form.password} placeholder='Enter Password' className=' w-full rounded-full bg-white/5  backdrop-blur border border-emerald-300  focus:outline-none py-[3px] px-3 placeholder-gray-400 transition' />
                            <img ref={eye} onClick={toggleShowPassword} className=' absolute right-3 top-1/2 -translate-y-1/2 w-[22px] cursor-pointer opacity-70 brightness-125' src={showPassword ? "icons/eye.png" : "icons/eyecross.png"} width={22} alt="eyecross.png" />
                        </div>

                    </div>
                </div>
                <div className='flex justify-center mt-6 items-center  mb-2'>
                    <button onClick={savePassword} className='cursor-pointer rounded-full 5 px-5 py-[6px]  text-white bg-gradient-to-r from-slate-700  to-slate-600  border border-gray-400 flex items-center gap-2 hover:from-slate-800 hover:to-slate-700 transition duration-300' >  <lord-icon colors="primary:#ffffff"
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover" >
                    </lord-icon> Add Password</button>
                </div>




            </div>

            <h2 className='max-w-[95vw]   md:max-w-[75vw] mt-5 mx-auto text-2xl font-bold  text-emerald-400  ' >Your Vault</h2>


            <div className='max-w-[100vw]  md:max-w-[75vw] mx-auto mt-2 flex-col rounded-2xl bg-white/5 backdrop-blur-sm shadow-lg border border-white/10 text-white flex  overflow-hidden '>
                {password.length == 0 && <div className='text-sky-300 px-2 font-medium text-shadow-md'>Your vault’s clear. Ready when you are 🔐 </div>}


                {password.length != 0 && <table className="table-fixed w-full  ">
                    <thead className="  bg-gradient-to-br from-slate-700 to-slate-600 text-emerald-400 rounded-t-xl rounded-tr-2xl  ">
                        <tr   >
                            <th className='py-4 text-center text-sm md:text-base '>Site</th>
                            <th className='py-4 text-center text-sm md:text-base '>Username</th>
                            <th className='py-4 text-center text-sm md:text-base'> Password</th>
                            <th className='py-4 text-center text-sm md:text-base'> Actions</th>
                        </tr>
                    </thead>
                    <tbody >
                        {password.map(e => {
                            return (
                                <tr key={e.id} className='bg-slate-800/30 hover:bg-slate-800/40 transition 300ms cursor-pointer md:text-base text-sm '>
                                    <td onClick={() => { Copy(e.site) }} className='text-center py-5 flex justify-center break-words whitespace-normabase  overflow-auto md:w-auto w-[80px] align-top" '><a href={e.site} target='_blank'>{e.site}</a><div className="copy"> <lord-icon colors="primary:#ffffff"
                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px", }}
                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                        trigger="hover" >
                                    </lord-icon></div></td>
                                    <td onClick={() => { Copy(e.username) }} className='text-center py-5 break-words whitespace-normal  overflow-auto w-[80px] align-top '><div className='flex justify-center'>{e.username}<div className="copy"> <lord-icon colors="primary:#ffffff"
                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px", }}
                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                        trigger="hover" >
                                    </lord-icon></div></div> </td>
                                    <td onClick={() => { Copy(e.password) }} className='text-center py-5 break-words whitespace-normal  overflow-auto w-[80px] align-top'><div className='flex justify-center'> {e.password} <div className="copy"> <lord-icon colors="primary:#ffffff"
                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px", }}
                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                        trigger="hover" >
                                    </lord-icon></div></div></td>
                                    <td className='text-center py-5'><div className='flex justify-center gap-3'> <div onClick={() => { EditPassword(e) }}> <lord-icon colors="primary:#ffffff"
                                        src="https://cdn.lordicon.com/gwlusjdu.json"
                                        trigger="hover"
                                        style={{ "width": "25px", "height": "25px" }}>
                                    </lord-icon></div>
                                        <div onClick={() => { deletePassword(e.id) }}>
                                            <lord-icon colors="primary:#ffffff"
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>

                                        </div>

                                    </div></td>

                                </tr>


                            )

                        })}
                    </tbody>

                </table>}
            </div>


        </>





    )
}

export default Manager