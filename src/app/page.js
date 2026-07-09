import AdditionalSection from "@/components/AdditionalSection";
import Hero from "@/components/Hero";
import TopRatedDoctors from "@/components/TopRatedDoctor";
import Image from "next/image";

export default function Home() {
  return (
   <div>
    <Hero></Hero>
    <TopRatedDoctors></TopRatedDoctors>
    <AdditionalSection></AdditionalSection>
   </div>
  );
}
