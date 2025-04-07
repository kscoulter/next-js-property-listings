import Link from "next/link";
import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import HomeProperties from "@/components/HomeProperties";

const Homepage = () => {
    return (
      <>
        <Hero />
        <InfoBoxes />
        <HomeProperties />
      </>
    )
}
 
export default Homepage;