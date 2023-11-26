import { Button } from 'flowbite-react'
import shopsvg from "../../../public/store-2017.svg"

export default function CreateShop() {
  return (
    <div>
<section className="p-6 dark:bg-gray-800 dark:text-gray-50 mx-auto">
	<form className="container flex flex-col mx-auto space-bottom-4">
		<div className='w-full'>
            <img src={ shopsvg} className='w-16 h-16 mx-auto'/>
        </div>
		<fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md  dark:bg-gray-900">
			<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-4">
				<div className="col-span-full sm:col-span-3">
					<label for="Shopname" className="text-sm">Shop Name</label>
					<input id="Shopname" type="text" placeholder="Shop name" className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
                <div className="col-span-full sm:col-span-3">
					<label for="soplogo" className="text-sm">Shop Logo</label>
					<input id="soplogo" type="text" placeholder="https://" className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
                <div className="col-span-full sm:col-span-3">
					<label for="shoplocation" className="text-sm">Shop Location</label>
					<input id="shoplocation" type="text" placeholder="Shop location" className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
                <div className="col-span-full sm:col-span-3">
					<label for="ownername" className="text-sm">Shop Owner Name</label>
					<input id="ownername" type="text" placeholder="Owne name" className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
                <div className="col-span-full sm:col-span-3">
					<label for="owneremail" className="text-sm">Shop Owner Email</label>
					<input id="owneremail" type="text" placeholder="Owner email" className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
				
				<div className="col-span-full sm:col-span-3">
					<label for="bio" className="text-sm">Shop Info</label>
					<textarea id="bio" placeholder="" className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"></textarea>
				</div>
			</div>
            
		</fieldset>
        <div className='w-full'>
            <button type="button" className="px-8 py-3 font-semibold border rounded dark:border-gray-100 w-96 block mx-auto dark:text-gray-100 bg-cyan-700 text-white hover:bg-cyan-800">Border</button>
 
            </div>
	</form>
</section>







    </div>
  )
}
