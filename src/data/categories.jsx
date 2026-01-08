import { Zap, Grid, Construction, Lightbulb, Hammer, Droplet, Wrench, ShieldCheck, PaintBucket, Scissors, Home, Package } from "lucide-react";

export const categories = [
    { 
      id: 1, 
      name: "Power Tools", 
      icon: <Zap />, 
      image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=400",
      subCategories: [
        { name: "MINLI POWER TOOLS", image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=200" },
        { name: "BOSS POWER TOOLS", image: "https://images.unsplash.com/photo-1615857257685-683a388f638f?auto=format&fit=crop&q=80&w=200" },
        { name: "DCA POWER TOOLS", image: "https://images.unsplash.com/photo-1599661448831-291775f0426c?auto=format&fit=crop&q=80&w=200" },
        { name: "ELECTRIC WALL CHASER", image: "https://images.unsplash.com/photo-1540652707223-2895240292b2?auto=format&fit=crop&q=80&w=200" },
      ] 
    },
    { 
      id: 2, 
      name: "Aluminium Ladders", 
      icon: <Grid />, 
      image: "https://images.unsplash.com/photo-1574577883398-3a9d9e68593a?auto=format&fit=crop&q=80&w=400",
      subCategories: [
        { name: "ZAMIL LADDERS", image: "https://images.unsplash.com/photo-1536093276633-874e447b97c0?auto=format&fit=crop&q=80&w=200" },
        { name: "ALUMINIUM LADDERS", image: "https://images.unsplash.com/photo-1506020757198-1a36d4a66a1d?auto=format&fit=crop&q=80&w=200" }
      ] 
    },
    { 
      id: 3, 
      name: "Construction", 
      icon: <Construction />, 
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=400",
      subCategories: [
        { name: "ENGINE AND VIBRATOR", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=200" },
        { name: "GENERATOR", image: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&q=80&w=200" },
        { name: "WELDING", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=200" },
        { name: "AIR COMPRESSOR", image: "https://images.unsplash.com/photo-1628178875225-b8296a0b9435?auto=format&fit=crop&q=80&w=200" },
        { name: "JACK", image: "https://images.unsplash.com/photo-1582239330925-5e04278c278e?auto=format&fit=crop&q=80&w=200" },
        { name: "MASONRY", image: "https://images.unsplash.com/photo-1518709414768-a88981a45e5d?auto=format&fit=crop&q=80&w=200" },
        { name: "TARP & MESH", image: "https://images.unsplash.com/photo-1619546952912-535e9ec42551?auto=format&fit=crop&q=80&w=200" }
      ] 
    },
    { 
      id: 4, 
      name: "Electrical", 
      icon: <Lightbulb />, 
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=400",
      subCategories: [
        { name: "ELECTRICAL", image: "https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&q=80&w=200" },
        { name: "WIRE", image: "https://images.unsplash.com/photo-1544724569-5f546fd6dd2d?auto=format&fit=crop&q=80&w=200" },
        { name: "CABLE", image: "https://images.unsplash.com/photo-1615555135249-f41cb3a89104?auto=format&fit=crop&q=80&w=200" },
        { name: "SWITCHES", image: "https://images.unsplash.com/photo-1555431189-0fabf2667795?auto=format&fit=crop&q=80&w=200" }
      ] 
    },
    { 
      id: 5, 
      name: "Tools", 
      icon: <Hammer />, 
      image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&q=80&w=400",
      subCategories: [
        { name: "HAND TOOL", image: "https://images.unsplash.com/photo-1619420674207-24731022121a?auto=format&fit=crop&q=80&w=200" },
        { name: "HAMMER", image: "https://images.unsplash.com/photo-1584643039757-04664531818d?auto=format&fit=crop&q=80&w=200" },
        { name: "SOCKET / SPANNER", image: "https://images.unsplash.com/photo-1601614050510-0968e0d9b897?auto=format&fit=crop&q=80&w=200" },
        { name: "BITS", image: "https://images.unsplash.com/photo-1598209279122-8541213a0398?auto=format&fit=crop&q=80&w=200" },
        { name: "MEASURING", image: "https://images.unsplash.com/photo-1576615278693-01d7e26867ca?auto=format&fit=crop&q=80&w=200" },
        { name: "CUTTER", image: "https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?auto=format&fit=crop&q=80&w=200" },
        { name: "HOLESAW", image: "https://images.unsplash.com/photo-1617103996702-96ff29b1c467?auto=format&fit=crop&q=80&w=200" }
      ] 
    },
    { 
      id: 6, 
      name: "Plumbing & Sanitary", 
      icon: <Droplet />, 
      image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=400",
      subCategories: [
        { name: "VALVE", image: "https://images.unsplash.com/photo-1616401784845-180886ba9ca8?auto=format&fit=crop&q=80&w=200" },
        { name: "SHOWER", image: "https://images.unsplash.com/photo-1584621644331-526488347895?auto=format&fit=crop&q=80&w=200" },
        { name: "PUMP", image: "https://images.unsplash.com/photo-1562259949-e8e6006a6d52?auto=format&fit=crop&q=80&w=200" },
        { name: "HOSE", image: "https://images.unsplash.com/photo-1603977536979-543324d45546?auto=format&fit=crop&q=80&w=200" },
        { name: "FAUCET", image: "https://images.unsplash.com/photo-1584621644368-23e59074090b?auto=format&fit=crop&q=80&w=200" },
        { name: "UPVC", image: "https://images.unsplash.com/photo-1542368945-8a0740df6e57?auto=format&fit=crop&q=80&w=200" },
        { name: "TOILET", image: "https://images.unsplash.com/photo-1564540582888-293674e1d320?auto=format&fit=crop&q=80&w=200" }
      ] 
    },
    { 
      id: 7, 
      name: "Hardware", 
      icon: <Wrench />, 
      image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80&w=400",
      subCategories: [
        { name: "HARDWARE", image: "https://images.unsplash.com/photo-1581147036324-c17ac41d1685?auto=format&fit=crop&q=80&w=200" },
        { name: "LOCK", image: "https://images.unsplash.com/photo-1589824783837-61698827210f?auto=format&fit=crop&q=80&w=200" },
        { name: "DOOR HANDLE", image: "https://images.unsplash.com/photo-1601056639638-655d0f7a3f4e?auto=format&fit=crop&q=80&w=200" },
        { name: "FASTENER", image: "https://images.unsplash.com/photo-1536816579748-4ec577dad206?auto=format&fit=crop&q=80&w=200" },
        { name: "NAILS", image: "https://images.unsplash.com/photo-1585675402092-297c554f67c4?auto=format&fit=crop&q=80&w=200" },
        { name: "SCREWS", image: "https://images.unsplash.com/photo-1599818815124-73347f7560d2?auto=format&fit=crop&q=80&w=200" }
      ] 
    },
    { 
      id: 8, 
      name: "Safety", 
      icon: <ShieldCheck />, 
      image: "https://images.unsplash.com/photo-1585336261022-aa82d11305f3?auto=format&fit=crop&q=80&w=400",
      subCategories: [
        { name: "SAFETY", image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=200" },
        { name: "GLOVES", image: "https://images.unsplash.com/photo-1542284758-26fe4a3d70ad?auto=format&fit=crop&q=80&w=200" },
        { name: "HELMETS", image: "https://images.unsplash.com/photo-1557766347-79754df97b7b?auto=format&fit=crop&q=80&w=200" },
        { name: "VESTS", image: "https://images.unsplash.com/photo-1628136369062-817631cc9c42?auto=format&fit=crop&q=80&w=200" }
      ] 
    },
    { 
      id: 9, 
      name: "Paints & Adhesives", 
      icon: <PaintBucket />, 
      image: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?auto=format&fit=crop&q=80&w=400",
      subCategories: [
        { name: "PAINT TOOL", image: "https://images.unsplash.com/photo-1599661448831-291775f0426c?auto=format&fit=crop&q=80&w=200" },
        { name: "ADHESIVE", image: "https://images.unsplash.com/photo-1580974852861-c381510bc98a?auto=format&fit=crop&q=80&w=200" },
        { name: "TAPE", image: "https://images.unsplash.com/photo-1620022416805-77885b51d533?auto=format&fit=crop&q=80&w=200" },
        { name: "SPRAY", image: "https://images.unsplash.com/photo-1634833299388-75c138d3301c?auto=format&fit=crop&q=80&w=200" }
      ] 
    },
    { 
      id: 10, 
      name: "Gardening", 
      icon: <Scissors />, 
      image: "https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?auto=format&fit=crop&q=80&w=400",
      subCategories: [
        { name: "GARDENING", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=200" },
        { name: "SPRAY", image: "https://images.unsplash.com/photo-1634833299388-75c138d3301c?auto=format&fit=crop&q=80&w=200" },
        { name: "HOSE", image: "https://images.unsplash.com/photo-1603977536979-543324d45546?auto=format&fit=crop&q=80&w=200" }
      ] 
    },
    { 
      id: 11, 
      name: "Household", 
      icon: <Home />, 
      image: "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?auto=format&fit=crop&q=80&w=400",
      subCategories: [
        { name: "HOUSEHOLD", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=200" },
        { name: "KITCHEN", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&q=80&w=200" },
        { name: "CLOTH", image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=200" },
        { name: "TROLLY", image: "https://images.unsplash.com/photo-1544243673-9a3d4766855b?auto=format&fit=crop&q=80&w=200" }
      ] 
    },
    { 
      id: 12, 
      name: "General Supplies", 
      icon: <Package />, 
      image: "https://images.unsplash.com/photo-1581093196277-9f608eea3d46?auto=format&fit=crop&q=80&w=400",
      subCategories: [
        { name: "NYLON ROPE", image: "https://images.unsplash.com/photo-1621251397839-44be2a72b028?auto=format&fit=crop&q=80&w=200" },
        { name: "DISC", image: "https://images.unsplash.com/photo-1619420674207-24731022121a?auto=format&fit=crop&q=80&w=200" },
        { name: "FILTER", image: "https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?auto=format&fit=crop&q=80&w=200" }
      ] 
    },
  
];
