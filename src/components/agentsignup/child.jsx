import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { FaArrowLeftLong, } from 'react-icons/fa6'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { zodResolver } from '@hookform/resolvers/zod'
import { RxCross1 } from 'react-icons/rx'
import { useRef } from 'react'
import { Link, NavLink } from 'react-router'
import { HiMiniArrowUpTray } from 'react-icons/hi2'


export default function AgentSignChild({setPage}) {
  const [image,setImage]= useState(null)
  // const [dpname,setDpname] =useState("")
  // ,setDpname(img.name)
  const [pass,setPass] =useState("password")
  const [secondpass,setSecondpass]= useState("password")
  const [showIcon,setShowIcon] = useState(false)
  const [secondIcon,setSecondIcon] =useState(false)
  const schema=z.object({
    file:z
        .instanceof(FileList).refine((files)=> files.length > 0, "Please select a photo")
        .refine((files)=> files.length === 0 || files[0].size <= 2 * 1024 * 1024, "Photo should not exceed 2MB" ),
    password:z.string(),
    confirmpassword:z.string()
   }).refine((data)=>data.password===data.confirmpassword,{message:"passwords do not match", path:["confirmpassword"]})
  const {handleSubmit,register,reset,formState:{errors}}= useForm({resolver:zodResolver(schema)})
  const fileRegister=register("file")


  function displayfn(img) {
    if(img) {
      setImage(URL.createObjectURL(img))
    }
  }
  function changefn(file) {
    fileRegister.onChange(file)
    const files = file.target.files[0]
    if (files) {
      displayfn(files)
    }
  }
  function dropfn(file) {
    file.preventDefault();
    displayfn(file.dataTransfer.files[0])
  }
  function dragfn(file) {
    file.preventDefault()
  }
  function passfn() {
    pass==="password" ? setPass("text") : setPass("password")
  }
  function secondpassfn() {
    secondpass==="password"? setSecondpass("text") : setSecondpass("password")
  }
  function submitfn(data) {
    console.log(data);
    reset()
    setImage(null)
  }
  function toggleIcon(e) {
    setShowIcon(e.target.value.length>0)
  }
  function secondToggleIcon(e) {
    setSecondIcon(e.target.value.length>0) 
  }

  function del() {
    setImage(null)
  }
  return (
            <div className='lg:w-[50%] w-full min-h-screen bg-[#E4EEE7]'>
            <section className='lg:w-[65%] md:w-[85%] md:m-auto  pr-5 pl-5 lg:pl-0 lg:pr-0 pt-8 pb-5 overflow-auto '>
                <button className='py-1 border-2 w-15  mb-5 flex items-center gap-1 px-1 justify-center' onClick={() => setPage("Userrole")}>
                    <FaArrowLeftLong/>back
                </button>
                <p className='text-xl md:text-4xl lg:text-xl font-semibold text-left lg:text-left md:text-center '>Create your Agent account</p>
                <p className='text-gray-700 text-left lg:text-left md:text-center md:text-2xl lg:text-[17px] text-[17px]'>Identity verification is required before you can accept jobs.</p>
                <form  className='space-y-5 mt-5' onSubmit={handleSubmit(submitfn)}>
                    <div>
                    <label htmlFor="fullname">Full Name</label><br/>
                    <input type="text"  {...register("fullname")} name='fullname' id='fullname' required placeholder='e.g Chidinma Okafor' className='w-full pl-5 py-2 border-gray-300 border  bg-white mt-1 rounded-md ' />
                    </div>
                    <div className='flex flex-1 md:flex-row flex-col md:gap-2 gap-5'>
                        <div className=' '>
                        <label htmlFor="email">Email address</label><br/>
                        <input type="email"  {...register("email")} id='email' name='email' placeholder='you@email.com' required className=' pl-5 mt-1 rounded-md py-2 border-gray-300 border  bg-white  lg:w-50 md:w-88 w-full' />
                        </div>
                        <div className=''>
                        <label htmlFor="phone">Phone number</label><br/>
                        <input type="text"  {...register("phone")} id='phone' name='phone' placeholder='+234 xxx xxx' required className=' pl-5 mt-1 rounded-md py-2 border-gray-300 border  bg-white md:w-88 lg:w-50 w-full'/>
                        </div>
                     </div>
                     <div className='md:flex-row flex-col flex flex-1  md:gap-2 gap-5 '>
                        <div  className=''>
                        <label htmlFor="address">Residential Address</label><br/>
                        <input type="text" id='address'  {...register("address")} name='address' placeholder='Enter current address' required className=' pl-5 md:w-88 py-2 border-gray-300 border  bg-white mt-1 rounded-md placeholder:text-[14px] lg:w-50 w-full'/>
                        </div>
                        <div  className=''>
                        <label htmlFor="ABSSIN">ABSSIN</label><br/>
                        <input type="text" id='ABSSIN'  {...register("abssin")} name='ABSSIN' placeholder='Enter your 11 or 10 digits ABSSIN' required className=' pl-3 py-2 md:w-88 border-gray-300 border  bg-white mt-1 rounded-md placeholder:text-[12px] lg:w-50 w-full' />
                        </div>
                     </div>
                     <div>
                        <label htmlFor="NIN">Identification details (NIN)</label><br/>
                        <input type="text" id='NIN'  {...register("nin")} name='NIN' placeholder='11-digit National Identification Number' required className='w-full  py-2 border-gray-300 border  bg-white mt-1 pl-5 rounded-md'  />
                        <p className='text-gray-600 text-sm'>Used once for verification only - never shown publicly</p>
                    </div>
                    <div className='space-y-1'>
                        <p>Profile Photo</p>
                        <div onDragOver={dragfn} onDrop={dropfn}>
                              {
                                image
                                ? (<div>
                                   <div className='flex justify-evenly bg-gray-300 py-5 space-y-3 rounded-md'>
                                      <div className='space-y-3'>
                                        <img src={image} alt="" className='w-50 rounded-md flex' /> 
                                          <label htmlFor="file" className='bg-amber-400 px-4 py-1 rounded ml-18'  >Reupload</label>
                                          {/* <input type="file" id='file' name='file' accept='image/*' hidden {...fileRegister} onChange={changefn}/> */}
                                      </div>
                                      {/* <p className='text-md '>{dpname}</p> */}
                                      <RxCross1 onClick={del}/>
                                   </div>
                                  </div>)
                                :(<div className='space-y-1'>
                                  <div className='w-full flex flex-col items-center justify-center border-dashed border rounded-xl border-gray-500 h-25  gap-1'>
                                    <HiMiniArrowUpTray/>
                                    <div className='flex justify-center items-center'>
                                      <p className='text-gray-600'>Drag a photo here, or  </p>
                                      <label htmlFor="file" className='text-green-600 pl-1'> browse</label>
                                    </div>
                                  </div>
                                    <p className='text-gray-600 text-sm'>Uploaded when you submit—— max 5MB, JPG or PNG works best.</p>
                                 </div>)
                            }
                            <input type="file" id='file' name='file' accept='image/*' hidden {...fileRegister} onChange={changefn} />
                            {errors.file && <p className='text-red-500'>{errors.file.message}</p> }
                        </div>
                    </div>
                    <div className='space-y-1'>
                      <div className='md:flex-row flex-col flex lg:gap-2 md:gap-3 gap-5'>
                        <div  className=' relative'>
                            <label htmlFor="">Create password</label><br/>
                            <input type={pass}  {...register("password")} className=' pl-5 py-2 border-gray-300 border  bg-white mt-1 rounded-md lg:w-50 md:w-88 w-full'
                              onChange={toggleIcon} required
                            />
                            {
                              showIcon &&  <span  className='absolute lg:left-43 md:left-80 left-70 bottom-3' onClick={passfn}>
                                {
                                  pass==="password" ? <FiEye/> : <FiEyeOff/>
                                }
                            </span>
                            }
                        </div>
                        <div  className=' relative'>
                            <label htmlFor="">Confirm password</label><br/>
                            <input type={secondpass} className=' pl-5 py-2 border-gray-300 border  bg-white mt-1 rounded-md lg:w-50 md:w-88 w-full' required {...register("confirmpassword")}   onChange={secondToggleIcon}/>
                            {
                              secondIcon &&  <span  className='absolute lg:left-43 md:left-80 left-70 bottom-3' onClick={secondpassfn}>
                                {
                                  secondpass==="password"? <FiEye/> : <FiEyeOff/>
                                }
                            </span>
                            }
                        </div>
                      </div>
                        {errors.confirmpassword && <p className='text-center text-red-400'>{errors.confirmpassword.message}</p> }
                    </div>
                    <div className='flex pt-5'>
                    <input type="checkbox" id='terms' name='terms' {...register("checkbox")} required />
                    <label htmlFor="terms" className='text-sm pl-2'>I confirm that my Identification details are accurate and agree to CleanAbia's  
                    <button onClick={() => setPage("terms")} type='button' className='text-green-600 pl-1'> Agent terms</button>
                    </label>
                    </div>
                    <button className='w-full bg-amber-400 py-2 rounded-2xl border' type='submit'>Create Agent account</button>
                </form>
                <p className='text-sm text-center pt-3'>Already have an account? <NavLink to="/login" className='text-green-600'>Log in</NavLink></p>
            </section>
            </div>
  )
}
