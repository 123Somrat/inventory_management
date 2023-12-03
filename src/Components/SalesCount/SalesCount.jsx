import  { useContext, useEffect ,useState} from 'react'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { AuthContext } from '../../Providers/Providers';

export default function SalesCount() {
      const axiosbaseUrl = useAxiosSecure();
      const {user} = useContext(AuthContext)
      const [details,setDetails] = useState({})
  useEffect(()=>{
         axiosbaseUrl.get(`/salessummary?useremail=${user?.email}`)
         .then(res=>setDetails(res?.data))
  },[])


  return (
    <section className="p-6 dark:bg-gray-800 dark:text-gray-100 shadow-lg shadow-cyan-500">
	<div className="container mx-auto grid justify-center  grid-cols-2 text-center lg:grid-cols-3">
		<div className="flex flex-col  justify-center m-2 lg:m-2 border-2 p-4 h-56 ">
			<p className="text-sm  lg:text-6xl">{details?.totalInvest}$</p>
			<p className="text-sm sm:text-base">Total Invest</p>
		</div>
		<div className="flex flex-col justify-center m-2 lg:m-2 border-2 p-4 h-56">
			<p className="text-sm leadi lg:text-6xl">{(details?.totalSales)?.toFixed(1)}$</p>
			<p className="text-sm sm:text-base no-wrap">Total Sale</p>
		</div> 
		<div className="flex flex-col justify-center m-2 lg:m-2 border-2 p-4 h-56">
			<p className="text-sm leadi lg:text-6xl ">{(details?.totalprofit)?.toFixed(1)}$</p>
			<p className="text-sm sm:text-base">Profit</p>
		</div>
	</div>
</section>
  )
}
