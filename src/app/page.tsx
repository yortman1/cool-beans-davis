'use client';
import Image from "next/image";
import Link from "next/link";
import Corkboard from "@/components/Corkboard";
import CorkCard from "@/components/Corkcard";
import LeafBorder from "@/components/Leafborder";
import Polaroid from "@/components/Polaroid";
import SectionHeader from "@/components/SectionHeader";

export default function Home() {
  
  return (
    <>
      <LeafBorder 
        leafSize={170}
        leafSpacing={150}
      />

    <div className="relative z-[1] min-h-screen flex items-start justify-center py-32 px-4 w-full">        
        <Corkboard
        
        >
          
          <div className="p-4">
            {/* Header image spanning the width */}
            <div className="mb-6">
              <Image 
                src="/images/header.png" 
                alt="Cool Beans Davis Header" 
                width={768}
                height={200}
                className="w-full h-auto object-contain"
              />
            </div>
            
            {/* SECTION 1: COMMUNITY */}
            <div className="mb-12">
              <SectionHeader
                id="community-header"
                text="COMMUNITY"
                paperColor="yellow-50"
                ruled="none"
                pinStyle="none"
                className="transform -rotate-0.5"
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8">
           
                <CorkCard
                  id="welcome-card"
                  title="Who are We?"
                  paperColor="yellow-50"
                  ruled="none"
                  pinPlacement="both"
                  className="transform -rotate-2"
                >
                  <p className="text-m">
                    Davis&apos;s Vegan + Plant Based Alliance!
                  </p>
                  <p className="text-m underline text-blue-800">
                    <Link href="/FAQ">Questions? Check out our FAQ Page →</Link>
                  </p>

                  <p className="text-xs mt-2 opacity-75">
                    Est. Sep 2025 !
                  </p>
                </CorkCard>

                <CorkCard
                  id="why-veggie-card"
                  title="Why Go Vegan in 2025?"
                  paperColor="blue-50"
                  ruled="grid"
                  pinPlacement="right"
                  className="transform rotate-2"
                  linkTo="/why"
                >
                  <div className="text-sm space-y-1">
                    <p> Your Health →</p>
                    <p> Our Environment →</p>
                    <p> The Animals ! →</p>
                  </div>
                </CorkCard>

           

                <div className="flex justify-center">
                  <Polaroid
                    id="cow-polaroid-1"
                    imageSrc="/images/polaroids/cow_3.jpg"
                    imageAlt="Cute cow"
                    caption="Moo! (click me!)"
                    rotation={-5}
                    size={200}
                    vintageIntensity={0.4}
                    linkTo="https://www.instagram.com/thegentlebarn/?hl=en"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: FOOD */}
            <div className="mb-12">
              <SectionHeader
                id="food-header"
                text="PLANT-BASED FOOD"
                paperColor="green-50"
                ruled="grid"
                pinStyle="metal"
                className="transform rotate-1"
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8">


                <CorkCard
                  id="recipes-card"
                  title="Our Favorite Recipes"
                  paperColor="green-50"
                  ruled="grid"
                  pinPlacement="right"
                  className="transform rotate-2"
                  linkTo="/recipes"
                >
                  <div className="text-sm space-y-1">
                    <p> Youtube Channels →</p>
                    <p> Written Recipes →</p>
                    <p> Cookbooks →</p>
                  </div>
                </CorkCard>

             
                <div className="flex justify-center">
                  <Polaroid
                    id="cow-polaroid-3"
                    imageSrc="/images/polaroids/pig_1.jpg"
                    imageAlt="Cute pig"
                    caption="Oink! (click me!)"
                    rotation={-2}
                    size={200}
                    vintageIntensity={0.4}
                    linkTo="https://www.instagram.com/lovingfarmanimalsanctuary/?hl=en"
                  />
                </div>

                <CorkCard
                  id="restaurants-card"
                  title="Our Favorite Davis Restaurants!"
                  paperColor="yellow-50"
                  ruled="college"
                  pinPlacement="right"
                  className="transform -rotate-1"
                >
                  <div className="text-sm space-y-1">
                    <p>• Indian →</p>
                    <p>• Asian →</p>
                    <p>• American →</p>
                  </div>
                </CorkCard>
              </div>
            </div>

            {/* SECTION 3: EVENTS */}
            <div className="mb-12">
              <SectionHeader
                id="events-header"
                text="LOCAL EVENTS"
                paperColor="blue-50"
                ruled="college"
                pinStyle="plastic"
                className="transform -rotate-1"
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8">

         

                <div className="flex justify-center">
                  <Polaroid
                    id="cow-polaroid-2"
                    imageSrc="/images/polaroids/cow_2.jpg"
                    imageAlt="Cute cow"
                    caption="Moo! (click me!)"
                    rotation={0}
                    size={200}
                    vintageIntensity={0.4}
                    linkTo="https://www.instagram.com/cowscomehomesanctuary/?hl=en"
                  />
                </div>

              <CorkCard
                  id="bean-count-card"
                  title="Bean Count Contest"
                  paperColor="yellow-50"
                  ruled="college"
                  pinPlacement="right"
                  className="transform rotate-1"
                >
                  <div className="text-sm space-y-1">
                    <p> Come by our booth at the farmers market to make your guess and win a prize (if you&apos;re lucky)</p>
                  </div>
                </CorkCard>
                
                <CorkCard
                  id="todo-card"
                  title="TODO LIST"
                  paperColor="blue-50"
                  ruled="grid"
                  pinPlacement="left"
                  className="transform -rotate-1"
                >
                  <ul className="text-sm space-y-1">
                    <li> ☑ Make Website</li>
                    <li> ☐ Plan Potluck??</li>
                    <li> ☑ Make a whatsapp / discord group</li>
                    <li> ☐ Farmers Market Booth Signup</li>
                  </ul>
                </CorkCard>

              </div>

            </div>
          </div>
        </Corkboard>
      </div>
    </>
  );
}
