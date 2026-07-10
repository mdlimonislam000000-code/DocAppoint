import AdditionalSection from "@/components/AdditionalSection";
import Hero from "@/components/Hero";
import TopRatedDoctors from "@/components/TopRatedDoctor";
import Image from "next/image";

export const metadata = {
    title : " Home ",
    description : "...",
      icons :{
    icon: '/doctor-icon.svg'
  },
}

export default function Home() {
  return (
   <div>
    <Hero></Hero>
    <TopRatedDoctors></TopRatedDoctors>
    <AdditionalSection></AdditionalSection>
   </div>
  );
}
