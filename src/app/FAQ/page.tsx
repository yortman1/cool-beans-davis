'use client';
import Image from "next/image";
import Corkboard from "@/components/Corkboard";
import CorkCard from "@/components/Corkcard";
import ChefCard from "@/components/ChefCard";
import LeafBorder from "@/components/Leafborder";
import Polaroid from "@/components/Polaroid";
import SectionHeader from "@/components/SectionHeader";
import NavButton from "@/components/NavButton";
import InfoCard from "@/components/InfoCard";

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
      
            
            {/* Header image spanning the width */}
            <div className="mb-6">
              <Image 
                src="/images/faqs.png" 
                alt="Cool Beans Davis Header" 
                width={768}
                height={200}
                className="w-full h-auto object-contain"
              />
            </div>

        
            
            <div className ="mt-8">
                <InfoCard
                id="about-me"
                title="Who am I & How did I make this page?"
                text={`HI THERE! My name is Troy and I'm a grad student in Plant Science here at UCD. I've been vegan since I was 17, and this year I crossed my 10 year "veganniversary" (if there is such a thing!) During that decade, Every time I found quality, peer reviewed information that supported my choice, I saved it so that someday I could compile it into one big list. Well, SOMEDAY is TODAY, so here ya go!
                    
                (As always, investigate my sources and come to your own conclusions, and if you find something that doesn't hold up, let me know so I can remove or update it!)`}
                imageSrc="/images/info/me.jpg"
                imagePosition="right"
                paperColor="blue-50"
                pinPlacement="both"
                imageWidthRatio={0.3}
                className="transform rotate-0.5"
                />
            </div>


            <div className ="mt-8">
                <InfoCard
                id="pb-vs-vegan"
                expandable={true}
                title="PLANT-BASED vs. VEGAN: What's the difference?"
                text={`The Terms 'Plant-Based' and 'Vegan' are often used interchangeably, and I am definitely guilty of mixing them up myself. But here's how I see it: 'Plant-based' is a descriptor for FOOD made without any body parts or excretions of animals. As for 'Vegan', I think the definition from the Vegan Society is hard to beat:`}
                
                additionalText={`"Veganism is a philosophy and way of living which seeks to exclude—as far as is possible and practicable—all forms of exploitation of, and cruelty to, animals for food, clothing or any other purpose[1]."

                In conclusion: FOOD made without animal products is 'plant-based', and if you're eating that way for the sake of animal rights, YOU are a 'vegan.' But honestly, don't worry about it too much!`}
                imageSrc="/images/info/food.webp"
                imagePosition="left"
                sources={[
                    {text:"[1] Vegan Society: Definition of Veganism", url:"https://www.vegansociety.com/go-vegan/definition-veganism"}
                ]}

                paperColor="green-50"
                ruled="grid"
                pinPlacement="both"
                imageWidthRatio={0.3}
                className="transform rotate-0.5"
                />
            </div>
            

            <div className="mt-8 " >
              <InfoCard
                  id="why-not-vegetarian"
                  expandable={true}
                  title="Why not just go VEGETARIAN???"
                  text={`I was actually vegetarian for 3 years before I went vegan! At first, I knew I didn't want to financially support animals getting killed. But milk and eggs don't require the animals to be slaughtered, right? (Also I was addicited to cheese) 
                
                    Unfortunately, as I learned more about what happens behind closed doors, I realized the dairy and egg industries are just as cruel as the meat industry, if not more so in some aspects.`}

                  additionalText={`Just like humans, female cows only make milk after they are pregnant! That means in order to have a steady milk production, female cows have to be repeatedly artificially inseminated over and over again, typically every year. Mother cows have an intense maternal isntinct, and their calves are taken away from them within 24 hours. It's common for them to "vocalize" (cry) for hours or even days afterwards, trying to find their baby again[1].

                    Since male calves don’t produce milk, they are considered “byproducts.” They are typically sold for veal or beef, or sometimes culled at birth if there isn't market demand[2].

                    Naturally, cows can live 15–20 years. But In the dairy industry, the stress of constant impregnation and milking means that mother cows are typically 'spent' after only 5 years, when their milk yield starts to decline[3]. In the end, every single dairy cow and laying hen ends up on the same kill floor as their relatives who were raised for meat. The only difference is that the industry was able to profit off of their reproductive systems along the way.

                    All that said, Going vegetarian is still GREAT, and does make a big difference: especially if you're on the fence or not ready to jump into a full-on plant-based diet immediately. I will always support people going vegetarian, no matter what!`}

                  imageSrc="/images/info/mama.webp"
                  imagePosition="right"
                  sources={[
                    { text: "[1] Farmer Separates Cow & Calf", url: "https://www.youtube.com/watch?v=GlHStb8wl4Y"},

                    { text: "[2] The Dispensable Surplus Dairy Calf", url: "https://www.frontiersin.org/journals/veterinary-science/articles/10.3389/fvets.2021.660934/full"},

                    { text: "[3] Review: Overview of factors affecting productive lifespan of dairy cows", url: "https://www.cambridge.org/core/journals/animal/article/review-overview-of-factors-affecting-productive-lifespan-of-dairy-cows/EF3D233CB84CE8AE36769A1966C67C34"},
                  ]}

                  paperColor="yellow-50"
                  ruled="college"
                  pinPlacement="both"
                  imageWidthRatio={0.3}
                  className="transform rotate-0.5"
                />
              </div>


              <div className="mt-8 mb-8" >
              <InfoCard
                  id="vitamins"
                  expandable={true}
                  title="Do I need to take VITAMINS?"
                  text={`You might think that if you go vegan, you'll have to take hundreds of flintstone vitamins to make up for missing nutrients. Luckily, that's not the case. There's really only one you should be aware of: B12. And here's the funny thing: that vitamin doesn't actually even come from animals themselves!`}

                    additionalText={`Vitamin B12 is produced by microorganisms in the soil[1]. The reason it ends up in animal products like meat and dairy is because they consume a fair bit of dirt because their feed isn't washed. Hypothetically, we humans could get all the B12 we needed if we ate enough dirt, or unwashed vegetables. But I like my vegetables washed, so my advice is this: 
                    
                    Just take a multivitamin a few times a week as part of your morning or bedtime routine! You can go with a generic one, or even one specifically made for vegans. Either way, it ends up being pennies per day, and you'll know you have your bases covered, vegan or omnivore.`}
                  imageSrc="/images/info/vitamin.png"
                  imagePosition="left"
                  sources={[
                    { text: "[1] Vitamin B12", url: "https://en.wikipedia.org/wiki/Vitamin_B12"},
                  ]}
                  paperColor="green-50"
                  ruled="grid"
                  pinPlacement="both"
                  imageWidthRatio={0.3}
                  className="transform rotate-0.5"
                />
              </div>

              <div className="mt-8 " >
              <InfoCard
                  id="other-issues"
                  expandable={true}
                  title="Don't we have BIGGER Things to worry about?"
                  text= {`This is something that I've been thinking about a lot recently. There are so many humanitarian crises around the world that deserve our attention. Despite that, I still think veganism is just as important as ever. Let me share my thoughts, if you're interested.

                    1. Animal agriculture IS a moral crisis if we value the suffering of animals at all. Every year, 26 million cows, 124 million pigs, and 8 BILLION chickens will be killed for food[1]. Even if we value the suffering of animals as a tiny fraction compared to humans, the sheer scale of violence we perpetuate against animals should make it a moral emergency.

                    2. Veganism is a passive activism, unlike others. To donate to the red cross, you have to dip into your own savings. To attend protests, you have to take time out of your day that could be used for something else. Going vegan, however, has little to no opportunity cost. We already spend money at the grocery store, and spend time cooking and washing up. Buying plant based foods instead doesn't take any more money or time. So the way I see it, it doesn't compete with our efforts to push for justice in other areas of society.
                    
                    I think Ed Winters handled this question quite well (certainly better than I could have!)[2].`}
                  sources={[
                    { text: "[1] 2025 Animal Kill Clock", url: "https://animalclock.org/"},
                    
                    { text: "[2] Human Rights Activist Disrupts Vegan Event", url: "https://www.youtube.com/watch?v=ZXu74W8A8BQ"},
                  ]}
                  paperColor="red-50"
                  pinPlacement="both"
                  imageWidthRatio={0.3}
                  className="transform rotate-0.5"
                />
              </div>

              <div className="mt-8 mb-8">
            <NavButton
                  id="home-button"
                  text="← Back to Home"
                  linkTo="/"
                  className="transform rotate-1"
                />
            </div>

        </Corkboard>
      </div>
    </>
  );
}