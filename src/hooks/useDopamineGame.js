import { useState, useEffect, useRef, useMemo } from "react";
import {
  ITEMS_DATA,
  AUTOMATION_DATA,
  ARTIFACTS_DATA,
  CHECKPOINTS_DATA,
} from "../data/DopamineData";

// --- SOUND CONSTANTS ---
const SUCCESS_SOUND =
  "/Pocket-Dimension/DopamineInc/sounds/cha-chingunlock.mp3";
const SPARKLE_SOUND =
  "/Pocket-Dimension/DopamineInc/sounds/unlockCollection.mp3";

export const useDopamineGame = () => {
  // ... (All existing state definitions: dopamine, unlockedItems, etc.) ...
  const [dopamine, setDopamine] = useState(() => {
    const saved = localStorage.getItem("dopamine_currency");
    return saved && !isNaN(parseFloat(saved)) ? parseFloat(saved) : 0;
  });

  const [lifetimeDopamine, setLifetimeDopamine] = useState(() => {
    const saved = localStorage.getItem("dopamine_lifetime");
    return saved && !isNaN(parseFloat(saved)) ? parseFloat(saved) : 0;
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

  const [unlockedCheckpoints, setUnlockedCheckpoints] = useState(() => {
    const saved = localStorage.getItem("dopamine_checkpoints");
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

  const dopamineRef = useRef(dopamine);
  const cooldownsRef = useRef(cooldowns);
  const automatedRef = useRef(automatedItems);
  const artifactsRef = useRef(ownedArtifacts);

  // --- SOUND HELPER ---
  const playSound = (type) => {
    try {
      let src;
      let volume = 0.3;

      if (type === "success") {
        src = SUCCESS_SOUND;
      } else if (type === "collection") {
        src = SPARKLE_SOUND;
        volume = 0.3;
      }

      if (src) {
        const audio = new Audio(src);
        audio.volume = volume;
        audio.play().catch(() => {});
      }
    } catch (e) {
      console.error("Audio error", e);
    }
  };
  useEffect(() => {
    dopamineRef.current = dopamine;
    cooldownsRef.current = cooldowns;
    automatedRef.current = automatedItems;
    artifactsRef.current = ownedArtifacts;
  }, [dopamine, cooldowns, automatedItems, ownedArtifacts]);

  useEffect(() => {
    localStorage.setItem("dopamine_currency", dopamine);
    localStorage.setItem("dopamine_lifetime", lifetimeDopamine);
    localStorage.setItem("dopamine_unlocked", JSON.stringify(unlockedItems));
    localStorage.setItem("dopamine_automated", JSON.stringify(automatedItems));
    localStorage.setItem("dopamine_cooldowns", JSON.stringify(cooldowns));
    localStorage.setItem("dopamine_artifacts", JSON.stringify(ownedArtifacts));
    localStorage.setItem(
      "dopamine_checkpoints",
      JSON.stringify(unlockedCheckpoints)
    );
  }, [
    dopamine,
    lifetimeDopamine,
    unlockedItems,
    automatedItems,
    cooldowns,
    ownedArtifacts,
    unlockedCheckpoints,
  ]);

  // --- CALCULATE BONUSES ---
  const bonuses = useMemo(() => {
    const owned = ownedArtifacts;
    let cdMult = 1.0;
    let manualCostMult = 1.0;
    let autoCostMult = 1.0;
    let artifactCostMult = 1.0;
    let passivePerSec = 0;

    if (owned.includes("art_1")) cdMult *= 0.95;
    if (owned.includes("art_7")) cdMult *= 0.9;
    if (owned.includes("art_10")) cdMult *= 0.9;

    if (owned.includes("art_2")) manualCostMult *= 0.95;
    if (owned.includes("art_5")) manualCostMult *= 0.9;
    if (owned.includes("art_10")) manualCostMult *= 0.9;

    if (owned.includes("art_3")) autoCostMult *= 0.95;
    if (owned.includes("art_6")) autoCostMult *= 0.9;
    if (owned.includes("art_10")) autoCostMult *= 0.9;

    if (owned.includes("art_4")) artifactCostMult *= 0.85;
    if (owned.includes("art_10")) artifactCostMult *= 0.9;

    const hasBaghera = owned.includes("art_8");
    const hasDoris = owned.includes("art_9");

    if (hasBaghera && hasDoris) {
      passivePerSec += 50000;
    } else {
      if (hasBaghera) passivePerSec += 10000;
      if (hasDoris) passivePerSec += 10000;
    }

    // CHECKPOINT BONUSES
    const cpCount = unlockedCheckpoints.length;
    const cpDiscountMultiplier = 1 - cpCount * 0.03;

    manualCostMult *= cpDiscountMultiplier;
    autoCostMult *= cpDiscountMultiplier;
    artifactCostMult *= cpDiscountMultiplier;
    cdMult *= cpDiscountMultiplier;

    passivePerSec += cpCount * 100;

    return {
      cdMult,
      manualCostMult,
      autoCostMult,
      artifactCostMult,
      passivePerSec,
    };
  }, [ownedArtifacts, unlockedCheckpoints]);

  //CALCULATE TOTAL DPS
  const totalDPS = useMemo(() => {
    let autoDPS = 0;

    ITEMS_DATA.forEach((item) => {
      if (automatedItems.includes(item.id)) {
        const realDurationSec = (item.duration * bonuses.cdMult) / 1000;
        autoDPS += item.reward / realDurationSec;
      }
    });

    return autoDPS + bonuses.passivePerSec;
  }, [automatedItems, bonuses]);

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

      ITEMS_DATA.forEach((item) => {
        if (currentAutomated.includes(item.id)) {
          const readyTime = currentCooldowns[item.id] || 0;
          if (now >= readyTime) {
            dopamineGain += item.reward;
            const duration = item.duration * bonuses.cdMult;
            newCooldowns[item.id] = now + duration;
            hasUpdates = true;
          }
        }
      });

      if (bonuses.passivePerSec > 0) {
        dopamineGain += bonuses.passivePerSec / 10;
        hasUpdates = true;
      }

      if (hasUpdates) {
        setDopamine((prev) => prev + dopamineGain);
        setLifetimeDopamine((prev) => prev + dopamineGain);
        setCooldowns((prev) => ({ ...prev, ...newCooldowns }));
      }
    }, 100);
    return () => clearInterval(interval);
  }, [bonuses]);

  // --- ACTIONS ---
  const getManualCost = (item) =>
    Math.floor(item.unlockCost * bonuses.manualCostMult);
  const getAutoCost = (auto) => Math.floor(auto.cost * bonuses.autoCostMult);
  const getArtifactCost = (artifact) =>
    Math.floor(artifact.cost * bonuses.artifactCostMult);

  const handleItemClick = (item) => {
    const now = Date.now();
    const readyTime = cooldowns[item.id] || 0;
    if (now < readyTime) return;

    setDopamine((prev) => prev + item.reward);
    setLifetimeDopamine((prev) => prev + item.reward);
    const duration = item.duration * bonuses.cdMult;
    setCooldowns((prev) => ({ ...prev, [item.id]: now + duration }));
  };

  const handleUnlock = (item) => {
    const cost = getManualCost(item);
    if (dopamine >= cost) {
      setDopamine((prev) => prev - cost);
      setUnlockedItems((prev) => [...prev, item.id]);
      playSound("success");
    }
  };

  const handleBuyAutomation = (autoUpgrade) => {
    const cost = getAutoCost(autoUpgrade);
    if (dopamine >= cost) {
      setDopamine((prev) => prev - cost);
      setAutomatedItems((prev) => [...prev, ...autoUpgrade.targets]);
      playSound("success");
    }
  };

  const handleBuyArtifact = (artifact) => {
    const cost = getArtifactCost(artifact);
    if (dopamine >= cost) {
      setDopamine((prev) => prev - cost);
      setOwnedArtifacts((prev) => [...prev, artifact.id]);
      playSound("success");
    }
  };

  const handleClaimCheckpoint = (checkpointId) => {
    setUnlockedCheckpoints((prev) => [...prev, checkpointId]);
    playSound("collection");
  };
  return {
    dopamine,
    lifetimeDopamine,
    unlockedItems,
    automatedItems,
    ownedArtifacts,
    unlockedCheckpoints,
    cooldowns,
    tick,
    bonuses,
    totalDPS,
    getManualCost,
    getAutoCost,
    getArtifactCost,
    handleItemClick,
    handleUnlock,
    handleBuyAutomation,
    handleBuyArtifact,
    handleClaimCheckpoint,
  };
};
