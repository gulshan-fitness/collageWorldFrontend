
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import Select from 'react-select';
import { Context } from '../../../../Context_holder';
import { useParams } from 'react-router-dom';


export default function Hiring_partners_edit() {

    const { current_hiring_partners, hiring_partners_fetch, college_fetch, colleges, selected_college, setselected_college,token,notify,admin} = useContext(Context);
    const [logo_value,setlogo_value] = useState(null)

    const [data,setData] = useState(null);

    const logo_ref=useRef()

    
    const { id } = useParams()


    useEffect(
        () => {


        hiring_partners_fetch(id,null)
if(!admin) return

            if(!admin) return
      if(admin?.role=="subadmin" && admin?.collage_id){      
 college_fetch(admin?.collage_id)
      }
      else if(admin?.role=="superadmin"){
        college_fetch()
      }



        }, [id,admin]
    )

    useEffect(
        () => {
            setData(current_hiring_partners);

        },[current_hiring_partners]
    )

   




    useEffect(
        () => {
            setselected_college({ label: current_hiring_partners?.college_id?.college_name, value: current_hiring_partners?.college_id?._id })


        }, [current_hiring_partners]
    )



    const submit_handler = (e) => {

        e.preventDefault();




        const college_id = selected_college.value
        const company_name = e.target.company_name.value
        const website = e.target.website.value

const data= {
    college_id:college_id,
    company_name:company_name,
    website:website
}
        


        axios.put(process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_HIRING_PARTNERS_URL + "edit/" + id, data,{
            headers: {
              Authorization: token}
          })
            .then((success) => {
                notify(success.data.msg,success.data.status)

                if (success.data.status === 1) {


                    e.target.reset();

                hiring_partners_fetch(id,null)




                }
            })

            .catch((error) => {
                console.error('Error:', error);
            });


    }


    const logo_handler = ()=>{
        
        const logo =logo_value

    

        const old_logo =data?.logo

        const id =data?._id

        
        const formData = new FormData();
        
        
        formData.append("logo",logo)
        formData.append("old_logo" ,old_logo)
        
        
        
        
          axios.patch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_HIRING_PARTNERS_URL}logo_edit/${id}`,formData,{
            headers: {
              Authorization: token}
          })
          .then((success) => {
           
       console.log(success);
       
       notify(success.data.msg,success.data.status)
            if (success.data.status === 1) {
                hiring_partners_fetch(id,null)
              setlogo_value(null)
             
              logo_ref.current.value=""

            }
          })
        
          .catch((error) => {
            console.error('Error:', error);
          });
        
        
        }
        

   
        return (
            <div className='min-h-screen py-10 bg-gray-300'>
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
                <div className="text-center text-2xl md:text-4xl font-bold mb-3">Hiring Partners Edit</div>
                <form onSubmit={submit_handler} encType="multipart/form-data">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                        <div>
                            <label htmlFor="college_id" className="block text-sm font-bold text-gray-700">
                                College ID
                            </label>
                            <Select
                                value={selected_college}
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        padding: '4px 20px',
                                        marginTop: '4px',
                                    }),
                                }}
                                onChange={(e) => { setselected_college(e) }}
                                name='college_id'
                                options={colleges?.college?.college?.map(data => ({ value: data._id, label: data.college_name }))}
                            />
                        </div>
                        <div>

                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company_name">
                                Company Name
                            </label>


                            <input
                                defaultValue={data?.companyName}
                                id="company_name"
                                name="company_name"
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Company Name"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="website">
                                Website
                            </label>
                            <input
                                defaultValue={data?.website}
                                id="website"
                                name="website"
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Website Link"
                            />
                        </div>
                    </div>
        
                    <div className="flex justify-end mb-4">
            <button
              type="submit"
              className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
          </div>
                </form>
        
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="logo">
                        Logo
                    </label>
                  
                    <input
                    ref={logo_ref}
                type='file'
                id="logo"
                name="logo"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e)=>setlogo_value(e.target.files[0])}
              />
                    <button className={`hover:bg-blue-950 capitalize bg-blue-700 text-white text-md font-semibold px-3 py-1 rounded-md mt-2 ${logo_value ? "block" : "hidden"}`} onClick={logo_handler} >
                        Update Logo
                    </button>

                </div>
            </div>
        </div>
        


        )
    


}
