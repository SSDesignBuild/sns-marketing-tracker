import React, { useEffect, useMemo, useState } from "react";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const serviceOptions = [
  "All Services",
  "Patio Covers",
  "Screen Enclosures",
  "Motorized Screens / Shades",
  "Decks & Porches",
  "Sunrooms",
  "Pavers & Outdoor Living",
];

const jobTypeOptions = [
  "All Job Types",
  "New Lead / Sales",
  "In Progress",
  "Finished Project",
  "Education / FAQ",
  "Brand / Trust",
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
    service: "Patio Covers",
    jobType: "New Lead / Sales",
    title: "Patio Cover Problem Reveal",
    pillar: "Problem / Hook",
    objective: "Show why homeowners upgrade their patio cover for comfort and protection.",
    hook: "Most homeowners do not realize how unusable their patio is until summer hits.",
    script: "This patio was not giving the homeowner enough shade or protection, so here is how we are turning it into a space they can actually use.",
    caption: "A patio should feel like an extension of the home, not a space you avoid during the hottest part of the day. Here is how we are upgrading this one.",
    hashtags: ["#PatioCover", "#OutdoorLiving", "#BackyardUpgrade", "#PatioIdeas", "#DesignBuild", "#OutdoorSpace"],
    shots: [
      "Drone pull-away of the whole backyard",
      "Wide front angle of existing patio area",
      "Walkthrough explaining the pain point",
      "Close-up of heat, glare, or exposure",
      "Talking clip: why this upgrade matters"
    ],
    angles: ["High wide drone angle", "Eye-level walkthrough", "Tight pain-point close-up", "Low prep angle"],
  },
  {
    service: "Screen Enclosures",
    jobType: "In Progress",
    title: "Screen Enclosure Progress",
    pillar: "Progress",
    objective: "Show the transformation as the enclosure takes shape.",
    hook: "This backyard is about to become way more usable.",
    script: "We are starting this screen enclosure project so the homeowner can enjoy the outdoors without dealing with bugs and weather interruptions.",
    caption: "Turning this outdoor space into something more comfortable, functional, and easy to enjoy year-round.",
    hashtags: ["#ScreenEnclosure", "#OutdoorLiving", "#BackyardTransformation", "#PatioLife", "#Builder", "#ConstructionLife"],
    shots: [
      "Drone top-down of the area",
      "Walkthrough of the existing patio",
      "Crew setup and materials",
      "Close-ups of framing or prep",
      "Before angle to match later"
    ],
    angles: ["Top-down drone", "Matching before/after angle", "Over-the-shoulder crew angle", "Low-angle power shot"],
  },
  {
    service: "Sunrooms",
    jobType: "Education / FAQ",
    title: "3 Things To Know Before Building a Sunroom",
    pillar: "Education",
    objective: "Build trust by teaching homeowners what to think through first.",
    hook: "Thinking about a sunroom? Here are 3 things to know first.",
    script: "If you are thinking about adding a sunroom, here are three things to think through first: how you will use it, how much natural light you want, and how it should connect to the rest of the home.",
    caption: "A sunroom can completely change how you use your home, but the right design decisions make all the difference.",
    hashtags: ["#Sunroom", "#HomeEducation", "#HomeAddition", "#BuilderTips", "#SunroomIdeas", "#HomeownerTips"],
    shots: ["Talking head clip", "Sunroom B-roll", "Light-flow detail shots", "Pointing shot toward layout features"],
    angles: ["Chest-up talking head", "Eye-level authority framing", "Bright detail close-ups", "Slow pan across windows"],
  },
  {
    service: "Decks & Porches",
    jobType: "In Progress",
    title: "Deck Build Progress Update",
    pillar: "Progress",
    objective: "Show craftsmanship and why the current stage matters.",
    hook: "Here is what deck progress looks like when the details are done right.",
    script: "Today we are moving forward on this custom deck build, and this stage matters because the structure underneath determines how well the whole thing performs long term.",
    caption: "A great deck is not just about how it looks at the end. It is about how it is built every step of the way.",
    hashtags: ["#CustomDeck", "#DeckBuild", "#OutdoorLiving", "#Craftsmanship", "#DeckDesign", "#Builder"],
    shots: ["Wide shot of deck footprint", "Crew action shot", "Close-ups of framing and fasteners", "Walkthrough explanation", "Low-angle install shot"],
    angles: ["Wide reveal angle", "Tight craftsmanship angle", "Low upward work angle", "Eye-level walkthrough"],
  },
  {
    service: "Motorized Screens / Shades",
    jobType: "New Lead / Sales",
    title: "Motorized Screens Demo",
    pillar: "Feature Showcase",
    objective: "Show convenience and luxury with motorized screens.",
    hook: "This is one of the easiest ways to level up an outdoor space.",
    script: "Motorized screens are a game-changer because they let homeowners control comfort, privacy, and shade with the push of a button.",
    caption: "Modern outdoor living is all about flexibility. Motorized screens make the space more comfortable, more functional, and more premium.",
    hashtags: ["#MotorizedScreens", "#OutdoorLiving", "#PatioUpgrade", "#SmartHome", "#OutdoorComfort", "#LuxuryOutdoorLiving"],
    shots: ["Reveal shot before activation", "Close-up of controls", "Screen motion shot", "Wide before/after feel of the space", "Talking explanation clip"],
    angles: ["Straight-on reveal angle", "Detail angle on screen movement", "Wide patio angle", "Slow side glide"],
  },
  {
    service: "All Services",
    jobType: "Brand / Trust",
    title: "Behind The Scenes: Materials Arrival",
    pillar: "Behind the Scenes",
    objective: "Humanize the team and show active job flow.",
    hook: "A lot happens before the finished reveal.",
    script: "Here is a behind-the-scenes look at what it takes to keep an outdoor living project moving the right way.",
    caption: "The final reveal gets the attention, but the process is where quality is built.",
    hashtags: ["#BehindTheScenes", "#ConstructionLife", "#Builder", "#TeamWork", "#DailyProgress", "#Craftsmanship"],
    shots: ["Morning job site establishing shot", "Materials unloading", "Team movement clips", "Tool prep close-ups", "Quick walkthrough update"],
    angles: ["Wide establishing shot", "Hand-level materials angle", "Low action angle", "Mid-range teamwork angle"],
  },
  {
    service: "Pavers & Outdoor Living",
    jobType: "Finished Project",
    title: "Pavers & Outdoor Living Reveal",
    pillar: "Reveal",
    objective: "Show a polished hardscape transformation.",
    hook: "This backyard looks completely different now.",
    script: "This outdoor living project came together with pavers and layout choices that made the whole backyard feel more usable and more finished.",
    caption: "A well-designed outdoor living space changes how a backyard feels, functions, and flows.",
    hashtags: ["#Pavers", "#OutdoorLiving", "#Hardscape", "#BackyardDesign", "#PatioDesign", "#Builder"],
    shots: ["Drone orbit", "Wide reveal from entry point", "Close-up paver details", "Walking path shot", "Final voiceover clip"],
    angles: ["Orbit angle", "Ground-level texture close-up", "Wide backyard reveal", "Slow forward push"],
  },
  {
    service: "Patio Covers",
    jobType: "Education / FAQ",
    title: "Patio Cover vs Pergola",
    pillar: "Education",
    objective: "Answer a common buyer question.",
    hook: "A lot of homeowners ask this before starting their project.",
    script: "One of the most common questions we get is the difference between a patio cover and a pergola, and the answer depends on how much shade and protection you want.",
    caption: "Choosing the right outdoor structure starts with understanding how you want the space to function.",
    hashtags: ["#PatioCover", "#Pergola", "#OutdoorLiving", "#BuilderTips", "#FAQ", "#PatioIdeas"],
    shots: ["Talking head", "B-roll of patio covers", "Comparison visuals", "Pointing shot to examples"],
    angles: ["Eye-level talking frame", "Clean comparison angle", "Insert detail angle"],
  },
  {
    service: "Screen Enclosures",
    jobType: "Finished Project",
    title: "Screened Porch Comfort Angle",
    pillar: "Lifestyle",
    objective: "Sell the feeling and use-case of the space.",
    hook: "This is what makes a screened porch feel worth it.",
    script: "A screened porch is all about comfort. It lets homeowners enjoy the outdoors with more privacy, fewer bugs, and a much better everyday experience.",
    caption: "The best outdoor spaces are the ones people actually want to use every day.",
    hashtags: ["#ScreenedPorch", "#OutdoorLiving", "#BackyardLifestyle", "#PatioDesign", "#OutdoorComfort", "#DreamBackyard"],
    shots: ["Lifestyle-style walkthrough", "Wide comfort shot", "Detail shots of enclosure features", "Talking trust clip"],
    angles: ["Eye-level lived-in angle", "Wide corner angle", "Detail feature close-up"],
  },
  {
    service: "All Services",
    jobType: "Brand / Trust",
    title: "Why In-House Work Matters",
    pillar: "Trust",
    objective: "Differentiate the company with process and quality messaging.",
    hook: "This is one of the biggest differences in how projects get done.",
    script: "One thing that matters in a project like this is having a strong process and consistency from start to finish. That is how quality stays controlled.",
    caption: "Homeowners are not just choosing a product. They are choosing the process, the communication, and the team behind it.",
    hashtags: ["#DesignBuild", "#Builder", "#ConstructionQuality", "#Craftsmanship", "#ProjectProcess", "#TrustTheProcess"],
    shots: ["Talking head", "Team working clips", "Close-up quality details", "Walkthrough with explanation"],
    angles: ["Authority talking angle", "Mid-range crew angle", "Detail angle on workmanship"],
  },
  {
    service: "Sunrooms",
    jobType: "Finished Project",
    title: "Sunroom Light & Layout Showcase",
    pillar: "Feature Showcase",
    objective: "Show beauty and function in a sunroom.",
    hook: "A space like this changes how a home feels.",
    script: "The best sunrooms bring in natural light while still feeling connected to the rest of the home, and that balance is what makes them so useful.",
    caption: "A well-designed sunroom adds both beauty and functionality to the home.",
    hashtags: ["#Sunroom", "#HomeAddition", "#NaturalLight", "#HomeDesign", "#SunroomIdeas", "#DreamSpace"],
    shots: ["Wide interior sweep", "Window/light details", "Entry reveal shot", "Talking head voiceover"],
    angles: ["Bright wide angle", "Light-focused detail angle", "Slow interior glide"],
  },
  {
    service: "Patio Covers",
    jobType: "Finished Project",
    title: "Patio Cover Finished Reveal",
    pillar: "Reveal",
    objective: "Create premium finished-project content.",
    hook: "Wait until you see how this patio turned out.",
    script: "This is what we started with, and this is what the finished patio cover looks like now.",
    caption: "Clean, functional, and built for everyday use. This is the kind of outdoor upgrade that changes how a home lives.",
    hashtags: ["#PatioCover", "#FinishedProject", "#OutdoorLiving", "#BackyardTransformation", "#BeforeAndAfter", "#OutdoorDesign"],
    shots: ["Drone orbit", "Pull-away reveal", "Phone walkthrough", "Detail finish shots", "Before/after angle"],
    angles: ["Orbit angle", "Front curb-appeal angle", "Detail finish close-up", "Matching reveal angle"],
  },
  {
    service: "Pavers & Outdoor Living",
    jobType: "Education / FAQ",
    title: "Outdoor Living Design Walkthrough",
    pillar: "Education / Process",
    objective: "Explain how a full outdoor living project comes together.",
    hook: "Here is how a great outdoor space gets planned the right way.",
    script: "A successful outdoor living project is not just about adding features. It is about how the layout, flow, and function all work together.",
    caption: "Design matters just as much as build quality when creating an outdoor space people actually enjoy.",
    hashtags: ["#OutdoorLiving", "#BackyardDesign", "#OutdoorProject", "#BuilderTips", "#ProjectPlanning", "#DreamBackyard"],
    shots: ["Talking walkthrough", "Wide project overview", "Pointing to zones/features", "Close-up of transitions/materials"],
    angles: ["Walkthrough angle", "Wide design overview angle", "Detail layout angle"],
  },
  {
    service: "Decks & Porches",
    jobType: "Finished Project",
    title: "Deck Detail Reel",
    pillar: "Craftsmanship",
    objective: "Highlight detail and finish quality.",
    hook: "The details are what make a project feel premium.",
    script: "A lot of what makes a finished deck stand out comes down to the details and how cleanly everything comes together.",
    caption: "It is easy to focus only on the big picture, but the details are where quality really shows.",
    hashtags: ["#DeckBuild", "#Craftsmanship", "#CustomDeck", "#DetailWork", "#BackyardUpgrade", "#Builder"],
    shots: ["Close-up railing/trim details", "Texture shots", "Slow motion detail passes", "Wider context shot"],
    angles: ["Tight macro-style close-up", "Slow side detail angle", "Medium reveal angle"],
  },
  {
    service: "All Services",
    jobType: "Education / FAQ",
    title: "Quick Tip: Make Outdoor Spaces More Usable",
    pillar: "Quick Tip",
    objective: "Stay visible with easy educational content.",
    hook: "One of the best ways to get more use out of your backyard is this.",
    script: "If you want to make your outdoor space more usable, think about shade, comfort, and how the space works day to day, not just how it looks.",
    caption: "The best outdoor upgrades improve comfort and everyday use, not just appearance.",
    hashtags: ["#OutdoorLiving", "#BackyardTips", "#HomeownerTip", "#BuilderTips", "#QuickTip", "#OutdoorComfort"],
    shots: ["Simple talking head", "B-roll of comfortable outdoor spaces", "Quick example clips"],
    angles: ["Eye-level face-to-camera", "Wide comfort angle", "Simple handheld detail angle"],
  },
  {
    service: "Motorized Screens / Shades",
    jobType: "Finished Project",
    title: "Motorized Shade Lifestyle Demo",
    pillar: "Lifestyle / Feature",
    objective: "Show convenience and premium feel.",
    hook: "This small feature changes the whole feel of the space.",
    script: "Motorized shading gives homeowners more control over comfort and privacy, and that flexibility makes the space much more practical.",
    caption: "Comfort and convenience matter. Features like this make outdoor living feel more effortless.",
    hashtags: ["#MotorizedShades", "#OutdoorLiving", "#PatioUpgrade", "#SmartOutdoorLiving", "#BackyardComfort", "#OutdoorDesign"],
    shots: ["Shade in motion", "Wide lifestyle angle", "Button/control close-up", "Reaction or talking clip"],
    angles: ["Wide function angle", "Detail motion angle", "Side glide"],
  },
  {
    service: "All Services",
    jobType: "In Progress",
    title: "Project Timeline Update",
    pillar: "Progress / Trust",
    objective: "Keep audience informed and show consistency.",
    hook: "Here is where this project stands right now.",
    script: "Here is a quick update on this project, what has been completed so far, and what is coming next.",
    caption: "Progress updates help show how a project really comes together over time.",
    hashtags: ["#ProgressUpdate", "#Builder", "#ProjectUpdate", "#DailyProgress", "#JobSite", "#OutdoorLiving"],
    shots: ["Matching before/current angle", "Walkthrough summary", "Crew progress clip", "Detail comparison shot"],
    angles: ["Matching angle", "Eye-level walkthrough", "Medium progress angle"],
  },
  {
    service: "All Services",
    jobType: "Brand / Trust",
    title: "Family-Owned Brand Trust Post",
    pillar: "Brand / Trust",
    objective: "Make the company feel more personal and approachable.",
    hook: "Who you hire matters just as much as what you build.",
    script: "When homeowners choose a company for a major outdoor project, they are choosing a team they can trust to care about the details and the experience.",
    caption: "A project like this is personal. That is why trust, communication, and consistency matter so much.",
    hashtags: ["#FamilyBusiness", "#DesignBuild", "#Builder", "#TrustTheProcess", "#SmallBusiness", "#HomeProject"],
    shots: ["Face-to-camera owner/team clip", "Team B-roll", "Job site atmosphere shots"],
    angles: ["Warm eye-level talking angle", "Mid-range team angle", "Natural candid angle"],
  },
  {
    service: "All Services",
    jobType: "Finished Project",
    title: "Before / After Outdoor Transformation",
    pillar: "Transformation",
    objective: "Drive attention with a strong visual result.",
    hook: "This is exactly why before-and-after content works so well.",
    script: "This is what the space looked like before, and this is how it looks now after the transformation.",
    caption: "Transformations like this show how much a well-designed outdoor space can change the whole feel of a home.",
    hashtags: ["#BeforeAndAfter", "#OutdoorLiving", "#BackyardTransformation", "#Transformation", "#BackyardGoals", "#Builder"],
    shots: ["Exact before angle", "Exact after angle", "Drone reveal", "Detail beauty shots"],
    angles: ["Matching before/after angle", "Orbit reveal angle", "Tight beauty angle"],
  },
  {
    service: "Sunrooms",
    jobType: "New Lead / Sales",
    title: "Sunroom Comfort Story",
    pillar: "Lifestyle",
    objective: "Sell the feeling, not just the build.",
    hook: "Spaces like this change how people use their home every day.",
    script: "A sunroom creates a bright, comfortable space that adds flexibility to how the home is lived in and enjoyed.",
    caption: "The best spaces are the ones that feel good to be in. That is what makes upgrades like this so powerful.",
    hashtags: ["#Sunroom", "#HomeLifestyle", "#NaturalLight", "#DreamHome", "#LivingSpace", "#HomeUpgrade"],
    shots: ["Soft interior walkthrough", "Window light details", "Lifestyle-feel B-roll"],
    angles: ["Bright wide angle", "Slow glide angle", "Detail close-up"],
  },
  {
    service: "Decks & Porches",
    jobType: "Finished Project",
    title: "Deck + Porch Combo Content",
    pillar: "Project Showcase",
    objective: "Show multi-feature outdoor living work.",
    hook: "This kind of project changes the whole backyard experience.",
    script: "When a deck and porch work together, the whole backyard becomes more functional and more inviting.",
    caption: "Outdoor living projects work best when every feature feels connected.",
    hashtags: ["#DeckBuild", "#PorchBuild", "#OutdoorLiving", "#BackyardUpgrade", "#OutdoorSpace", "#CustomBuild"],
    shots: ["Wide drone shot", "Walkthrough linking both spaces", "Detail transitions", "Talking explanation"],
    angles: ["Wide overview angle", "Walkthrough angle", "Feature detail angle"],
  },
  {
    service: "Patio Covers",
    jobType: "Education / FAQ",
    title: "Why Shade Matters",
    pillar: "Education / Hook",
    objective: "Create relatable demand for patio cover and screen products.",
    hook: "This is why shade changes everything outside.",
    script: "A lot of outdoor spaces do not get used because they are too exposed. Shade changes comfort, usability, and how long people actually stay outside.",
    caption: "Shade is one of the biggest upgrades for making an outdoor space more usable.",
    hashtags: ["#PatioCover", "#ShadeSolutions", "#BackyardComfort", "#PatioUpgrade", "#OutdoorDesign", "#BackyardIdeas"],
    shots: ["Wide patio in sun", "Talking clip", "Shade area comparison", "Comfort-focused B-roll"],
    angles: ["Wide contrast angle", "Face-to-camera angle", "Detail comfort angle"],
  },
  {
    service: "All Services",
    jobType: "Education / FAQ",
    title: "Outdoor Living FAQ: Best Feature To Start With",
    pillar: "FAQ",
    objective: "Help homeowners think through priorities.",
    hook: "If you are starting from scratch, begin here.",
    script: "The best place to start depends on how you want to use the space, but comfort, shade, and layout are usually the biggest first wins.",
    caption: "The smartest first upgrade is the one that makes the biggest difference in how the space gets used.",
    hashtags: ["#OutdoorLiving", "#FAQ", "#BuilderTips", "#HomeownerTips", "#ProjectPlanning", "#PatioIdeas"],
    shots: ["Talking head", "Project examples B-roll", "Pointing or educational cutaways"],
    angles: ["Authority talking angle", "Comparison angle", "Insert feature angle"],
  },
  {
    service: "Pavers & Outdoor Living",
    jobType: "Finished Project",
    title: "Outdoor Fireplace / Gathering Feature",
    pillar: "Lifestyle / Reveal",
    objective: "Highlight outdoor living ambiance.",
    hook: "This is the kind of feature that changes how people gather.",
    script: "Features like this turn a backyard into a real destination space for relaxing and entertaining.",
    caption: "Great outdoor spaces are not just built to look good. They are built to be used and enjoyed.",
    hashtags: ["#OutdoorFireplace", "#OutdoorLiving", "#EntertainmentSpace", "#BackyardUpgrade", "#DreamBackyard", "#Builder"],
    shots: ["Wide feature reveal", "Close-up material details", "Lifestyle angle", "Voiceover clip"],
    angles: ["Wide hero angle", "Texture close-up", "Low cinematic angle"],
  },
  {
    service: "All Services",
    jobType: "Brand / Trust",
    title: "Quality Detail Check",
    pillar: "Craftsmanship",
    objective: "Show the kind of detail clients should care about.",
    hook: "This is the kind of thing most people never notice, but it matters.",
    script: "Details like this are easy to overlook, but they are often what separate a rushed result from a polished one.",
    caption: "Quality shows up in the details long before the final reveal.",
    hashtags: ["#Craftsmanship", "#ConstructionQuality", "#DetailWork", "#BuiltRight", "#JobSite", "#Builder"],
    shots: ["Tight detail shots", "Pointing or explaining clip", "Wider context shot"],
    angles: ["Macro detail angle", "Medium explanation angle"],
  },
  {
    service: "All Services",
    jobType: "New Lead / Sales",
    title: "Weekend Soft CTA Post",
    pillar: "Lead Gen",
    objective: "Invite inquiries without sounding too salesy.",
    hook: "If you have a project like this in mind, here is your sign.",
    script: "If you have been thinking about upgrading your outdoor space, this is a good time to start planning what would make the biggest difference for your home.",
    caption: "Thinking about a patio cover, screened space, sunroom, deck, or outdoor living upgrade? Reach out and start the conversation.",
    hashtags: ["#OutdoorLiving", "#HomeImprovement", "#BackyardUpgrade", "#PatioIdeas", "#Sunroom", "#ScreenEnclosure"],
    shots: ["Best finished-project clips", "Talking CTA clip", "Before/after insert"],
    angles: ["Wide polished angle", "Friendly eye-level CTA angle"],
  },
  {
    service: "All Services",
    jobType: "Brand / Trust",
    title: "Month-End Results Recap",
    pillar: "Recap",
    objective: "Summarize progress and build momentum.",
    hook: "Here is a look at what we have been building lately.",
    script: "From screened spaces to patio covers, decks, and outdoor living upgrades, here is a quick recap of the work we have been doing.",
    caption: "A quick look at the kinds of outdoor living projects we have been bringing to life lately.",
    hashtags: ["#OutdoorLiving", "#ProjectRecap", "#BackyardTransformation", "#PatioCover", "#Sunroom", "#ScreenEnclosure"],
    shots: ["Montage of best clips", "Before/after snippets", "Talking recap or voiceover"],
    angles: ["Best-of highlight angles", "Mixed reveal angles", "Face-to-camera recap angle"],
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
  return entries[key] || {
    checklist: { ...defaultChecklist },
    customScript: "",
    customCaption: "",
    notes: "",
    postedTo: "",
  };
}

function matchesService(item, selectedService) {
  if (selectedService === "All Services") return true;
  return item.service === selectedService || item.service === "All Services";
}

function matchesJobType(item, selectedJobType) {
  if (selectedJobType === "All Job Types") return true;
  return item.jobType === selectedJobType;
}

function getFilteredBank(selectedService, selectedJobType) {
  const filtered = contentBank.filter(
    (item) => matchesService(item, selectedService) && matchesJobType(item, selectedJobType)
  );
  return filtered.length ? filtered : contentBank;
}

function getPlanForDate(date, selectedService, selectedJobType) {
  const filteredBank = getFilteredBank(selectedService, selectedJobType);
  const index = (date.getDate() - 1) % filteredBank.length;
  return filteredBank[index];
}

function SlideDots({ count, index, setIndex }) {
  return (
    <div style={styles.dotsWrap}>
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => setIndex(i)}
          style={{
            ...styles.dotBtn,
            ...(i === index ? styles.dotBtnActive : {}),
          }}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  );
}

function SlideNav({ index, setIndex, count }) {
  return (
    <div style={styles.slideNav}>
      <button
        style={styles.slideArrow}
        onClick={() => setIndex((prev) => (prev === 0 ? count - 1 : prev - 1))}
      >
        ←
      </button>
      <button
        style={styles.slideArrow}
        onClick={() => setIndex((prev) => (prev === count - 1 ? 0 : prev + 1))}
      >
        →
      </button>
    </div>
  );
}

export default function App() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today);
  const [view, setView] = useState("today");
  const [selectedService, setSelectedService] = useState("All Services");
  const [selectedJobType, setSelectedJobType] = useState("All Job Types");
  const [todaySlide, setTodaySlide] = useState(0);
  const [librarySlide, setLibrarySlide] = useState(0);
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("sns-30-day-planner-ui-v3");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("sns-30-day-planner-ui-v3", JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    setTodaySlide(0);
  }, [selectedDate, selectedService, selectedJobType]);

  const days = useMemo(
    () => getDaysInMonth(currentYear, currentMonth),
    [currentYear, currentMonth]
  );

  const filteredBank = useMemo(
    () => getFilteredBank(selectedService, selectedJobType),
    [selectedService, selectedJobType]
  );

  const dateKey = formatDateKey(selectedDate);
  const entry = getEntry(entries, dateKey);
  const plan = getPlanForDate(selectedDate, selectedService, selectedJobType);
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

  const todaySlides = [
    {
      name: "Overview",
      content: (
        <div style={styles.slideStack}>
          <div style={styles.heroStatCard}>
            <div style={styles.badge}>{plan.pillar}</div>
            <h2 style={styles.sectionTitle}>{plan.title}</h2>
            <p style={styles.sectionText}>{plan.objective}</p>
            <div style={styles.metaLine}>Service: <strong>{plan.service}</strong></div>
            <div style={styles.metaLine}>Job Type: <strong>{plan.jobType}</strong></div>
          </div>
          <div style={styles.highlightCard}>
            <div style={styles.smallEyebrow}>Hook</div>
            <p style={styles.largeQuote}>{plan.hook}</p>
          </div>
          <div style={styles.progressCard}>
            <div style={styles.rowBetween}>
              <span>Daily completion</span>
              <strong>{completion}%</strong>
            </div>
            <div style={styles.progressTrack}><div style={{ ...styles.progressFill, width: `${completion}%` }} /></div>
          </div>
        </div>
      ),
    },
    {
      name: "Shot List",
      content: (
        <div style={styles.slideStack}>
          <div style={styles.cardSoft}>
            <h3 style={styles.cardTitle}>Best Angles</h3>
            <ul style={styles.cleanList}>{plan.angles.map((a) => <li key={a}>{a}</li>)}</ul>
          </div>
          <div style={styles.cardSoft}>
            <h3 style={styles.cardTitle}>Shots To Capture</h3>
            <ul style={styles.cleanList}>{plan.shots.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
          <div style={styles.cardSoft}>
            <h3 style={styles.cardTitle}>Production Goal</h3>
            <ul style={styles.cleanList}>
              <li>1 strong hook clip in the first 2 seconds</li>
              <li>1 talking or voiceover-ready clip</li>
              <li>3 to 5 detail clips</li>
              <li>1 story clip</li>
              <li>1 matching before/after angle if possible</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      name: "Script",
      content: (
        <div style={styles.slideStack}>
          <div style={styles.cardSoft}>
            <h3 style={styles.cardTitle}>Suggested Script</h3>
            <p style={styles.sectionText}>{plan.script}</p>
          </div>
          <div style={styles.cardSoft}>
            <h3 style={styles.cardTitle}>Custom Script</h3>
            <textarea
              style={styles.textarea}
              value={entry.customScript}
              onChange={(e) => updateEntry({ customScript: e.target.value })}
              placeholder="Write your custom script for this date..."
            />
          </div>
        </div>
      ),
    },
    {
      name: "Caption",
      content: (
        <div style={styles.slideStack}>
          <div style={styles.cardSoft}>
            <h3 style={styles.cardTitle}>Suggested Caption</h3>
            <p style={styles.sectionText}>{plan.caption}</p>
          </div>
          <div style={styles.cardSoft}>
            <h3 style={styles.cardTitle}>Hashtags</h3>
            <div style={styles.tags}>{plan.hashtags.map((tag) => <span key={tag} style={styles.tag}>{tag}</span>)}</div>
          </div>
          <div style={styles.cardSoft}>
            <h3 style={styles.cardTitle}>Custom Caption</h3>
            <textarea
              style={styles.textarea}
              value={entry.customCaption}
              onChange={(e) => updateEntry({ customCaption: e.target.value })}
              placeholder="Write or edit the caption for this date..."
            />
          </div>
        </div>
      ),
    },
  ];

  const librarySlides = [
    {
      name: "Services",
      content: (
        <div style={styles.slideStack}>
          <div style={styles.cardSoft}>
            <div style={styles.smallEyebrow}>Service Filter</div>
            <select style={styles.select} value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
              {serviceOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
          <div style={styles.cardSoft}>
            <h3 style={styles.cardTitle}>Built For Your Services</h3>
            <ul style={styles.cleanList}>
              <li>Patio covers</li>
              <li>Screen enclosures</li>
              <li>Motorized screens / shades</li>
              <li>Custom decks & porches</li>
              <li>Sunrooms</li>
              <li>Pavers & outdoor living</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      name: "Job Types",
      content: (
        <div style={styles.slideStack}>
          <div style={styles.cardSoft}>
            <div style={styles.smallEyebrow}>Job Type Mode</div>
            <select style={styles.select} value={selectedJobType} onChange={(e) => setSelectedJobType(e.target.value)}>
              {jobTypeOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
          <div style={styles.cardSoft}>
            <h3 style={styles.cardTitle}>Current Mode</h3>
            <p style={styles.sectionText}>You currently have <strong>{filteredBank.length}</strong> content ideas in this mode.</p>
            <p style={styles.sectionText}>Service: <strong>{selectedService}</strong></p>
            <p style={styles.sectionText}>Job Type: <strong>{selectedJobType}</strong></p>
          </div>
        </div>
      ),
    },
    {
      name: "Best Practices",
      content: (
        <div style={styles.slideStack}>
          <div style={styles.cardSoft}>
            <h3 style={styles.cardTitle}>Filming Rules</h3>
            <ul style={styles.cleanList}>
              <li>Film vertical first</li>
              <li>Get wide, medium, close-up</li>
              <li>Move the drone slowly</li>
              <li>Use talking clips for trust</li>
              <li>Always grab a hook shot first</li>
            </ul>
          </div>
          <div style={styles.cardSoft}>
            <h3 style={styles.cardTitle}>Workflow</h3>
            <ul style={styles.cleanList}>
              <li>Pick service and job type</li>
              <li>Open today’s date</li>
              <li>Shoot the recommended list</li>
              <li>Use or customize the script</li>
              <li>Write the caption and post</li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.appShell}>
        <div style={styles.topBar}>
          <div>
            <div style={styles.brandKicker}>S&S Design Build</div>
            <h1 style={styles.appTitle}>Marketing Planner</h1>
          </div>
          <div style={styles.todayChip}>{today.toLocaleDateString()}</div>
        </div>

        <div style={styles.contentArea}>
          {view === "today" && (
            <div style={styles.fixedView}>
              <div style={styles.viewHeader}>
                <div>
                  <div style={styles.smallEyebrow}>Selected Date</div>
                  <h2 style={styles.viewTitle}>{selectedDate.toLocaleDateString()}</h2>
                </div>
                <div style={styles.miniPill}>{completion}% done</div>
              </div>
              <SlideNav index={todaySlide} setIndex={setTodaySlide} count={todaySlides.length} />
              <SlideDots count={todaySlides.length} index={todaySlide} setIndex={setTodaySlide} />
              <div style={styles.slideViewport}>{todaySlides[todaySlide].content}</div>
            </div>
          )}

          {view === "calendar" && (
            <div style={styles.fixedView}>
              <div style={styles.viewHeader}>
                <div>
                  <div style={styles.smallEyebrow}>Calendar</div>
                  <h2 style={styles.viewTitle}>{monthNames[currentMonth]} {currentYear}</h2>
                </div>
                <div style={styles.rowGap8}>
                  <button style={styles.iconBtn} onClick={() => moveMonth("prev")}>←</button>
                  <button style={styles.iconBtn} onClick={() => moveMonth("next")}>→</button>
                </div>
              </div>

              <div style={styles.calendarWrap}>
                <div style={styles.weekRow}>
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => <div key={d} style={styles.weekLabel}>{d}</div>)}
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
                        onClick={() => {
                          setSelectedDate(day);
                          setView("today");
                        }}
                        style={{
                          ...styles.dayCell,
                          ...(isSelected ? styles.daySelected : {}),
                        }}
                      >
                        <div style={styles.dayTop}>
                          <span>{day.getDate()}</span>
                          {isToday ? <span style={isSelected ? styles.dotLight : styles.dotDark} /> : null}
                        </div>
                        <small style={isSelected ? styles.daySmallSelected : styles.daySmall}>{doneCount}/9</small>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {view === "checklist" && (
            <div style={styles.fixedView}>
              <div style={styles.viewHeader}>
                <div>
                  <div style={styles.smallEyebrow}>Production Tracker</div>
                  <h2 style={styles.viewTitle}>Daily Checklist</h2>
                </div>
                <div style={styles.badge}>{plan.pillar}</div>
              </div>
              <div style={styles.checklistGridMobile}>
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
                      ...styles.checkTile,
                      ...(entry.checklist[key] ? styles.checkTileDone : {}),
                    }}
                  >
                    <span>{label}</span>
                    <strong>{entry.checklist[key] ? "Done" : "Open"}</strong>
                  </button>
                ))}
              </div>
            </div>
          )}

          {view === "library" && (
            <div style={styles.fixedView}>
              <div style={styles.viewHeader}>
                <div>
                  <div style={styles.smallEyebrow}>Planner Controls</div>
                  <h2 style={styles.viewTitle}>Filters & Rules</h2>
                </div>
                <div style={styles.miniPill}>{filteredBank.length} ideas</div>
              </div>
              <SlideNav index={librarySlide} setIndex={setLibrarySlide} count={librarySlides.length} />
              <SlideDots count={librarySlides.length} index={librarySlide} setIndex={setLibrarySlide} />
              <div style={styles.slideViewport}>{librarySlides[librarySlide].content}</div>
            </div>
          )}

          {view === "notes" && (
            <div style={styles.fixedView}>
              <div style={styles.viewHeader}>
                <div>
                  <div style={styles.smallEyebrow}>End of Day</div>
                  <h2 style={styles.viewTitle}>Notes & Posting</h2>
                </div>
              </div>
              <div style={styles.slideStack}>
                <div style={styles.cardSoft}>
                  <h3 style={styles.cardTitle}>Daily Notes</h3>
                  <textarea
                    style={styles.textarea}
                    value={entry.notes}
                    onChange={(e) => updateEntry({ notes: e.target.value })}
                    placeholder="What happened today? What worked? What still needs editing?"
                  />
                </div>
                <div style={styles.cardSoft}>
                  <h3 style={styles.cardTitle}>Posted To</h3>
                  <textarea
                    style={styles.textareaSmall}
                    value={entry.postedTo}
                    onChange={(e) => updateEntry({ postedTo: e.target.value })}
                    placeholder="Instagram Reel, Story, Facebook, TikTok..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={styles.bottomNav}>
          {[
            ["today", "Today"],
            ["calendar", "Calendar"],
            ["checklist", "Checklist"],
            ["library", "Library"],
            ["notes", "Notes"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setView(key)}
              style={{
                ...styles.navTab,
                ...(view === key ? styles.navTabActive : {}),
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const colors = {
  navy: "#16324F",
  navyDeep: "#10273d",
  sky: "#2F6EA5",
  sand: "#E8D9B5",
  cream: "#F7F3EA",
  mint: "#D9E6DF",
  white: "#FFFFFF",
  text: "#15212E",
  muted: "#5C6B7A",
  border: "#D6DCE2",
  success: "#1E5D4C",
};

const styles = {
  page: {
    minHeight: "100vh",
    background: `linear-gradient(180deg, ${colors.cream} 0%, #eef4f8 100%)`,
    color: colors.text,
    fontFamily: "Inter, Arial, sans-serif",
  },
  appShell: {
    maxWidth: 980,
    margin: "0 auto",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    padding: 16,
    paddingBottom: 96,
    gap: 16,
  },
  topBar: {
    background: `linear-gradient(135deg, ${colors.navy} 0%, ${colors.sky} 100%)`,
    color: colors.white,
    borderRadius: 24,
    padding: 18,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    boxShadow: "0 20px 40px rgba(22,50,79,0.18)",
    flexWrap: "wrap",
  },
  brandKicker: {
    fontSize: 12,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    opacity: 0.8,
    marginBottom: 6,
  },
  appTitle: {
    margin: 0,
    fontSize: 28,
    lineHeight: 1.1,
  },
  todayChip: {
    background: "rgba(255,255,255,0.16)",
    border: "1px solid rgba(255,255,255,0.22)",
    borderRadius: 999,
    padding: "10px 14px",
    fontWeight: 700,
  },
  contentArea: {
    flex: 1,
    display: "flex",
  },
  fixedView: {
    width: "100%",
    background: colors.white,
    border: `1px solid ${colors.border}`,
    borderRadius: 28,
    padding: 18,
    boxShadow: "0 12px 30px rgba(16,39,61,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    minHeight: 0,
  },
  viewHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    flexWrap: "wrap",
  },
  smallEyebrow: {
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    fontSize: 11,
    color: colors.sky,
    marginBottom: 6,
    fontWeight: 700,
  },
  viewTitle: {
    margin: 0,
    fontSize: 24,
    lineHeight: 1.1,
  },
  miniPill: {
    background: colors.mint,
    color: colors.success,
    padding: "10px 14px",
    borderRadius: 999,
    fontWeight: 700,
  },
  slideNav: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 8,
  },
  slideArrow: {
    width: 42,
    height: 42,
    borderRadius: 14,
    border: `1px solid ${colors.border}`,
    background: colors.cream,
    cursor: "pointer",
    fontWeight: 700,
    color: colors.navy,
  },
  dotsWrap: {
    display: "flex",
    justifyContent: "center",
    gap: 8,
  },
  dotBtn: {
    width: 10,
    height: 10,
    borderRadius: 999,
    border: "none",
    background: "#cdd7e0",
    cursor: "pointer",
  },
  dotBtnActive: {
    width: 28,
    background: colors.sky,
  },
  slideViewport: {
    flex: 1,
    minHeight: 0,
    overflow: "auto",
  },
  slideStack: {
    display: "grid",
    gap: 14,
  },
  heroStatCard: {
    background: `linear-gradient(180deg, ${colors.cream} 0%, ${colors.white} 100%)`,
    border: `1px solid ${colors.border}`,
    borderRadius: 22,
    padding: 18,
  },
  highlightCard: {
    background: `linear-gradient(135deg, ${colors.sand} 0%, #f3e6c8 100%)`,
    borderRadius: 22,
    padding: 18,
    color: colors.navyDeep,
  },
  progressCard: {
    background: colors.white,
    border: `1px solid ${colors.border}`,
    borderRadius: 22,
    padding: 16,
  },
  rowBetween: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  progressTrack: {
    height: 12,
    borderRadius: 999,
    background: "#e8edf1",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: `linear-gradient(90deg, ${colors.sky} 0%, ${colors.navy} 100%)`,
  },
  badge: {
    display: "inline-block",
    background: "rgba(47,110,165,0.12)",
    color: colors.sky,
    borderRadius: 999,
    padding: "7px 12px",
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 10,
  },
  sectionTitle: {
    margin: 0,
    fontSize: 24,
    lineHeight: 1.15,
  },
  sectionText: {
    margin: 0,
    color: colors.muted,
    lineHeight: 1.6,
  },
  metaLine: {
    marginTop: 8,
    color: colors.text,
  },
  largeQuote: {
    margin: 0,
    fontSize: 22,
    lineHeight: 1.35,
    fontWeight: 700,
  },
  cardSoft: {
    background: colors.white,
    border: `1px solid ${colors.border}`,
    borderRadius: 22,
    padding: 18,
  },
  cardTitle: {
    marginTop: 0,
    marginBottom: 12,
    fontSize: 18,
  },
  cleanList: {
    margin: 0,
    paddingLeft: 18,
    display: "grid",
    gap: 10,
    color: colors.text,
  },
  textarea: {
    width: "100%",
    minHeight: 140,
    resize: "vertical",
    borderRadius: 18,
    border: `1px solid ${colors.border}`,
    padding: 14,
    font: "inherit",
    background: "#fcfdff",
  },
  textareaSmall: {
    width: "100%",
    minHeight: 96,
    resize: "vertical",
    borderRadius: 18,
    border: `1px solid ${colors.border}`,
    padding: 14,
    font: "inherit",
    background: "#fcfdff",
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    padding: "8px 12px",
    borderRadius: 999,
    background: colors.cream,
    border: `1px solid ${colors.border}`,
    fontSize: 14,
    color: colors.navy,
    fontWeight: 600,
  },
  calendarWrap: {
    display: "grid",
    gap: 10,
  },
  rowGap8: {
    display: "flex",
    gap: 8,
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    border: `1px solid ${colors.border}`,
    background: colors.cream,
    cursor: "pointer",
    fontWeight: 700,
    color: colors.navy,
  },
  weekRow: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 8,
  },
  weekLabel: {
    textAlign: "center",
    color: colors.muted,
    fontSize: 12,
    fontWeight: 700,
  },
  calendarGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 8,
  },
  blankDay: {
    minHeight: 70,
  },
  dayCell: {
    minHeight: 78,
    borderRadius: 18,
    border: `1px solid ${colors.border}`,
    background: colors.white,
    padding: 10,
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    cursor: "pointer",
  },
  daySelected: {
    background: colors.navy,
    color: colors.white,
    borderColor: colors.navy,
  },
  dayTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  daySmall: {
    color: colors.muted,
  },
  daySmallSelected: {
    color: "rgba(255,255,255,0.72)",
  },
  dotDark: {
    width: 8,
    height: 8,
    borderRadius: 999,
    background: colors.sky,
  },
  dotLight: {
    width: 8,
    height: 8,
    borderRadius: 999,
    background: colors.white,
  },
  checklistGridMobile: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 12,
  },
  checkTile: {
    border: `1px solid ${colors.border}`,
    borderRadius: 20,
    background: colors.white,
    padding: 16,
    textAlign: "left",
    display: "grid",
    gap: 10,
    cursor: "pointer",
  },
  checkTileDone: {
    background: `linear-gradient(135deg, ${colors.navy} 0%, ${colors.sky} 100%)`,
    color: colors.white,
    borderColor: colors.navy,
  },
  select: {
    padding: 14,
    borderRadius: 16,
    border: `1px solid ${colors.border}`,
    background: colors.white,
    font: "inherit",
    color: colors.text,
  },
  bottomNav: {
    position: "sticky",
    bottom: 12,
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(10px)",
    border: `1px solid ${colors.border}`,
    borderRadius: 24,
    padding: 10,
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: 8,
    boxShadow: "0 12px 30px rgba(16,39,61,0.12)",
  },
  navTab: {
    border: "none",
    borderRadius: 16,
    background: "transparent",
    padding: "12px 8px",
    cursor: "pointer",
    color: colors.muted,
    fontWeight: 700,
    fontSize: 13,
  },
  navTabActive: {
    background: colors.navy,
    color: colors.white,
  },
};
