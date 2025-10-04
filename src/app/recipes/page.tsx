'use client';
import Image from "next/image";
import Corkboard from "@/components/Corkboard";
import CorkCard from "@/components/Corkcard";
import ChefCard from "@/components/ChefCard";
import LeafBorder from "@/components/Leafborder";
import Polaroid from "@/components/Polaroid";
import SectionHeader from "@/components/SectionHeader";
import NavButton from "@/components/NavButton";

export default function Home() {
  
  return (
    <>
  
      
      <LeafBorder 
        leafSize={170}
        leafSpacing={150}
      />
      
      {/* Corkboard with pinned cards */}
      {/* 
        Buffer spacing: py-32 = 128px top/bottom buffer 
        Adjust this value to change spacing from leaf borders:
        - py-24 = 96px buffer
        - py-32 = 128px buffer (current)
        - py-40 = 160px buffer
      */}
      <div className="relative z-[1] min-h-screen flex items-start justify-center py-32 px-4 w-full">
        <Corkboard>
          <div className="p-4">
            {/* Header image spanning the width */}
            <div className="mb-6">
              <Image 
                src="/images/recipes.png" 
                alt="Cool Beans Davis Header" 
                width={768}
                height={200}
                className="w-full h-auto object-contain"
              />
            </div>
            
            {/* YouTube Chefs Section */}
            <div className="mb-8">
              <SectionHeader
                id="youtube-chefs-header"
                text="YOUTUBE CHEFS"
                paperColor="red-50"
                ruled="none"
                pinStyle="plastic"
                className="transform rotate-1"
              />
            </div>

            {/* Chef Cards - Horizontal Layout */}
            <div className="space-y-6 mt-8">
              <ChefCard
                id="yeung-man-cooking"
                href="https://www.youtube.com/@YEUNGMANCOOKING"
                title="Yeung Man Cooking"
                chefName="Will Yeung"
                portraitSrc="/images/chefs/yeung.png"
                description="Asian Fusion recipes. Ramen, curries, stir fries. Check out his chili oil!"
                recipeImages={[
                  "/images/recipes/yeung/yeung_1.webp",
                  "/images/recipes/yeung/yeung_2.webp",
                  "/images/recipes/yeung/yeung_3.png"
                ]}
                className="transform rotate-0.5"
              />

              <ChefCard
                id="burger-dude"
                href="https://www.youtube.com/c/TheeBurgerDude"
                title="Three Burger Dude"
                chefName="Watson"
                portraitSrc="/images/chefs/burgerdude.png"
                description="SUPER EASY American classics, burgers and fast food copy cats. delicious."
                recipeImages={[
                  "/images/recipes/burgerdude/cheeseburger.png",
                  "/images/recipes/burgerdude/cuban.png",
                  "/images/recipes/burgerdude/sandwich.png"
                ]}
                className="transform rotate-1"
              />


              <ChefCard
                id="rainbow-plant-life"
                href="https://www.youtube.com/@RainbowPlantLife"
                title="Rainbow Plant Life"
                chefName="Nisha"
                portraitSrc="/images/chefs/nisha.png"
                description="Mediterranean & Indian. Super healthy, veggie forward, budget friendly & good for meal prepping."
                recipeImages={[
                  "/images/recipes/nisha/nisha_1.jpg",
                  "/images/recipes/nisha/nisha_2.jpg",
                  "/images/recipes/nisha/nisha_3.webp"
                ]}
                className="transform -rotate-0.5"
              />

              <ChefCard
                id="gaz-oakley"
                href="https://www.youtube.com/channel/UCF-ACPYNN0oXD4ihS5mbbmw"
                title="Avant-Garde Vegan"
                chefName="Gaz Oakley"
                portraitSrc="/images/chefs/gaz.jpg"
                description="Rustic, British/Welsh comfort food, stews. European staples and a bit of gardening."
                recipeImages={[
                  "/images/recipes/gaz/gaz_1.jpg",
                  "/images/recipes/gaz/gaz_2.jpg",
                  "/images/recipes/gaz/gaz_3.jpg"
                ]}
                className="transform rotate-1"
              />

        

              <div className="mb-8">
              <NavButton
                id="home-button"
                text="← Back to Home"
                linkTo="/"
                className="transform rotate-1"
              />
              </div>


            </div>
            
          </div>
        </Corkboard>
      </div>
    </>
  );
}
