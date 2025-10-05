'use client';
import Image from "next/image";
import Corkboard from "@/components/Corkboard";
import CorkCard from "@/components/Corkcard";
import ChefCard from "@/components/ChefCard";
import InfoCard from "@/components/InfoCard";
import LeafBorder from "@/components/Leafborder";
import Polaroid from "@/components/Polaroid";
import SectionHeader from "@/components/SectionHeader";
import NavButton from "@/components/NavButton";
import Sticker from "@/components/Sticker";

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
          <div className="p-0">
            {/* Header image spanning the width */}
            <div className="mb-4">
              <Image 
                src="/images/why_go_vegan.png" 
                alt="Cool Beans Davis Header" 
                width={768}
                height={200}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* SECTION 1: Health */}

              <div className="mt-0">
              <SectionHeader
                id="community-header"
                text="1. HEALTH!"
                paperColor="yellow-50"
                ruled="college"
                pinStyle="metal"
                className="transform -rotate-0.5"
              />
              </div>

              <div className="mt-0 flex justify-center">
                <Sticker
                  id="brocc-sticker"
                  stickerSrc="/images/stickers/broccoli.png"
                  width={170}
                  angle={-15}
                  xOffset={-300}
                  yOffset={-40}
                  showAnchor={true}
                  hideOnMobile={true}
                />
              </div>

              <div className="mt-0 flex justify-center">
                <Sticker
                  id="carrot-sticker"
                  stickerSrc="/images/stickers/eggplant.png"
                  width={170}
                  angle={15}
                  xOffset={300}
                  yOffset={-40}
                  showAnchor={true}
                  hideOnMobile={true}
                />
              </div>

              <div className="mt-16">
                <InfoCard
                  id="Cardiovascular-benefits"                  title="Cardiovascular Benefits"
                  text="Sadly, Heart disease and stroke are the leading causes of death in America. A big reason is plaque building up in arteries, which slows or blocks blood from getting where it needs to. Plant-based diets are naturally very low in &quot;bad&quot; LDL cholesterol and contain almost no trans fats. There's now very strong evidence that eating more plants improves your heart health[1] and significantly cuts your risk of heart attack and stroke[2]. For men, plant based diets may improve circulation enough to prevent or reverse ED[3]."
                  imageSrc="/images/info/beets.webp"
                  imagePosition="left"
                  sources={[
                    { text: "[1] Stanford Medicine: Twin research indicates that a vegan diet improves cardiovascular health", url: "https://med.stanford.edu/news/all-news/2023/11/twin-diet-vegan-cardiovascular.html"},
                    { text: "[2] Frontiers in Nutrition: Plant-based diet and risk of all-cause mortality: a systematic review and meta-analysis", url:"https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2024.1481363/full"},
                    { text: "[3] The Journal of Nutrition: Plant-based-diets-may-help-prevent-erectile-dysfunction", url: "https://www.news-medical.net/news/20250625/Plant-based-diets-may-help-prevent-erectile-dysfunction.aspx"},
                    //{ text: "[4] American Journal of Lifestyle Medicine: Erectile Dysfunction Reversed After Adoption of a Whole Food Plant-Based Diet: A Case Report", url: "https://bjui-journals.onlinelibrary.wiley.com/doi/abs/10.1111/bju.15765"}
                    //https://bjui-journals.onlinelibrary.wiley.com/doi/abs/10.1111/bju.15765?__cf_chl_rt_tk=XoHGMUnt43m5uWXD0qn05SwBv0kYJj4DM.FP7RiHFhI-1759192275-1.0.1.1-r0amj25qmMKc7CXOauIWv5y.20E.J1QaY1MY.lFE4y4
                  ]}
                  paperColor="red-50"
                  ruled="grid"
                  pinPlacement="both"
                  imageWidthRatio={0.3}
                  className="transform rotate-0.5"
                />
              </div>

              <div className="mt-8">
                <InfoCard
                  id="lowered-cancer-risk"
                  title="Lowered Cancer Risk"
                  text=" There is growing evidence that eating a plant-based diet reduces the risk of cancer[1]. The World Health Organization has recognized processed meat as a Group 1 carcinogen, and red meat a Group 2A carcinogen sinc 2015[2]. Plant-based foods are rich with natural compounds like antioxidants and fiber that help protect DNA from damage and lower inflammation. 
                  Recently, a study of 95,863 people showed vegans had a 24% lower risk across all cancer types[3]."

                  imageSrc="/images/info/study.png"
                  imagePosition="right"
                  sources={[
                    { text: "[1] Medscape: Growing Evidence Suggests Plant-Based Diets Reduce Cancer Risk", url: "https://www.medscape.com/viewarticle/growing-evidence-suggests-plant-based-diets-reduce-cancer-2025a100011d?ecd=mkm_ret_250309_mscpmrk_onc-lifesyle_etid7280360&uac=470807DJ&impID=7280360" },

                    { text: "[2] World Health Organization: Cancer: Carcinogenicity of the consumption of red meat and processed meat", url: "https://www.who.int/news-room/questions-and-answers/item/cancer-carcinogenicity-of-the-consumption-of-red-meat-and-processed-meat"},

                    { text: "[3] Longitudinal associations between vegetarian dietary habits and site-specific cancers in the Adventist Health Study-2 North American cohort", url: "https://www.sciencedirect.com/science/article/pii/S0002916525003284"},
                  ]}
                  paperColor="blue-50"
                  pinPlacement="both"
                  imageWidthRatio={0.4}
                  className="transform rotate-0.5"
                />
              </div>

              <div className="mt-8">
                <InfoCard
                  id="athletics"
                  title="Overall Health & Athletics"
                  text="According to the American Dietetic Association(ADA), well-planned vegan diets are healthful and nutritionally adequate for all stages of life, from infant to elderly, as well as for athletes[1]. But you still might be wondering if going vegan will affect your performance. So far, research hasn’t found big advantages or disadvantages of a vegan diet for athletic performance[2]. Studies show that if your body is getting the nutrients it needs, it doesn’t really matter whether they come from plants or animals. One area where plant-based eating CAN make a big difference is maintaining a healthy weight[3]. And if you’ve heard the myth that you can’t build muscle without meat, think again. Many Olypians are vegan[4], and Patrik Baboumian holds the Guinness World Record for the yoke walk, lifting 1,224 lb over 10 meters[5]."

                  imageSrc="/images/info/strongman.jpeg"
                  imagePosition="left"
                  sources={[

                    {text:"[1] Position of the American Dietetic Association: vegetarian diets", url: "https://pubmed.ncbi.nlm.nih.gov/19562864/"},

                    
                    {text:"[2] The Impact of Vegan and Vegetarian Diets on Physical Performance and Molecular Signaling in Skeletal Muscle", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8623732/"},

                    { text:"[3] Effects of Plant-Based Diets on Weight Status: A Systematic Review", url: "https://www.tandfonline.com/doi/full/10.2147/DMSO.S272802#d1e175"},

                    { text: "[4] Vegan Olypians compete in Paris 2024", url: "https://www.greenqueen.com.hk/vegan-athletes-plant-based-olympics-paris-2024/" },

                    { text: "[5] Patrik Baboumian: Vegan Strongman", url:"https://www.greatveganathletes.com/patrik-baboumian-vegan-strongman/" },
                  
                  ]}
                  paperColor="green-50"
                  ruled="grid"
                  pinPlacement="both"
                  imageWidthRatio={0.4}
                  className="transform rotate-0.5"
                />
              </div>

            {/*
              <div className="mt-8">
                <InfoCard
                  id="global-health-impact"
                  title="Global Health Impact"
                  text="
                  The EAT-Lancet Commission analyzed the potential impacts of dietary change on diet-related disease mortality using three approaches (see Table 2). All three  approaches concluded that dietary changes from current diets toward healthy plant-based diets are likely to result in major health benefits. This includes preventing approximately 11 million deaths per year, which represent between 19% to 24% of total deaths among adults."

                  imageSrc="/images/info/lancet.png"
                  imagePosition="right"
                  sources={[
                    { text: "EAT Lancet Summary Report", url: "https://eatforum.org/eat-lancet-commission/eat-lancet-commission-summary-report/" }
                  ]}
                  paperColor="red-50"
                  ruled="grid"
                  pinPlacement="both"
                  imageWidthRatio={0.5}
                  className="transform rotate-0.5"
                />
              </div>
            */}

            </div>

            {/* SECTION 2: Environment */}
            <div className="mt-16">
              <SectionHeader
                id="food-header"
                text="2. PLANET!"
                paperColor="green-50"
                ruled="grid"
                pinStyle="metal"
                className="transform rotate-1"
              />

              <div className="mt-0 flex justify-center">
                <Sticker
                  id="brocc-sticker"
                  stickerSrc="/images/stickers/earth.png"
                  width={140}
                  angle={-10}
                  xOffset={-300}
                  yOffset={-40}
                  showAnchor={true}
                  hideOnMobile={true}
                />
              </div>

              <div className="mt-0 flex justify-center">
                <Sticker
                  id="carrot-sticker"
                  stickerSrc="/images/stickers/tree.png"
                  width={150}
                  angle={10}
                  xOffset={300}
                  yOffset={-40}
                  showAnchor={true}
                  hideOnMobile={true}
                />
              </div>
              
              <div className="mt-16">
                <InfoCard
                  id="climate-change-emissions"
                  title="Climage Change & Emissions"
                  text=""
                  imageSrc="/images/info/landuse.avif"
                  imageAlt="Land use comparison chart showing agricultural land requirements"
                  imagePosition="left"
                  sources={[
                    { text: "[1] Our World in Data - Land Use Study", url: "https://ourworldindata.org/land-use-diets" }
                  ]}
                  ruled="grid"
                  pinPlacement="both"
                  imageWidthRatio={0.5}
                  className="transform rotate-0.5"
                />
              </div>

              <div className="mt-8">
                <InfoCard
                  id="land-use-impact"
                  title="Agricultural Land Use Impact"

                  text="Switching from a typical American diet to a plant-based diet decreases the need for agricultural land use by 75% [1]. This has huge effect not only on cutting methane and agricultural emissions, but also carbon sequestration by re-wilding and reforestation.
                  70% of land provides x% of calories. and that's not including grazing land."






                  imageSrc="/images/info/clearcut.jpg"
                  imageAlt="Land use comparison chart showing agricultural land requirements"
                  imagePosition="right"
                  sources={[
                    { text: "[1] Our World in Data - Land Use Study", url: "https://ourworldindata.org/land-use-diets" }
                  ]}
                  paperColor="green-50"
                  ruled="grid"
                  pinPlacement="both"
                  imageWidthRatio={0.4}
                  className="transform rotate-0.5"
                />
              </div>
            

            <div className="mt-8">
                <InfoCard
                  id="Runoff-and-Eutrophication"
                  title="Runoff & Eutrophication"
                  text="Concentrated Animal Feeding Oprations (CAFOs) pack huge amounts of animals like cows, pigs, and chickens into small spaces. Not only is this a risk factor for zoonotic diseases[1], but it inevitably creates huge amounds of waste, which infiltrates into the groundwater we drink from. Nitrates, antibiotics, and heavy metals in runoff are a risk to human health[2], and near the coast, eutrophication causes ocean dead zones and destroys marine ecosystems[3]."
                  imageSrc="/images/info/cafo.webp"
                  imageAlt="Runoff & Eutrophication"
                  imagePosition="left"
                  sources={[
                    { text: "[1] Interaction of the role of Concentrated Animal Feeding Operations (CAFOs) in Emerging Infectious Diseases (EIDS)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7106093" },

                    { text: "[2] Environmental Health Perspectives: Impacts of Waste from CAFOs on Water Quality", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC1817674/" },

                    { text: "[3] What’s the role of factory farming in ocean degradation?", url: "https://missionblue.org/2015/02/whats-the-role-of-mass-animal-agriculture-in-ocean-degradation/" },

                    { text: "[4] Image: Dalhart, Texas, 2012", url:"https://www.latimes.com/opinion/op-ed/la-oe-marks-on-the-land-html-20151222-htmlstory.html" }
                  ]}
                  ruled="grid"
                  pinPlacement="both"
                  imageWidthRatio={0.33}
                  className="transform rotate-0.5"
                />
            </div>
            </div>

            {/* SECTION 3: Animals */}


            <div className="mt-16">
              <SectionHeader
                id="events-header"
                text="3. ANIMALS!"
                paperColor="blue-50"
                ruled="college"
                pinStyle="plastic"
                className="transform -rotate-1"
              />
            </div>


            <div className="mt-16 flex justify-center">
                <Sticker
                  id="brocc-sticker"
                  stickerSrc="/images/stickers/pig.png"
                  width={150}
                  angle={-15}
                  xOffset={-320}
                  yOffset={-115}
                  showAnchor={true}
                  hideOnMobile={true}
                />
              </div>

              <div className="mt-0 flex justify-center">
                <Sticker
                  id="carrot-sticker"
                  stickerSrc="/images/stickers/capy.png"
                  width={150}
                  angle={15}
                  xOffset={320}
                  yOffset={-100}
                  showAnchor={true}
                  hideOnMobile={true}
                />
              </div>

            <div className="mt-0">
                <InfoCard
                  id="animal-ag"
                  title="Industrial Agriculture is Unimaginably Cruel"
                  text="99% of meat in america comes from factory farms[1]. Packages and adverts will depict happy animals grazing in lush pastures, but that's simply not true. The reality of industrial-scale animal farming is one of unimaginable cruelty[2], and 'Ag-gag' laws make it nearly impossible to enforce animal rights laws that are already on the books[3]. If you can stomach it, watch Dominion to see the reality of what happens even in farms that are certified as &apos;humane.&apos;"

                  imageSrc="/images/info/pig.jpg"
                  imagePosition="right"
                  sources={[
                    { text: "[1] Sentience Institute: US Factory Farming Estimates", url: "https://www.sentienceinstitute.org/us-factory-farming-estimates" },

                    { text: "[2] Dominion (2018) (CW:Animal Cruelty)", url: "https://www.youtube.com/watch?v=LQRAfJyEsko" },

                    { text: "[3] ASPCA: What Is Ag-Gag Legislation?", url: "https://www.aspca.org/improving-laws-animals/public-policy/what-ag-gag-legislation" },
                  ]}
                  paperColor="red-50"
                  ruled="grid"
                  pinPlacement="both"
                  imageWidthRatio={0.4}
                  className="transform rotate-0.5"
                />
              </div>

              <div className="mt-8">
                <InfoCard
                  id="slaughterhouse-work"
                  title="Slaughterhouses are a nightmare for workers, too"
                  text="The dangerous and unpleasant of animal slaughter and processing is disproportionately done by undocumented immigrants, who have little recourse when they are abused by their employers[1]. Slaughterhouse work takes an immense toll on the mind and body: Physical Injuries are both disturbingly common and severe, and workers in the industry report high rates of alcoholism and PTSD[2]. On the poultry line, workers are often forced to wearing diapers because they are denied bathroom breaks[3]."
                  imageSrc="/images/info/workers.jpg"
                  imagePosition="left"
                  sources={[
                    { text: "[1] Meatpacking: Last Week Tonight with John Oliver (HBO)", url: "https://www.youtube.com/watch?v=IhO1FcjDMV4"},
                    { text: "[2] Vox: This overlooked cause of PTSD is only going to get worse", url: "https://www.vox.com/future-perfect/415294/slaughterhouse-meat-workers-ptsd-mental-health"},
                    { text: " [3] Poultry Workers, Denied Bathroom Breaks, Wear Diapers: Oxfam Report", url: "https://www.nbcnews.com/business/business-news/poultry-workers-denied-bathroom-breaks-wear-diapers-oxfam-report-n572806" }

                  ]}
                  ruled="college"
                  pinPlacement="both"
                  imageWidthRatio={0.35}
                  className="transform rotate-0.5"
                />
              </div>

              <div className="mt-8 mb-8">
                <InfoCard
                  id="animal ethics"
                  title="All Animals Deserve Ethical Consideration"
                  text="Farmed animals are just as smart and social as the ones we love as pets, and deserve to live without being abused, just like they do.

                  Research shows that pigs are just as smart as dogs[1]; Cows have best friends and get stressed when separated[2].

                  In High School, I read the essay &apos;All Animals are Equal&apos; by Peter Singer. It's a bit heady, but it made me realize that the difference between me and a pig was one of degree, not of kind."

                  imageSrc="/images/info/buddies.jpg"
                  imagePosition="right"
                  sources={[
                    { text: "[1] Thinking Pigs: Cognition, Emotion, and Personality",url: "https://www.wellbeingintlstudiesrepository.org/cgi/viewcontent.cgi?article=1000&context=mammal" },

                    { text: "[2] Social Bonds in Dairy Cattle: The Effect of Dynamic Group Systems on Welfare and Productivity", url: "https://nectar.northampton.ac.uk/id/eprint/6466/1/McLennan_Krista_2013_Social_bonds_in_dairy_cattle_the_effect_of_dynamic_group_systems_on_welfare_and_productivity.pdf" },

                    { text: "[3] All Animals Are Equal (Peter Singer)", url: "https://spot.colorado.edu/~heathwoo/phil1200,Spr07/singer.pdf" }
                    
                  ]}
                  paperColor="green-50"
                  ruled="grid"
                  pinPlacement="both"
                  imageWidthRatio={0.4}
                  className="transform rotate-0.5"
                />
              </div>

              <div className="flex justify-center mb-8">
                <NavButton
                  id="home-button"
                  text="← Back to Home"
                  linkTo="/"
                  className="transform rotate-1"
                />
                <NavButton
                  id="start-button"
                  text="How do I start? →"
                  linkTo="/getting_started"
                  className="transform rotate-1"
                />
              </div>

        </Corkboard>
      </div>
    </>
  );
}
