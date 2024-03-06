export function getGifPosition(gifHeroSource) {
    switch (gifHeroSource) {
        case "bristleback":
            return "-90px -10px";
        case "chaos_knight":
        case "zuus":
            return "-20px -10px";
        case "antimage":
        case "faceless_void":
        case "marci":
            return "-10px -10px";
        case "arc_warden":
            return "-8px -10px";
        case "bounty_hunter":
        case "clinkz":
            return "-40px -60px";
        case "dawnbreaker":
        case "earthshaker":
        case "juggernaut":
        case "undying":
            return "-20px -20px";
        case "gyrocopter":
            return "-30px -30px";
        case "huskar":
        case "muerta":
        case "furion":
        case "invoker":
        case "queenofpain":
            return "-10px -30px";
        case "life_stealer":
            return "-40px -40px";
        case "meepo":
            return "-30px -100px";
        case "monkey_king":
            return "-40px -30px";
        case "ogre_magi":
            return "10px -10px";
        case "primal_beast":
            return "-20px 0px";
        case "morphling":
        case "skeleton_king":
        case "death_prophet":
        case "enchantress":
        case "disruptor":
        case "rubick":
        case "shadow_demon":
        case "shadow_shaman":
        case "silencer":
            return "-20px -30px";
        case "bloodseeker":
        case "tiny":
        case "terrorblade":
        case "viper":
        case "jakiro":
        case "dark_willow":
        case "storm_spirit":
            return "-20px -50px";
        case "pudge":
            return "-30px -80px";
        case "slardar":
            return "20px -40px";
        case "spirit_breaker":
            return "-30px -80px";
        case "riki":
        case "leshrac":
        case "naga_siren":
        case "lich":
        case "tinker":
        case "warlock":
            return "-20px -40px";
        case "nevermore":
        case "brewmaster":
            return "-30px -40px";
        case "slark":
        case "tusk":
        case "ursa":
            return "-30px -50px";
        case "sniper":
            return "5px -20px";
        case "treant":
            return "-30px -30px";
        case "templar_assassin":
        case "weaver":
        case "shredder":
        case "venomancer":
            return "-20px -60px";
        case "crystal_maiden":
            return "-20px -20px";
        case "grimstroke":
            return "-10px -40px";
        case "broodmother":
            return "-20px 10px";
        case "dark_seer":
            return "-30px -70px";
        case "lion":
            return "-25px -10px";
        case "dazzle":
        case "mirana":
            return "-10px -20px";
        case "wisp":
            return "-10px -70px";
        case "puck":
        case "skywrath_mage":
        case "witch_doctor":
            return "-20px -70px";
        case "pugna":
            return "10px -40px";
        case "lycan":
            return "-14px -52px";
        case "nyx_assassin":
        case "visage":
            return "-10px -60px";
        case "phoenix":
        case "sand_king":
        case "snapfire":
        case "techies":
            return "-20px -90px";
        case "winter_wyvern":
            return "-10px -40px";


        default:
            return "-40px -10px"; // Default value
    }
}
