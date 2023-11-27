import Lottie from "lottie-react";
import notFound from "../../../public/Animation - 1701043285289.json"
export default function NotFound() {

  return (
    <div className="w-[500px] mx-auto">
        <Lottie animationData={notFound} loop={true} />
    </div>
  )
}
