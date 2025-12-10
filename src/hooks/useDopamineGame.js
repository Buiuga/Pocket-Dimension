import { useState, useEffect, useRef, useMemo } from "react";
import {
  ITEMS_DATA,
  AUTOMATION_DATA,
  ARTIFACTS_DATA,
} from "../data/DopamineData";

export const useDopamineGame = () => {
  // --- STATE ---
  const [dopamine, setDopamine] = useState(() => {
    const saved = localStorage.getItem("dopamine_currency");
    return saved ? parseFloat(saved) : 0;
  });

  const [unlockedItems, setUnlockedItems] = useState(() => {
    const saved = localStorage.getItem("dopamine_unlocked");
    return saved ? JSON.parse(saved) : ["item_1"];
  });

  const [automatedItems, setAutomatedItems] = useState(() => {
    const saved = localStorage.getItem("dopamine_automated");
    return saved ? JSON.parse(saved) : [];
  });

  const [ownedArtifacts, setOwnedArtifacts] = useState(() => {
    const saved = localStorage.getItem("dopamine_artifacts");
    return saved ? JSON.parse(saved) : [];
  });

  const [cooldowns, setCooldowns] = useState(() => {
    const saved = localStorage.getItem("dopamine_cooldowns");
    if (!saved) return {};
    const parsed = JSON.parse(saved);
    const now = Date.now();
    const validCooldowns = {};
    Object.keys(parsed).forEach((key) => {
      if (parsed[key] > now) validCooldowns[key] = parsed[key];
    });
    return validCooldowns;
  });

  const [tick, setTick] = useState(() => Date.now());

  // --- REFS ---
  const dopamineRef = useRef(dopamine);
  const cooldownsRef = useRef(cooldowns);
  const automatedRef = useRef(automatedItems);
  const artifactsRef = useRef(ownedArtifacts);

  useEffect(() => {
    dopamineRef.current = dopamine;
    cooldownsRef.current = cooldowns;
    automatedRef.current = automatedItems;
    artifactsRef.current = ownedArtifacts;
  }, [dopamine, cooldowns, automatedItems, ownedArtifacts]);

  // --- SAVE SYSTEM ---
  useEffect(() => {
    localStorage.setItem("dopamine_currency", dopamine);
    localStorage.setItem("dopamine_unlocked", JSON.stringify(unlockedItems));
    localStorage.setItem("dopamine_automated", JSON.stringify(automatedItems));
    localStorage.setItem("dopamine_cooldowns", JSON.stringify(cooldowns));
    localStorage.setItem("dopamine_artifacts", JSON.stringify(ownedArtifacts));
  }, [dopamine, unlockedItems, automatedItems, cooldowns, ownedArtifacts]);

  // --- CALCULATE BONUSES (The Magic Logic) ---
  const bonuses = useMemo(() => {
    const owned = ownedArtifacts;
    let cdMult = 1.0;
    let manualCostMult = 1.0;
    let autoCostMult = 1.0;
    let artifactCostMult = 1.0;
    let passivePerSec = 0;

    // Cooldown Reduction
    if (owned.includes("art_1")) cdMult *= 0.95; // Potato
    if (owned.includes("art_7")) cdMult *= 0.9; // Balou
    if (owned.includes("art_10")) cdMult *= 0.9; // Creator

    // Manual Cost Reduction
    if (owned.includes("art_2")) manualCostMult *= 0.95; // Ikea
    if (owned.includes("art_5")) manualCostMult *= 0.9; // Peony
    if (owned.includes("art_10")) manualCostMult *= 0.9; // Creator

    // Auto Cost Reduction
    if (owned.includes("art_3")) autoCostMult *= 0.95; // Bolg
    if (owned.includes("art_6")) autoCostMult *= 0.9; // Bellflower
    if (owned.includes("art_10")) autoCostMult *= 0.9; // Creator

    // Artifact Cost Reduction
    if (owned.includes("art_4")) artifactCostMult *= 0.85; // Ogrul (15% discount)
    if (owned.includes("art_10")) artifactCostMult *= 0.9; // Creator (assumed 'All Costs' includes artifacts)

    // Passive Generation
    // Baghera & Doris Synergy
    const hasBaghera = owned.includes("art_8");
    const hasDoris = owned.includes("art_9");

    if (hasBaghera && hasDoris) {
      passivePerSec += 300; // Both = 150 + 150
    } else {
      if (hasBaghera) passivePerSec += 100;
      if (hasDoris) passivePerSec += 100;
    }

    return {
      cdMult,
      manualCostMult,
      autoCostMult,
      artifactCostMult,
      passivePerSec,
    };
  }, [ownedArtifacts]);

  // --- LOOPS ---
  useEffect(() => {
    let animationFrameId;
    const loop = () => {
      setTick(Date.now());
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const currentCooldowns = cooldownsRef.current;
      const currentAutomated = automatedRef.current;

      let dopamineGain = 0;
      let newCooldowns = {};
      let hasUpdates = false;

      // 1. Automation Items
      ITEMS_DATA.forEach((item) => {
        if (currentAutomated.includes(item.id)) {
          const readyTime = currentCooldowns[item.id] || 0;
          if (now >= readyTime) {
            dopamineGain += item.reward;
            // APPLY COOLDOWN BONUS TO AUTOMATION TOO
            const duration = item.duration * bonuses.cdMult;
            newCooldowns[item.id] = now + duration;
            hasUpdates = true;
          }
        }
      });

      // 2. Artifact Passive Gain
      // Divide by 10 because loop runs every 100ms
      if (bonuses.passivePerSec > 0) {
        dopamineGain += bonuses.passivePerSec / 10;
        hasUpdates = true;
      }

      if (hasUpdates) {
        setDopamine((prev) => prev + dopamineGain);
        setCooldowns((prev) => ({ ...prev, ...newCooldowns }));
      }
    }, 100);
    return () => clearInterval(interval);
  }, [bonuses]); // Re-create loop if bonuses change

  // --- ACTIONS ---

  const getManualCost = (item) => {
    return Math.floor(item.unlockCost * bonuses.manualCostMult);
  };

  const getAutoCost = (auto) => {
    return Math.floor(auto.cost * bonuses.autoCostMult);
  };

  const getArtifactCost = (artifact) => {
    return Math.floor(artifact.cost * bonuses.artifactCostMult);
  };

  const handleItemClick = (item) => {
    const now = Date.now();
    const readyTime = cooldowns[item.id] || 0;
    if (now < readyTime) return;

    setDopamine((prev) => prev + item.reward);
    // APPLY COOLDOWN BONUS
    const duration = item.duration * bonuses.cdMult;
    setCooldowns((prev) => ({ ...prev, [item.id]: now + duration }));
  };

  const handleUnlock = (item) => {
    const cost = getManualCost(item);
    if (dopamine >= cost) {
      setDopamine((prev) => prev - cost);
      setUnlockedItems((prev) => [...prev, item.id]);
    }
  };

  const handleBuyAutomation = (autoUpgrade) => {
    const cost = getAutoCost(autoUpgrade);
    if (dopamine >= cost) {
      setDopamine((prev) => prev - cost);
      setAutomatedItems((prev) => [...prev, ...autoUpgrade.targets]);
    }
  };

  const handleBuyArtifact = (artifact) => {
    const cost = getArtifactCost(artifact);
    if (dopamine >= cost) {
      setDopamine((prev) => prev - cost);
      setOwnedArtifacts((prev) => [...prev, artifact.id]);
    }
  };

  return {
    dopamine,
    unlockedItems,
    automatedItems,
    ownedArtifacts,
    cooldowns,
    tick,
    bonuses,
    getManualCost,
    getAutoCost,
    getArtifactCost,
    handleItemClick,
    handleUnlock,
    handleBuyAutomation,
    handleBuyArtifact,
  };
};
