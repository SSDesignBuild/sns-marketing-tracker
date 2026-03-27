import React, { useEffect, useMemo, useState } from "react";

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const defaultChecklist = {
  droneShot: false,
  phoneShot: false,
  talkingClip: false,
  detailShots: false,
  beforeAfterAngle: false,
  scriptUsed: false,
  captionReady: false,
  edited: false,
  posted: false,
};

const contentBank = [
  {
    title: "Patio Cover Problem Reveal",
    pillar: "Problem / Hook",
    objective: "Show why homeowners upgrade their patio cover for comfort and protection.",
    hook: "Most homeowners do not realize how unusable their patio is until summer hits.",
    script:
      "This patio was not giving the homeowner enough shade or protection, so here is how we are turning it into a space they can actually use.",
    caption:
      "A patio should feel like an extension of the home, not a space you avoid during the hottest part of the day. Here is how we are upgrading this one.",
    hashtags: [
      "#PatioCover",
      "#OutdoorLiving",
      "#BackyardUpgrade",
      "#OutdoorDesign",
      "#DesignBuild",
      "#PatioIdeas",
      "#HomeImprovement",
      "#BackyardProject",
      "#OutdoorSpace",
      "#Builder"
    ],
    shots: [
      "Drone pull-away of the whole backyard",
      "Wide front angle of existing patio cover area",
      "Phone walkthrough explaining the problem",
      "Close-up of heat, exposure, or design limitations",
      "Talking clip: why this upgrade matters"
    ],
    angles: [
      "High wide drone angle",
      "Eye-level walkthrough angle",
      "Detail close-up on pain points",
      "Low angle for install prep"
    ],
  },
  {
    title: "Screen Enclosure Before / During",
    pillar: "Progress",
    objective: "Show the start of a screened enclosure transformation.",
    hook: "This backyard is about to become way more usable.",
    script:
      "We are starting this screen enclosure project so the homeowner can enjoy the outdoors without dealing with bugs and weather interruptions.",
    caption:
      "Turning this outdoor space into something more comfortable, functional, and easy to enjoy year-round.",
    hashtags: [
      "#ScreenEnclosure",
      "#OutdoorLiving",
      "#BackyardTransformation",
      "#HomeUpgrade",
      "#DesignBuild",
      "#PatioLife",
      "#OutdoorRoom",
      "#Builder",
      "#ConstructionLife",
      "#BackyardGoals"
    ],
    shots: [
      "Drone top-down of the area",
      "Phone walkthrough of existing patio/porch",
      "Crew setup and materials",
      "Close-ups of framing or prep",
      "Before angle to match later"
    ],
    angles: [
      "Top-down drone",
      "Matching before/after angle",
      "Over-the-shoulder crew angle",
      "Low-angle power shot"
    ],
  },
  {
    title: "3 Things To Know Before Building a Sunroom",
    pillar: "Education",
    objective: "Build trust by educating homeowners about sunrooms.",
    hook: "Thinking about a sunroom? Here are 3 things to know first.",
    script:
      "If you are thinking about adding a sunroom, here are three things to think through first: how you will use it, how much natural light you want, and how it should connect to the rest of the home.",
    caption:
      "A sunroom can completely change how you use your home, but the right design decisions make all the difference.",
    hashtags: [
      "#Sunroom",
      "#HomeEducation",
      "#OutdoorLiving",
      "#HomeAddition",
      "#DesignBuild",
      "#BuilderTips",
      "#HomeImprovement",
      "#SunroomIdeas",
      "#ContractorTips",
      "#HomeownerTips"
    ],
    shots: [
      "Talking head clip",
      "Sunroom project B-roll",
      "Detail shots of windows/light flow",
      "Pointing shot toward layout features"
    ],
    angles: [
      "Chest-up talking head",
      "Eye-level authority framing",
      "Bright detail close-ups",
      "Slow pan across windows"
    ],
  },
  {
    title: "Deck Build Progress Update",
    pillar: "Progress",
    objective: "Show craftsmanship and steady progress on a custom deck.",
    hook: "Here is what deck progress looks like when the details are done right.",
    script:
      "Today we are moving forward on this custom deck build, and this stage matters because the structure underneath determines how well the whole thing performs long term.",
    caption:
      "A great deck is not just about how it looks at the end. It is about how it is built every step of the way.",
    hashtags: [
      "#CustomDeck",
      "#DeckBuild",
      "#OutdoorLiving",
      "#BackyardUpgrade",
      "#Builder",
      "#ConstructionLife",
      "#Craftsmanship",
      "#DesignBuild",
      "#DeckDesign",
      "#HomeProject"
    ],
    shots: [
      "Wide shot of deck footprint",
      "Crew action shot",
      "Close-ups of framing and fasteners",
      "Walkthrough explanation",
      "Low-angle install shot"
    ],
    angles: [
      "Wide reveal angle",
      "Tight craftsmanship angle",
      "Low upward work angle",
      "Eye-level walkthrough"
    ],
  },
  {
    title: "Motorized Screens Demo",
    pillar: "Feature Showcase",
    objective: "Show convenience and luxury with motorized screens.",
    hook: "This is one of the easiest ways to level up an outdoor space.",
    script:
      "Motorized screens are a game-changer because they let homeowners control comfort, privacy, and shade with the push of a button.",
    caption:
      "Modern outdoor living is all about flexibility. Motorized screens make the space more comfortable, more functional, and more premium.",
    hashtags: [
      "#MotorizedScreens",
      "#OutdoorLiving",
      "#LuxuryOutdoorLiving",
      "#PatioUpgrade",
      "#DesignBuild",
      "#SmartHome",
      "#BackyardDesign",
      "#OutdoorComfort",
      "#ScreenedPatio",
      "#Builder"
    ],
    shots: [
      "Reveal shot before activation",
      "Close-up of controls",
      "Screen motion shot",
      "Wide before/after feel of the space",
      "Talking explanation clip"
    ],
    angles: [
      "Straight-on reveal angle",
      "Detail angle on screen movement",
      "Wide patio angle",
      "Slow side glide"
    ],
  },
  {
    title: "Behind The Scenes: Materials Arrival",
    pillar: "Behind the Scenes",
    objective: "Humanize the team and show active job flow.",
    hook: "A lot happens before the finished reveal.",
    script:
      "Here is a behind-the-scenes look at what it takes to keep an outdoor living project moving the right way.",
    caption:
      "The final reveal gets the attention, but the process is where quality is built.",
    hashtags: [
      "#BehindTheScenes",
      "#ConstructionLife",
      "#OutdoorLiving",
      "#Builder",
      "#TeamWork",
      "#JobSite",
      "#DailyProgress",
      "#SmallBusiness",
      "#DesignBuild",
      "#Craftsmanship"
    ],
    shots: [
      "Morning job site establishing shot",
      "Materials unloading",
      "Team movement clips",
      "Tool prep close-ups",
      "Quick walkthrough update"
    ],
    angles: [
      "Wide establishing shot",
      "Hand-level materials angle",
      "Low action angle",
      "Mid-range teamwork angle"
    ],
  },
  {
    title: "Pavers & Outdoor Living Reveal",
    pillar: "Reveal",
    objective: "Show a polished hardscape transformation.",
    hook: "This backyard looks completely different now.",
    script:
      "This outdoor living project came together with pavers and layout choices that made the whole backyard feel more usable and more finished.",
    caption:
      "A well-designed outdoor living space changes how a backyard feels, functions, and flows.",
    hashtags: [
      "#Pavers",
      "#OutdoorLiving",
      "#Hardscape",
      "#BackyardDesign",
      "#DesignBuild",
      "#PatioDesign",
      "#BackyardTransformation",
      "#OutdoorSpace",
      "#HomeImprovement",
      "#Builder"
    ],
    shots: [
      "Drone orbit",
      "Wide reveal from entry point",
      "Close-up paver details",
      "Walking path shot",
      "Final voiceover clip"
    ],
    angles: [
      "Orbit angle",
      "Ground-level texture close-up",
      "Wide backyard reveal",
      "Slow forward push"
    ],
  },
  {
    title: "FAQ: Patio Cover vs Pergola",
    pillar: "Education",
    objective: "Answer a common buyer question.",
    hook: "A lot of homeowners ask this before starting their project.",
    script:
      "One of the most common questions we get is the difference between a patio cover and a pergola, and the answer depends on how much shade and protection you want.",
    caption:
      "Choosing the right outdoor structure starts with understanding how you want the space to function.",
    hashtags: [
      "#PatioCover",
      "#Pergola",
      "#OutdoorLiving",
      "#BuilderTips",
      "#HomeownerTips",
      "#DesignBuild",
      "#PatioIdeas",
      "#BackyardUpgrade",
      "#OutdoorDesign",
      "#FAQ"
    ],
    shots: [
      "Talking head",
      "B-roll of patio covers",
      "Comparison visuals",
      "Pointing shot to examples"
    ],
    angles: [
      "Eye-level talking frame",
      "Clean comparison angle",
      "Insert detail angle"
    ],
  },
  {
    title: "Custom Porch Progress",
    pillar: "Progress",
    objective: "Show the build process and explain today's step.",
    hook: "Here is what we are focused on today on this porch build.",
    script:
      "Today we are working on this custom porch, and this stage matters because it sets the tone for the finished look and the long-term durability.",
    caption:
      "Progress is where homeowners start seeing the vision come together.",
    hashtags: [
      "#PorchBuild",
      "#CustomPorch",
      "#OutdoorLiving",
      "#DesignBuild",
      "#Builder",
      "#ConstructionLife",
      "#BackyardProject",
      "#Craftsmanship",
      "#HomeImprovement",
      "#OutdoorSpace"
    ],
    shots: [
      "Wide shot of porch project",
      "Close-up install details",
      "Gimbal walkthrough",
      "Crew action clips",
      "Talking update"
    ],
    angles: [
      "Wide front angle",
      "Detail craftsmanship angle",
      "Low crew action angle",
      "Walkthrough eye-level angle"
    ],
  },
  {
    title: "Screened Porch Comfort Angle",
    pillar: "Lifestyle",
    objective: "Sell the feeling and use-case of the space.",
    hook: "This is what makes a screened porch feel worth it.",
    script:
      "A screened porch is all about comfort. It lets homeowners enjoy the outdoors with more privacy, fewer bugs, and a much better everyday experience.",
    caption:
      "The best outdoor spaces are the ones people actually want to use every day.",
    hashtags: [
      "#ScreenedPorch",
      "#OutdoorLiving",
      "#BackyardLifestyle",
      "#HomeUpgrade",
      "#PatioDesign",
      "#DesignBuild",
      "#PorchIdeas",
      "#Builder",
      "#OutdoorComfort",
      "#DreamBackyard"
    ],
    shots: [
      "Lifestyle-style walkthrough",
      "Wide comfort shot",
      "Detail shots of enclosure features",
      "Talking trust clip"
    ],
    angles: [
      "Eye-level lived-in angle",
      "Wide corner angle",
      "Detail feature close-up"
    ],
  },
  {
    title: "Why In-House Work Matters",
    pillar: "Trust",
    objective: "Differentiate the company with process and quality messaging.",
    hook: "This is one of the biggest differences in how projects get done.",
    script:
      "One thing that matters in a project like this is having a strong process and consistency from start to finish. That is how quality stays controlled.",
    caption:
      "Homeowners are not just choosing a product. They are choosing the process, the communication, and the team behind it.",
    hashtags: [
      "#DesignBuild",
      "#Builder",
      "#OutdoorLiving",
      "#ConstructionQuality",
      "#HomeImprovement",
      "#Craftsmanship",
      "#ContractorTips",
      "#ProjectProcess",
      "#HomeProject",
      "#TrustTheProcess"
    ],
    shots: [
      "Talking head",
      "Team working clips",
      "Close-up quality details",
      "Walkthrough with explanation"
    ],
    angles: [
      "Authority talking angle",
      "Mid-range crew angle",
      "Detail angle on workmanship"
    ],
  },
  {
    title: "Sunroom Light & Layout Showcase",
    pillar: "Feature Showcase",
    objective: "Show beauty and function in a sunroom.",
    hook: "A space like this changes how a home feels.",
    script:
      "The best sunrooms bring in natural light while still feeling connected to the rest of the home, and that balance is what makes them so useful.",
    caption:
      "A well-designed sunroom adds both beauty and functionality to the home.",
    hashtags: [
      "#Sunroom",
      "#HomeAddition",
      "#NaturalLight",
      "#DesignBuild",
      "#OutdoorLiving",
      "#HomeDesign",
      "#HomeImprovement",
      "#Builder",
      "#SunroomIdeas",
      "#DreamSpace"
    ],
    shots: [
      "Wide interior sweep",
      "Window/light details",
      "Entry reveal shot",
      "Talking head voiceover"
    ],
    angles: [
      "Bright wide angle",
      "Light-focused detail angle",
      "Slow interior glide"
    ],
  },
  {
    title: "Patio Cover Finished Reveal",
    pillar: "Reveal",
    objective: "Create premium finished-project content.",
    hook: "Wait until you see how this patio turned out.",
    script:
      "This is what we started with, and this is what the finished patio cover looks like now.",
    caption:
      "Clean, functional, and built for everyday use. This is the kind of outdoor upgrade that changes how a home lives.",
    hashtags: [
      "#PatioCover",
      "#FinishedProject",
      "#OutdoorLiving",
      "#BackyardTransformation",
      "#DesignBuild",
      "#Builder",
      "#PatioIdeas",
      "#HomeUpgrade",
      "#BeforeAndAfter",
      "#OutdoorDesign"
    ],
    shots: [
      "Drone orbit",
      "Pull-away reveal",
      "Phone walkthrough",
      "Detail finish shots",
      "Before/after angle"
    ],
    angles: [
      "Orbit angle",
      "Front curb-appeal angle",
      "Detail finish close-up",
      "Matching reveal angle"
    ],
  },
  {
    title: "Outdoor Living Design Walkthrough",
    pillar: "Education / Process",
    objective: "Explain how a full outdoor living project comes together.",
    hook: "Here is how a great outdoor space gets planned the right way.",
    script:
      "A successful outdoor living project is not just about adding features. It is about how the layout, flow, and function all work together.",
    caption:
      "Design matters just as much as build quality when creating an outdoor space people actually enjoy.",
    hashtags: [
      "#OutdoorLiving",
      "#BackyardDesign",
      "#DesignBuild",
      "#OutdoorProject",
      "#HomeImprovement",
      "#BuilderTips",
      "#OutdoorSpace",
      "#DreamBackyard",
      "#ConstructionTips",
      "#ProjectPlanning"
    ],
    shots: [
      "Talking walkthrough",
      "Wide project overview",
      "Pointing to zones/features",
      "Close-up of transitions/materials"
    ],
    angles: [
      "Walkthrough angle",
      "Wide design overview angle",
      "Detail layout angle"
    ],
  },
  {
    title: "Deck Detail Reel",
    pillar: "Craftsmanship",
    objective: "Highlight detail and finish quality.",
    hook: "The details are what make a project feel premium.",
    script:
      "A lot of what makes a finished deck stand out comes down to the details and how cleanly everything comes together.",
    caption:
      "It is easy to focus only on the big picture, but the details are where quality really shows.",
    hashtags: [
      "#DeckBuild",
      "#Craftsmanship",
      "#Builder",
      "#CustomDeck",
      "#OutdoorLiving",
      "#DesignBuild",
      "#HomeImprovement",
      "#DetailWork",
      "#ConstructionLife",
      "#BackyardUpgrade"
    ],
    shots: [
      "Close-up railing/trim details",
      "Texture shots",
      "Slow motion detail passes",
      "Wider context shot"
    ],
    angles: [
      "Tight macro-style close-up",
      "Slow side detail angle",
      "Medium reveal angle"
    ],
  },
  {
    title: "Quick Tip: Make Outdoor Spaces More Usable",
    pillar: "Quick Tip",
    objective: "Stay visible with easy educational content.",
    hook: "One of the best ways to get more use out of your backyard is this.",
    script:
      "If you want to make your outdoor space more usable, think about shade, comfort, and how the space works day to day—not just how it looks.",
    caption:
      "The best outdoor upgrades improve comfort and everyday use, not just appearance.",
    hashtags: [
      "#OutdoorLiving",
      "#BackyardTips",
      "#HomeownerTip",
      "#DesignBuild",
      "#BuilderTips",
      "#BackyardIdeas",
      "#HomeImprovement",
      "#QuickTip",
      "#OutdoorComfort",
      "#PatioIdeas"
    ],
    shots: [
      "Simple talking head",
      "B-roll of comfortable outdoor spaces",
      "Quick example clips"
    ],
    angles: [
      "Eye-level face-to-camera",
      "Wide comfort angle",
      "Simple handheld detail angle"
    ],
  },
  {
    title: "Motorized Shade Lifestyle Demo",
    pillar: "Lifestyle / Feature",
    objective: "Show convenience and premium feel.",
    hook: "This small feature changes the whole feel of the space.",
    script:
      "Motorized shading gives homeowners more control over comfort and privacy, and that flexibility makes the space much more practical.",
    caption:
      "Comfort and convenience matter. Features like this make outdoor living feel more effortless.",
    hashtags: [
      "#MotorizedShades",
      "#OutdoorLiving",
      "#PatioUpgrade",
      "#SmartOutdoorLiving",
      "#DesignBuild",
      "#BackyardComfort",
      "#LuxuryOutdoorLiving",
      "#Builder",
      "#HomeUpgrade",
      "#OutdoorDesign"
    ],
    shots: [
      "Shade in motion",
      "Wide lifestyle angle",
      "Button/control close-up",
      "Reaction or talking clip"
    ],
    angles: [
      "Wide function angle",
      "Detail motion angle",
      "Side glide"
    ],
  },
  {
    title: "Project Timeline Update",
    pillar: "Progress / Trust",
    objective: "Keep audience informed and show consistency.",
    hook: "Here is where this project stands right now.",
    script:
      "Here is a quick update on this project, what has been completed so far, and what is coming next.",
    caption:
      "Progress updates help show how a project really comes together over time.",
    hashtags: [
      "#ProgressUpdate",
      "#OutdoorLiving",
      "#Builder",
      "#ConstructionLife",
      "#DesignBuild",
      "#ProjectUpdate",
      "#BackyardTransformation",
      "#HomeImprovement",
      "#DailyProgress",
      "#JobSite"
    ],
    shots: [
      "Matching before/current angle",
      "Walkthrough summary",
      "Crew progress clip",
      "Detail comparison shot"
    ],
    angles: [
      "Matching angle",
      "Eye-level walkthrough",
      "Medium progress angle"
    ],
  },
  {
    title: "Family-Owned Brand Trust Post",
    pillar: "Brand / Trust",
    objective: "Make the company feel more personal and approachable.",
    hook: "Who you hire matters just as much as what you build.",
    script:
      "When homeowners choose a company for a major outdoor project, they are choosing a team they can trust to care about the details and the experience.",
    caption:
      "A project like this is personal. That is why trust, communication, and consistency matter so much.",
    hashtags: [
      "#FamilyBusiness",
      "#DesignBuild",
      "#Builder",
      "#OutdoorLiving",
      "#HomeImprovement",
      "#TrustTheProcess",
      "#SmallBusiness",
      "#ConstructionLife",
      "#HomeProject",
      "#LocalBusiness"
    ],
    shots: [
      "Face-to-camera owner/team clip",
      "Team B-roll",
      "Job site atmosphere shots"
    ],
    angles: [
      "Warm eye-level talking angle",
      "Mid-range team angle",
      "Natural candid angle"
    ],
  },
  {
    title: "Before / After Outdoor Transformation",
    pillar: "Transformation",
    objective: "Drive attention with a strong visual result.",
    hook: "This is exactly why before-and-after content works so well.",
    script:
      "This is what the space looked like before, and this is how it looks now after the transformation.",
    caption:
      "Transformations like this show how much a well-designed outdoor space can change the whole feel of a home.",
    hashtags: [
      "#BeforeAndAfter",
      "#OutdoorLiving",
      "#BackyardTransformation",
      "#DesignBuild",
      "#HomeUpgrade",
      "#Builder",
      "#Transformation",
      "#OutdoorDesign",
      "#HomeImprovement",
      "#BackyardGoals"
    ],
    shots: [
      "Exact before angle",
      "Exact after angle",
      "Drone reveal",
      "Detail beauty shots"
    ],
    angles: [
      "Matching before/after angle",
      "Orbit reveal angle",
      "Tight beauty angle"
    ],
  },
  {
    title: "Patio Flow & Function Talk",
    pillar: "Education",
    objective: "Teach how layout affects usability.",
    hook: "A good patio is not just about materials. It is about flow.",
    script:
      "What makes a patio work well is how the space flows, where people gather, and how the design supports everyday use.",
    caption:
      "Function is what turns a nice-looking patio into a truly useful outdoor space.",
    hashtags: [
      "#PatioDesign",
      "#OutdoorLiving",
      "#DesignBuild",
      "#BuilderTips",
      "#BackyardIdeas",
      "#HomeownerTips",
      "#OutdoorSpace",
      "#PatioIdeas",
      "#HomeImprovement",
      "#BackyardDesign"
    ],
    shots: [
      "Talking walkthrough",
      "Wide patio layout shot",
      "Close-up transition details"
    ],
    angles: [
      "Walkthrough angle",
      "Wide layout angle",
      "Detail angle"
    ],
  },
  {
    title: "Sunroom Comfort Story",
    pillar: "Lifestyle",
    objective: "Sell the feeling, not just the build.",
    hook: "Spaces like this change how people use their home every day.",
    script:
      "A sunroom creates a bright, comfortable space that adds flexibility to how the home is lived in and enjoyed.",
    caption:
      "The best spaces are the ones that feel good to be in. That is what makes upgrades like this so powerful.",
    hashtags: [
      "#Sunroom",
      "#HomeLifestyle",
      "#DesignBuild",
      "#HomeAddition",
      "#NaturalLight",
      "#HomeImprovement",
      "#Builder",
      "#DreamHome",
      "#LivingSpace",
      "#HomeUpgrade"
    ],
    shots: [
      "Soft interior walkthrough",
      "Window light details",
      "Lifestyle-feel B-roll"
    ],
    angles: [
      "Bright wide angle",
      "Slow glide angle",
      "Detail close-up"
    ],
  },
  {
    title: "Deck + Porch Combo Content",
    pillar: "Project Showcase",
    objective: "Show multi-feature outdoor living work.",
    hook: "This kind of project changes the whole backyard experience.",
    script:
      "When a deck and porch work together, the whole backyard becomes more functional and more inviting.",
    caption:
      "Outdoor living projects work best when every feature feels connected.",
    hashtags: [
      "#DeckBuild",
      "#PorchBuild",
      "#OutdoorLiving",
      "#DesignBuild",
      "#Builder",
      "#BackyardUpgrade",
      "#HomeImprovement",
      "#OutdoorSpace",
      "#BackyardTransformation",
      "#CustomBuild"
    ],
    shots: [
      "Wide drone shot",
      "Walkthrough linking both spaces",
      "Detail transitions",
      "Talking explanation"
    ],
    angles: [
      "Wide overview angle",
      "Walkthrough angle",
      "Feature detail angle"
    ],
  },
  {
    title: "Why Shade Matters",
    pillar: "Education / Hook",
    objective: "Create relatable demand for patio cover and screen products.",
    hook: "This is why shade changes everything outside.",
    script:
      "A lot of outdoor spaces do not get used because they are too exposed. Shade changes comfort, usability, and how long people actually stay outside.",
    caption:
      "Shade is one of the biggest upgrades for making an outdoor space more usable.",
    hashtags: [
      "#PatioCover",
      "#OutdoorLiving",
      "#ShadeSolutions",
      "#BackyardComfort",
      "#DesignBuild",
      "#PatioUpgrade",
      "#BuilderTips",
      "#HomeImprovement",
      "#OutdoorDesign",
      "#BackyardIdeas"
    ],
    shots: [
      "Wide patio in sun",
      "Talking clip",
      "Shade area comparison",
      "Comfort-focused B-roll"
    ],
    angles: [
      "Wide contrast angle",
      "Face-to-camera angle",
      "Detail comfort angle"
    ],
  },
  {
    title: "Outdoor Living FAQ: Best Feature To Start With",
    pillar: "FAQ",
    objective: "Help homeowners think through priorities.",
    hook: "If you are starting from scratch, begin here.",
    script:
      "The best place to start depends on how you want to use the space, but comfort, shade, and layout are usually the biggest first wins.",
    caption:
      "The smartest first upgrade is the one that makes the biggest difference in how the space gets used.",
    hashtags: [
      "#OutdoorLiving",
      "#FAQ",
      "#BuilderTips",
      "#HomeownerTips",
      "#DesignBuild",
      "#BackyardIdeas",
      "#HomeImprovement",
      "#PatioIdeas",
      "#OutdoorSpace",
      "#ProjectPlanning"
    ],
    shots: [
      "Talking head",
      "Project examples B-roll",
      "Pointing/educational cutaways"
    ],
    angles: [
      "Authority talking angle",
      "Comparison angle",
      "Insert feature angle"
    ],
  },
  {
    title: "Outdoor Fireplace / Gathering Feature Post",
    pillar: "Lifestyle / Reveal",
    objective: "Highlight outdoor living ambiance.",
    hook: "This is the kind of feature that changes how people gather.",
    script:
      "Features like this turn a backyard into a real destination space for relaxing and entertaining.",
    caption:
      "Great outdoor spaces are not just built to look good. They are built to be used and enjoyed.",
    hashtags: [
      "#OutdoorFireplace",
      "#OutdoorLiving",
      "#BackyardDesign",
      "#EntertainmentSpace",
      "#DesignBuild",
      "#BackyardUpgrade",
      "#OutdoorSpace",
      "#DreamBackyard",
      "#HomeImprovement",
      "#Builder"
    ],
    shots: [
      "Wide feature reveal",
      "Close-up material details",
      "Lifestyle angle",
      "Voiceover clip"
    ],
    angles: [
      "Wide hero angle",
      "Texture close-up",
      "Low cinematic angle"
    ],
  },
  {
    title: "Quality Detail Check",
    pillar: "Craftsmanship",
    objective: "Show the kind of detail clients should care about.",
    hook: "This is the kind of thing most people never notice, but it matters.",
    script:
      "Details like this are easy to overlook, but they are often what separate a rushed result from a polished one.",
    caption:
      "Quality shows up in the details long before the final reveal.",
    hashtags: [
      "#Craftsmanship",
      "#Builder",
      "#DesignBuild",
      "#OutdoorLiving",
      "#ConstructionQuality",
      "#DetailWork",
      "#HomeImprovement",
      "#JobSite",
      "#BuiltRight",
      "#ConstructionLife"
    ],
    shots: [
      "Tight detail shots",
      "Pointing/explaining clip",
      "Wider context shot"
    ],
    angles: [
      "Macro detail angle",
      "Medium explanation angle"
    ],
  },
  {
    title: "Weekend Soft CTA Post",
    pillar: "Lead Gen",
    objective: "Invite inquiries without sounding too salesy.",
    hook: "If you have a project like this in mind, here is your sign.",
    script:
      "If you have been thinking about upgrading your outdoor space, this is a good time to start planning what would make the biggest difference for your home.",
    caption:
      "Thinking about a patio cover, screened space, sunroom, deck, or outdoor living upgrade? Reach out and start the conversation.",
    hashtags: [
      "#OutdoorLiving",
      "#DesignBuild",
      "#HomeImprovement",
      "#BackyardUpgrade",
      "#Builder",
      "#PatioIdeas",
      "#Sunroom",
      "#DeckBuild",
      "#ScreenEnclosure",
      "#OutdoorDesign"
    ],
    shots: [
      "Best finished-project clips",
      "Talking CTA clip",
      "Before/after insert"
    ],
    angles: [
      "Wide polished angle",
      "Friendly eye-level CTA angle"
    ],
  },
  {
    title: "Patio Cover + Screen Combo Showcase",
    pillar: "Project Showcase",
    objective: "Show how multiple features work together.",
    hook: "This is what happens when comfort and design come together.",
    script:
      "Combining a patio cover with screening gives homeowners more comfort, more flexibility, and a much more usable outdoor space.",
    caption:
      "The best outdoor spaces are designed as a complete experience, not just one isolated feature.",
    hashtags: [
      "#PatioCover",
      "#ScreenEnclosure",
      "#OutdoorLiving",
      "#DesignBuild",
      "#BackyardTransformation",
      "#OutdoorSpace",
      "#HomeUpgrade",
      "#Builder",
      "#PatioDesign",
      "#DreamBackyard"
    ],
    shots: [
      "Wide combined-feature reveal",
      "Walkthrough showing flow",
      "Detail close-ups",
      "Talking explanation"
    ],
    angles: [
      "Wide hero angle",
      "Walkthrough angle",
      "Feature detail angle"
    ],
  },
  {
    title: "Month-End Results Recap",
    pillar: "Recap",
    objective: "Summarize progress and build momentum.",
    hook: "Here is a look at what we have been building lately.",
    script:
      "From screened spaces to patio covers, decks, and outdoor living upgrades, here is a quick recap of the work we have been doing.",
    caption:
      "A quick look at the kinds of outdoor living projects we have been bringing to life lately.",
    hashtags: [
      "#OutdoorLiving",
      "#DesignBuild",
      "#ProjectRecap",
      "#Builder",
      "#ConstructionLife",
      "#BackyardTransformation",
      "#HomeImprovement",
      "#PatioCover",
      "#Sunroom",
      "#ScreenEnclosure"
    ],
    shots: [
      "Montage of best clips",
      "Before/after snippets",
      "Talking recap or voiceover"
    ],
    angles: [
      "Best-of highlight angles",
      "Mixed reveal angles",
      "Face-to-camera recap angle"
    ],
  },
];

function formatDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getDaysInMonth(year, month) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const days = [];
  const pad = first.getDay();
  for (let i = 0; i < pad; i++) days.push(null);
  for (let d = 1; d <= last.getDate(); d++) days.push(new Date(year, month, d));
  return days;
}

function getEntry(entries, key) {
  return (
    entries[key] || {
      checklist: { ...defaultChecklist },
      customScript: "",
      customCaption: "",
      notes: "",
      postedTo: "",
    }
  );
}

function getPlanForDate(date) {
  const index = (date.getDate() - 1) % contentBank.length;
  return contentBank[index];
}

export default function App() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today);
  const [tab, setTab] = useState("plan");
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("sns-30-day-planner");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("sns-30-day-planner", JSON.stringify(entries));
  }, [entries]);

  const days = useMemo(
    () => getDaysInMonth(currentYear, currentMonth),
    [currentYear, currentMonth]
  );

  const dateKey = formatDateKey(selectedDate);
  const entry = getEntry(entries, dateKey);
  const plan = getPlanForDate(selectedDate);
  const completion = Math.round(
    (Object.values(entry.checklist).filter(Boolean).length /
      Object.values(entry.checklist).length) *
      100
  );

  function updateEntry(patch) {
    setEntries((prev) => ({
      ...prev,
      [dateKey]: {
        ...getEntry(prev, dateKey),
        ...patch,
      },
    }));
  }

  function toggleChecklist(key) {
    updateEntry({
      checklist: {
        ...entry.checklist,
        [key]: !entry.checklist[key],
      },
    });
  }

  function moveMonth(direction) {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear((y) => y - 1);
      } else {
        setCurrentMonth((m) => m - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear((y) => y + 1);
      } else {
        setCurrentMonth((m) => m + 1);
      }
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.hero}>
          <div>
            <div style={styles.eyebrow}>S&S Design Build</div>
            <h1 style={styles.title}>30-Day Content Planner</h1>
            <p style={styles.subtitle}>
              Unique daily content ideas for outdoor living projects, with shots,
              angles, scripts, captions, hashtags, and tracking.
            </p>
          </div>

          <div style={styles.heroCards}>
            <div style={{ ...styles.infoCard, ...styles.darkCard }}>
              <div style={styles.cardLabelDark}>Today</div>
              <div>{today.toLocaleDateString()}</div>
            </div>
            <div style={styles.infoCard}>
              <div style={styles.cardLabel}>Selected Day</div>
              <div>{selectedDate.toLocaleDateString()}</div>
            </div>
          </div>
        </div>

        <div style={styles.mainGrid}>
          <div style={styles.panel}>
            <div style={styles.panelHeader}>
              <div>
                <h2 style={styles.panelTitle}>Calendar</h2>
                <div style={styles.muted}>
                  {monthNames[currentMonth]} {currentYear}
                </div>
              </div>
              <div style={styles.navWrap}>
                <button style={styles.navBtn} onClick={() => moveMonth("prev")}>←</button>
                <button style={styles.navBtn} onClick={() => moveMonth("next")}>→</button>
              </div>
            </div>

            <div style={styles.weekRow}>
              {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
                <div key={d} style={styles.weekLabel}>{d}</div>
              ))}
            </div>

            <div style={styles.calendarGrid}>
              {days.map((day, idx) => {
                if (!day) return <div key={idx} style={styles.blankDay} />;
                const key = formatDateKey(day);
                const savedEntry = getEntry(entries, key);
                const doneCount = Object.values(savedEntry.checklist).filter(Boolean).length;
                const isSelected = key === dateKey;
                const isToday = key === formatDateKey(today);

                return (
                  <button
                    key={key}
                    onClick={() => setSelectedDate(day)}
                    style={{
                      ...styles.dayCell,
                      ...(isSelected ? styles.daySelected : {}),
                    }}
                  >
                    <div style={styles.dayTop}>
                      <span>{day.getDate()}</span>
                      {isToday ? <span style={isSelected ? styles.dotLight : styles.dotDark} /> : null}
                    </div>
                    <small style={isSelected ? styles.daySmallSelected : styles.daySmall}>
                      {doneCount}/9
                    </small>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={styles.panelLarge}>
            <div style={styles.panelHeader}>
              <div>
                <div style={styles.badge}>{plan.pillar}</div>
                <h2 style={styles.panelTitle}>{plan.title}</h2>
                <div style={styles.muted}>{plan.objective}</div>
              </div>
              <div style={styles.completionBox}>{completion}% done</div>
            </div>

            <div style={styles.progressBar}>
              <div style={{ ...styles.progressFill, width: `${completion}%` }} />
            </div>

            <div style={styles.checkGrid}>
              {[
                ["droneShot", "Drone shot"],
                ["phoneShot", "Phone shot"],
                ["talkingClip", "Talking clip"],
                ["detailShots", "Detail shots"],
                ["beforeAfterAngle", "Before/after angle"],
                ["scriptUsed", "Script used"],
                ["captionReady", "Caption ready"],
                ["edited", "Edited"],
                ["posted", "Posted"],
              ].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => toggleChecklist(key)}
                  style={{
                    ...styles.checkBtn,
                    ...(entry.checklist[key] ? styles.checkBtnDone : {}),
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            <div style={styles.tabRow}>
              {["plan","script","caption","notes"].map((name) => (
                <button
                  key={name}
                  onClick={() => setTab(name)}
                  style={{
                    ...styles.tabBtn,
                    ...(tab === name ? styles.tabActive : {}),
                  }}
                >
                  {name}
                </button>
              ))}
            </div>

            {tab === "plan" && (
              <div style={styles.twoCol}>
                <div style={styles.card}>
                  <h3>Hook</h3>
                  <p>{plan.hook}</p>
                </div>
                <div style={styles.card}>
                  <h3>Best Angles</h3>
                  <ul>{plan.angles.map((a) => <li key={a}>{a}</li>)}</ul>
                </div>
                <div style={styles.card}>
                  <h3>Shot List</h3>
                  <ul>{plan.shots.map((s) => <li key={s}>{s}</li>)}</ul>
                </div>
                <div style={styles.card}>
                  <h3>Production Goal</h3>
                  <ul>
                    <li>Get 1 strong hook clip in the first 2 seconds</li>
                    <li>Get 1 talking or voiceover-ready clip</li>
                    <li>Capture 3 to 5 detail clips</li>
                    <li>Grab at least 1 story clip</li>
                    <li>Match before/after angle when possible</li>
                  </ul>
                </div>
              </div>
            )}

            {tab === "script" && (
              <div style={styles.stack}>
                <div style={styles.card}>
                  <h3>Suggested Script</h3>
                  <p>{plan.script}</p>
                </div>
                <div style={styles.card}>
                  <h3>Talking Points</h3>
                  <ul>
                    <li>What the homeowner wanted</li>
                    <li>What problem is being solved</li>
                    <li>Why this stage matters</li>
                    <li>What makes the finished space better</li>
                    <li>Simple call to action</li>
                  </ul>
                </div>
                <div style={styles.card}>
                  <h3>Custom Script</h3>
                  <textarea
                    style={styles.textarea}
                    value={entry.customScript}
                    onChange={(e) => updateEntry({ customScript: e.target.value })}
                    placeholder="Write your custom script for this date..."
                  />
                </div>
              </div>
            )}

            {tab === "caption" && (
              <div style={styles.stack}>
                <div style={styles.card}>
                  <h3>Suggested Caption</h3>
                  <p>{plan.caption}</p>
                </div>
                <div style={styles.card}>
                  <h3>Hashtags</h3>
                  <div style={styles.tags}>
                    {plan.hashtags.map((tag) => (
                      <span key={tag} style={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div style={styles.card}>
                  <h3>Custom Caption</h3>
                  <textarea
                    style={styles.textarea}
                    value={entry.customCaption}
                    onChange={(e) => updateEntry({ customCaption: e.target.value })}
                    placeholder="Write or edit the caption for this date..."
                  />
                </div>
              </div>
            )}

            {tab === "notes" && (
              <div style={styles.twoCol}>
                <div style={styles.card}>
                  <h3>Daily Notes</h3>
                  <textarea
                    style={styles.textarea}
                    value={entry.notes}
                    onChange={(e) => updateEntry({ notes: e.target.value })}
                    placeholder="What happened today? What worked? What still needs editing?"
                  />
                </div>
                <div style={styles.card}>
                  <h3>Posted To</h3>
                  <textarea
                    style={styles.textareaSmall}
                    value={entry.postedTo}
                    onChange={(e) => updateEntry({ postedTo: e.target.value })}
                    placeholder="Instagram Reel, Story, Facebook, TikTok..."
                  />
                </div>
              </div>
            )}
          </div>

          <div style={styles.sidebar}>
            <div style={styles.panel}>
              <h2 style={styles.panelTitle}>Content Mix</h2>
              <ul>
                <li>Problem / hook posts</li>
                <li>Progress updates</li>
                <li>Finished reveals</li>
                <li>Educational posts</li>
                <li>Feature showcases</li>
                <li>Lifestyle content</li>
                <li>Trust / brand content</li>
                <li>Soft CTA posts</li>
              </ul>
            </div>

            <div style={styles.panel}>
              <h2 style={styles.panelTitle}>Built For Your Services</h2>
              <ul>
                <li>Patio covers</li>
                <li>Screen enclosures</li>
                <li>Motorized screens/shades</li>
                <li>Custom decks & porches</li>
                <li>Sunrooms</li>
                <li>Pavers & outdoor living</li>
              </ul>
            </div>

            <div style={styles.panel}>
              <h2 style={styles.panelTitle}>Filming Rules</h2>
              <ul>
                <li>Film vertical first</li>
                <li>Get wide, medium, close-up</li>
                <li>Move the drone slowly</li>
                <li>Use talking clips for trust</li>
                <li>Always grab a hook shot first</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: "Arial, sans-serif",
    color: "#0f172a",
  },
  container: {
    maxWidth: 1500,
    margin: "0 auto",
    padding: 20,
  },
  hero: {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 24,
    padding: 24,
    display: "flex",
    justifyContent: "space-between",
    gap: 20,
    flexWrap: "wrap",
    marginBottom: 20,
  },
  eyebrow: {
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    fontSize: 12,
    color: "#64748b",
    marginBottom: 8,
  },
  title: { margin: 0, fontSize: 36 },
  subtitle: { color: "#475569", maxWidth: 760, marginTop: 10 },
  heroCards: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    minWidth: 260,
  },
  infoCard: {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 18,
    padding: 16,
  },
  darkCard: { background: "#0f172a", color: "#fff", borderColor: "#0f172a" },
  cardLabel: { fontSize: 12, textTransform: "uppercase", color: "#64748b", marginBottom: 6 },
  cardLabelDark: { fontSize: 12, textTransform: "uppercase", color: "#cbd5e1", marginBottom: 6 },
  mainGrid: {
    display: "grid",
    gridTemplateColumns: "340px 1fr 300px",
    gap: 20,
  },
  panel: {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 24,
    padding: 18,
  },
  panelLarge: {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 24,
    padding: 18,
  },
  sidebar: { display: "grid", gap: 20 },
  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "flex-start",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  panelTitle: { margin: 0, fontSize: 24 },
  muted: { color: "#64748b", marginTop: 6 },
  navWrap: { display: "flex", gap: 8 },
  navBtn: {
    width: 40, height: 40, borderRadius: 12,
    border: "1px solid #cbd5e1", background: "#fff", cursor: "pointer"
  },
  weekRow: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8, marginBottom: 8 },
  weekLabel: { textAlign: "center", color: "#64748b", fontSize: 12 },
  calendarGrid: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 },
  blankDay: { minHeight: 72 },
  dayCell: {
    minHeight: 78,
    borderRadius: 18,
    border: "1px solid #cbd5e1",
    background: "#fff",
    padding: 10,
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    cursor: "pointer",
  },
  daySelected: { background: "#0f172a", color: "#fff", borderColor: "#0f172a" },
  dayTop: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  daySmall: { color: "#64748b" },
  daySmallSelected: { color: "#cbd5e1" },
  dotDark: { width: 8, height: 8, borderRadius: 999, background: "#0f172a" },
  dotLight: { width: 8, height: 8, borderRadius: 999, background: "#fff" },
  badge: {
    display: "inline-block",
    background: "#eff6ff",
    color: "#1d4ed8",
    borderRadius: 999,
    padding: "6px 12px",
    fontSize: 12,
    marginBottom: 8,
  },
  completionBox: {
    background: "#0f172a",
    color: "#fff",
    borderRadius: 14,
    padding: "10px 14px",
    fontSize: 14,
  },
  progressBar: {
    height: 10,
    borderRadius: 999,
    background: "#e2e8f0",
    overflow: "hidden",
    marginBottom: 18,
  },
  progressFill: { height: "100%", background: "#0f172a" },
  checkGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 10,
    marginBottom: 18,
  },
  checkBtn: {
    padding: 14,
    borderRadius: 16,
    border: "1px solid #cbd5e1",
    background: "#fff",
    textAlign: "left",
    cursor: "pointer",
  },
  checkBtnDone: { background: "#0f172a", color: "#fff", borderColor: "#0f172a" },
  tabRow: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 },
  tabBtn: {
    padding: "10px 16px",
    borderRadius: 999,
    border: "1px solid #cbd5e1",
    background: "#fff",
    cursor: "pointer",
    textTransform: "capitalize",
  },
  tabActive: { background: "#0f172a", color: "#fff", borderColor: "#0f172a" },
  twoCol: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  stack: { display: "grid", gap: 12 },
  card: {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 18,
    padding: 16,
  },
  textarea: {
    width: "100%",
    minHeight: 140,
    borderRadius: 14,
    border: "1px solid #cbd5e1",
    padding: 12,
    resize: "vertical",
  },
  textareaSmall: {
    width: "100%",
    minHeight: 90,
    borderRadius: 14,
    border: "1px solid #cbd5e1",
    padding: 12,
    resize: "vertical",
  },
  tags: { display: "flex", flexWrap: "wrap", gap: 8 },
  tag: {
    padding: "8px 12px",
    borderRadius: 999,
    background: "#f1f5f9",
    border: "1px solid #e2e8f0",
    fontSize: 14,
  },
};